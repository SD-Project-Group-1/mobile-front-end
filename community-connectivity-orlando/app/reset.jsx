import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from "../constants/Colors";
import Button from '../components/ui/Button';

export default function Reset() {
    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'InstrumentSans' }}>
                Testing the font for reset screen! fill lol
            </Text>
            <StatusBar style="auto" />
            <Button
                title="Test Reset Screen"
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
