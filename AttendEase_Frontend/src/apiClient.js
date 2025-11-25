import axios, { AxiosHeaders } from 'axios'

export const apiClient = axios.create({
    baseURL:'http://localhost:8081',
})