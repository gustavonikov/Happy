import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from 'react-icons/fi';

import '../styles/pages/create-orphanage.css';

import SideBar from '../components/SideBar';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import Alert from '../utils/alert';

export default function CreateOrphanage() {
    const history = useHistory();

    const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [instructions, setInstructions] = useState('');
    const [opening_hours, setOpeningHours] = useState('');
    const [open_on_weekends, setOpenOnWeekends] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    
    function handleMapClick(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng;

        setCoordinates({
            latitude: lat,
            longitude: lng,
        });
    }

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if(!event.target.files) {
            return;
        }

        const selectedImages = Array.from(event.target.files);

        setImages(selectedImages);

        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image);
        });

        setPreviewImages(selectedImagesPreview);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        
        const { latitude, longitude } = coordinates;

        if(name === '' || about === '' || latitude === 0 || longitude === 0 || instructions === '' || opening_hours === '' ) {
            return Alert('Preencha todos os campos!', 'warning', true);
        }

        const data = new FormData();

        data.append('name', name);
        data.append('about', about);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('instructions', instructions);
        data.append('opening_hours', opening_hours);
        data.append('open_on_weekends', String(open_on_weekends));

        images.forEach(image => {
            data.append('images', image);
        });

        await api.post('orphanages', data);
   
        Alert('Seu orfanato foi cadastrado com sucesso!', 'success', false);

        history.push('/show-orphanages');
    }

    return (
        <div id="create-orphanage-page">
            <SideBar />

            <main>
                <form onSubmit={handleSubmit} className="create-orphanage-form">
                    <fieldset>
                        <legend>Dados</legend>

                        <Map 
                            center={[-7.139762,-34.844131]} 
                            style={{ width: '100%', height: 280 }}
                            zoom={13}
                            onClick={handleMapClick}
                        >
                            <TileLayer 
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
                            />
                            
                            {coordinates.latitude !== 0 && (
                                <Marker interactive={false} icon={mapIcon} position={[coordinates.latitude, coordinates.longitude]} />
                            )}
                            
                        </Map>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input id="name" value={name} onChange={event => setName(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea id="about" value={about} onChange={event => setAbout(event.target.value)} maxLength={300} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>

                            <div className="images-container">
                                {previewImages.map(image => {
                                    return (
                                        <img key={`${Date.now()}_${image}}`} src={image} alt={name} />
                                    );
                                })}

                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                            </div>
                            <input hidden draggable="true" multiple onChange={handleSelectImages} type="file" id="image[]" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">Horário de funcionamento</label>
                            <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">Atende fim de semana</label>

                            <div className="button-select">
                                <button 
                                    type="button" 
                                    className={open_on_weekends ? 'active': ''}
                                    onClick={() => setOpenOnWeekends(true)}
                                >
                                    Sim
                                </button>
                                <button 
                                    type="button"
                                    className={!open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(false)}
                                >
                                    Não
                                </button>
                            </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
            Confirmar
                    </button>
                </form>
            </main>
        </div>
    );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
