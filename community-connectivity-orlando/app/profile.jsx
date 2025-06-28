import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import UserInfoPanel from "../components/UserInfoPanel";
import ProfileInfo from '../components/ProfileInfo';
import { Colors } from "../constants/Colors";

export default function Profile() {
    const [id, setId] = useState('00001');
    const [firstName, setFirstName] = useState('Jane');
    const [lastName, setLastName] = useState('Shmane');
    const [phoneNumber, setPhoneNumber] = useState('(407) 356-1234');
    const [birthdate, setBirthdate] = useState('01/01/1985');
    const [address, setAddress] = useState('444 Epic Universe, Orlando Fl, 32819');
    const [email, setEmail] = useState('J.Shmane@this.com');
    const [verify, setVerify] = useState(true);

    // Handle profile edit updates
    const updateProfile = (updatedUser) => {

        // Update user information
        setFirstName(updatedUser.firstName);
        setLastName(updatedUser.lastName);
        setPhoneNumber(updatedUser.phoneNumber);
        setBirthdate(updatedUser.birthdate);
        setAddress(updatedUser.address);
        setEmail(updatedUser.email);
    };

    return (
        <View style={styles.container}>
            <UserInfoPanel
                id={id}
                firstName={firstName}
                lastName={lastName}
                phoneNumber={phoneNumber}
                email={email}
                address={address}
                verify={verify}
            />
            <ProfileInfo
                firstName={firstName}
                lastName={lastName}
                phoneNumber={phoneNumber}
                birthdate={birthdate}
                address={address}
                email={email}
                onSave={updateProfile}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 18,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: Colors.default.background,
    },
});