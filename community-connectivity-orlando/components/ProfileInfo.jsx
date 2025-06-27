import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from "../constants/Colors";
import Button from './ui/Button';
import Modal from './ui/Modal';
import { router } from 'expo-router';

export default function ProfileInfo({ firstName, lastName, number, birthdate, address }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    
    const [isError, setIsError] = useState(false);
    const [isEditError, setIsEditError] = useState(false);
    const [editField, setEditField] = useState(null); // Track edit field
    const [showEditErrorModal, setShowEditErrorModal] = useState(false);
    
    const [hasActiveReservation] = useState(false); // Set to true to test edit and error modal

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        setShowDeleteModal(false);
        if (hasActiveReservation) {
            setIsError(true);
            setShowResultModal(true);
        } else {
            setIsError(false);
            setShowResultModal(true);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleCloseResultModal = () => {
        setShowResultModal(false);
        if (!isError) {
            router.push('/login');
        }
    };

    // Edit Profile field logic
    const handleEditField = (field) => {
        if (hasActiveReservation) {
            if (field !== 'number') {
                setIsEditError(true);
                return;
            }
        } else {
            if (field === 'birthdate') {
                setIsEditError(true);
                setShowEditErrorModal(true);
                return;
            }
        }
        setEditField(field);
    };

    return (
        <View style={styles.container}>
            {/* Profile Information */}
            <View style={styles.row}>
                <Text style={styles.titleBold}>Profile Information</Text>
                <TouchableOpacity>
                    <Text style={styles.editButton}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            {/* First Name and Last Name Fields */}
            <View style={styles.row}>
                <Text style={styles.title}>First Name</Text>
                <Text style={styles.title}>Last Name</Text>
            </View>
            <View style={styles.row}>
                <TextInput
                    style={styles.textBox}
                    value={firstName}
                    editable={editField === 'firstName'}
                    onFocus={() => handleEditField('firstName')}
                />
                <TextInput
                    style={styles.textBox}
                    value={lastName}
                    editable={editField === 'lastName'}
                    onFocus={() => handleEditField('lastName')}
                />
            </View>
            {/* Phone Number and Date of Birth Fields */}
            <View style={styles.row}>
                <Text style={styles.title}>Phone Number</Text>
                <Text style={styles.title}>Date of Birth</Text>
            </View>
            <View style={styles.row}>
                <TextInput
                    style={styles.textBox}
                    value={number}
                    editable={editField === 'number'}
                    onFocus={() => handleEditField('number')}
                />
                <TextInput
                    style={styles.textBox}
                    value={birthdate}
                    editable={editField === 'birthdate'}
                    onFocus={() => handleEditField('birthdate')}
                />
            </View>
            {/* Address Field */}
            <View style={styles.row}>
                <Text style={styles.title}>Address</Text>
            </View>
            <View style={styles.row}>
                <TextInput
                    style={styles.textBox}
                    value={address}
                    editable={editField === 'address'}
                    onFocus={() => handleEditField('address')}
                />
            </View>
            {/* Account Actions */}
            <View style={styles.row}>
                <Text style={styles.titleBold}>Account Actions</Text>
            </View>
            {/* Account Action Buttons */}
            <View style={styles.rowButton}>
                <Button
                    title={<Text style={styles.buttonText}>     Reset Password</Text>}
                    width={95}
                    height={60}
                    style={styles.button}
                    variant="primary"
                    //onPress={() => router.push('/reset')}
                />
                <Button
                    title={<Text style={styles.buttonText}>Logout</Text>}
                    width={95}
                    height={60}
                    style={styles.button}
                    variant="primary"
                    onPress={() => router.push('/login')}
                />
                <Button
                    title={<Text style={styles.buttonText}>   Delete Account</Text>}
                    width={95}  
                    height={60}
                    style={[styles.button, {paddingHorizontal: 15}]}
                    variant="primary"
                    onPress={handleDeleteAccount}
                />
            </View>
            {/* Large Modal */}
            <Modal
                visible={showDeleteModal}
                size="large"
                title="Are you sure you want to delete your account?"
                message="This action cannot be undone."
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                onClose={handleCancelDelete}
                setTime={3000}
            />
            {/* Regular Modal */}
            <Modal
                visible={showResultModal}
                size="regular"
                title={isError ? "Oops: Account cannot be deleted!" : "Success"}
                message={isError ? "You still have an active device rental or reservation." 
                                 : "Your account has been deleted."}
                style={styles.modal}
                onClose={handleCloseResultModal}
                setTime={4000}
            />
            {/* Regular Modal for edit profile errors */}
            <Modal
                visible={showEditErrorModal}
                size="regular"
                title="Oops: This field cannot be edited!"
                message={isEditError ? "You still have an active device rental or reservation." : "Date of birth cannot be edited."}
                onClose={() => setShowEditErrorModal(false)}
                setTime={3000}
            />
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
        marginBottom: 7,
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
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    buttonText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 16,
    },
    rowButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        gap: 10,
    },
    modal: {
        marginBottom: 10,
    },
});