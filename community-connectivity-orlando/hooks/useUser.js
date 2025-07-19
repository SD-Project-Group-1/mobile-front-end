import { useState, useEffect } from 'react';
import { userAPI } from '../api/user';
import { router } from 'expo-router';

//I love this name...
export const useUser = (redirectOnError = '/+not-found') => {
    const [user, setUser] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
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
            const userProfile = await userAPI.getUserProfile(userData.user.id);
            setUser(userData.user);
            setIsVerified(userProfile.is_verified);
            //console.log('isVerified in useUser', isVerified);
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
        isVerified,
        loading,
        error,
        refreshUser
    };
};