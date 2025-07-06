import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {Colors} from "../constants/Colors";
import {useRouter} from "expo-router";
import Button from '../components/ui/Button';
import { userAPI } from '../api/user';

export default function ResetPassword(){
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleReset = async () => {
        // Ensures passwords match
        if (newPassword !== confirmPassword) {
            console.log('Passwords do not match. Please try again.');
            Alert.alert('Error', 'Passwords do not match. Please try again.');
            return;
        }

        // Rule for password length
        if (newPassword.length < 8) {
            console.log('Password must be at least 8 characters long.');
            Alert.alert('Error', 'Password must be at least 8 characters long.');
            return;
        }

        try {
            // Backend endpoint to reset password
            await userAPI.resetPassword({
                newPassword: newPassword
            });

            Alert.alert(
                'Success', 
                'Password has been reset successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => router.push('/login')
                    }
                ]
            );

        } catch (error) {
            console.error('Reset password error:', error);
            
            // backend reset password is not implemented yet, checks if working
            if (error.response?.status === 500 && error.response?.data?.includes('Later')) {
                Alert.alert(
                    'Coming Soon', 
                    'Password reset is currently being worked on. Please try again later.',
                    [
                        {
                            text: 'OK',
                            onPress: () => router.push('/profile')
                        }
                    ]
                );
            } else {
                Alert.alert(
                    'Reset Failed', 
                    error.response?.data || 'Failed to reset password. Please try again.'
                );
            }
        } 
    };

    return(
        <View style ={styles.container}>
            <View style = {styles.card}>
                <Text style = {styles.title}>Reset Password</Text>
                <Text style = {styles.subtitle}>Please enter a New Password</Text>

                <Text style = {styles.label}>New Password</Text>
                <TextInput
                style = {styles.input}
                secureTextEntry={true}
                placeholder = "Password (min 8 characters)"
                onChangeText = {setNewPassword}
                value = {newPassword}
                />

                <Text style = {styles.label}> Confirm New Password </Text>
                <TextInput
                style = {styles.input}
                secureTextEntry={true}
                placeholder = "Confirm Password"
                onChangeText = {setConfirmPassword}
                value = {confirmPassword}
                />

                <Button
                title = "Reset Password"
                onPress = {handleReset}
                fullWidth
                height = {50}
                style = {styles.buttonSpacing}
                />
                
                </View>
             </View>
            
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.default.background,
        padding: 18,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: Colors.default.secondary,
        borderRadius: 5,
        padding: 18,
        borderWidth: 1,
        borderColor:Colors.default.border,
    },
    subtitle: {
        color: Colors.default.textWhite,
        textAlign: 'center',
        marginBottom: 30,    
        fontFamily: 'InstrumentSans',
    },
    title: {
        fontSize: 20,
        color: Colors.default.titlesSelected,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'InstrumentSans-Bold',
    },
    label:{
        color: Colors.default.textWhite,
        marginBottom: 18,
        fontFamily: 'InstrumentSans',
    },
    input:{
        backgroundColor: Colors.default.textBox,
        color: Colors.default.textBlack,
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
        fontFamily: 'InstrumentSans',
    },
    buttonSpacing:{
        marginTop: 20,
        marginBottom: 10,

    }
});


