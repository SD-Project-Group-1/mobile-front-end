import React, {useEffect, useRef, useState} from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from "../../constants/Colors"

export default function Button({
                                   title,
                                   onPress,
                                   variant = 'primary',
                                   width,
                                   height,
                                   style,
                                   fullWidth = false
                               }) {
    const [isHovered, setIsHovered] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isHovered ? 1 : 0,
            duration: 95,
            useNativeDriver: false,
        }).start();
    }, [isHovered]);

    const getBackgroundColor = () => {
        switch (variant) {
            case 'primary':
                return animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                        Colors.button.default || '#FFD700',
                        Colors.button.hover || '#87FBFF']
                });
            default:
                return Colors.button.default;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
            activeOpacity={.9}
        >
            <Animated.View
                style={[
                    styles.button,
                    fullWidth && styles.fullWidth,
                    {
                        backgroundColor: getBackgroundColor(),
                        width: width,
                        height: height,
                    },
                    style
                ]}
            >
                <Text style={[
                    styles.text,
                    styles[`${variant}Text`],
                    isHovered && styles[`${variant}TextHover`]
                ]}>
                    {title}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: Colors.button.default,
    },
    primaryHover: {
        backgroundColor: Colors.default.hover,
    },
    fullWidth: {
        width: '100%',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.default.button,

    },
    primaryText: {
        color: Colors.default.textBlack,
    },
    primaryTextHover: {
        color: Colors.default.textBlack,
    },
});