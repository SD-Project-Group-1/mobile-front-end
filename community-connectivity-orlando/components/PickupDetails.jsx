import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import {Colors} from "../constants/Colors";
import {zipcodeAPI} from "../api/zipcode";
import {locationAPI} from "../api/request";
import {deviceAPI} from "../api/request";
import Dropdown from "./ui/Dropdown";
import Button from "./ui/Button";

export default function PickupDetails({ user, setFoundLocation, matchedLocation, borrowDate }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [inRange, setInRange] = useState(null);
    const [nearestCenter, setNearestCenter] = useState('');
    const [zipcodeChecked, setZipcodeChecked] = useState(false);
    const [locationModal, setLocationModal] = useState(false);
    const [availableLocations, setAvailableLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pickupTimeModal, setPickupTimeModal] = useState(false);

    // Get user zipcode, check if it's in range, and returns the nearest location
    useEffect(() => {
        const checkRange = async () => {
            if (zipcodeChecked) {
                //console.log('PickupDetails: Zipcode already checked');
                return;
            }
            
            try {
                if (!user?.zip_code) {
                    setInRange(false);
                    setZipcodeChecked(true);
                    return;
                }
                
                const location = await zipcodeAPI.checkZipcode(user.zip_code);
                //console.log('PickupDetails: Zipcode check nearest location:', location);
                
                setInRange(location.withinRange);
                
                if (location.nearestCenter) {
                    setNearestCenter(location.nearestCenter);
                    setFoundLocation(location.nearestCenter + " Neighborhood Center");
                }
                
                setZipcodeChecked(true);
            } catch (err) {
                console.error('Zipcode check failed:', err.response?.data || err.message);
                setInRange(false);
                setZipcodeChecked(true);
            }
        };

        checkRange();
    }, [user?.zip_code, zipcodeChecked, setFoundLocation]);

    // Get all locations with available devices
    useEffect(() => {
        if (inRange === true) {
            dropDownLocations().then((locations) => {
                if (locations && locations.length > 0) {
                    // If the current foundLocation is not in the available locations, set the first one
                    if (!locations.some(loc => loc.location_nickname === matchedLocation?.location_nickname)) {
                        setFoundLocation(locations[0].location_nickname);
                    }
                }
            });
        }
    }, [inRange]);

    const dropDownLocations = async () => {
        setLoading(true);
        try {
            const locationData = await locationAPI.getAllLocations();
            
            if (!locationData || !locationData.data || !Array.isArray(locationData.data)) {
                setAvailableLocations([]);
                return [];
            }

            const locationsWithDevices = [];
            
            for (const location of locationData.data) {
                try {
                    const devices = await deviceAPI.getAvailableDevices(location.location_id);
                    
                    // Check if location has any available devices
                    if (devices && devices.data && Array.isArray(devices.data)) {
                        const availableDevices = devices.data.filter(device => device.available === true);
                        
                        if (availableDevices.length > 0) {
                            locationsWithDevices.push({
                                ...location,
                                availableDeviceCount: availableDevices.length
                            });
                        }
                    }
                } catch (error) {
                    // Skip locations that can't be checked
                    continue;
                }
            }
            
            setAvailableLocations(locationsWithDevices);
            return locationsWithDevices;
        } catch (error) {
            console.error('Failed to load available locations:', error);
            setAvailableLocations([]);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const selectLocation = (location) => {
        setNearestCenter(location.location_nickname.replace(" Neighborhood Center", ""));
        setFoundLocation(location.location_nickname);
        setLocationModal(false);
    };

    // Pick up date options
    const date = () => {
        const options = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            options.push({
                label: date.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
                value: date.toISOString().split('T')[0],
            });
        }
        return options;
    };

    // Pick up time options
    const time = () => {
        const options = [];
        for (let hour = 8; hour <= 18; hour++) { // 8am to 6:45pm
            for (let min of [0, 15, 30, 45]) {
                const date = new Date();
                date.setHours(hour, min, 0, 0);
                let hour12 = hour % 12 === 0 ? 12 : hour % 12;
                let ampm = hour < 12 ? 'AM' : 'PM';
                options.push({
                    label: `${hour12.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')} ${ampm}`,
                    value: `${hour12.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')} ${ampm}`
                });
            }
        }
        return options;
    };

    return (
        <View style={styles.container}>
            <View style={styles.pickupDetails}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Pickup details:</Text>
                    {inRange === true && (
                        <TouchableOpacity 
                            onPress={async () => {
                                setLocationModal(true);
                                await dropDownLocations();
                            }}
                        >
                            <Text style={styles.changeButton}>Change</Text>
                        </TouchableOpacity>
                    )}
                </View>
                
                {inRange === false && (
                    <Text style={styles.carryoutLocation}>
                        You're currently outside the allowed pickup range. You will not be able to place an order at this time.
                    </Text>
                )}

                {inRange === true && (
                    <>
                        <Text style={styles.carryoutLocation}>
                            Carry out at: {matchedLocation?.location_nickname || 'No devices or locations available'}
                        </Text>
                        <Text style={[styles.carryoutLocation, {marginBottom: 0}]}>
                            Address: {matchedLocation?.street_address || 'Address not available'}, {matchedLocation?.city || ''}, {matchedLocation?.state || ''} {matchedLocation?.zip_code || ''}
                        </Text>

                        <View style={styles.pickupTimeRow}>
                            <Text style={styles.carryoutLocation}>Pick up time: </Text>
                            <TouchableOpacity 
                                style={{marginBottom: 10}} 
                                onPress={() => setPickupTimeModal(true)}>
                                <Text style={styles.changeButton}>
                                    {selectedDate && selectedTime
                                        ? `${date().find(d => d.value === selectedDate)?.label}, ${selectedTime}`
                                        : 'Choose Pickup Date and Time'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {inRange === null && (
                    <Text style={styles.carryoutLocation}>
                        Checking location range...
                    </Text>
                )}
            </View>

            {/* Location Selection Modal */}
            <Modal
                visible={locationModal}
                transparent
                animationType="fade"
                onRequestClose={() => setLocationModal(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setLocationModal(false)}>
                    <Pressable style={styles.modalContainer} onPress={(event) => event.stopPropagation()}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Pickup Location</Text>
                            <TouchableOpacity onPress={() => setLocationModal(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        
                        {loading ? (
                            <View style={styles.loading}>
                                <Text style={styles.loadingText}>Loading available locations...</Text>
                            </View>
                        ) : (
                            <ScrollView style={styles.locationList}>
                                {availableLocations.length > 0 ? (
                                    availableLocations.map((location, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.locationEach}
                                            onPress={() => selectLocation(location)}
                                        >
                                            <Text style={styles.locationName}>
                                                {location.location_nickname}
                                            </Text>
                                            <Text style={styles.locationAddress}>
                                                {location.street_address}, {location.city}, {location.state} {location.zip_code}
                                            </Text>
                                            <Text style={styles.deviceCount}>
                                                {location.availableDeviceCount} device type(s) available
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <View style={styles.noLocations}>
                                        <Text style={styles.noLocationsTitle}>No locations with available devices</Text>
                                        <Text style={styles.noLocationsText}>Please try again later</Text>
                                    </View>
                                )}
                            </ScrollView>
                        )}
                    </Pressable>
                </Pressable>
            </Modal>
            {/* Pickup Time Modal */}
            <Modal
                visible={pickupTimeModal}
                transparent
                animationType="fade"
                onRequestClose={() => setPickupTimeModal(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setPickupTimeModal(false)}>
                    <Pressable style={styles.modalContainer} onPress={(event) => event.stopPropagation()}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Pickup Date & Time</Text>
                            <TouchableOpacity onPress={() => setPickupTimeModal(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{padding: 20}}>
                            <Text style={styles.modalLabel}>Date:</Text>
                            <Dropdown
                                data={date()}
                                placeholder="Select date"
                                selectedValue={selectedDate}
                                onSelect={item => setSelectedDate(typeof item === 'object' ? item.value : item)}
                            />
                            <Text style={styles.modalLabel}>Time:</Text>
                            <Dropdown
                                data={time()}
                                placeholder="Select time"
                                selectedValue={selectedTime}
                                onSelect={item => setSelectedTime(typeof item === 'object' ? item.value : item)}
                            />
                            <Button
                                title="Confirm"
                                onPress={() => {
                                    setPickupTimeModal(false);
                                    if (selectedDate && selectedTime && borrowDate) {
                                        const [hourMin, ampm] = selectedTime.split(' ');
                                        let [hour, min] = hourMin.split(':');
                                        hour = parseInt(hour, 10);
                                        min = parseInt(min, 10);
                                        if (ampm === 'PM' && hour !== 12) hour += 12;
                                        if (ampm === 'AM' && hour === 12) hour = 0;
                                        const localDateTime = `${selectedDate}T${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:00`;
                                        borrowDate(localDateTime);
                                    }
                                }}
                                disabled={!selectedDate || !selectedTime}
                                style={{ height: '45', marginTop: 30 }}
                                textStyle={{ fontSize: 16, fontWeight: 'bold' }}
                                
                            />
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.default.border,
    },
    pickupDetails: {
        paddingVertical: 15,
        paddingHorizontal: 19
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        color: Colors.default.titlesSelected,
        fontSize: 20,
        marginTop: 10,
    },
    changeButton: {
        color: Colors.default.link,
        fontSize: 14,
        fontWeight: 'bold',
    },
    carryoutLocation: {
        color: Colors.default.textWhite,
        fontSize: 14,
        marginBottom: 10,
    },
    /* Location List Modal */
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: Colors.modal.default,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.default.border,
        width: '90%',
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.default.border,
    },
    modalTitle: {
        color: Colors.default.titlesSelected,
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        color: Colors.default.titlesSelected,
        fontSize: 20,
        fontWeight: 'bold',
    },
    loading: {
        padding: 40,
        alignItems: 'center',
    },
    loadingText: {
        color: Colors.default.textWhite,
        fontSize: 14,
    },
    locationList: {
        maxHeight: 400,
    },
    locationEach: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.default.border,
    },
    locationName: {
        color: Colors.default.titlesSelected,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    locationAddress: {
        color: Colors.default.textWhite,
        fontSize: 14,
        marginBottom: 4,
    },
    deviceCount: {
        color: Colors.default.titlesSelected,
        fontSize: 12,
        fontStyle: 'italic',
    },
    noLocations: {
        padding: 40,
        alignItems: 'center',
    },
    noLocationsTitle: {
        color: Colors.default.textWhite,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noLocationsText: {
        color: Colors.default.textWhite,
        fontSize: 14,
    },
    /* Pickup Time Modal */
    pickupTimeRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
    },
    modalLabel: {
        color: Colors.default.titlesSelected,
        fontSize: 16,
        marginBottom: 8,
        marginTop: 12,
    },
});