import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//import Dropdown from '../components/ui/Dropdown';
import Button from '../components/ui/Button';
//import PickupDetails from '../components/PickupDetails';
//import YourInfo from '../components/YourInfo';


export default function Request() {
    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'InstrumentSans' }}>
                Testing the font! fill lol
            </Text>
            <StatusBar style="auto" />
            <Button
                title="Test"
                width={200}
                variant="primary"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
