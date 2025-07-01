import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {Colors} from "../constants/Colors";
import {useRouter} from "expo-router";
import Button from '.../components/ui/Button'


export default function ResetPassword(){
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleReset = () => {
        if(newPassword === confirmPassword){

        console.log("Your password has been reset successfully!")
    }
    else{
        alert("Your password's do not match ");
    }
    };

    return(
        <View style ={styles.container}>
            <View style = {styles.card}>
                <Text style = {styles.label}>Reset Password</Text>
                <Text style = {styles.subtitle}>Please enter a New Password</Text>

                <Text style = {styles.label}>New Password</Text>
                <TextInput
                style = {styles.input}
                secureText
                placeholder = "Password"
                onChangeText = {setNewPassword}
                value = {newPassword}
                />

                <Text style = {styles.label}> Confirm New Password </Text>
                <TextInput
                style = {styles.input}
                secureText
                placeholder = "Password"
                onChangeText = {setConfirmPassword}
                value = {confirmPassword}
                />

                <Button
                title = "Reset Password"
                onPress = {handleReset}
                fullWidth
                height = {50}
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
        borderRadius: 10,
        padding: 18,
        borderWidth: 1,
        borderColor:Colors.default.border,
    },
    subtitle: {
        color: Colors.default.textWhite,
        textAlign: 'center',
        marginBottom: 20,    
    },
    title: {
        fontSize: 20,
        color: Colors.default.titlesSelected,
        textAlign: 'center',
        marginBottom: 10,
    },
    label:{
        color: Colors.default.textWhite,
        marginBottom: 6,
    },
    input:{
        backgroundColor: Colors.default.textBox,
        color: Colors.default.textBlack,
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
    },
});

