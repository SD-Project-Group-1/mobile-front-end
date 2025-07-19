import api from './index';
import * as SecureStore from 'expo-secure-store';

export const userAPI = {
    // Get current user
    async getCurrentUser() {
        try {
            const res = await api.get('/me');
            return res.data;
        } catch (error) {
            console.error('getCurrentUser error:', error?.message || 'Failed to get current user.');
            throw error;
        }
    },
    
    // Get specific user profile by ID
    async getUserProfile(userId) {
        try {
            const res = await api.get(`/user/get/${userId}`);
            return res.data;
        } catch (error) {
            console.error('getUserProfile error:', error?.message || 'Failed to get a specific user profile.');
            throw error;
        }
    },

    // Update user profile
    async updateUserProfile(userId, userData) {
        try {
            const res = await api.patch(`/user/update/${userId}`, userData);
            return res.data;
        } catch (error) {
            console.error('updateUserProfile error:', error?.message || 'Failed to update user profile.');
            throw error;
        }
    },
    
    // Delete user account
    async deleteUser(userId) {
        try {
            const res = await api.delete(`/user/delete/${userId}`);
            await SecureStore.deleteItemAsync('token');
            return res.data;
        } catch (error) {
            console.error('deleteUser error:', error?.message || 'Failed to delete user account.');
            throw error;
        }
    },
};