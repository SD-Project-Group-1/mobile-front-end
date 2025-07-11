import {useEffect, useState} from "react";
import {borrowAPI} from "../api/request";

export const useOrders = (userId) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userId) {
            loadOrders();
        }
    }, [userId]);

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("Fetching borrowed history for user:", userId);
            const response = await borrowAPI.getBorrowsUserId(userId);

            setOrders(response.data);
            console.log(`Found ${response.data.length} records for user ${userId}`);


            response.data.forEach(order => {
                console.log(`Order placed: ${order.borrow_date}, Return date: ${order.return_date}`);
            });

        } catch (err) {
            console.error('Failed to load orders:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const refreshOrders = async () => {
        if (userId) {
            await loadOrders();
        }
    };

    return {
        orders,
        loading,
        error,
        refreshOrders
    };
};