import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Button from '../components/ui/Button';
import Dropdown from '../components/ui/Dropdown';
import {useState} from "react";
import { Colors } from "../constants/Colors"


export default function SignUp() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ['Test1', 'Test2', 'Test3'];

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Testing the font! fill lol
            </Text>
            <StatusBar style="auto" />
            <Button
                title="Test Button"
                onPress={() => router.push('/home')}
                    />
            <Dropdown
                data={categories}
                placeholder="Choose category"
                selectedValue={selectedCategory}
                onSelect={setSelectedCategory}
                style={{ marginBottom: 20 }}
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
    text: {
        color: Colors.default.textWhite,
    },
});