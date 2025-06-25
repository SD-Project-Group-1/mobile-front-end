import {SplashScreen, Stack} from 'expo-router';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { Colors } from "../constants/Colors"
import {View} from "react-native";

SplashScreen.preventAutoHideAsync();

//This is going to cause the most problems for sure in the future, this needs changes but, for now we've got everything we need for now...
export default function RootLayout() {
    const [loaded, error] = useFonts({
        InstrumentSans: require('../assets/fonts/InstrumentSans-VariableFont_wdth,wght.ttf'),
        InstrumentSansItalic: require('../assets/fonts/InstrumentSans-Italic-VariableFont_wdth,wght.ttf'),
        InstrumentSansBold: require('../assets/fonts/InstrumentSans-Bold.ttf'),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <View style={{ flex: 1 }}>
                <Stack
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: Colors.default.background,
                        },
                        headerTintColor: Colors.default.titlesSelected,
                        headerShadowVisible: false,
                    }}
                >
                    <Stack.Screen
                        name="index"
                        options={{ title: 'Sign Up' }}
                    />
                    <Stack.Screen
                        name="login"
                        options={{ title: 'Login' }}
                    />
                    <Stack.Screen
                        name="home"
                        options={{ title: 'Home' }}
                    />
                    <Stack.Screen
                        name="profile"
                        options={{ title: 'Profile' }}
                    />
                    {/* Add more screens as needed */}
                </Stack>
                <View
                    style={{
                        height: 1,
                        backgroundColor: Colors.default.titlesSelected,
                        position: 'absolute',
                        top: 90,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                    }}
                />
            </View>
        </SafeAreaProvider>
    );
}