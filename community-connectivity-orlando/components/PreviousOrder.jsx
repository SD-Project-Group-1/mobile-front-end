import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Colors} from "../constants/Colors";

export default function PreviousOrder() {
    return (
        <View style={styles.container}>
            {/* Currently this is static but, adding variables should be easy... */}
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
                <Text style={styles.statusText}>Returned May 7, 2025</Text>
                <Text style={styles.deviceInfo}>Device Name: Dell latitude 3550</Text>
                <Text style={styles.deviceInfo}>Device ID: 1234567890</Text>
            </View>
            <View style={styles.OrderInformation}>
                <View style={styles.leftSection}>
                    <Text style={styles.reasonLabel}>Reason: School</Text>
                    <Text style={styles.returnedToLabel}>Returned to:</Text>
                    <Text style={styles.address}>10002 University Blvd</Text>
                    <Text style={styles.address}>Orlando, FL 32817</Text>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.lateLabel}>Late?:</Text>
                    <Text style={styles.lateValue}>No</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 311,
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
});