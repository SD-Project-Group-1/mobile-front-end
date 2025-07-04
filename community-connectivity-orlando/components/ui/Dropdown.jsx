import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Modal, FlatList, StyleSheet, Animated } from 'react-native';
import {Colors} from '../../constants/Colors';

export default function Dropdown({
                                     data = [],
                                     placeholder = "Select an option",
                                     onSelect,
                                     selectedValue,
                                     style,
                                     dropdownStyle,
                                     optionStyle,
                                     textStyle,
                                     disabled = false,
                                     maxHeight = 200
                                 }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const animatedValue = useRef(new Animated.Value(0)).current;

    const handleSelect = (item) => {
        onSelect(item);
        setIsOpen(false);
    };

    const shouldAnimate = isPressed || isOpen;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: shouldAnimate ? 1 : 0,
            duration: 300, // Adjust duration as needed
            useNativeDriver: false,
        }).start();
    }, [shouldAnimate]);

    const getBackgroundColor = () => {
        return animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [
                Colors.dropdown.default || '#f0f0f0',
                Colors.dropdown.selected || '#007AFF'
            ]
        });
    };

    const displayValue = selectedValue || placeholder;

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity
                onPress={() => !disabled && setIsOpen(!isOpen)}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                disabled={disabled}
                activeOpacity={1}
            >
                <Animated.View
                    style={[
                        styles.dropdown,
                        disabled && styles.disabled,
                        {
                            backgroundColor: getBackgroundColor(),
                        },
                        dropdownStyle,
                    ]}
                >
                    <Text style={[
                        styles.text,
                        textStyle,
                        !selectedValue && styles.placeholderText
                    ]}>
                        {displayValue}
                    </Text>
                    <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
                </Animated.View>
            </TouchableOpacity>

            <Modal
                visible={isOpen}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setIsOpen(false)}
                >
                    <View style={[styles.optionsList, { maxHeight }]}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        optionStyle,
                                        hoveredIndex === index && styles.optionHover,
                                        selectedValue === (typeof item === 'object' ? item.value : item) && styles.optionSelected
                                    ]}
                                    onPress={() => handleSelect(item)}
                                    onPressIn={() => setHoveredIndex(index)}
                                    onPressOut={() => setHoveredIndex(null)}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        textStyle,
                                        selectedValue === (typeof item === 'object' ? item.value : item) && styles.optionTextSelected
                                    ]}>
                                        {typeof item === 'object' ? item.label : item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    disabled: {
        backgroundColor: '#f5f5f5',
        opacity: 0.6,
    },
    text: {
        fontSize: 16,
        flex: 1,
    },
    placeholderText: {
        color: Colors.dropdown.text,
    },
    arrow: {
        fontSize: 12,
        color: Colors.dropdown.text,
    },
    overlay: {
        flex: 1,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionsList: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        width: '80%',
        maxHeight: 200,
    },
    option: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    optionHover: {
        backgroundColor: '#f0f0f0',
    },
    optionSelected: {
        backgroundColor: Colors.dropdown.selected || '#007AFF',
    },
    optionText: {
        fontSize: 16,
    },
    optionTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
});