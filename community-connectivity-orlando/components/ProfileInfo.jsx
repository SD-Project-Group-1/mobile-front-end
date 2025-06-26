import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {Colors} from "../constants/Colors";

export default function ProfileInfo({ firstName, lastName, number, birthdate, address}) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.titleBold}>Profile Information</Text>
                <TouchableOpacity>
                    <Text style={styles.editButton}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <Text style={styles.title}>First Name</Text>
                <Text style={styles.title}>Last Name</Text>
            </View>
            <View style={styles.row}>
                <TextInput
                    style={styles.textBox}
                    value={firstName}
                    editable={false}
                />
                <TextInput
                    style={styles.textBox}
                    value={lastName}
                    editable={false}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.title}>Phone Number</Text>
                <Text style={styles.title}>Date of Birth</Text>
            </View>
            <View style={styles.row}>
                <TextInput
                    style={styles.textBox}
                    value={number}
                    editable={false}
                />
                <TextInput
                    style={styles.textBox}
                    value={birthdate}
                    editable={false}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.title}>Address</Text>
            </View>
            <View style={styles.row}>
                <TextInput
                    style={styles.textBox}
                    value={address}
                    editable={false}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.titleBold}>Account Actions</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.default.secondary,
        borderColor: Colors.default.border,
        borderWidth: 1,
        borderRadius: 5,
        padding: 14,
        margin: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        gap: 15,
    },
    title: {
        flex: 1,
        fontFamily: 'InstrumentSans',
        fontSize: 16,
        color: Colors.default.textWhite,
    },
    titleBlack: {
        flex: 1,
        fontFamily: 'InstrumentSans',
        fontSize: 16,
        color: Colors.default.textBlack,
    },
    titleBold: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 16,
        color: Colors.default.titlesSelected,
    },
    editButton: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 14,
        color: Colors.default.link,
    },
    textBox: {
        flex: 1,
        fontFamily: 'InstrumentSans',
        fontSize: 16,
        paddingLeft: 10,
        borderColor: '#000000',
        backgroundColor: Colors.default.textBox,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 11,
    },

});