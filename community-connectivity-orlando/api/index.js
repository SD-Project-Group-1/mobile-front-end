import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

// console.log('Constants.expoConfig.extra.API_BASE_URL =', Constants.expoConfig.extra.API_BASE_URL);
const API_baseURL = Constants.expoConfig.extra.URL;
const API_authURL = Constants.expoConfig.extra.AUTH_URL;

//console.log('API_baseURL =', API_baseURL);
// Create axios instance with base URL and timeout
const api = axios.create({
    baseURL: API_baseURL,
    timeout: 10000,
});

// Create axios instance with base URL and timeout for password reset
const auth = axios.create({
    baseURL: API_authURL,
    timeout: 10000,
});

// Add token to headers if it exists
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle response errors
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401) {
            await SecureStore.deleteItemAsync('token');
        }
        return Promise.reject(error);
    }
);

export default api;
export { auth };