import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PreviousOrders() {
    return (
        <View style={styles.container}>
            <Text>PreviousOrders Component</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
});