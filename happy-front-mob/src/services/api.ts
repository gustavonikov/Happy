import axios from 'axios';

const api = axios.create({
    // put your ip here
    baseURL: 'http://192.168.1.107:8080',
});

export default api;
