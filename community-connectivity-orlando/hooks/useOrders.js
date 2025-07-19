import {useEffect, useState} from "react";
import {borrowAPI} from "../api/request";

export const useOrders = (userId) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadOrders = async () => {
        if (!userId) return;
        
        try {
            setLoading(true);
            setError(null);
            //console.log("Fetching borrowed history for user:", userId);
            const response = await borrowAPI.getBorrowsUserId(userId);

            setOrders(response);
            //console.log(`Found ${response.length} records for user ${userId}`);
        } catch (err) {
            console.error('Failed to load orders:', userId);
            console.error('Failed to load orders:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const refreshOrders = async () => {
        if (!userId) return;
        
        try {
            const response = await borrowAPI.getBorrowsUserId(userId);
            setOrders(response);
            setError(null);
            //console.log(`Refreshed: Found ${response.length} records for user ${userId}`);
            return response;
        } catch (err) {
            //console.error('Refresh error:', err);
            setError(err);
            throw err;
        }
    };

    useEffect(() => {
        loadOrders();
    }, [userId]);

    return {
        orders,
        loading,
        error,
        refreshOrders
    };
};