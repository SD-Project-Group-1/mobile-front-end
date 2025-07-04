import api from './index';
import * as SecureStore from 'expo-secure-store';

export const authAPI = {
    // Login user
    async login(email, password) {
        const res = await api.post('/user/signin', { email, password });
        const { token, userPayload } = res.data;
        await SecureStore.setItemAsync('token', token);
        return { token, user: userPayload };
    },

    // Signup user
    async signup(userData) {
        const res = await api.post('/user/create', userData);
        return res.data;
    },

    // Logout user
    async logout() {
        await api.post('/signout');
        await SecureStore.deleteItemAsync('token');
    },

    // Get token
    async getToken() {
        return await SecureStore.getItemAsync('token');
    }
};