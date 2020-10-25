import Leaflet from 'leaflet';

import localImg from '../images/Local.svg';

const mapIcon = Leaflet.icon({
    iconUrl: localImg,
    iconSize: [48, 58],
    iconAnchor: [24, 58],
    popupAnchor: [170, 2]
});

export default mapIcon;