import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import {Colors} from "../constants/Colors";
import {useRouter} from "expo-router";
import Button from '../components/ui/Button';
import { authAPI } from '../api/auth';
import { useForm, Controller } from 'react-hook-form';

export default function ResetPassword(){
    const [sending, setSending] = useState(false); // state for sending email
    const router = useRouter();

    // React Hook Form setup
    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            email: ''
        }
    });

    const onSubmit = async (data) => {
        setSending(true);

        try {
            // Send password reset email request
            await authAPI.resetPasswordRequest(data.email);

            Alert.alert(
                'Success', 
                'Password reset email has been sent! Please check your email.',
                [
                    {
                        text: 'OK',
                        onPress: () => router.push('/login')
                    }
                ]
            );

        } catch (error) {
            console.error('Reset password error:', error);
            
            if (error.response?.status === 404) {
                Alert.alert(
                    'User Not Found', 
                    'No account found with this email. Please sign up for a new account.'
                );
            } else {
                Alert.alert(
                    'Reset Failed', 
                    error.response?.data || 'Failed to send reset email. Please try again.'
                );
            }
        } finally {
            setSending(false);
        }
    };

    return(
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}} keyboardShouldPersistTaps="handled">
                    <View style={styles.card}>
                        <Text style={styles.title}>Reset Password</Text>
                        <Text style={styles.subtitle}>You will receive an email with a link</Text>
                        <Text style={[styles.subtitle, {marginTop: -27}]}> to reset your password.</Text>

                        <Text style={styles.label}>Email Address</Text>
                        {/* Email Field */}
                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address'
                                }
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View>
                                    <TextInput
                                        style={[styles.input, errors.email && styles.inputError]}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="user@example.com"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        placeholderTextColor="gray"
                                        autoCorrect={false}
                                    />
                                    {errors.email && (
                                        <Text style={styles.errorText}>{errors.email.message}</Text>
                                    )}
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Button
                title={sending ? "Sending..." : "Send Reset Email"}
                onPress={handleSubmit(onSubmit)}
                fullWidth
                height={50}
                style={styles.buttonSpacing}
                disabled={sending}
            />
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
        fontSize: 20,
        color: Colors.default.textWhite,
        textAlign: 'center',
        marginBottom: 35,    
        fontFamily: 'InstrumentSans',
    },
    title: {
        fontSize: 25,
        color: Colors.default.titlesSelected,
        textAlign: 'center',
        margin: 30,
        fontFamily: 'InstrumentSans-Bold',
    },
    label:{
        fontSize: 16,
        color: Colors.default.textWhite,
        marginTop: 40,
        marginBottom: 10,
        fontFamily: 'InstrumentSans',
    },
    input:{
        backgroundColor: Colors.default.textBox,
        color: Colors.default.textBlack,
        borderRadius: 5,
        height: 45,
        padding: 10,
        marginBottom: 16,
        fontFamily: 'InstrumentSans',
    },
    inputError: {
        borderColor: '#ff6b6b',
        borderWidth: 2,
    },
    errorText: {
        color: '#ff6b6b',
        fontSize: 16,
        marginTop: -10,
        marginBottom: 10,
        fontFamily: 'InstrumentSans',
    },
    buttonSpacing:{
        marginTop: 20,
        marginBottom: 10,

    }
});


