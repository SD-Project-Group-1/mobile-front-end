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
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginTop: 5,
        backgroundColor: '#fff',
        height: 90,
        width: 90,
        borderRadius: 90 / 2,
    },
    iconButton: {
        position: 'absolute',
        bottom: -2,
        right: 4,
        backgroundColor: Colors.button.default,
        height: 32,
        width: 32,
        borderRadius: 32 / 2,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.button.text,
    },
});