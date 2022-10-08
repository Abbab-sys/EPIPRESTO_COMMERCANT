//create a simple react native component
import React, { Component } from 'react';
//import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';


const Orders = () => {
    //TODO: REPLACE SCCROLLVIEW WITH FLATLIST

    //In order_details,  column on the left shows the order details (client Name,Total,Status) and the column on the right shows the corresponding values
    //Fix the overflow issue
    //
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>

            <View>
                <Text style={styles.titleText}>
                    COMMANDES
                </Text>

            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.order_container}>
                    <View style={styles.order_header}>
                        <Text style={styles.order_date}>23-10-2022</Text>
                        <Text style={styles.order_number}>#EP89391</Text>
                    </View>
                    <View style={styles.order_details}>
                        <View style={styles.order_details_left}>
                            <Text style={styles.order_details_left_text}>Client</Text>
                            <Text style={styles.order_details_left_text}>Total</Text>
                            <Text style={styles.order_details_left_text}>Status</Text>
                        </View>
                        <View style={styles.order_details_right}>
                            <Text style={styles.order_details_right_text}>John Doe</Text>
                            <Text style={styles.order_details_right_text}>$ 100</Text>
                            <Text style={styles.order_details_right_text}>En attente</Text>
                        </View>
                    </View>
                </View> 
            </ScrollView>
        </SafeAreaView>
    );

};

//add some style to our components

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 23,
        textAlign: 'center',
        margin: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        margin: 10,
        color: '#FFA500',
    },
 
    //each container must have a space between them
    order_container: {
        width: 300,
        height: 200,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        marginBottom: 20,

    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        marginTop: 20,
        width: 200,
        height: 40,
        backgroundColor: '#FFA500',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    order_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomColor: '#FFA500',
        borderBottomWidth: 1,
        marginBottom: 10,

    },
    order_date: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    order_number: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    order_details: {
        width: '90%',
        height: 100,
        backgroundColor: '#EAEAEA',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#FFA500',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
    order_details_text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    order_details_left: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
        
    },
    order_details_right: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    order_details_left_text: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    order_details_right_text: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },





});


export default Orders;
