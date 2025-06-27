import { Text, View, StyleSheet, Button } from 'react-native';

//Placeholder this needs changes
export default function NotFoundScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Page not found</Text>
            <Button title="Go home" onPress={() => router.push('/')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex:1,alignItems:'center',justifyContent:'center' },
    text: { fontSize:18, marginBottom:20 },
});
