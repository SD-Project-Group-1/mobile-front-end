import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Colors} from "../constants/Colors";
import Button from '../components/ui/Button';

export default function OrderStatus({ hasOngoingOrder }) {
    if (hasOngoingOrder) {
        return (
            <View style={styles.container}>
                {/* Again this is static but, adding variables should be easy, I've already added some... */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.headerLabel}>ORDER PLACED:</Text>
                        <Text style={styles.headerValue}>05/08/2025</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.headerLabel}>ORDER #:</Text>
                        <Text style={styles.headerValue}>123456789</Text>
                    </View>
                </View>
                <View style={styles.OrderStatus}>
                    <Text style={styles.returnText}>Return by May 17</Text>
                    <Text style={styles.statusInfo}>Status: Checked out by you on</Text>
                    <Text style={styles.orderInfo}>May 10, 2025 2:30 PM.</Text>
                    <Text style={styles.deviceInfo}>Device ID: 1234567890</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Button
                        title="Cancel Order"
                        onPress={() => console.log('Left pressed')}
                        style={styles.flexButton}
                        textStyle={{
                            fontSize: 10,
                            fontWeight: 'bold',
                        }}
                    />

                    <Button
                        title="Device Support"
                        onPress={() => console.log('Return pressed')}
                        style={styles.flexButton}
                        textStyle={{
                            fontSize: 10,
                            fontWeight: 'bold',
                        }}
                    />

                    <Button
                        title="Return Device"
                        onPress={() => console.log('Report pressed')}
                        style={styles.flexButton}
                        textStyle={{
                            fontSize: 10,
                            fontWeight: 'bold',
                        }}
                    />

                </View>
            </View>
        );
    }

    return (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyOrder}>
                <Text style={styles.emptyText}>
                    Ain't Nobody Here but Us Chickens!
                </Text>
            </View>
            <View style={styles.emptyOrderStatus}>
                <Text style={styles.emptyStatus}>
                    Status:
                    No on-going orders present.
                </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        height: 69,
        backgroundColor: Colors.default.secondary,
        borderRadius: 5,
        marginBottom: 9,
        borderColor: Colors.default.border,
        borderWidth: 1,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    emptyText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.default.link,
        textAlign: 'center',
    },
    emptyStatus: {
        fontSize: 15,
        color: Colors.default.textWhite,
        textAlign: 'center',
    },
    emptyOrder: {
        flex: 2,
        justifyContent: 'center',
    },
    emptyOrderStatus: {
        flex: 1,
        borderColor: Colors.default.border,
        borderLeftWidth: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.default.secondary,
        borderRadius: 5,
        marginBottom: 9,
        borderColor: Colors.default.border,
        borderWidth: 1,
        marginHorizontal: 15,
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
    returnText: {
        fontSize: 18,
        color: Colors.default.titlesSelected,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    statusInfo: {
        fontSize: 14,
        color: Colors.default.textWhite,
    },
    orderInfo: {
        fontSize: 14,
        color: Colors.default.titlesSelected,
        marginBottom: 4,
    },
    deviceInfo: {
        fontSize: 14,
        color: Colors.default.textWhite,
    },
    userPanel: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.default.border,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    flexButton: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    });