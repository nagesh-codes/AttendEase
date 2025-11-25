import axios, { AxiosHeaders } from 'axios'

const backend_url = import.meta.env.VITE_BACKEND_URL;
export const apiClient = axios.create({
    baseURL: backend_url,
})