import api from './index';
import * as SecureStore from 'expo-secure-store';

export const authAPI = {
    // Login user
    async login(email, password) {
        try {
            const res = await api.post('/user/signin', { email, password });
            const { token, userPayload } = res.data;
            await SecureStore.setItemAsync('token', token);
            return { token, user: userPayload };
        } catch (error) {
            console.error('login error:', error?.message || 'Failed to login.');
            throw error;
        }
    },

    // Signup user
    async signup(userData) {
        try {
            const res = await api.post('/user/create', userData);
            return res.data;
        } catch (error) {
            console.error('signup error:', error?.message || 'Failed to sign up.');
            throw error;
        }
    },

    // Sign out user
    async signout() {
        try {
            await api.post('/signout');
            await SecureStore.deleteItemAsync('token');
        } catch (error) {
            console.error('signout error:', error?.message || 'Failed to sign out.');
            throw error;
        }
    },

    // Get token
    async getToken() {
        return await SecureStore.getItemAsync('token');
    },
};