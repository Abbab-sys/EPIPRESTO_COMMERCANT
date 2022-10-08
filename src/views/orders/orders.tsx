//create a simple react native component
import React, { Component } from 'react';
//import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const OrderList = [
    { id: 1, date: '23-10-2022', number: '#EP89391', client: 'KHALIL ZRIBA', total: '$ 100', status: 'En attente' },
    { id: 2, date: '23-10-2022', number: '#EP89391', client: 'ADAM NAOUI', total: '$ 100', status: 'En attente' },
    { id: 3, date: '23-10-2022', number: '#EP89391', client: 'ZOUHAIR DEROUICH', total: '$ 100', status: 'En attente' },
    { id: 4, date: '23-10-2022', number: '#EP89391', client: 'RYMA MESSEDAA', total: '$ 100', status: 'En attente' },
    { id: 5, date: '23-10-2022', number: '#EP89391', client: 'ALESSANDRO VAN REUSEL', total: '$ 100', status: 'En attente' },
]

//add a button after each order details that will redirect to the order details page. bUTTON MUST BE ON THE RIGHT
//add a filtering icon on the top right of the page next to COMMANDES title

const Orders = () => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>

            <View>
                <Text style={styles.titleText}>
                    COMMANDES
                </Text>

            </View>
            <FlatList
                data={OrderList}
                renderItem={renderOrderContainer}
            ></FlatList>
        </SafeAreaView>
    );

};


const renderOrderContainer = ({ item }: any) => {
    return (
        <View style={styles.order_container}>
            <View style={styles.order_header}>
                <Text style={styles.order_date}>{item.date}</Text>
                <Text style={styles.order_number}>{item.number}</Text>
            </View>
            <View style={styles.order_details}>
                <View style={styles.order_details_left}>
                    <Text style={styles.order_details_left_text}>Client</Text>
                    <Text style={styles.order_details_left_text}>Total</Text>
                    <Text style={styles.order_details_left_text}>Status</Text>
                </View>
                <View style={styles.order_details_right}>
                    <Text style={styles.order_details_right_text}>{item.client}</Text>
                    <Text style={styles.order_details_right_text}>{item.total}</Text>
                    <Text style={styles.order_details_right_text}>{item.status}</Text>
                </View>
            </View>
                <TouchableOpacity
                    style={styles.order_button_text}
                >
                    <Text>Détails</Text>
                </TouchableOpacity>
        </View>
    )
}


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
        //container must be centered
        alignSelf: 'center',


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
        justifyContent: 'space-between',
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
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,


    },
    order_details_text: {
        flex: 1,
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
    // order_button: {
    //     width: '100%',
    //     height: 50,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginTop: 10,
    // },
    order_button_text: {
        width: '30%',
        height: 40,
        backgroundColor: '#FFA500',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'flex-end',
        marginRight: 20,
        marginBottom: 10,
    },






});


export default Orders;
