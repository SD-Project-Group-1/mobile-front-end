import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Colors} from "../constants/Colors";

export default function PickupDetails() {
    return (
        <View style={styles.container}>
            <View style={styles.pickupDetails}>
                <Text style={styles.title}>Pickup details:</Text>
                <Text style={styles.carryoutLocation}>10002 University Blvd, Orlando, FL 32817</Text>
                <Text style={styles.carryoutDetails}>Carryout at
                    <Text style={styles.carryoutDate}> May 10, 2025  2:30 PM</Text>
                </Text>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.default.border,
    },
    title: {
        color: Colors.default.titlesSelected,
        fontSize: 20,
        marginBottom: 10,
    },
    pickupDetails: {
        paddingVertical: 15,
        paddingHorizontal: 19
    },
    carryoutLocation: {
        color: Colors.default.textWhite,
        fontSize: 14,
        marginBottom: 10,
    },
    carryoutDetails: {
        color: Colors.default.textWhite,
        fontSize: 14,
    },
    carryoutDate: {
        color: Colors.default.titlesSelected,
    }
});