import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import Button from '../components/ui/Button';
import {Colors} from "../constants/Colors";
import {router} from "expo-router";
import PickupDetails from '../components/PickupDetails';
import YourInfo from '../components/YourInfo';
import {useEffect, useState} from "react";
import {borrowAPI} from "../api/request";
import {useForm} from "react-hook-form";
import {useUser} from "../hooks/useUser";


export default function Request() {
    const { user, loading } = useUser('/+not-found');
    const [selectedReason, setSelectedReason] = useState('');

    const { handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            userId: '',
            borrow_date: new Date().toISOString().split('T')[0],
            user_location: '',
            device_location: 'Smith Neighborhood Center',
            reason_for_borrow: selectedReason,
        }
    });

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
        if (!selectedReason || selectedReason === 'Reason') {
            Alert.alert(
                'Missing Information',
                'Please select a valid reason before submitting the form.'
            );
            return;
        }

        try {
            const borrowData = {
                user_id: data.userId,
                device_id: null,
                borrow_date: data.borrow_date,
                return_date: null,
                user_location: data.user_location,
                device_location: data.device_location,
                reason_for_borrow: selectedReason,

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
                error.response?.data || 'Failed to submit borrow request. Please try again.'
            );
        }
    };


    return (
        <View style={styles.container}>
            <PickupDetails
                user={user}
            />

            <ScrollView style={styles.scrollView}>
                <YourInfo
                    user={user}
                    selectedReason={selectedReason}
                    setSelectedReason={setSelectedReason}
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
