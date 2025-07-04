import {StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import { Colors } from '../constants/Colors.js';
import Button from '../components/ui/Button.jsx';
import {router} from "expo-router";
import { useForm, Controller } from 'react-hook-form';
import { authAPI } from '../api/auth.js';

export default function Login() {
    // React Hook Form setup
    const {
        control,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            await authAPI.login(data.email, data.password);
            Alert.alert('Success', 'Login successful!');
            router.push('/home');
            reset();
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert(
                'Login Failed', 
                error.response?.data || 'Login failed because of an error. Please try again.'
            );
        }
    };

    // The login form
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <Text style={styles.text}>Community Resource Center</Text>
                <Text style={styles.title}>Login to</Text>
                <Text style={styles.title}>Your Account</Text>
                    
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
                                style={[styles.textBox, errors.email && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="user@example.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor="gray"
                            />
                            {errors.email && (
                                <Text style={[styles.errorText, {marginTop: 15}]}>{errors.email.message}</Text>
                            )}
                        </View>
                    )}
                />

                {/* Password Field */}
                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must have at least 8 characters'
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <TextInput
                                style={[styles.textBox, errors.password && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Password"
                                secureTextEntry={true}
                                placeholderTextColor="gray"
                            />
                            {errors.password && (
                                <Text style={[styles.errorText, {marginTop: 15}]}>{errors.password.message}</Text>
                            )}
                        </View>
                    )}
                />

                {/* Forgot Password Link */}
                <TouchableOpacity>
                    <Text style={[styles.link, styles.rightAlign]}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <Button
                    title="Login"
                    height={66}
                    onPress={handleSubmit(onSubmit)}
                />

                {/* Sign Up Link */}
                <View style={styles.row}>
                    <Text style={styles.link}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/')}>
                        <Text style={styles.link}>  Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.default.background,
        paddingTop: 17,
        justifyContent: 'flex-start',
    },
    column: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'InstrumentSans',
        fontSize: 20,
        color: Colors.default.textWhite,
        margin: 8,
        textAlign: 'center',
    },
    title: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 28,
        color: Colors.default.titlesSelected,
        textAlign: 'center',
        marginTop: 5,
    },
    textBox: {
        height: 45,
        marginTop: 20,
        marginBottom: -13,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: Colors.default.textBox,
        fontSize: 16,
        fontFamily: 'InstrumentSans',
    },
    inputError: {
        borderColor: '#ff6b6b',
        borderWidth: 2,
    },
    errorText: {
        color: '#ff6b6b',
        fontSize: 16,
        marginLeft: 25,
        marginTop: -20,
    },
    link: {
        fontFamily: 'InstrumentSans',
        fontSize: 18,
        color: Colors.default.link,
        marginTop: 20,
        marginBottom: 20,
    },
    rightAlign: {
        textAlign: 'right',
        marginRight: 15,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    buttonText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 16,   
    },
    
});