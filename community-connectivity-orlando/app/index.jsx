import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { router } from 'expo-router';
import Button from '../components/ui/Button';
import { Colors } from "../constants/Colors"
import { useForm, Controller } from 'react-hook-form';
import { authAPI } from '../api/auth.js';

export default function SignUp() {

    {/* For now this is what I'm going with and I gonna need to ask
     for some clarity during our meeting on how much front-end validation there should be...*/}
    const {
        control,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: {
            formFName: '',
            formLName: '',
            formEmail: '',
            formPassword: '',
            formDOB: '',
            formPhoneNum: '',
            formAddress1: '',
            formAddress2: '',
            formCity: '',
            formState: '',
            formZip: ''
        }
    });
    
    // Submit form data to backend
    const onSubmit = async (data) => {
        try {
            // Split into first and last name
            const splitName = data.formName.trim().split(' ');
            const firstName = splitName[0] || '';
            const lastName = splitName.slice(1).join(' ') || '';

            // Transform form data to match backend expectations
            const userData = {
                email: data.formEmail,
                password: data.formPassword,
                first_name: firstName,
                last_name: lastName,
                phone: data.formPhoneNum,
                street_address: data.formAddress1,
                city: data.formCity,
                state: data.formState,
                zip_code: data.formZip,
                dob: data.formDOB
            };
    
            await authAPI.signup(userData);
            Alert.alert('Success', 'Account created! Please login.');
            router.push('/login');
            reset();
        } catch (error) {
            console.error('Signup error:', error);
            Alert.alert(
                'Signup Failed', 
                error.response?.data || 'Signup failed because of an error. Please try again.'
            );
        }
    };

    return (

        <View style={styles.container}>
            <Text style={styles.text}>Community Resource Center</Text>
            <Text style={styles.title}>Create Your</Text>
            <Text style={styles.title}>Account</Text>

            <ScrollView style={styles.column}>
                {/* Name Field */}
                <Controller
                    control={control}
                    name="formName"
                    rules={{
                        required: 'Full name is required',
                        minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                        },
                        // Validate that there is first and last name
                        validate: (value) => {
                            const splitName = value.trim().split(' ');
                            if (splitName.length < 2) {
                                return 'Please enter both first and last name';
                            }
                            return true;
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View
                            style={styles.fieldContainer}
                        >
                            <TextInput
                                style={[styles.input, errors.formName && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Full Name"
                                placeholderTextColor="gray"
                            />
                            {errors.formName && (
                                <Text style={styles.errorText}>{errors.formName.message}</Text>
                            )}
                        </View>
                    )}
                />

                {/* Email Field */}
                <Controller
                    control={control}
                    name="formEmail"
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input, errors.formEmail && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor="gray"
                            />
                            {errors.formEmail && (
                                <Text style={styles.errorText}>{errors.formEmail.message}</Text>
                            )}
                        </View>
                    )}
                />


                {/* Password Field */}
                <Controller
                    control={control}
                    name="formPassword"
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters'
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input, errors.formPassword && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Password"
                                secureTextEntry={true}
                                placeholderTextColor="gray"
                            />
                            {errors.formPassword && (
                                <Text style={styles.errorText}>{errors.formPassword.message}</Text>
                            )}
                        </View>
                    )}
                />

                {/* DOB Field */}
                <Controller
                    control={control}
                    name="formDOB"
                    rules={{
                        required: 'Date of birth is required'
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input, errors.formDOB && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="mm/dd/yyyy"
                                keyboardType="numeric"
                                minLength={8}
                                maxLength={10}
                                placeholderTextColor="gray"
                            />
                            {errors.formDOB && (
                                <Text style={styles.errorText}>{errors.formDOB.message}</Text>
                            )}
                        </View>
                    )}
                />


                {/* Phone Field */}
                <Controller
                    control={control}
                    name="formPhoneNum"
                    rules={{
                        required: 'Phone number is required',
                        pattern: {
                            value: /^[0-9+\-\s()]+$/,
                            message: 'Invalid phone number'
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input, errors.formPhoneNum && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Phone Number"
                                keyboardType="numeric"
                                placeholderTextColor="gray"
                                maxLength={12}
                                minLength={10}
                            />
                            {errors.formPhoneNum && (
                                <Text style={styles.errorText}>{errors.formPhoneNum.message}</Text>
                            )}
                        </View>
                    )}
                />

                {/* Address 1 Field */}
                <Controller
                    control={control}
                    name="formAddress1"
                    rules={{
                        required: 'Address is required'
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input, errors.formAddress1 && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Address"
                                placeholderTextColor="gray"
                            />
                            {errors.formAddress1 && (
                                <Text style={styles.errorText}>{errors.formAddress1.message}</Text>
                            )}
                        </View>
                    )}
                />

                {/* Address 2 Field */}
                <Controller
                    control={control}
                    name="formAddress2"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Address 2"
                                placeholderTextColor="gray"
                            />
                        </View>
                    )}
                />

                {/* City Field */}
                <Controller
                    control={control}
                    name="formCity"
                    rules={{
                        required: 'City is required'
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="City"
                                keyboardType="default"
                                autoCapitalize="words"
                                placeholderTextColor="gray"
                            />
                            {errors.formCity && (
                                <Text style={styles.errorText}>{errors.formCity.message}</Text>
                            )}
                        </View>
                    )}
                />

                {/* State Field */}
                <Controller
                    control={control}
                    name="formState"
                    rules={{
                        required: 'State is required'
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input, errors.formState && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="State (e.g. FL)"
                                keyboardType="default"
                                autoCapitalize="characters"
                                maxLength={2}
                                minLength={2}
                                placeholderTextColor="gray"
                            />
                            {errors.formState && (
                                <Text style={styles.errorText}>{errors.formState.message}</Text>
                            )}
                        </View>
                    )}
                />

                {/* ZIP Field */}
                <Controller
                    control={control}
                    name="formZip"
                    rules={{
                        required: 'ZIP code is required',
                        pattern: {
                            value: /^[0-9]+$/,
                            message: 'Invalid ZIP code'
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input, errors.formZip && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="ZIP Code"
                                keyboardType="phone-pad"
                                placeholderTextColor="gray"
                                maxLength={5}
                                minLength={5}
                            />
                            {errors.formZip && (
                                <Text style={styles.errorText}>{errors.formZip.message}</Text>
                            )}
                        </View>
                    )}
                />


            </ScrollView>
            <View style={styles.footer}>
            <Button
                title="Sign Up"
                height={66}
                onPress={handleSubmit(onSubmit)}
            />
                <View style={styles.row}>
                    <Text style={styles.link}>
                        Already have an account?
                    </Text>

                    <TouchableOpacity onPress={() => router.push('/login')}>
                        <Text style={styles.link}>  Login</Text>
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
        justifyContent: 'flex-start',
    },
    column: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 36,
        marginBottom: 20,

    },
    footer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    text: {
        marginTop: 21,
        color: Colors.default.textWhite,
        textAlign: 'center',
        fontSize: 20,
        margin: 17,

    },
    title: {
        fontFamily: 'InstrumentSans-Bold',
        fontWeight: 'bold',
        fontSize: 28,
        color: Colors.default.titlesSelected,
        textAlign: 'center',
    },
    input: {
        backgroundColor: Colors.default.textBox,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 19,
    },
    link: {
        fontFamily: 'InstrumentSans',
        fontSize: 18,
        color: Colors.default.link,
        marginTop: 15,
    },
    fieldContainer: {
        marginBottom: 9,
        backgroundColor: Colors.default.textBox,
        height: 45,
        borderRadius: 5,
    },
    inputError: {
        borderColor: '#ff6b6b',
    },
    errorText: {
        color: '#ff6b6b',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});