import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileIconInside from './ProfileIconInside';
import { Colors } from "../constants/Colors";
export default function UserInfoPanel({ id, firstName, lastName, phoneNumber, address, email, verify}) {
    return (
        <View style={styles.container}>
            <ProfileIconInside />
            <Text style={styles.title}>{firstName} {lastName}</Text>
            <Text style={styles.text}>User ID: {id}</Text>
            <Text style={styles.text}>{address}</Text>
            <Text style={styles.text}>{phoneNumber}</Text>
            <Text style={styles.text}>{email}</Text>
            <Text style={styles.text}>{verify ? "Age Verified" : "Age Unverified"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.default.secondary,
        borderColor: Colors.default.border,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        margin: 16,
        height: 270,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 16,
        color:Colors.default.titlesSelected,
    },
    text: {
        fontFamily: 'InstrumentSans',
        fontSize: 11,
        color: Colors.default.textWhite,
        marginTop: 10,
    }
});