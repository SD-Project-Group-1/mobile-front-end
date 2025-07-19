import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileIconInside from './ProfileIconInside';
import { Colors } from "../constants/Colors";

export default function UserInfoPanel({ user, isVerified, profilePic, loading }) {

    // Show loading state if user data is still loading
    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    // Appends address in one field
    const addressField = (user) => {
        const fields = [
            user.street_address,
            user.city,
            user.state,
            user.zip_code
        ]
        return fields.join(', ');
    };

    // User profile data format
    const profileData = {
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        userID: user.id || '',
        address: addressField(user),
        phoneNumber: user.phone || '',
        email: user.email || '',
        is_verified: isVerified ? 'Age Verified' : 'Age Not Verified',
    };
    console.log('profileData.is_verified', profileData.is_verified)

    return (
        // User info panel
        <View style={styles.container}>
            <ProfileIconInside 
                profilePic={profilePic} 
                firstName={profileData.firstName} 
            />
            <Text style={styles.title}>{profileData.firstName} {profileData.lastName}</Text>
            <Text style={styles.text}>User ID: {profileData.userID}</Text>
            <Text style={styles.text}>{profileData.address}</Text>
            <Text style={styles.text}>{profileData.phoneNumber}</Text>
            <Text style={styles.text}>{profileData.email}</Text>
            <Text style={styles.text}>{profileData.is_verified}</Text>
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
        margin: 3,
        marginTop: 16,
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