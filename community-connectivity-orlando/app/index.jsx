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
                {/* Name Field */}
                <Controller
                    control={control}
                    name="formName"
                    rules={{
                        required: 'First name is required',
                        minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
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
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Password"
                            />
                        </View>
                    )}
                />

                {/* DOB Field */}
                <Controller
                    control={control}
                    name="formDOB"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Date of Birth (mm/dd/yyyy)"
                                keyboardType="phone-pad"
                            />
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
                                keyboardType="phone-pad"
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
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Address 1"
                            />
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
                            />
                        </View>
                    )}
                />

                {/* City Field */}
                <Controller
                    control={control}
                    name="formCity"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="City"
                            />
                        </View>
                    )}
                />

                {/* State Field */}
                <Controller
                    control={control}
                    name="formState"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="State"
                            />
                        </View>
                    )}
                />

                {/* ZIP Field */}
                <Controller
                    control={control}
                    name="formZip"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.input]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="ZIP Code"
                                keyboardType="phone-pad"
                            />
                        </View>
                    )}
                />


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