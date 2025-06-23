import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen(){
    return(
        <ScrollView style = {StyleSheet.container}>

            //Header with title and picture 
            <View style ={StyleSheet.header}>
            <Text style = {styles.headerTitle}>Home</Text>   
                </View>
            <Image
            source = {{uri: 'https://www.orlando.gov/files/sharedassets/public/v/2/documents/assets-official/cityoforlando_horizontal_logo_official.png'}}
            style = {styles.profilePic}
            />

            //Welcome City of Orlando 
            <View style ={styles.welcomeBox}>
            <Text style = {styles.welcomeText}>Welcome</Text>   
                </View>
            <Image
            source = {{uri: 'https://www.orlando.gov/files/sharedassets/public/v/2/documents/assets-official/cityoforlando_horizontal_logo_official.png'}}
            style = {styles.profilePic}
            />
            </ScrollView>
            
            
            
         
    );

}
const styles = Style.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#102133',
        padding :16,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerTitle:{
        color:'#87FBFFF2',
        fontSize: 20,
        fontWeight:'bold',
    },
    profilePic:{
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    //welcomeBox:

});