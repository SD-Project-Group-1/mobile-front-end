import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Colors} from "../constants/Colors";

export default function OrderStatus({ hasOngoingOrder, orderData}) {
    if (hasOngoingOrder) {
        return (
            <View style={styles.container}>


            </View>
        );
    }

    return (
        <View style={styles.container}>
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
    container: {
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
    }
    });