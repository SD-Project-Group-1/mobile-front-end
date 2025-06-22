import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function PageHeader({ title = 'Title' }) {
    return (
        <View>
            <View style={styles.headerRow}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity style={styles.backButton} />
            </View>
            <View style={styles.seperator}/>
        </View>
    );
}
const styles = StyleSheet.create({
    seperator: {
        borderBottomColor: Colors.default.boarder,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 24,
        color: Colors.default.titlesSelected,
        marginLeft: 6,
    },
    backButton: {
        backgroundColor: Colors.button.default,
        padding: 19,
        margin: 6,
        marginRight: 14,
        borderRadius: 10,
    },
});