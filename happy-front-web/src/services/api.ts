import axios from 'axios';

const api = axios.create({
    // If you are using this app for development, change to http://localhost:8080
    baseURL: 'http://localhost:8080',
})

export default api;
