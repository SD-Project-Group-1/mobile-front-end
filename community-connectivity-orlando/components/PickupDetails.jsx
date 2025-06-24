import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PickupDetails() {
    return (
        <View style={styles.container}>
            <Text>PickupDetails Component</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
});