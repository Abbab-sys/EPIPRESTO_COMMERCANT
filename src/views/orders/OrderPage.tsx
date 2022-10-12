import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Button, SegmentedButtons } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';

const text_font_family = 'Lato';
const text_font_style = 'normal';

// const orderStatus = ["WAITING_CONFIRMATION", "CONFIRMED", "IN_DELIVERY", "DELIVERED", "CLOSED"];
const orderStatus= [
    {label: "Waiting for confirmation", value: "WAITING_CONFIRMATION"},
    {label: "Confirmed", value: "CONFIRMED"},
    {label: "In Delivery", value: "IN_DELIVERY"},
    {label: "Delivered", value: "DELIVERED"},
    {label: "Closed", value: "CLOSED"}
]
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
        name: 'Club Sandwich',
        quantity: 2,
        price: 2.25,
        imgUrl: 'https://picsum.photos/200/300',
        vendor: 'Polytechnique',
        type: "300mL"
    },


]
const OrderPage = ({ route, navigation }: any) => {
    const [open, setOpen] = React.useState(false);
    const [current_order_status, set_current_order_status] = React.useState(orderStatus[0].value); //TODO: get the current order status from the server
    //TODO: USE REAL DATA
    // const { order } = route.params;

    const calculateProductTotal = (price: any, quantity: any): any => {
        return (price * quantity).toFixed(2);

    }

    const changeStatus = (status: any) => {
        console.log(status)
    }


    //TODO: FUNCTION CALLED TWICE, FIX IT

    const showSaveButton = () => {
        console.log(current_order_status);
        //TODO: If the current order status is different from the one in the server, show the save button
        if(current_order_status !== orderStatus[0].value) {
            return (
                <View style={styles.saveButtonContainer}>
                <Button
                    mode="contained"
                    style={styles.saveButtonText}
                    onPress={() => sendStatusUpdate(current_order_status)}
                >
                    Save
                </Button>
                </View>
            )
        }
    }

    const sendStatusUpdate = (status:any) => {

    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>


            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.back_button}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={styles.back_button_icon}
                        source={require('../../assets/icons/back.png')}
                    />
                </TouchableOpacity>

                <Text style={styles.header_text}>
                    COMMANDE # 123456
                </Text>
            </View>
            <View style={styles.subHeader}>
                <DropDownPicker
                    open={open}
                    value={current_order_status}
                    items={orderStatus}
                    setOpen={setOpen}
                    setValue={set_current_order_status}
                    onChangeValue={showSaveButton}
                />

            </View>

            <ScrollView style={styles.container}>

                <View style={styles.details_container}>
                    <Text style={styles.details_title}>Produits</Text>

                    <View style={styles.product_details_body}>
                        <ScrollView>
                            {ProductsList.map((product) => {
                                return (
                                    <View style={styles.product_container}>
                                        <View style={styles.product_image_container}>
                                            <Image
                                                source={{ uri: product.imgUrl }}
                                                style={styles.product_image} />
                                        </View>
                                        <View style={styles.product_details}>
                                            <Text style={styles.product_name}>{product.name}</Text>
                                            <Text style={styles.product_information}>Marche Djalil</Text>
                                            <Text style={styles.product_information}>{product.type}</Text>
                                            <Text style={styles.product_information}>{calculateProductTotal(product.price, product.quantity)}$ ({product.price}$ x {product.quantity})</Text>
                                        </View>


                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>

                </View>
                <View style={styles.details_container}>
                    <Text style={styles.details_title}>
                        Client
                    </Text>
                </View>

                <View style={styles.details_container}>
                    <Text style={styles.details_title}>
                        Paiement
                    </Text>
                </View>


            </ScrollView>
            {showSaveButton()}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EAEAEA',
        height: 50,
        width: '100%',
        padding: 10,
        marginBottom: 10,
    },
    back_button: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        marginLeft: 10,

    },
    back_button_icon: {
        width: 35,
        height: 35,
        tintColor: '#FFA500',
    },

    header_text: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#FFA500',
    },


    subHeader: {
        height: "auto",
        width: '100%',
        padding: 10,
        marginBottom: 5,
        zIndex: 1,
    },


    details_container: {
        flex: 1,
        flexDirection: 'column',
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
    details_title: {
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

    },

    product_container: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        padding: 10,
    },

    product_image_container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    product_image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    product_details: {

        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    product_name: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 15,

        textAlign: 'center',
        marginLeft: 10,
        color: 'black',
    },
    product_information: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'normal',
        fontSize: 10,

        textAlign: 'center',
        marginLeft: 10,
        marginBottom: 10,
        color: 'black',
    },
    saveButtonContainer: {
        position: 'relative',
        height: 50,
        width: "50%",
        zIndex: 1,
        alignSelf: 'center',
        marginTop: 10,
    },
  
    saveButtonText: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#FFA500',
        justifyContent: 'center',
        alignItems: 'center',
        
    },



});


export default OrderPage;


