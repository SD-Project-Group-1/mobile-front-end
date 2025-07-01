import {router, SplashScreen, Stack, useRouter} from 'expo-router';
import { useFonts } from 'expo-font';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { Colors } from "../constants/Colors"
import {View} from "react-native";
import Button from "../components/ui/Button";
import ProfileIconInside from "../components/ProfileIconInside";
import ProfileIconHome from "../components/ProfileIconHome";



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const insets = useSafeAreaInsets();

    const BackButton = () => {
        const router = useRouter();
        return <Button
            title="<"
            height={40}
            width={40}
            onPress={() => router.back()}/>;
    };


    const ProfileIcon = () => {
        return <ProfileIconHome/>;
    };


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
            <View style={{ flex: 1}}>
                <Stack
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: Colors.default.background,
                        },
                        headerTintColor: Colors.default.titlesSelected,
                        headerShadowVisible: false,
                        headerBackVisible: false,
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
                        options={{
                            title: 'Home',
                            headerRight: () => <ProfileIcon />,
                        }}
                    />
                    <Stack.Screen
                        name="profile"
                        options={{
                            title: 'Profile',
                            headerRight: () => <BackButton />,
                        }}
                    />
                    <Stack.Screen
                        name="request"
                        options={{
                            title: 'Your Order',
                            headerRight: () => <BackButton />,
                        }}
                    />
                    {/* Add more screens as needed */}
                </Stack>
                <View
                    style={{
                        height: 1,
                        backgroundColor: Colors.default.titlesSelected,
                        position: 'absolute',
                        top: insets.top + 55,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                    }}
                />
            </View>
        </SafeAreaProvider>
    );
}