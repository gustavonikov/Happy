import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus, FiArrowLeft  } from 'react-icons/fi';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import '../styles/pages/orphanages-map.css';

import localImg from '../images/Local.svg';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const { goBack } = useHistory();

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(res => {
            setOrphanages(res.data);
        });
    }, []);

    return (
        <div id="map-page">
            <aside>
                <header>
                    <img src={localImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <div className="footer-container">
                        <button  title="Voltar" type="button" onClick={goBack}>
                            <FiArrowLeft size={24} color="#FFF" />
                        </button>
                        <div className="footer-local">
                            <strong>João Pessoa</strong>
                            <span>Paraíba</span> 
                        </div>   
                    </div>
                </footer>
            </aside>

            <Map 
                center={[-7.139762,-34.844131]}
                zoom={13}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />  TileLayer do leaflet*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`} />
                
                {orphanages.map((orphanage) => {
                    return (
                        <Marker 
                            key={orphanage.id}
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                        >
                            <Popup  closeButton={false} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}> <FiArrowRight size={20} color="#fff" /> </Link>
                            </Popup>
                        </Marker>
                    );
                })}
                
            </Map>

            <Link title="Cadastrar Orfanato" to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>

        </div>
    );
}

export default OrphanagesMap;
