import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, Alert, Modal, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from "../constants/Colors";

export default function ProfileIconInside({ profilePic, firstName }) {
    // Removes the update photo button when true
    const [isDisabled, setIsDisabled] = useState(false);
    // Modal popup for update photo
    const [editPicModal, setEditPicModal] = useState(false);
    // Profile image
    const [profileImage, setProfileImage] = useState(null);

    const requestLibraryPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant permissions to select a photo.');
            return false;
        }
        return true;
    };

    const requestCameraPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant permissions to take a photo.');
            return false;
        }
        return true;
    };

    // Updates profile picture from library
    const library = async () => {
        const hasPermission = await requestLibraryPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets[0]) {
            setProfileImage({ uri: result.assets[0].uri });
            if (profilePic) {
                profilePic(result.assets[0].uri);
            }
        }
        setEditPicModal(false);
    };

    // Updates profile picture from camera
    const camera = async () => {
        const hasPermission = await requestCameraPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setProfileImage({ uri: result.assets[0].uri });
            if (profilePic) {
                profilePic(result.assets[0].uri);
            }
        }
        setEditPicModal(false);
    };

    return (
        <View style={styles.container}>
            {/* Profile Picture */}
            {profileImage ? (
                <Image 
                    source={profileImage}
                    style={styles.profilePic}
                    resizeMode="cover"
                />
            ) : (
                // Default profile picture
                <View style={styles.defaultProfilePic}>
                    <Text style={styles.defaultProfileText}>
                        {firstName ? firstName.charAt(0).toUpperCase() : ''}
                    </Text>
                </View>
            )}
            {/* Update photo button disabled when true */}
            {!isDisabled && (
                <TouchableOpacity 
                    style={styles.updatePicButton}
                    onPress={() => setEditPicModal(true)}
                >
                    <Text style={styles.updatePicButtonText}>+</Text>
                </TouchableOpacity>
            )}

            {/* Update Profile Picture Modal */}
            <Modal
                visible={editPicModal}
                transparent
                animationType="slide"
                onRequestClose={() => setEditPicModal(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setEditPicModal(false)}
                >
                    <Pressable
                        style={styles.modalContainer}
                        onPress={(e) => e.stopPropagation()}
                    >
                        {/* Update Photo Modal Buttons */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.photoLibraryButtons}
                                onPress={camera}
                            >
                                <Text style={styles.modalButtonText}>Take a photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.photoLibraryButtons}
                                onPress={library}
                            >
                                <Text style={styles.modalButtonText}>Choose from library</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setEditPicModal(false)}
                        >
                            <Text style={[styles.modalButtonText, {fontFamily: 'InstrumentSans-Bold'}]}>Cancel</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 100,
        height: 100,
        alignItems: 'center',
    },
    defaultProfilePic: {
        height: 90,
        width: 90,
        borderRadius: 90 / 2,
        backgroundColor: "#D9D9D9",
        justifyContent: 'center',
        alignItems: 'center',
    },
    defaultProfileText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: Colors.default.textBlack,
    },
    profilePic: {
        height: 90,
        width: 90,
        borderRadius: 90 / 2,
    },
    updatePicButton: {
        position: 'absolute',
        bottom: 5,
        right: 3,
        backgroundColor: Colors.button.default,
        height: 32,
        width: 32,
        borderRadius: 32 / 2,
        borderWidth: 2,
        borderColor: Colors.button.text,
    },
    updatePicButtonText: {
        textAlign: 'center',
        fontSize: 22,
        color: Colors.button.text,
    },
    // Edit Profile Picture Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
    },
    modalContainer: {
        backgroundColor: 'transparent',
        padding: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        backgroundColor: Colors.button.default,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 7,
    },
    photoLibraryButtons: {
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
    },
    cancelButton: {
        backgroundColor: Colors.button.default,
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 18,
    },
    modalButtonText: {
        fontSize: 18,
        color: Colors.button.text,
        fontFamily: 'InstrumentSans',
    },
});