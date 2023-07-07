import { API_URL, JWT_SECRET } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
    baseURL: API_URL,
});


API.interceptors.request.use(
    async (config) => {
        const sessionId = await AsyncStorage.getItem('sessionId') ?? '';
        config.headers.Authorization = `Bearer ${JWT_SECRET}`;
        config.headers.sessionId = sessionId;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;