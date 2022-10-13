import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';
import { OrderPageStyles } from './OrderPageStyles';
import { Product } from '../../interfaces/OrderInterface';

const styles = OrderPageStyles
const orderStatus = [
    { label: "Waiting for confirmation", value: "WAITING_CONFIRMATION" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "In Delivery", value: "IN_DELIVERY" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Closed", value: "CLOSED" }
]
// const ProductsList = [
//     {
//         id: 1,
//         name: 'Redbull',
//         quantity: 1,
//         price: 3,
//         imgUrl: 'https://picsum.photos/200/300',
//         vendor: 'Marché Djalil',
//         type: "300mL"
//     },
//     {
//         id: 2,
//         name: 'Club Sandwich',
//         quantity: 2,
//         price: 2.25,
//         imgUrl: 'https://picsum.photos/200/300',
//         vendor: 'Polytechnique',
//         type: "300mL"
//     },
// ]
const OrderPage = ({ route, navigation }: any) => {
    const { order } = route.params;
    const [open, setOpen] = React.useState(false);
    const [current_order_status, set_current_order_status] = React.useState(order.logs[order.logs.length-1].status); //TODO: get the current order status from the server
    //TODO: USE REAL DATA

    console.log("order", order);

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
        if (current_order_status !== order.logs[order.logs.length-1].status) {
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

    const sendStatusUpdate = (status: any) => {
        //here we send the status update mutation to the server

        //1. send the mutation
        //2. if the mutation is successful, SHOW A SUCCESS MESSAGE
        //3. if the mutation is not successful, SHOW AN ERROR MESSAGE
        //4.Hide the save button if the mutation is successful
    }

    //TODO: FIX PRODUCT TYPE
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
                    <View style={styles.client_header}>
                        <Text style={styles.details_title}>
                            Client
                        </Text>
                        <TouchableOpacity
                            style={styles.chat_button}
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                style={styles.back_button_icon}
                                source={require('../../assets/icons/chat.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.product_name}>
                        {order.client.firstName} {order.client.lastName}
                    </Text>
                    <Text style={styles.product_information}>
                        {order.client.address}
                    </Text>
                    <Text style={styles.product_information}>
                        {order.client.email}
                    </Text>
                    <Text style={styles.product_name}>
                        {order.client.phone}
                    </Text>
                </View>

                <View style={styles.details_container}>
                    <View style={styles.client_header}>
                        <Text style={styles.details_title}>
                            Paiement
                        </Text>

                        <Text style={styles.total_price}>
                            Total: 10.50$
                        </Text>
                    </View>


                    <Text style={styles.product_information}>
                        Sous-total : 9.50$
                    </Text>
                    <Text style={styles.product_information}>
                        Taxes: 1.00$
                    </Text>
                    <Text style={styles.product_information}>
                        Frais de livraison: 0.00$
                    </Text>
                    <Text style={styles.product_information}>
                        Méthode de paiement: Carte de crédit
                    </Text>

                    
                </View>

                <View style={styles.details_container}>
                    <Text style={styles.details_title}>Produits</Text>

                    <View style={styles.product_details_body}>
                        <ScrollView>
                            {order.products.map((product:Product) => {
                                return (
                                    <View style={styles.product_container}>
                                        <View style={styles.product_image_container}>
                                            <Image
                                                source={{ uri: product.imgSrc}}
                                                style={styles.product_image} />
                                        </View>
                                        <View style={styles.product_details}>
                                            <Text style={styles.product_name}>{product.title}</Text>
                                            <Text style={styles.product_information}>{product.vendor}</Text>
                                            <Text style={styles.product_information}>300 mL</Text>
                                            <Text style={styles.product_information}>{calculateProductTotal(product.price, product.quantity)}$ ({product.price}$ x {product.quantity})</Text>
                                        </View>


                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>

                </View>
               


            </ScrollView>
            {showSaveButton()}
        </SafeAreaView>
    );
}



export default OrderPage;


