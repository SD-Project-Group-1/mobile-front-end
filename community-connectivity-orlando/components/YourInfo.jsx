import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Colors} from "../constants/Colors";
import Dropdown from '../components/ui/Dropdown';
import { deviceAPI } from '../api/request';

export default function YourInfo({ user, selectedReason, setSelectedReason, selectedDevice, setSelectedDevice, locationId }) {

    const devices = ['Mobile_Hotspot', 'Laptop', 'Tablet'];

    const reasons = ['Job Search', 'School', 'Training', 'Other'];

    const [deviceAvailability, setDeviceAvailability] = useState({});

    useEffect(() => {
        const availability = async () => {
            if (!locationId) {
                setDeviceAvailability({});
                return;
            }
            try {
                const res = await deviceAPI.getAvailableDevices(locationId);

                const counts = { 'Mobile_Hotspot': 0, 'Laptop': 0, 'Tablet': 0 };
                if (res && res.data && Array.isArray(res.data)) {
                    res.data.forEach(device => {
                        if (counts.hasOwnProperty(device.deviceType)) {
                            counts[device.deviceType] = device.availableCount;
                        }
                    });
                }
                setDeviceAvailability(counts);
            } catch (error) {
                console.error('No device availability:', error);
                setDeviceAvailability({});
            }
        };
        availability();
    }, [locationId]);

    // Build dropdown data with availability info
    const deviceDropdownCount = devices.map(type => {
        const count = deviceAvailability[type];
        return {
            label: `${type.replace('_', ' ')} (Available: ${typeof count === 'number' ? count : 0})`,
            value: type
        };
    });

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
                data={deviceDropdownCount}
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