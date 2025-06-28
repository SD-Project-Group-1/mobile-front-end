import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Colors } from "../constants/Colors";
import Button from './ui/Button';
import Modal from './ui/Modal';
import { router } from 'expo-router';

export default function ProfileInfo({ firstName, lastName, phoneNumber, birthdate, address, email, onSave }) {
    
    // User reservation verification state 
    const [hasActiveReservation] = useState(false); // Set to true to test edit and error modal

    // Modal popups for delete account and confirm delete buttons
    const [deleteAccountModal, setDeleteAccountModal] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

    // Edit profile state
    const [editProfile, setEditProfile] = useState(false);
    const [editField, setEditField] = useState({ firstName, lastName, phoneNumber, birthdate, address, email });
    const [editErrorModal, setEditErrorModal] = useState(false);

    // Handle edit profile button press
    const handleEditProfile = () => {
        setEditProfile(true);
        setEditField({ firstName, lastName, phoneNumber, birthdate, address, email });
    };

    // Determine if a field is editable
    const isFieldEditable = (field) => {
        if (!editProfile) {
            return false;
        }
        if (hasActiveReservation) {
            return field === 'phoneNumber' || field === 'email';
        }
        return field !== 'birthdate';
    };

    // Handle field value changes
    const updateProfile = (field, value) => {
        setEditField(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    // Show error modal for non-editable fields
    const editFieldModal = (field) => {
        if (hasActiveReservation && field !== 'phoneNumber' && field !== 'email') {
            setEditErrorModal(true);
            return false;
        }
        if (!hasActiveReservation && field === 'birthdate') {
            setEditErrorModal(true);
            return false;
        }
        return true;
    };
    
    // Get field style based on editability
    const getFieldStyle = (field) => {
        const defaultStyle = styles.textBox;
        if (!editProfile) {
            return defaultStyle;
        }
        if (isFieldEditable(field)) {
            return defaultStyle;
        }
        return [defaultStyle, styles.disabledTextBox];
    };
    
    // Confirm delete account
    const handleConfirmDelete = () => {
        setDeleteAccountModal(false);
        setConfirmDeleteModal(true);    
    };

    // Close success or error modal and redirect to login page if successful
    const closeModal = () => {
        setConfirmDeleteModal(false);
        if (!hasActiveReservation) {
            router.push('/login');
        }
    };
    
    return (
        <KeyboardAvoidingView 
        
            // To prevent the keyboard from covering the input fields
            style={styles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >

            {/* Scrolling only when keyboard is visible */}
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                scrollEnabled={editProfile}
            >
                <View style={styles.container}>
                    
                    {/* Profile Information */}
                    <View style={styles.row}>
                        <Text style={styles.titleBold}>Profile Information</Text>
                        
                        {/* Edit Profile Button */}
                        {!editProfile && (
                            <TouchableOpacity onPress={handleEditProfile}> 
                                <Text style={styles.editButton}>Edit Profile</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* First Name and Last Name Fields */}
                    <View style={styles.row}>
                        <Text style={styles.title}>First Name</Text>
                        <Text style={styles.title}>Last Name</Text>
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            style={getFieldStyle('firstName')}
                            value={editProfile ? editField.firstName : firstName}
                            editable={isFieldEditable('firstName')}
                            onChangeText={(value) => updateProfile('firstName', value)}
                            onPressIn={() => editProfile && !isFieldEditable('firstName') && editFieldModal('firstName')}
                        />
                        <TextInput
                            style={getFieldStyle('lastName')}
                            value={editProfile ? editField.lastName : lastName}
                            editable={isFieldEditable('lastName')}
                            onChangeText={(value) => updateProfile('lastName', value)}
                            onPressIn={() => editProfile && !isFieldEditable('lastName') && editFieldModal('lastName')}
                        />
                    </View>

                    {/* Phone Number and Date of Birth Fields */}
                    <View style={styles.row}>
                        <Text style={styles.title}>Phone Number</Text>
                        <Text style={styles.title}>Date of Birth</Text>
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            style={getFieldStyle('phoneNumber')}
                            value={editProfile ? editField.phoneNumber : phoneNumber}
                            editable={isFieldEditable('phoneNumber')}
                            onChangeText={(value) => updateProfile('phoneNumber', value)}
                            onPressIn={() => editProfile && !isFieldEditable('phoneNumber') && editFieldModal('phoneNumber')}
                        />
                        <TextInput
                            style={getFieldStyle('birthdate')}
                            value={editProfile ? editField.birthdate : birthdate}
                            editable={isFieldEditable('birthdate')}
                            onChangeText={(value) => updateProfile('birthdate', value)}
                            onPressIn={() => editProfile && !isFieldEditable('birthdate') && editFieldModal('birthdate')}
                        />
                    </View>

                    {/* Address Field */}
                    <View style={styles.row}>
                        <Text style={styles.title}>Address</Text>
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            style={getFieldStyle('address')}
                            value={editProfile ? editField.address : address}
                            editable={isFieldEditable('address')}
                            onChangeText={(value) => updateProfile('address', value)}
                            onPressIn={() => editProfile && !isFieldEditable('address') && editFieldModal('address')}
                        />
                    </View>
                    
                    {/* Email Field */}
                    <View style={styles.row}>
                        <Text style={styles.title}>Email</Text>
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            style={getFieldStyle('email')}
                            value={editProfile ? editField.email : email}
                            editable={isFieldEditable('email')}
                            onChangeText={(value) => updateProfile('email', value)}
                            onPressIn={() => editProfile && !isFieldEditable('email') && editFieldModal('email')}
                        />
                    </View>

                    {/* Edit Profile buttons shown when editing account */}
                    {editProfile && (
                        <View style={[styles.rowButton, {marginTop: 23.5}]}>
                            <Button
                                title={<Text style={[styles.buttonText, {fontSize: 20}]}>Save</Text>}
                                width={145}
                                height={60}
                                style={styles.button}
                                variant="primary"
                                onPress={() => {
                                    onSave(editField);
                                    setEditProfile(false);
                                }}
                            />
                            <Button
                                title={<Text style={[styles.buttonText, {fontSize: 20}]}>Cancel</Text>}
                                width={145}
                                height={60}
                                style={styles.button}
                                variant="primary"
                                onPress={() => {
                                    setEditProfile(false);
                                    setEditField({ firstName, lastName, phoneNumber, birthdate, address, email });
                                }}
                            />
                        </View>
                    )}

                    {/* Account Actions */}
                    {!editProfile && (
                        <>
                            <View style={styles.row}>
                                <Text style={styles.titleBold}>Account Actions</Text>
                            </View>

                            {/* Account Action Buttons */}
                            <View style={styles.rowButton}>
                                <Button
                                    // Intentional spacing to center button text
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
                                    // Intentional spacing to center button text
                                    title={<Text style={styles.buttonText}>   Delete Account</Text>}
                                    width={95}  
                                    height={60}
                                    style={[styles.button, {paddingHorizontal: 15}]}
                                    variant="primary"
                                    onPress={() => setDeleteAccountModal(true)}
                                />
                            </View>
                        </>
                    )}

                    {/* Large Modal for delete account */}
                    <Modal
                        visible={deleteAccountModal}
                        size="large"
                        title="Are you sure you want to delete your account?"
                        message="This action cannot be undone."
                        onConfirm={handleConfirmDelete}
                        onCancel={() => setDeleteAccountModal(false)}
                        onClose={() => setDeleteAccountModal(false)}
                        setTime={3000}
                    />

                    {/* Regular Modal for delete account success or error */}
                    <Modal
                        visible={confirmDeleteModal}
                        size="regular"
                        title={hasActiveReservation ? "Oops: Account cannot be deleted!" : "Success"}
                        message={hasActiveReservation ? "You still have an active device rental or reservation." 
                                                      : "Your account has been deleted."}
                        onClose={closeModal}
                        setTime={3000}
                    />

                    {/* Regular Modal for non editable fields errors */}
                    <Modal
                        visible={editErrorModal}
                        size="regular"
                        title="Oops: This field cannot be edited!"
                        message={hasActiveReservation ? "You still have an active device rental or reservation." 
                                                      : "Date of birth cannot be edited."}
                        onClose={() => setEditErrorModal(false)}
                        setTime={3000}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        backgroundColor: Colors.default.secondary,
        borderColor: Colors.default.border,
        borderWidth: 1,
        borderRadius: 5,
        padding: 14,
        margin: 16,
        marginTop: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3,
        gap: 15,
    },
    title: {
        flex: 1,
        fontFamily: 'InstrumentSans',
        fontSize: 16,
        color: Colors.default.textWhite,
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
        marginTop: 2,
        gap: 10,
    },
    disabledTextBox: {
        color: '#777777',
        backgroundColor: '#B2AEAE',
    },
});