import {ScrollView, StyleSheet, Text, View, RefreshControl} from 'react-native';
import WelcomeBanner from '../components/WelcomeBanner';
import OrderStatus from '../components/OrderStatus';
import PreviousOrder from '../components/PreviousOrder';
import Button from '../components/ui/Button';
import {Colors} from "../constants/Colors";
import { router } from 'expo-router';
import { useUser } from '../hooks/useUser';
import {useState} from "react";
import { useOrders } from '../hooks/useOrders';


export default function Home() {
    //const { user, loading } = useUserContext();
    const { user, loading } = useUser('/+not-found');
    const [hasActiveOrder, setHasActiveOrder] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { orders, refreshOrders } = useOrders(user?.id);

    // Bonus: Pull to refresh
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            if (user?.id) {
                await refreshOrders();
            }
        } catch (error) {
            console.error('Failed to refresh orders:', error);
        } finally {
            setRefreshing(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[Colors.default.titlesSelected]}
                        tintColor={Colors.default.titlesSelected}
                    />
                }
            >
                <WelcomeBanner/>
                <Text style={styles.title}>
                    Order Status
                </Text>
                <OrderStatus
                    user={user}
                    orders={orders}
                    refreshOrders={refreshOrders}
                    onActiveOrderFound={setHasActiveOrder}
                />
                <Text style={styles.title}>
                    Previous Orders
                </Text>
                <PreviousOrder user={user} orders={orders} refreshOrders={refreshOrders} />
            </ScrollView>

            {!hasActiveOrder && (
                <View style={styles.shadowContainer}>
                    <Button
                        title="Request a Device"
                        width={150}
                        height={50}
                        onPress={() => router.push('/request')}
                        textStyle={{ fontSize: 14 }}
                    />
                </View>
            )}
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
