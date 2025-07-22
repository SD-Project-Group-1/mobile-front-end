import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import {Colors} from "../constants/Colors";
import Button from '../components/ui/Button';
import Modal from "./ui/Modal";
import {borrowAPI} from "../api/request";

export default function OrderStatus({ user, orders, refreshOrders, onActiveOrderFound }) {

    const activeOrder = (orders || []).find(order =>
        ["Submitted", "Scheduled", "Checked_out"].includes(order.borrow_status)
    );


    useEffect(() => {
        if (activeOrder) {
            onActiveOrderFound(true);
        } else {
            onActiveOrderFound(false);
        }
    }, [orders]);


    const [cancelOrderModal, setCancelOrderModal] = useState(false);
    const [confirmCancelModal, setConfirmCancelModal] = useState(false);
    const [deviceSupportModal, setDeviceSupportModal] = useState(false);
    const [returnDeviceModal, setReturnDeviceModal] = useState(false);
    const [cancelling, setCancelling] = useState(false);


    const handleConfirmCancel = () => {
        setCancelOrderModal(false);
        setConfirmCancelModal(true);
    };

    const closeModal = async () => {
        setConfirmCancelModal(false);
        
        if (activeOrder?.borrow_status === "Submitted") {
            try {
                setCancelling(true);
                
                await borrowAPI.cancelRequest(activeOrder.borrow_id);
                
                await refreshOrders();
                onActiveOrderFound(false);
                
            } catch (error) {
                console.error('Failed to cancel order:', error);
            } finally {
                setCancelling(false);
            }
        }
    };

    if (activeOrder) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.headerLabel}>ORDER PLACED:</Text>
                        <Text style={styles.headerValue}>{new Date(activeOrder.borrow_date).toLocaleDateString('default', { 
                            month: 'long', 
                            day: '2-digit', 
                            year: 'numeric' })}
                        </Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.headerLabel}>ORDER #:</Text>
                        <Text style={styles.headerValue}>{activeOrder.borrow_id}</Text>
                    </View>
                </View>
                <View style={styles.OrderStatus}>
                        <Text style={styles.returnText}>
                            {activeOrder?.borrow_status === 'Submitted'
                                ? 'Pending Review'
                                : activeOrder?.borrow_status === 'Scheduled'
                                    ? 'Ready for Pickup'
                                    : `Return by ${new Date(activeOrder.return_date).toLocaleString('default', {
                                        month: 'long',
                                        day: '2-digit',
                                        year: 'numeric'
                                })}`}
                        </Text>

                    <Text style={styles.statusInfo}>Status: {activeOrder.borrow_status}</Text>
                    <Text style={styles.deviceInfo}>
                        Device: {activeOrder.device ? `${activeOrder.device.brand || ''} ${activeOrder.device.make || ''} ${activeOrder.device.model || ''}`.trim() : 'Device name not available'}
                    </Text>
                    <Text style={styles.deviceInfo}>Device ID: {activeOrder.device_id}</Text>
                    <Text style={[styles.deviceInfo, {marginTop: 10}, {fontWeight: 'bold'}]}>Pickup Location:</Text>
                    <Text style={styles.deviceInfo}>
                      {
                        activeOrder.device && activeOrder.device.location && activeOrder.device.location.location_nickname
                          ? activeOrder.device.location.location_nickname
                          : 'Location not available'
                      }
                    </Text>
                    <Text style={styles.deviceInfo}>
                      {
                        activeOrder.device && activeOrder.device.location && activeOrder.device.location.street_address
                          ? `${activeOrder.device.location.street_address}, ${activeOrder.device.location.city}, ${activeOrder.device.location.state} ${activeOrder.device.location.zip_code}`
                          : 'Address not available'
                      }
                    </Text>
                </View>
                <View style={styles.buttonRow}>
                    <Button
                        title={cancelling ? "Cancelling..." : "Cancel Order"}
                        onPress={() => setCancelOrderModal(true)}
                        disabled={cancelling || activeOrder?.borrow_status !== "Submitted"}
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
                        title={activeOrder?.borrow_status === "Checked_out"
                            ? "Error: Your order cannot be cancelled!"
                            : "Success"}
                        message={activeOrder?.borrow_status === "Checked_out"
                            ? "You are currently in possession of a borrowed device."
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
                        //Massive issue here every location probably has a phone number but, we don't have that...
                        message={"(407) 574-7177 \n" +
                            "Availability only on Weekdays from 11:30 AM-10:30 PM"}
                        onClose={() => setDeviceSupportModal(false)}
                        setTime={5000}
                    />

                    {/* Regular Modal for return device */}
                    <Modal
                        visible={returnDeviceModal}
                        size="regular"
                        title={activeOrder?.borrow_status === "Checked_out"
                            ? "Info: Return the device to the following address: "
                            : "Error: You don't have a device to return."}
                        message={activeOrder?.borrow_status === "Checked_out"
                            ? `${activeOrder.device?.location?.location_nickname || activeOrder.device_location || 'Address not available'}\n${activeOrder.device?.location?.street_address}, ${activeOrder.device?.location?.city}, ${activeOrder.device?.location?.state} ${activeOrder.device?.location?.zip_code}`
                            : "Your order suggests that your are not in possession of a device."
                        }
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
