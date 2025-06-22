import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileInfo() {
    const [firstName, onChangeFirstName] = React.useState('Jane');
    const [lastName, onChangeLastName] = React.useState('Shmane');
    const [number, onChangeNumber] = React.useState('(407) 356-1234');
    const [birthdate, onChangeBirthdate] = React.useState('01/01/1985');
    const [address, onChangeAddress] = React.useState('444 Epic Universe, Orlando Fl, 32819');

    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>Profile Information</Text>
                <TouchableOpacity>
                    <Text style={styles.editButton}>Edit profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.fieldRow}>
                <Text style={styles.titleField}>First Name</Text>
                <Text style={styles.titleField}>Last Name</Text>
            </View>
            <View style={styles.fieldRow}>
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

            <View style={styles.fieldRow}>
                <Text style={styles.titleField}>Phone Number</Text>
                <Text style={styles.titleField}>Date of Birth</Text>
            </View>
            <View style={styles.fieldRow}>
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

            <Text style={[styles.titleField, {marginBottom: 6}]}>Address</Text>
            <TextInput
                style={styles.textBox}
                value={address}
                editable={false}
            />

            {/* Account Actions here */}
            <Text style={[styles.title, {height: 90}]}>Account Actions</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E1E1E',
        borderColor: '#87FBFF',
        borderWidth: 1,
        borderRadius: 5,
        padding: 16,
        margin: 16,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 16,
        color:'#87FBFF',
    },
    editButton: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 14,
        color: '#FFD700',
    },
    fieldRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 14,
        marginBottom: 4,
    },
    titleField: {
        flex: 1,
        fontFamily: 'InstrumentSans',
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 2,
    },
    textBox: {
        flex: 1,
        fontFamily: 'InstrumentSans',
        fontSize: 16,
        borderColor: '#000000',
        backgroundColor: '#F2EFEF',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginBottom: 10,
    },
});