import React, { Component } from 'react';
//import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper'

const text_font_family = 'Lato';
const text_font_style = 'normal';

const ProductsList = [
    {
        id: 1,
        name: 'Redbull',
        quantity: 1,
        price: 3,
        imgUrl: 'https://picsum.photos/200/300',
        vendor: 'Marché Djalil',
        type: "300mL"
    },
    {
        id: 2,
        name: 'Club Sandwish',
        quantity: 2,
        price: 2.25,
        imgUrl: 'https://picsum.photos/200/300',
        vendor: 'Polytechnique',
        type: "300mL"
    },

]
//This is a page where we show a single order's details
const OrderPage = ({ route, navigation }: any) => {

    //TODO: USE REAL DATA
    // const { order } = route.params;

     const calculateProductTotal = (price:any,quantity:any):any => {
        //Return format should be a price with 2 decimals
        return (price * quantity).toFixed(2);
      
    }

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
                    <Text style={styles.product_details_title}>Produits</Text>

                    <View style={styles.product_details_body}>
                        {/* <FlatList
                        data={ProductsList}
                        renderItem={renderProductsContainer}
                    ></FlatList> */}
                        {/* list all products in ProductsList*/}
                        <ScrollView  >
                            <View>
                                {ProductsList.map((product) => {
                                    return (
                                        <View style={styles.product_container}>
                                            <View style={styles.product_image_container}>
                                                <Image
                                                    source={{ uri: product.imgUrl }}
                                                    style={styles.product_image}
                                                />
                                            </View>
                                            
                                            <View style={styles.product_details}>
                                            <Text style={styles.product_name}>{product.name}</Text>
                                            <Text style={styles.product_type}>{product.type}</Text>
                                            <Text style={styles.product_pricing}>{calculateProductTotal(product.price,product.quantity)}$ ({product.price}$ x {product.quantity})</Text>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </ScrollView>
                    </View>

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
        alignItems: 'flex-start',
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
    product_details_title: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#FFA500',
    },
    product_details_body: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: "100%",
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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
    product_container: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        margin: 5,
        padding: 10,
    },

    product_image_container: {
        // flex: 1,
        // flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    product_image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    product_details: {
        // flex: 1,
        // flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    product_name: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 15,

        textAlign: 'center',
        marginLeft:10 ,
        color: 'black',
    },
    product_type: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'normal',
        fontSize: 10,

        textAlign: 'center',
        marginLeft: 10,
        marginBottom: 10,
        // margin: 10,
        color: 'black',
    },
    product_pricing: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'normal',
        fontSize: 10,

        textAlign: 'center',
        marginLeft: 10,
        marginBottom: 10,
    }


   
 





});


export default OrderPage;


