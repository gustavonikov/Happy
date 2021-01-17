import axios from 'axios';

const api = axios.create({
    // If you are using this app for development, change to http://localhost:8080
    baseURL: 'https://proffy-v2-backend-git-master.gustavonikov.vercel.app',
})

export default api;
