import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Colors} from "../constants/Colors";
import Dropdown from '../components/ui/Dropdown';


export default function YourInfo() {
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
                placeholder={'Reason'}
            />
            <Text style={styles.infoDetails}>Device</Text>
            <Dropdown
                placeholder={'Device'}
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