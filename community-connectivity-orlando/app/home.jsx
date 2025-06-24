import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


//import { WelcomeBanner } from '../components/WelcomeBanner';
//import { ProfileIconHome } from '../components/ProfileIconHome';
//import { OrderStatus } from '../components/OrderStatus';
//import { PreviousOrder } from '../components/PreviousOrder';
import Button from '../components/ui/Button';
import {Colors} from "../constants/Colors";


export default function Home() {
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
        backgroundColor: Colors.default.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
