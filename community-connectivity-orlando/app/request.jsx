import { StyleSheet, Text, View } from 'react-native';

//import Dropdown from '../components/ui/Dropdown';
import Button from '../components/ui/Button';
import {Colors} from "../constants/Colors";
import {router} from "expo-router";
//import PickupDetails from '../components/PickupDetails';
//import YourInfo from '../components/YourInfo';


export default function Request() {
    return (
        <View style={styles.container}>

            {/* <YourInfo/> */}

            <Text style={styles.title}>
                Testing the font! fill lol
            </Text>

            {/*
            <ScrollView
                <PickupDetails/>
            </ScrollView>
             */}

            <View style={styles.footer}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Place Order"
                        height={80}
                        onPress={() => {
                            router.push('/home');
                        }}                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.default.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        color: Colors.default.titlesSelected,
        textAlign: 'left',
        paddingLeft: 25,
        paddingBottom: 19,
    },
    footer: {
        position: 'absolute',
        bottom: 80,
        borderTopWidth: 1,
        borderTopColor: Colors.default.border,
        paddingTop: 19,
        left: 0,
        right: 0,
    },
    buttonContainer: {
        flex: 1,
        paddingHorizontal: 25,
    },
});
