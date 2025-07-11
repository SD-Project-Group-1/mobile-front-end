import api from './index';

// Location API
export const locationAPI = {
    // Get all locations with optional params
    async getAllLocations(params = {}) {
        try {
            const queryString = Object.keys(params).length
                ? '?' + new URLSearchParams(params).toString()
                : '';
            const res = await api.get(`/locations${queryString}`);
            return res.data;
        } catch (error) {
            console.error('getAllLocations error:', error?.message || 'Failed to fetch locations.');
            throw error;
        }
    },
    // For a single location
    async getLocationById(locationId) {
        try {
            const res = await api.get(`/locations/${locationId}`);
            return res.data;
        } catch (error) {
            console.error('getLocationById error:', error?.message || 'Failed to fetch a specific location.');
            throw error;
        }
    },
};

// Borrow API
export const borrowAPI = {
    // Test borrow API route
    async ping() {
        try {
            const res = await api.get('/borrow/ping');
            return res.data;
        } catch (error) {
            console.error('ping error:', error?.message || 'Failed to ping the borrow API.');
            throw error;
        }
    },
    // New borrow request (borrowData likely includes the deviceId and userId)
    async borrowDevice(borrowData) {
        try {
            const res = await api.post('/borrow/create', borrowData);
            return res.data;
        } catch (error) {
            console.error('borrowDevice error:', error?.message || 'Failed to create a new borrow request.');
            throw error;
        }
    },
    // Get borrow record by borrowId
    async getBorrowById(borrowId) {
        try {
            const res = await api.get(`/borrow/${borrowId}`);
            return res.data;
        } catch (error) {
            console.error('getBorrowById error:', error?.message || 'Failed to get a specific borrow record.');
            throw error;
        }
    },

    // Get a specific borrow record for a user by userId
    async getBorrowsUserId(userId) {
        try {
            const res = await api.get(`/borrow/user/${userId}`);
            return res.data;
        } catch (error) {
            console.error('getBorrowsUserId error:', error?.message || 'Failed to get borrow records for a specific user.');
            throw error;
        }
    },
};