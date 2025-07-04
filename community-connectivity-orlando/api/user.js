import api from './index';

export const userAPI = {
    // Get current user
    async getCurrentUser() {
        const res = await api.get('/me');
        return res.data;
    }
};