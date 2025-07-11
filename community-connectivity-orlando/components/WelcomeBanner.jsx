import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity, Image} from 'react-native';
import {Colors} from "../constants/Colors";


export default function WelcomeBanner() {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const animatedHeight = useRef(new Animated.Value(363)).current;
    const animatedOpacity = useRef(new Animated.Value(1)).current;
    const hoverAnimation = useRef(new Animated.Value(0)).current;

    const toggleBanner = () => {
        const toHeight = isMinimized ? 363 : 63;
        const toOpacity = isMinimized ? 1 : 0;

        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue: toHeight,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(animatedOpacity, {
                toValue: toOpacity,
                duration: 200,
                useNativeDriver: false,
            })
        ]).start();

        setIsMinimized(!isMinimized);
    };

    const handleButtonPressIn = () => {
        setIsHovered(true);
        Animated.timing(hoverAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleButtonPressOut = () => {
        setIsHovered(false);
        Animated.timing(hoverAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const animatedBackgroundColor = hoverAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.banner.primary, Colors.banner.secondary]
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[
                styles.banner,
                {
                    height: animatedHeight,
                    backgroundColor: animatedBackgroundColor
                }
            ]}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome</Text>
                    <TouchableOpacity
                        onPress={toggleBanner}
                        style={styles.closeButton}
                        onPressIn={handleButtonPressIn}
                        onPressOut={handleButtonPressOut}
                    >
                        <Text style={styles.closeButtonText}>
                            {isMinimized ? 'Unhide?' : 'Hide?'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Animated.View style={[styles.content, { opacity: animatedOpacity }]}>
                    {/* Logo Section */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.subtitle}>
                        If you have low internet coverage in your area and need a WiFi ready device, then you're in the right place!
                        If you are in an eligible area, Orlando City will provide you with a free-to-rent device to offset the low internet coverage in your area.
                        Simply create an account, complete a form, and come pick up your device on your scheduled date!
                    </Text>
                </Animated.View>
            </Animated.View>
</View>
);
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    banner: {
        backgroundColor: Colors.banner.primary,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        overflow: 'hidden',
        borderColor: Colors.default.border,
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.default.textWhite,
    },
    closeButton: {
        padding: 4,
    },
    closeButtonText: {
        color: Colors.default.textWhite,
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        marginTop: 8,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 8,
        marginTop: 8,
    },
    logo: {
        height: 100,
        backgroundColor: Colors.default.textWhite,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.default.textWhite,
        marginBottom: 8,
    },
});