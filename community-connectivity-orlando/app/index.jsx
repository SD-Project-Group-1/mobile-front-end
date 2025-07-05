import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { router } from 'expo-router';
import Button from '../components/ui/Button';
import { Colors } from "../constants/Colors"
import { useForm, Controller } from 'react-hook-form';



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

        const onSubmit = (data) => {
            Alert.alert('Form Submitted', JSON.stringify(data, null, 2));
            reset();
        };

    return (

        <View style={styles.container}>
            <Text style={styles.text}>Community Resource Center</Text>
            <Text style={styles.title}>Create Your</Text>
            <Text style={styles.title}>Account</Text>

            <ScrollView style={styles.column}>

                {/* First Name Field */}
                <Controller
                    control={control}
                    name="formFName"
                    rules={{
                        required: 'First name is required',
                        minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <TextInput
                                style={[styles.input, errors.formFName && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="First Name"
                            />
                            {errors.formFName && (
                                <Text style={[styles.errorText, {marginTop: 15}]}>{errors.formFName.message}</Text>
                            )}
                        </View>
                    )}
                />

                {/* Last Name Field */}
                <Controller
                    control={control}
                    name="formLName"
                    rules={{
                        required: 'Last name is required',
                        minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <TextInput
                                style={[styles.input, errors.formLName && styles.inputError]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Last Name"
                            />
                            {errors.formLName && (
                                <Text style={[styles.errorText, {marginTop: 15}]}>{errors.formLName.message}</Text>
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
                        required: 'DOB is required',
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
                                onChangeText={onChange}
                                value={value}
                                placeholder="Date of Birth (mm/dd/yyyy)"
                                keyboardType="phone-pad"
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
                                onChangeText={onChange}
                                value={value}
                                placeholder="Phone Number"
                                keyboardType="phone-pad"
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
                                placeholder="Address 1"
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
                                placeholder="State"
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
            <View style={styles.footer}>
            <Button
                title="Sign Up"
                height={66}
                onPress={() => {
                    handleSubmit(onSubmit)();
                    router.push('/login');
                }}
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