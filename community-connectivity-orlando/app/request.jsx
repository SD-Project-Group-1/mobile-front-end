import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Button from '../components/ui/Button';
import {Colors} from "../constants/Colors";
import {router} from "expo-router";
import PickupDetails from '../components/PickupDetails';
import YourInfo from '../components/YourInfo';
import {userAPI} from "../api/user";
import {useEffect, useState} from "react";
import {useUser} from "../hooks/useUser";


export default function Request() {
    const { user, loading } = useUser('/+not-found');

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <PickupDetails/>

            <ScrollView style={styles.scrollView}>
                <YourInfo user={user} />
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Place Order"
                        height={80}
                        onPress={() => {
                            router.push('/home');
                        }}/>
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
