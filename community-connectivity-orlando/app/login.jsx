import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Colors } from '../constants/Colors.js';

export default function Login() {
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <Text style={styles.text}>
                    Community Resource Center
                </Text>
                <Text style={styles.title}>Login to</Text>
                <Text style={styles.title}>Your Account</Text>
                <TextInput
                    style={styles.textBox}
                    value="Email"
                />
                <TextInput
                    style={styles.textBox}
                    value="Password"
                />
                <TouchableOpacity>
                    <Text style={[styles.link, styles.rightAlign]}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.button}>Login</Text>
                </TouchableOpacity>

                <View style={styles.row}>
                    <Text style={styles.link}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity>
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
        marginLeft: 15,
        marginRight: 15,
        marginBottom: -10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: Colors.default.textBox,
        fontSize: 16,
        fontFamily: 'InstrumentSans',
    },
    link: {
        fontFamily: 'InstrumentSans',
        fontSize: 18,
        color: Colors.default.link,
        marginTop: 15,
    },
    rightAlign: {
        textAlign: 'right',
        marginRight: 15,
    },
    button: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 24,
        color: Colors.default.textBlack,
        textAlign: 'center',
        marginTop: 35,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: Colors.button.default,
        padding: 15,
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
