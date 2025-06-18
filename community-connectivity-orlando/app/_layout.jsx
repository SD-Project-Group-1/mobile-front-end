import { Slot, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

//This is going to cause the most problems for sure in the future, this needs changes but, for now we've got everything we need for now...
export default function RootLayout() {
    const [loaded, error] = useFonts({
        InstrumentSans: require('../assets/fonts/InstrumentSans-VariableFont_wdth,wght.ttf'),
        InstrumentSansItalic: require('../assets/fonts/InstrumentSans-Italic-VariableFont_wdth,wght.ttf'),
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
            <Slot />
        </SafeAreaProvider>
    );
}