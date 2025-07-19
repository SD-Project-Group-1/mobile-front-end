import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserInfoPanel from "../components/UserInfoPanel";
import ProfileInfo from '../components/ProfileInfo';
import { Colors } from "../constants/Colors";
import { useUser } from '../hooks/useUser';
import { useOrders } from '../hooks/useOrders';

export default function Profile() {
    const [profilePic, setProfilePic] = useState(null);
    
    // Use the useUser hook to manage user data
    const { user, isVerified, loading: userLoading, refreshUser } = useUser();
    
    // Use the useOrders hook to get user's order history
    const { orders, loading: ordersLoading } = useOrders(user?.id);

    // Handle profile edit updates
    const updateProfile = (updatedUser) => {
        setProfilePic(updatedUser.profilePic);
        
        // UserInfoPanel refreshes user data after profile update
        refreshUser();
    };

    if (userLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <UserInfoPanel 
                user={user}
                isVerified={isVerified}
                profilePic={picture => setProfilePic(picture)}
                loading={userLoading} // Updates user data after profile update
            />
            <ProfileInfo 
                user={user}
                orders={orders}
                onSave={updateProfile}
                loading={userLoading || ordersLoading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 21,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: Colors.default.background,
    },
});