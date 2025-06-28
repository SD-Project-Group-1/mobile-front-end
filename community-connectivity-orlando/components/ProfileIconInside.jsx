import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {Colors} from "../constants/Colors";
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
        width: 100,
        height: 100,
        alignItems: 'center',
    },
    icon: {
        backgroundColor: '#fff',
        height: 90,
        width: 90,
        borderRadius: 90 / 2,
    },
    iconButton: {
        position: 'absolute',
        bottom: 5,
        right: 3,
        backgroundColor: Colors.button.default,
        height: 32,
        width: 32,
        borderRadius: 32 / 2,
        borderWidth: 2,
        borderColor: Colors.button.text,
    },
});