import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function YourInfo() {
    return (
        <View style={styles.container}>
            <Text>YourInfo Component</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
});