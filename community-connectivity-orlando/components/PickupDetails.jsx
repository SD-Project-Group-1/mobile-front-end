import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import {Colors} from "../constants/Colors";
import {zipcodeAPI} from "../api/zipcode";
import {locationAPI} from "../api/request";
import {deviceAPI} from "../api/request";

export default function PickupDetails({ user, setFoundLocation, matchedLocation }) {
    const [inRange, setInRange] = useState(null);
    const [nearestCenter, setNearestCenter] = useState('');
    const [zipcodeChecked, setZipcodeChecked] = useState(false);
    const [locationModal, setLocationModal] = useState(false);
    const [availableLocations, setAvailableLocations] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const dropDownLocations = async () => {
        setLoading(true);
        try {
            const locationData = await locationAPI.getAllLocations();
            
            if (!locationData || !locationData.data || !Array.isArray(locationData.data)) {
                setAvailableLocations([]);
                return;
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
        } catch (error) {
            console.error('Failed to load available locations:', error);
            setAvailableLocations([]);
        } finally {
            setLoading(false);
        }
    };

    const selectLocation = (location) => {
        setNearestCenter(location.location_nickname.replace(" Neighborhood Center", ""));
        setFoundLocation(location.location_nickname);
        setLocationModal(false);
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
                            Carry out at: {matchedLocation?.location_nickname || 'Location not available'}
                        </Text>
                        <Text style={styles.carryoutLocation}>
                            Address: {matchedLocation?.street_address || 'Address not available'}, {matchedLocation?.city || ''}, {matchedLocation?.state || ''} {matchedLocation?.zip_code || ''}
                        </Text>
                        
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
                                                {location.availableDeviceCount} device(s) available
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
});