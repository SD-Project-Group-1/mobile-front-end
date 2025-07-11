import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Colors} from "../constants/Colors";
import Dropdown from '../components/ui/Dropdown';
import { userAPI } from '../api/user';


export default function YourInfo({ user }) {

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        id: ''
    });


    const devices = ['Mobile Hotspot', 'Laptop', 'Tablet'];
    const reasons = ['Job Search', 'School', 'Training', 'Other'];
    const [selectedReason, setSelectedReason] = useState('');
    const [selectedDevice, setSelectedDevice] = useState('');


    useEffect(() => {
        userProfile();
    }, []);


    const userProfile = async () => {
        try {
            // Get current user profile
            const currentUser = await userAPI.getCurrentUser();

            // Formats user profile data
            const profileData = {
                firstName: currentUser.user.first_name || '',
                lastName: currentUser.user.last_name || '',
                phoneNumber: currentUser.user.phone || '',
                id: currentUser.user.id || ''
            };

            // For debugging
            //console.log('Profile data with ID:', profileData.id);

            setUserData(profileData);
        } catch (err) {
            console.error('Error getting user profile information:', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your info: </Text>
            <Text style={styles.infoDetails}>Full Name</Text>
            <TextInput
                style={styles.textBox}
                value="Jane Shamne"
                editable={false}
            />
            <Text style={styles.infoDetails}>Phone number</Text>
            <TextInput
                style={styles.textBox}
                value="(407) 356-1234"
                editable={false}
            />
            <Text style={styles.infoDetails}>Reason</Text>
            <Dropdown
                data={reasons}
                placeholder={'Reason'}
                selectedValue={selectedReason}
                onSelect={(item) => setSelectedReason(typeof item === 'object' ? item.value : item)}
            />
            <Text style={styles.infoDetails}>Device</Text>
            <Dropdown
                data={devices}
                placeholder={'Device'}
                selectedValue={selectedDevice}
                onSelect={(item) => setSelectedDevice(typeof item === 'object' ? item.value : item)}

            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: 650,
    },
    title: {
        color: Colors.default.titlesSelected,
        fontSize: 20,
    },
    infoDetails: {
        color: Colors.default.textWhite,
        fontSize: 16,
        marginBottom: 10,
        marginTop: 19,
        paddingLeft: 5,
    },
    textBox: {
        fontSize: 16,
        color: Colors.default.textWhite,
        //This is the only time this color shows up so, I'm not adding it to constants...
        backgroundColor: '#706F6F',
        borderRadius: 5,
        paddingLeft: 15,
    },
});