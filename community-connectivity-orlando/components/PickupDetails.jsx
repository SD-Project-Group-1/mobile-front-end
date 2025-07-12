import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Colors} from "../constants/Colors";
import {zipcodeAPI} from "../api/zipcode";


export default function PickupDetails({ user }) {
    const [inRange, setInRange] = useState(null);
    const [nearestCenter, setNearestCenter] = useState('');


    useEffect(() => {
        const checkRange = async () => {

            try {
                const location = await zipcodeAPI.checkZipcode(user.zip_code);
                    setInRange(location.withinRange);
                    if (location.nearestCenter) setNearestCenter(location.nearestCenter);
                } catch (err) {
                    console.error('Zipcode check failed:', err);
                    setInRange(false);
                }
        };

        checkRange();
    }, [user?.zip_code]);

    return (
        <View style={styles.container}>
            <View style={styles.pickupDetails}>
                <Text style={styles.title}>Pickup details:</Text>
                {inRange === false && (
                    <Text style={styles.carryoutLocation}>
                        You're currently outside the allowed pickup range. You will not be able to place an order at this time.
                    </Text>
                )}

                {inRange === true && (
                    <Text style={styles.carryoutLocation}>
                        Carry out at: {nearestCenter}
                    </Text>
                )}

                {inRange === null && (
                    <Text style={styles.carryoutLocation}>
                        Checking location range...
                    </Text>
                )}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.default.border,
    },
    title: {
        color: Colors.default.titlesSelected,
        fontSize: 20,
        marginBottom: 10,
    },
    pickupDetails: {
        paddingVertical: 15,
        paddingHorizontal: 19
    },
    carryoutLocation: {
        color: Colors.default.textWhite,
        fontSize: 14,
        marginBottom: 10,
    },
});