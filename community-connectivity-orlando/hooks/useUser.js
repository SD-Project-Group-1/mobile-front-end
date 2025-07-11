import { useState, useEffect } from 'react';
import { userAPI } from '../api/user';
import { router } from 'expo-router';

//I love this name...
export const useUser = (redirectOnError = '/+not-found') => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            setLoading(true);
            setError(null);
            const userData = await userAPI.getCurrentUser();
            setUser(userData.user);
        } catch (err) {
            console.error('Failed to load user:', err);
            setError(err);
            if (redirectOnError) {
                router.push(redirectOnError);
            }
        } finally {
            setLoading(false);
        }
    };

    //BONUS!
    const refreshUser = async () => {
        await loadUser();
    };

    return {
        user,
        loading,
        error,
        refreshUser
    };
};