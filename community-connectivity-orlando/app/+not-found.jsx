import { Text, View, StyleSheet } from 'react-native';
import {Colors} from "../constants/Colors";
import Button from '../components/ui/Button';

export default function NotFoundScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Page not found</Text>
            <Button
                title="Go home"
                onPress={() => router.push('/')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.default.background,
        justifyContent: 'flex-start',
    },
    text: {
        fontSize:18,
        marginBottom:20
    },
});
