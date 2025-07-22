import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import Button from '../components/ui/Button';
import {Colors} from "../constants/Colors";
import {router} from "expo-router";
import PickupDetails from '../components/PickupDetails';
import YourInfo from '../components/YourInfo';
import {useEffect, useState} from "react";
import {borrowAPI, locationAPI} from "../api/request";
import {useForm} from "react-hook-form";
import {useUser} from "../hooks/useUser";


export default function Request() {
    const { user, loading } = useUser('/+not-found');
    const [selectedReason, setSelectedReason] = useState('');
    const [selectedDevice, setSelectedDevice] = useState('');
    const [foundLocation, setFoundLocation] = useState('');
    const [chosenBorrowDate, setChosenBorrowDate] = useState(null);

    const date = new Date();
    const borrowDate = new Date(date.getTime() - (4 * 60 * 60 * 1000));
    const { handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            userId: '',
            borrow_date: borrowDate.toISOString(),
            user_location: '',
            device_location: '',
            reason_for_borrow: selectedReason,
        }
    });

    const [matchedLocation, setMatchedLocation] = useState(null);

    useEffect(() => {
        const fetchAndFilterLocation = async () => {
            if (foundLocation) {
                try {
                    const locationData = await locationAPI.getAllLocations();

                    // Data validation
                    if (!locationData || !locationData.data || !Array.isArray(locationData.data)) {
                        console.log('Data validation failed:', locationData);
                        return;
                    }

                    const foundLocationData = locationData.data.find(
                        location => location && location.location_nickname === foundLocation
                    );
                    
                    //console.log('locationNickname', foundLocationData?.location_nickname);
                    //console.log('foundLocation', foundLocation);

                    if (foundLocationData) {
                        setMatchedLocation(foundLocationData);
                        //console.log('Matched location:', matchedLocation.location_id);
                    } else {
                        //console.log('No location found with nickname:', foundLocation);
                        setMatchedLocation(null);
                    }

                } catch (error) {
                    //console.error('Failed to fetch location data:', error);
                    setMatchedLocation(null);
                }
            }
        };

        fetchAndFilterLocation();
    }, [foundLocation]);

    useEffect(() => {
        if (user) {
            setValue('userId', user.id);
            setValue('user_location', `${user.street_address}, ${user.city}, ${user.state}, ${user.zip_code}`);
        }
    }, [user, setValue]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }


    const onSubmit = async (data) => {
        if (!selectedReason || selectedReason === 'Reason' || !selectedDevice || selectedDevice === 'Device') {
            Alert.alert(
                'Missing Information',
                'Please select a valid reason before submitting the form.'
            );
            return;
        }

        if (!matchedLocation) {
            Alert.alert(
                'Location Error',
                'Unable to determine pickup location. Please try again.'
            );
            return;
        }

        //console.log(matchedLocation.location_id);
        try {
            const borrowData = {
                user_id: data.userId,
                device_id: null,
                borrow_date: chosenBorrowDate,
                return_date: null,
                user_location: data.user_location,
                location_id: matchedLocation.location_id,
                reason_for_borrow: selectedReason,
                preferred_type: selectedDevice,
            };

            await borrowAPI.borrowDevice(borrowData);

            Alert.alert('Success', 'Borrow request successfully submitted!');
            router.push('/home');
            reset();
        } catch (error) {
            console.error('Borrow request error:', error);
            console.error('Error response:', error.response?.data);
            Alert.alert(
                'Request Failed',
                'Device unavailable at selected location or borrow request failed. Please try a different location or try again.'
            );
        }
    };


    return (
        <View style={styles.container}>
            <PickupDetails
                user={user}
                setFoundLocation={setFoundLocation}
                matchedLocation={matchedLocation}
                borrowDate={setChosenBorrowDate}
            />

            <ScrollView style={styles.scrollView}>
                <YourInfo
                    user={user}
                    selectedReason={selectedReason}
                    setSelectedReason={setSelectedReason}
                    selectedDevice={selectedDevice}
                    setSelectedDevice={setSelectedDevice}
                    locationId={matchedLocation?.location_id}
                />
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Place Order"
                        height={80}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.default.background,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontSize: 20,
        color: Colors.default.titlesSelected,
        textAlign: 'left',
        paddingLeft: 25,
        paddingBottom: 19,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderTopColor: Colors.default.border,
        paddingTop: 19,
        height: 200,
        backgroundColor: Colors.default.background,
        zIndex: 1,

    },
    buttonContainer: {
        flex: 1,
        paddingHorizontal: 25,
    },
    scrollView: {
        width: '100%',
        flexGrow: 2,
        marginBottom: 35,
    },
});
