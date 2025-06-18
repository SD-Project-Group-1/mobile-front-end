// app/+not-found.jsx
import { Text, View, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

//Placeholder this needs changes
export default function NotFoundScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Page not found xd</Text>
            <Button title="Go home" onPress={() => router.push('/')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex:1,alignItems:'center',justifyContent:'center' },
    text: { fontSize:18, marginBottom:20 },
});
