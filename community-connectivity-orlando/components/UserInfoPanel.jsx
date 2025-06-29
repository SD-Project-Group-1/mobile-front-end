import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileIconInside from './ProfileIconInside';
import { Colors } from "../constants/Colors";

export default function UserInfoPanel({ profilePic, id, firstName, lastName, phoneNumber, address, email, verify }) {
    return (
        // User info panel
        <View style={styles.container}>
            <ProfileIconInside 
                profilePic={profilePic} 
                firstName={firstName} 
            />
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
        padding: 17,
        margin: 16,
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 18,
        color:Colors.default.titlesSelected,
    },
    text: {
        fontFamily: 'InstrumentSans',
        fontSize: 12,
        color: Colors.default.textWhite,
        marginTop: 10,
    }
});