import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Colors} from "../constants/Colors";

export default function PreviousOrder({ user, orders }) {
    
    const previousOrders = (orders || []).filter(order =>
        ["Cancelled", "Checked_in", "Late"].includes(order.borrow_status)
    );

    if (previousOrders && previousOrders.length > 0) {
        return (
            <View>
                {previousOrders?.map((order) => (
                    <View key={order.borrow_id} style={styles.orderCard}>
                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <Text style={styles.headerLabel}>ORDER PLACED:</Text>
                                <Text style={styles.headerValue}>{order.borrow_date.slice(0, 10)}</Text>
                            </View>
                            <View style={styles.headerRight}>
                                <Text style={styles.headerLabel}>ORDER #:</Text>
                                <Text style={styles.headerValue}>{order.borrow_id}</Text>
                            </View>
                        </View>

                        <View style={styles.OrderStatus}>
                            <Text style={styles.statusText}>
                                {order.borrow_status === "Cancelled" 
                                    ? "Order Cancelled"
                                    : order.borrow_status === "Late"
                                    ? `Returned Late (${new Date(order.return_date).toLocaleString('default', {
                                        month: 'long',
                                        day: '2-digit',
                                        year: 'numeric'
                                    })})`
                                    : `Returned ${new Date(order.return_date).toLocaleString('default', {
                                        month: 'long',
                                        day: '2-digit',
                                        year: 'numeric'
                                    })}`
                                }
                            </Text>
                            <Text style={styles.deviceInfo}>
                                Device Name: {order.device ? `${order.device.brand || ''} ${order.device.make || ''} ${order.device.model || ''}`.trim() : 'Device name not available'}
                            </Text>
                            <Text style={styles.deviceInfo}>Device ID: {order.device_id}</Text>
                        </View>

                        <View style={styles.OrderInformation}>
                            <View style={styles.leftSection}>
                                <Text style={styles.reasonLabel}>Reason: {order.reason_for_borrow}</Text>
                                <Text style={styles.returnedToLabel}>Returned to:</Text>
                                <Text style={styles.address}>{order.device?.location?.location_nickname || order.device_location || 'Location not available'}</Text>
                            </View>
                            <View style={styles.rightSection}>
                                <Text style={styles.lateLabel}>Late?:</Text>
                                <Text style={styles.lateValue}>
                                    {order.borrow_status === "Late" ? "Yes" : "No"}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        );
    }

    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
                No previous orders found.
            </Text>
        </View>

    );

}

const styles = StyleSheet.create({
    orderCard: {
        backgroundColor: Colors.default.secondary,
        borderRadius: 5,
        marginBottom: 9,
        borderColor: Colors.default.border,
        borderWidth: 1,
        marginHorizontal: 15,
        minHeight: 311,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.default.border,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    headerLabel: {
        fontSize: 12,
        color: Colors.default.textWhite,
        fontWeight: 'bold',
    },
    headerValue: {
        fontSize: 14,
        color: Colors.default.textWhite,
        marginTop: 2,
    },
    OrderStatus: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.default.border,
    },
    statusText: {
        fontSize: 18,
        color: Colors.default.titlesSelected,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    deviceInfo: {
        fontSize: 14,
        color: Colors.default.textWhite,
        marginBottom: 4,
    },
    OrderInformation: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    leftSection: {
        flex: 1,
    },
    rightSection: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 70,
        marginTop: 25,
    },
    reasonLabel: {
        fontSize: 14,
        color: Colors.default.textWhite,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    returnedToLabel: {
        fontSize: 14,
        color: Colors.default.textWhite,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    address: {
        fontSize: 14,
        color: Colors.default.textWhite,
        marginBottom: 2,
    },
    lateLabel: {
        fontSize: 14,
        color: Colors.default.textWhite,
        fontWeight: 'bold',
    },
    lateValue: {
        fontSize: 14,
        color: Colors.default.titlesSelected,
        fontWeight: 'bold',
    },
    emptyContainer: {
        height: 69,
        backgroundColor: Colors.default.secondary,
        borderRadius: 5,
        marginBottom: 9,
        borderColor: Colors.default.border,
        borderWidth: 1,
        marginHorizontal: 15,
        justifyContent: 'center',
    },
    emptyText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.default.link,
        textAlign: 'center',
    },
});