import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import {router} from "expo-router";


export default function ProfileIconHome() {
    return (
        <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
                router.push('/profile');
            }}
        >
            <Image
                source={require('../assets/images/icon.png')}
                style={styles.profileImage}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: 1,
        backgroundColor: 'transparent',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
