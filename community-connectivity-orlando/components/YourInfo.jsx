import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Colors} from "../constants/Colors";
import Dropdown from '../components/ui/Dropdown';

export default function YourInfo({ user, selectedReason, setSelectedReason }) {
    const devices = ['Mobile Hotspot', 'Laptop', 'Tablet'];
    const reasons = ['Job Search', 'School', 'Training', 'Other'];


    //Backend needs to take care of this too before I can do anything...
    const [selectedDevice, setSelectedDevice] = useState('');


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your info: </Text>
            <Text style={styles.infoDetails}>Full Name</Text>
            <TextInput
                style={styles.textBox}
                value={`${user.first_name} ${user.last_name}`}
                editable={false}
            />
            <Text style={styles.infoDetails}>Phone number</Text>
            <TextInput
                style={styles.textBox}
                value= {`${user.phone}`}
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
        backgroundColor: '#706F6F',
        borderRadius: 5,
        paddingLeft: 15,
    },
});