import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import { Colors } from "../constants/Colors";
import Button from './ui/Button';
import Modal from './ui/Modal';
import { router } from 'expo-router';
import { userAPI } from '../api/user';
import { authAPI } from '../api/auth';
import * as SecureStore from 'expo-secure-store';

export default function ProfileInfo({ onSave }) {

    // User profile data
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthdate: '',
        address: '',
        email: '',
        id: ''
    });

    // If true, all fields are editable regardless of reservation, restriction is lifted
    const [isDisabled] = useState(true);
    // User reservation verification state 
    const [hasActiveReservation] = useState(false); // Set to true to test edit and error modal

    // Edit profile state
    const [editProfile, setEditProfile] = useState(false);
    const [editField, setEditField] = useState({});
    const [editErrorModal, setEditErrorModal] = useState(false);

    // Modal popups for delete account and confirm delete buttons
    const [deleteAccountModal, setDeleteAccountModal] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

    // Retrieves user profile data
    useEffect(() => {
        userProfile();
    }, []);

    // Retrieves user profile from backend
    const userProfile = async () => {
        try {
            // Get current user profile
            const currentUser = await userAPI.getCurrentUser();

            // Formats user profile data
            const profileData = {
                firstName: currentUser.user.first_name || '',
                lastName: currentUser.user.last_name || '',
                phoneNumber: currentUser.user.phone || '',
                birthdate: currentUser.user.dob ? new Date(currentUser.user.dob).toLocaleDateString() : '',
                address: addressField(currentUser.user),
                email: currentUser.user.email || '',
                id: currentUser.user.id || ''
            };
            
            // For debugging
            //console.log('Profile data with ID:', profileData.id);
            
            setUserData(profileData);
            setEditField(profileData);
            
        } catch (err) {
            console.error('Error getting user profile information:', err);
        }
    };

    // Address in one field
    const addressField = (user) => {
        const fields = [
            user.street_address,
            user.city,
            user.state,
            user.zip_code
        ]
        
        return fields.join(', ');
    };

    // Handle edit profile button press
    const handleEditProfile = () => {
        setEditProfile(true);
        setEditField({ ...userData });
    };

    // Determine if a field is editable
    const isFieldEditable = (field) => {
        if (!editProfile) {
            return false;
        }
        // If isDisabled is true, all fields are editable regardless of reservation
        if (isDisabled) {
            return true;
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
        // If isDisabled is true, don't show error modals for any field
        if (isDisabled) {
            return true;
        }
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
    
    // Securely logout user
    const logout = async () => {
        // Backend signout endpoint and clear token
        await authAPI.signout();
            
        router.push('/login');
    };
    
    // Confirm delete account
    const handleConfirmDelete = async () => {
        setDeleteAccountModal(false);
        
        try {
            if (!userData.id) {
                console.error('User ID not available');
                return;
            }

            // Backend delete API
            await userAPI.deleteUser(userData.id);
            
            console.log('User deleted successfully');
            
            // Clears token from user device
            await SecureStore.deleteItemAsync('token');
            
            // Shows success modal
            setConfirmDeleteModal(true);
            
        } catch (error) {
            console.error('Error deleting account:', error);
            
            // Error if user has active reservation, device rental, or other error
            if (error.response?.status === 400 && error.response?.data?.includes('active reservation')) {
                setConfirmDeleteModal(false);
                setEditErrorModal(true);
            } else {
                Alert.alert(
                    'Delete Failed',
                    'Failed to delete account. Please try again.'
                );
            }
        }
    };

    // Close success or error modal and redirect to login page if successful
    const closeModal = () => {
        setConfirmDeleteModal(false);
        if (!hasActiveReservation) {
            router.push('/login');
        }
    };
    
    // Save profile changes to profile and exit editing mode
    const saveProfileUpdate = async () => {
        try {
            // Seperate address field (address, city, state, zip code)
            const address = editField.address.split(',').map(part => part.trim());
            
            // Send data to backend via API
            const updateData = {
                first_name: editField.firstName,
                last_name: editField.lastName,
                phone: editField.phoneNumber,
                email: editField.email,
                dob: editField.birthdate,
                street_address: address[0] || '',
                city: address[1] || '',
                state: address[2] || '',
                zip_code: address[3] || ''
            };

            // update user profile to backend
            await userAPI.updateUserProfile(updateData);
            
            // Update user data in profile
            setUserData(editField);
            setEditProfile(false);
            
            if (onSave) {
                onSave(editField);
            }
            
        } catch (error) {
            console.error('Profile update error:', error);
            Alert.alert(
                'Update Profile Failed', 
                error.response?.data || 'Profile update failed because of an error. Please try again.'
            );
        }
    };
    return (
        <KeyboardAvoidingView
            // To prevent keyboard from covering input fields when editing profile
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
                            value={editProfile ? editField.firstName : userData.firstName}
                            editable={isFieldEditable('firstName')}
                            onChangeText={(value) => updateProfile('firstName', value)}
                            onPressIn={() => editProfile && !isFieldEditable('firstName') && editFieldModal('firstName')}
                        />
                        <TextInput
                            style={getFieldStyle('lastName')}
                            value={editProfile ? editField.lastName : userData.lastName}
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
                            value={editProfile ? editField.phoneNumber : userData.phoneNumber}
                            editable={isFieldEditable('phoneNumber')}
                            onChangeText={(value) => updateProfile('phoneNumber', value)}
                            onPressIn={() => editProfile && !isFieldEditable('phoneNumber') && editFieldModal('phoneNumber')}
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            style={getFieldStyle('birthdate')}
                            value={editProfile ? editField.birthdate : userData.birthdate}
                            editable={isFieldEditable('birthdate')}
                            onChangeText={(value) => updateProfile('birthdate', value)}
                            onPressIn={() => editProfile && !isFieldEditable('birthdate') && editFieldModal('birthdate')}
                            keyboardType="numeric"
                        />
                    </View>

                    {/* Address Field */}
                    <View style={styles.row}>
                        <Text style={styles.title}>Address</Text>
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            style={getFieldStyle('address')}
                            value={editProfile ? editField.address : userData.address}
                            editable={isFieldEditable('address')}
                            onChangeText={(value) => updateProfile('address', value)}
                            onPressIn={() => editProfile && !isFieldEditable('address') && editFieldModal('address')}
                        />
                    </View>
                    
                    {/* Email edit field shown when editing profile */}
                    {editProfile && (
                        <>
                            <View style={styles.row}>
                                <Text style={styles.title}>Email</Text>
                            </View>
                            <View style={styles.row}>
                                <TextInput
                                    style={getFieldStyle('email')}
                                    value={editProfile ? editField.email : userData.email}
                                    editable={isFieldEditable('email')}
                                    onChangeText={(value) => updateProfile('email', value)}
                                    onPressIn={() => editProfile && !isFieldEditable('email') && editFieldModal('email')}
                                />
                            </View>
                        </>
                    )}

                    {/* Edit Profile buttons shown when editing account */}
                    {editProfile && (
                        <View style={[styles.rowButton, {marginTop: 10}]}>
                            <Button
                                title={<Text style={[styles.buttonText, {fontSize: 20}]}>Save</Text>}
                                width={168}
                                height={60}
                                style={styles.button}
                                variant="primary"
                                onPress={saveProfileUpdate}
                            />
                            <Button
                                title={<Text style={[styles.buttonText, {fontSize: 20}]}>Cancel</Text>}
                                width={168}
                                height={60}
                                style={styles.button}
                                variant="primary"
                                onPress={() => {
                                    setEditProfile(false);
                                    setEditField({ ...userData });
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
                                    width={105}
                                    height={60}
                                    style={styles.button}
                                    variant="primary"
                                    onPress={() => router.push('/reset')}
                                />
                                <Button
                                    title={<Text style={styles.buttonText}>Logout</Text>}
                                    width={105}
                                    height={60}
                                    style={styles.button}
                                    variant="primary"
                                    onPress={logout}
                                />
                                <Button
                                    // Intentional spacing to center button text
                                    title={<Text style={styles.buttonText}>   Delete Account</Text>}
                                    width={105}  
                                    height={60}
                                    style={[styles.button, {paddingHorizontal: 20}]}
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
    container: {
        backgroundColor: Colors.default.secondary,
        borderColor: Colors.default.border,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        margin: 3,
        marginTop: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
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
        paddingHorizontal: 15,
    },
    buttonText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 16,
    },
    rowButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 7,
        marginRight: 7,
        marginTop: 2,
    },
    disabledTextBox: {
        color: '#777777',
        backgroundColor: '#B2AEAE',
    },
    keyboardView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
});