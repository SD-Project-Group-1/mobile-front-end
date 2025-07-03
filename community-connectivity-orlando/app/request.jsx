import {ScrollView, StyleSheet, View} from 'react-native';
//import Dropdown from '../components/ui/Dropdown';
import Button from '../components/ui/Button';
import {Colors} from "../constants/Colors";
import {router} from "expo-router";
import PickupDetails from '../components/PickupDetails';
import YourInfo from '../components/YourInfo';


export default function Request() {
    return (
        <View style={styles.container}>
            <PickupDetails/>

            <ScrollView
                style={styles.scrollView}
            >
                <YourInfo/>
            </ScrollView>

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
        backgroundColor: Colors.default.background,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
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
    buttonContainer: {
        flex: 1,
        paddingHorizontal: 25,
    },
    scrollView: {
        width: '100%',
        flexGrow: 2,
        marginBottom: 35,
    },
});
