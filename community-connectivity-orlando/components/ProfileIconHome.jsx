import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileIconHome() {
    return (
        <View style={styles.container}>
            <Text>ProfileIconHome Component</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
});