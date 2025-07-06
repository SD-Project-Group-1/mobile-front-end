import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import UserInfoPanel from "../components/UserInfoPanel";
import ProfileInfo from '../components/ProfileInfo';
import { Colors } from "../constants/Colors";

export default function Profile() {
    const [profilePic, setProfilePic] = useState(null);
    const [refresh, setRefresh] = useState(0);

    // Handle profile edit updates
    const updateProfile = (updatedUser) => {
        setProfilePic(updatedUser.profilePic);
        
        // UserInfoPanel refreshes user data after profile update
        setRefresh(prev => prev + 1);
    };

    return (
        <View style={styles.container}>
            <UserInfoPanel 
                profilePic={picture => setProfilePic(picture)}
                key={refresh} // Updates user data after profile update
            />
            <ProfileInfo onSave={updateProfile} />
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