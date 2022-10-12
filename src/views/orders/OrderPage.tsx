import React, { Component } from 'react';
//import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper'

const text_font_family = 'Lato';
const text_font_style = 'normal';

//This is a page where we show a single order's details
const OrderPage = ({route,navigation}:any) => {

    //TODO: USE REAL DATA
    // const { order } = route.params;

    //TODO:add a row containg the order's date on the left, the order status in the middle and a "modifier" button on the right

    //add a container that contains the product's details 
    //add a a container that contains the customer's details

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>
              <View>
                <Text style={styles.header}>
                    COMMANDE # 123456
                </Text>
            </View>
            <View style={styles.subHeader}>
                <Text style={styles.subHeader_text}>
                    27-06-2021
                </Text>
                <Text style={styles.subHeader_text}>
                    En attente
                </Text>
                <Button style={styles.subHeader_button} mode="contained" onPress={() => console.log('Pressed')}>
                    Modifier
                </Button>
            </View>

            <ScrollView style={styles.container}>
          
            <View style={styles.product_details_container}>
                <Text style={styles.product_details_header}>
                  Produit
                </Text>

                {/* <View style={styles.product_details}>
                    <View style={styles.product_details_left}>
                        <Text style={styles.product_details_left_text}>Nom</Text>
                        <Text style={styles.product_details_left_text}>Quantité</Text>
                        <Text style={styles.product_details_left_text}>Prix</Text>
                    </View>
                    <View style={styles.product_details_right}>
                        <Text style={styles.product_details_right_text}>Nom du produit</Text>
                        <Text style={styles.product_details_right_text}>1</Text>
                        <Text style={styles.product_details_right_text}>$ 100</Text>
                    </View>
                </View> */}
                
            </View>
            <View style={styles.customer_details}>
                <Text style={styles.customer_details_header}>
                  Client
                </Text>
            </View>

            <View style={styles.payment_details}>
                <Text style={styles.payment_details_header}>
                  Paiement
                </Text>
            </View>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA',
        padding: 20,
    },
    header: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#FFA500',
    },
    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: 'red',
    },
    subHeader_text: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'normal',
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        color: '#FFA500',
    },
    subHeader_button: {
        backgroundColor: '#FFA500',
        width: 'auto',
    },
    product_details_container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: "100%",
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
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
        alignSelf: 'center',
    },
    product_details_header: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        color: '#FFA500',
    },
    customer_details: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: 'red',
    },
    customer_details_header: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        color: '#FFA500',
    },
    
    payment_details: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: 'red',
    },
    payment_details_header: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        color: '#FFA500',
    },

    //TODO: REFAIRE
    // product_details: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     margin: 10,
    //     padding: 10,
    //     backgroundColor: 'red',
    // },
    // product_details_left: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     margin: 10,
    //     padding: 10,
    //     backgroundColor: 'red',
    // },

    // product_details_left_text: {
    //     fontFamily: text_font_family,
    //     fontStyle: text_font_style,
    //     fontWeight: 'normal',
    //     fontSize: 15,
    //     textAlign: 'center',
    //     margin: 10,
    //     color: '#FFA500',
    // },
    // product_details_right: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     margin: 10,
    //     padding: 10,
    //     backgroundColor: 'red',
    // },

    // product_details_right_text: {
    //     fontFamily: text_font_family,
    //     fontStyle: text_font_style,
    //     fontWeight: 'normal',
    //     fontSize: 15,
    //     textAlign: 'center',
    //     margin: 10,
    //     color: '#FFA500',
    // },




});


export default OrderPage;


