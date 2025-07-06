import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileIconInside from './ProfileIconInside';
import { Colors } from "../constants/Colors";
import { userAPI } from '../api/user';

export default function UserInfoPanel({ profilePic }) {

    // User profile data
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthdate: '',
        address: '',
        email: ''
    });

     // Retrieves user profile data
     useEffect(() => {
        userProfile();
    }, []);

    // Retrieves user profile from API
    const userProfile = async () => {
        try {
            // Get current user profile
            const userProfileID = await userAPI.getCurrentUser();
            
            // Formats the data
            const profileData = {
                firstName: userProfileID.user.first_name || '',
                lastName: userProfileID.user.last_name || '',
                userID: userProfileID.user.id || '',
                address: addressField(userProfileID.user),
                phoneNumber: userProfileID.user.phone || '',
                email: userProfileID.user.email || ''
            };
            
            setUserData(profileData);
            
        } catch (error) {
            console.error('Error getting user profile information:', error);
        }
    };

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

    return (
        // User info panel
        <View style={styles.container}>
            <ProfileIconInside 
                profilePic={profilePic} 
                firstName={userData.firstName} 
            />
            <Text style={styles.title}>{userData.firstName} {userData.lastName}</Text>
            <Text style={styles.text}>User ID: {userData.userID}</Text>
            <Text style={styles.text}>{userData.address}</Text>
            <Text style={styles.text}>{userData.phoneNumber}</Text>
            <Text style={styles.text}>{userData.email}</Text>
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