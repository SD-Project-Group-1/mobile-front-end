import api from './index';

export const userAPI = {
    // Get current user
    async getCurrentUser() {
        const res = await api.get('/me');
        return res.data;
    },
    
    // Get specific user profile by ID
    async getUserProfile(userId) {
        const res = await api.get(`/user/get/${userId}`);
        return res.data;
    },

    // Update user profile
    async updateUserProfile(userData) {
        const res = await api.patch('/user/update', userData);
        return res.data;
    },
    
    // Delete user account
    async deleteUser(userId) {
        const res = await api.delete(`/user/delete/${userId}`);
        return res.data;
    },

    // Reset password
    async resetPassword(passwordData) {
        const res = await api.post('/user/reset', passwordData);
        return res.data;
    }
};