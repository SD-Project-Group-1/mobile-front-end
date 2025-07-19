import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { router } from "expo-router";
import { useUser } from '../hooks/useUser';
import { Colors } from '../constants/Colors';

export default function ProfileIconHome() {
    const { user } = useUser();
    
    return (
        <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
                router.push('/profile');
            }}
        >
            <View style={styles.profileIcon}>
                <Text style={styles.profileText}>
                    {user?.first_name ? user.first_name.charAt(0).toUpperCase() : ''}
                </Text>
            </View>
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
    profileIcon: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: "#D9D9D9",
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.default.textBlack,
    },
});
