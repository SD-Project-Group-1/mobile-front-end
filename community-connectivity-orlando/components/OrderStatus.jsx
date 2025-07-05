import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Colors} from "../constants/Colors";
import Button from '../components/ui/Button';
import Modal from "./ui/Modal";

export default function OrderStatus() {

    const [hasActiveCheckout] = useState(false);
    const [hasOngoingOrder, setHasOngoingOrder] = useState(true);


    const [cancelOrderModal, setCancelOrderModal] = useState(false);
    const [confirmCancelModal, setConfirmCancelModal] = useState(false);
    const [deviceSupportModal, setDeviceSupportModal] = useState(false);
    const [returnDeviceModal, setReturnDeviceModal] = useState(false);


    const handleConfirmCancel = () => {
        setCancelOrderModal(false);
        setConfirmCancelModal(true);
    };

    const closeModal = () => {
        setConfirmCancelModal(false);
        if (!hasActiveCheckout) {
            setHasOngoingOrder(false);
        }
    };

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
                        onPress={() => setCancelOrderModal(true)}
                        style={styles.flexButton}
                        textStyle={{
                            fontSize: 10,
                            fontWeight: 'bold',
                        }}
                    />

                    <Button
                        title="Device Support"
                        onPress={() => setDeviceSupportModal(true)}
                        style={styles.flexButton}
                        textStyle={{
                            fontSize: 10,
                            fontWeight: 'bold',
                        }}
                    />

                    <Button
                        title="Return Device"
                        onPress={() => setReturnDeviceModal(true)}
                        style={styles.flexButton}
                        textStyle={{
                            fontSize: 10,
                            fontWeight: 'bold',
                        }}
                    />


                    {/* Large Modal for cancel order */}
                    <Modal
                        visible={cancelOrderModal}
                        size="large"
                        title="Are you sure you want to cancel your order?"
                        message="This action cannot be undone."
                        onConfirm={handleConfirmCancel}
                        onCancel={() => setCancelOrderModal(false)}
                        onClose={() => setCancelOrderModal(false)}
                        setTime={3000}
                    />

                    {/* Regular Model for cancelling order success or error */}
                    <Modal
                        visible={confirmCancelModal}
                        size="regular"
                        title={hasActiveCheckout ? "Error: Your order cannot be cancelled!" : "Success"}
                        message={hasActiveCheckout ? "You are currently in possession of a borrowed device."
                            : "Your order has been cancelled."}
                        onClose={closeModal}
                        setTime={3000}
                    />

                    {/* Regular Modal for device support */}
                    <Modal
                        visible={deviceSupportModal}
                        size="regular"
                        title={"Info: If you are encountering device issues\n" +
                            "contact the number below:"}
                        message={"(407) 574-7177 \n" +
                            "Availability only on Weekdays from 11:30 AM-10:30 PM"}
                        onClose={() => setDeviceSupportModal(false)}
                        setTime={5000}
                    />

                    {/* Regular Modal for return device */}
                    <Modal
                        visible={returnDeviceModal}
                        size="regular"
                        title={"Info: Return the device to the following address:"}
                        message={"10002 University Blvd, Orlando, FL 32817\n" +
                            "Open only on Weekdays from 11:30 AM-10:30 PM"}
                        onClose={() => setReturnDeviceModal(false)}
                        setTime={5000}
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
        height: 100,
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