import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform} from 'react-native';
import { router } from 'expo-router';
import Button from '../components/ui/Button';
import { Colors } from "../constants/Colors"
import { useForm, Controller } from 'react-hook-form';
import { authAPI } from '../api/auth.js';
import { validateAge } from '../hooks/useValidation';

export default function SignUp() {

   const {
        control,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: {
            formName: '',
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
            // Age validation (still before signup)
            const age = await validateAge(data.formDOB);
            if (!age.valid) {
                Alert.alert('Signup Failed', age.message);
                return;
            }
            // Split into first and last name
            const splitName = data.formName.trim().split(' ');
            const formFName = splitName[0] || '';
            const formLName = splitName.slice(1).join(' ') || '';

            // Organize form data to match backend user table
            const userData = {
                email: data.formEmail,
                password: data.formPassword,
                first_name: formFName,
                last_name: formLName,
                phone: data.formPhoneNum,
                street_address: data.formAddress1 + (data.formAddress2 ? (" " + data.formAddress2) : ""),
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
            console.error('Signup error:', error.response?.data?.error);
            Alert.alert(
                'Signup Failed', 
                `${error.response?.data?.error}. Must be within service area to sign up.` || 'Signup failed because of an error. Please try again.'
            );
        }
    };

    const formatDOB = (dob) => {
        if (!dob) return '';
        const splitDOB = dob.split('.');
        if (splitDOB.length === 3) {
            const month = splitDOB[0].padStart(2, '0');
            const day = splitDOB[1].padStart(2, '0');
            const year = splitDOB[2];
            return `${month}-${day}-${year}`;
        }
        return dob;
    };

    const formatPhoneNum = (number) => {
        if (!number) return '';
        const splitPhone = number.split('.');
        if (splitPhone.length === 3) {
            const areaCode = splitPhone[0];
            const middle = splitPhone[1];
            const last = splitPhone[2];
            return `${areaCode}-${middle}-${last}`;
        }
        return number;
    };
    

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <Text style={styles.text}>Community Resource Center</Text>
                <Text style={styles.title}>Create Your</Text>
                <Text style={styles.title}>Account</Text>

                <ScrollView style={styles.column} keyboardShouldPersistTaps="handled">
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
                            <View>
                                <TextInput
                                    style={[styles.input, errors.formName && styles.inputError]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Full Name"
                                    placeholderTextColor="gray"
                                />
                                {errors.formName && (
                                    <Text style={[styles.errorText, {marginTop: 15}]}>{errors.formName.message}</Text>
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
                            <View>
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
                                    <Text style={[styles.errorText, {marginTop: 15}]}>{errors.formEmail.message}</Text>
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
                                message: 'Password must have at least 8 characters'
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
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
                                    <Text style={[styles.errorText, {marginTop: 15}]}>{errors.formPassword.message}</Text>
                                )}
                            </View>
                        )}
                    />

                    {/* DOB Field */}
                    <Controller
                        control={control}
                        name="formDOB"
                        rules={{
                            required: 'Date of birth is required',
                            pattern: {
                                value: /^[0-9+\-\s()]+$/,
                                message: 'Invalid DOB'
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <TextInput
                                    style={[styles.input, errors.formDOB && styles.inputError]}
                                    onBlur={onBlur}
                                    onChangeText={(dob) => onChange(formatDOB(dob))}
                                    value={value}
                                    placeholder="mm-dd-yyyy (use 01.01.1990)"
                                    keyboardType="numeric"
                                    minLength={10}
                                    maxLength={10}
                                    placeholderTextColor="gray"
                                />
                                {errors.formDOB && (
                                    <Text style={[styles.errorText, {marginTop: 15}]}>{errors.formDOB.message}</Text>
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
                            <View>
                                <TextInput
                                    style={[styles.input, errors.formPhoneNum && styles.inputError]}
                                    onBlur={onBlur}
                                    onChangeText={(number) => onChange(formatPhoneNum(number))}
                                    value={value}
                                    placeholder="Phone Number (use 123.456.7890)"
                                    keyboardType="numeric"
                                    placeholderTextColor="gray"
                                    maxLength={14}
                                    minLength={14}
                                />
                                {errors.formPhoneNum && (
                                    <Text style={[styles.errorText, {marginTop: 15}]}>{errors.formPhoneNum.message}</Text>
                                )}
                            </View>
                        )}
                    />

                    {/* Address 1 Field */}
                    <Controller
                        control={control}
                        name="formAddress1"
                        rules={{
                            required: 'Address is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters'
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <TextInput
                                    style={[styles.input, errors.formAddress1 && styles.inputError]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Address"
                                    placeholderTextColor="gray"
                                />
                                {errors.formAddress1 && (
                                    <Text style={[styles.errorText, {marginTop: 15}]}>{errors.formAddress1.message}</Text>
                                )}
                            </View>
                        )}
                    />

                    {/* Address 2 Field */}
                    <Controller
                        control={control}
                        name="formAddress2"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <TextInput
                                    style={[styles.input]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Address 2 (Optional)"
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
                            required: 'City is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters'
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <TextInput
                                    style={[styles.input, errors.formCity && styles.inputError]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="City"
                                    keyboardType="default"
                                    autoCapitalize="words"
                                    placeholderTextColor="gray"
                                />
                                {errors.formCity && (
                                    <Text style={[styles.errorText, {marginTop: 15}]}>{errors.formCity.message}</Text>
                                )}
                            </View>
                        )}
                    />

                    {/* State Field */}
                    <Controller
                        control={control}
                        name="formState"
                        rules={{
                            required: 'State is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters'
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
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
                                    <Text style={[styles.errorText, {marginTop: 15}]}>{errors.formState.message}</Text>
                                )}
                            </View>
                        )}
                    />

                    {/* ZIP Field */}
                    <Controller
                        control={control}
                        name="formZip"
                        rules={{
                            required: 'ZIP Code is required',
                            pattern: {
                                value: /^[0-9+\-\s()]+$/,
                                message: 'Invalid ZIP Code'
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
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
                                    <Text style={[styles.errorText, {marginTop: 15}]}>{errors.formZip.message}</Text>
                                )}
                            </View>
                        )}
                    />
                    {/* Scroll Space lmao */}
                    <View style={{ height: 250 }} />
                </ScrollView>
            </KeyboardAvoidingView>
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
        justifyContent: 'center',
    },
    column: {
        flexGrow: 2,
        paddingHorizontal: 20,
        paddingBottom: 200, // Account for footer height

    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderTopColor: Colors.default.border,
        paddingTop: 19,
        height: 200,
        backgroundColor: Colors.default.background,
        zIndex: 1,

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
        height: 45,
        marginTop: 20,
        marginBottom: -13,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: Colors.default.textBox,
        fontSize: 16,
    },
    link: {
        fontFamily: 'InstrumentSans',
        fontSize: 18,
        color: Colors.default.link,
        marginTop: 15,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
});