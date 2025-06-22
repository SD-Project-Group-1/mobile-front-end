import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileIconInside() {
    return (
            <View style={styles.container}>
                <View style={styles.icon}/>
                <TouchableOpacity style={styles.iconButton}/>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginTop: 5,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginTop: 5,
        backgroundColor: '#fff',
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    iconButton: {
        position: 'absolute',
        bottom: -4,
        right: -7,
        backgroundColor: '#FFD700',
        height: 35,
        width: 35,
        borderRadius: 17.5,
        alignItems: 'center',
    },
});