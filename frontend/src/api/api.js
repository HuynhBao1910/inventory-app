import axios from "axios";

const api = axios.create({
    baseURL: "https://inventory-app-production-8cdf.up.railway.app"
});

export default api;