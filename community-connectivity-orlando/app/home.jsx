import {ScrollView, StyleSheet, Text, View} from 'react-native';
import WelcomeBanner from '../components/WelcomeBanner';
import OrderStatus from '../components/OrderStatus';
import PreviousOrder from '../components/PreviousOrder';
import Button from '../components/ui/Button';
import {Colors} from "../constants/Colors";
import { router } from 'expo-router';
import {useState} from "react";


export default function Home() {
    const [pastOrders, setPastOrders] = useState(true);


    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <WelcomeBanner/>
                <Text style={styles.title}>
                    Order Status
                </Text>
                {/* This needs to take in values because currently it's static but not a huge problem */}
                <OrderStatus/>
                <Text style={styles.title}>
                    Previous Orders
                </Text>
                {/* Same Deal as OrderStatus */}
                <PreviousOrder
                    pastOrders={pastOrders}
                />
            </ScrollView>

            <View style={styles.shadowContainer}>
                <Button
                    title="Request a Device"
                    width={150}
                    height={50}
                    onPress={() => {
                        router.push('/request');
                    }}
                    textStyle={{
                        fontSize: 14,
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.default.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 150,
    },
    title: {
        fontSize: 20,
        color: Colors.default.titlesSelected,
        textAlign: 'left',
        paddingLeft: 25,
        paddingBottom: 19,
    },
    shadowContainer: {
        position: 'absolute',
        bottom: 75,
        right: 15,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .4,
        shadowRadius: 8,
        elevation: 10, // For Android
        borderRadius: 10,
    },
});
