import axios from 'axios';

let AxiosConfig = axios.create({
  baseURL: 'http://localhost:8351//',
  // Prostor za dodatnu konfiguraciju
});

export default AxiosConfig;