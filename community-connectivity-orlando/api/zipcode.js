import api from './index';

// Zipcode API
export const zipcodeAPI = {
    // Check if zipcode is within service range
    async checkZipcode(zipcode) {
        try {
            const response = await api.post('/zipcode/check', { 
                zip_code: zipcode 
            });
            return response.data;
        } catch (error) {
            console.error('checkZipcode error:', error?.message || 'Failed to check if zipcode is within service range.');
            throw error;
        }
    },
};
