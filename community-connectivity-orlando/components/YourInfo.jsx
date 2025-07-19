import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Colors} from "../constants/Colors";
import Dropdown from '../components/ui/Dropdown';
import {deviceAPI} from '../api/request';

export default function YourInfo({ user, selectedReason, setSelectedReason, selectedDevice, setSelectedDevice, onDeviceAvailabilityChange, locationId }) {

    const devices = { 'mobile_hotspot': 'mobile_hotspot', 'laptop': 'Laptop', 'tablet': 'tablet' };
    
    // Display names for the dropdown
    const deviceDisplayNames = { 'mobile_hotspot': 'Mobile Hotspot', 'tablet': 'Tablet', 'laptop': 'Laptop' };
    
    const devicesDropdown = Object.keys(devices); // Maps dropdown to backend
    const reasons = ['Job Search', 'School', 'Training', 'Other'];
    const [deviceAvailability, setDeviceAvailability] = useState({});
    const [locationDevices, setLocationDevices] = useState(null);

    // Get device availability for the chosen location
    useEffect(() => {
        const fetchLocationDevices = async () => {

            if (locationId) {
                try {
                    //console.log('Fetching devices for location ID:', locationId);
                    const devices = await deviceAPI.getAvailableDevices(locationId);

                    setLocationDevices(devices);
                } catch (error) {
                    //console.error('Failed to fetch location devices:', error.response?.data || error.message);
                    setLocationDevices(null);
                }
            } else {
                //console.log( 'No locationId provided');
                setLocationDevices(null);
            }
        };

        fetchLocationDevices();
    }, [locationId]);

    // Check device availability when device selection changes
    useEffect(() => {
        
        if (selectedDevice && locationDevices) {
            let availableDevices = [];
            
            // Check API structure
            if (locationDevices.data && Array.isArray(locationDevices.data)) {
                
                availableDevices = locationDevices.data.filter(device => {
                    
                    const deviceTypeMatches = device.deviceType === selectedDevice;
                    const isAvailable = device.available === true;

                    
                    return deviceTypeMatches && isAvailable;
                });
                
                //console.log('Available devices:', availableDevices);
            } else {
                const deviceTypeKey = Object.keys(devices).find(key => devices[key] === selectedDevice);
                
                if (deviceTypeKey && locationDevices[deviceTypeKey]) {
                    availableDevices = locationDevices[deviceTypeKey];
                } else if (locationDevices[selectedDevice]) {
                    availableDevices = locationDevices[selectedDevice];
                }
            }
            
            const actualAvailability = {
                available: availableDevices.length > 0,
                count: availableDevices.length,
                devices: availableDevices
            };
            
            setDeviceAvailability(actualAvailability);
            
            if (onDeviceAvailabilityChange) {
                onDeviceAvailabilityChange(selectedDevice, actualAvailability);
            }
        } else if (selectedDevice && !locationDevices) {

            const defaultAvailability = { available: true, count: 1 };
            setDeviceAvailability(defaultAvailability);
            
            if (onDeviceAvailabilityChange) {
                onDeviceAvailabilityChange(selectedDevice, defaultAvailability);
            }
        } else {
            setDeviceAvailability({});
        }
    }, [selectedDevice, locationDevices]);

    const deviceSelection = (item) => {
        const deviceType = typeof item === 'object' ? item.value : item;
        
        const mappedDevice = devices[deviceType];
        
        if (mappedDevice) {
            setSelectedDevice(mappedDevice);
        } else {
            console.log('Error: device key not found:', deviceType);
        }
    };

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
                data={devicesDropdown.map(key => ({
                    label: deviceDisplayNames[key],
                    value: key
                }))}
                placeholder={'Device'}
                selectedValue={selectedDevice ? Object.keys(devices).find(key => devices[key] === selectedDevice) : ''}
                onSelect={deviceSelection}
            />
            
            {/* Display device availability information */}
            {selectedDevice && deviceAvailability && (
                <View style={styles.availabilityContainer}>
                    <Text style={styles.availabilityTitle}>Device Availability:</Text>
                    <Text style={styles.availabilityText}>
                        {deviceAvailability.available ? 
                            `${selectedDevice} devices are available` : 
                            `${selectedDevice} devices are currently unavailable`
                        }
                    </Text>
                    {deviceAvailability.count !== undefined && (
                        <Text style={[styles.availabilityText, {fontWeight: 'bold'}]}>
                            Available: {deviceAvailability.count}
                        </Text>
                    )}
                </View>
            )}
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
    availabilityContainer: {
        marginTop: 15,
        padding: 10,
        backgroundColor: Colors.default.secondary,
        borderRadius: 5,
    },
    availabilityTitle: {
        color: Colors.default.titlesSelected,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    availabilityText: {
        color: Colors.default.textWhite,
        fontSize: 12,
        marginBottom: 3,
    },
});