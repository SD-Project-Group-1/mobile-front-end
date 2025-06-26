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
                
            <Image
            source = {{uri: 'https://www.orlando.gov/files/sharedassets/public/v/2/documents/assets-official/cityoforlando_horizontal_logo_official.png'}}
            style = {styles.profilePic}
            />
            <TouchableOpacity style = {styles.hideButton}>
                <Text style = {styles.hideText}>Hide?</Text>
            </TouchableOpacity>
                </View>
                //Order Status Section 
            <View style ={styles.card}>
                <Text sytle = {styles.sectionTitle}>Order Status</Text>
                <View style = {styles.orderBox}>
                    <Text>ORDER PLACED: </Text>
                    <Text>ORDER #: </Text>
            </View>

            <Text style ={styles.returnByText}> Return by: </Text>
            <Text style ={styles.status}>
                Status: checked out by you on <Text style ={styles.highlight}>THE DATE
                </Text>
                <Text style = {StyleSheetList.deviceId}>DeviceID: </Text>
                </Text>
            </View>

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
    weloxmeBox:{
        backgroundColor: '#2A4634',
        padding: 15,
        borderRadius: 10, 
        marginBottom: 16,
    },
    welcomeText:{
        fontSize: 15, 
        color: '#white',
        marginBottom: 15,
    },
    cityImage:{
        width: '100',
        height: 150,
        marginBottom: 11,
    },
    hideButton:{
        backgroundColor: '#2A4634',
        paddingVertical: 7, 
        paddingHorizantal: 10, 
        alignSelf: 'flex-start',
        borderRadius: 5,
    },
    hideText:{
        color: 'white',
    },
    card:{
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 16, 
        marginBottom: 16,
    },
    sectionTitle:{
        color:'white',
        fontSize: 18, 
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderBox:{
        backgroundColor: '#1E1E1E',
        padding: 10, 
        borderRadius: 6, 
        marginBottom: 10,
    },
    returnByText:{
        color: '#87FBFFF2',
        fontSize: 15, 
        fontweight: 'bold',
        marginBottom: 10,
    },
    staus:{
        color: 'white',
        marginBottom: 5,
    },
    highlight:{
        color: '#87FBFFF2',
    },
    deviceId:{
        color: 'white',
        marginBottom: 10, 
    },
    buttonRow:{
        gap: 8, 
    }


});