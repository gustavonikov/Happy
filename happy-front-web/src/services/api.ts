import axios from 'axios';

const api = axios.create({
    // If you are using this app for development, change to http://localhost:8080
    baseURL: 'happy-backend-nikov.herokuapp.com',
})

export default api;
