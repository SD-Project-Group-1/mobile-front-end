import api from './index';

export const locationAPI = {
    // Get all locations
    async getAllLocations() {
        return await api.get('/locations');
    },
    // For a single location
    async getLocationById(locationId) {
        return await api.get(`/locations/${locationId}`);
    },
};

export const deviceAPI = {
    // Get details about a specific device
    async getDeviceById(deviceId) {
        return await api.get(`/devices/${deviceId}`);
    },
    // Get all devices
    async getAllDevices() {
        const res = await api.get('/devices');
        return res.data;
    },
};

export const borrowAPI = {
    // Borrow a device
    async borrowDevice(deviceId, userId) {
        return await api.post('/borrow', { deviceId, userId });
    },

    // Return a device
    async returnDevice(borrowId) {
        return await api.post('/borrow/return', { borrowId });
    },

    // Get borrowed devices for a user
    async getBorrowedHistory(userId) {
        return await api.get(`/borrow/user/${userId}`);
    },
};