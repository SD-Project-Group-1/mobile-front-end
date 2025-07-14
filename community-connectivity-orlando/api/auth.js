import api, { auth } from './index';
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

    // Reset password request (sends email with reset link)
    async resetPasswordRequest(email) {
        try {
            //console.log('reset password request URL:', auth.defaults.baseURL + '/request-reset');
            //console.log('User email:', email);
            const res = await auth.post('/request-reset', { email });
            //console.log('Backend response:', res.data);
            return res.data;
        } catch (error) {
            console.error('resetPassword error:', error?.message || 'Failed to reset password.');
            throw error;
        }
    },

    // Reset password request (sends email with reset link)
    async resetPassword(passwordData) {
        try {
            const res = await auth.post('/reset-password', passwordData);
            const { token } = res.data;
            if (token) {
                await SecureStore.setItemAsync('token', token);
            }
            return res.data;
        } catch (error) {
            console.error('resetPassword error:', error?.message || 'Failed to reset password.');
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