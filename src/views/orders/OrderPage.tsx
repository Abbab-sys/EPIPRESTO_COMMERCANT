import React, { Component, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';
import { OrderPageStyles } from './OrderPageStyles';
import { Product } from '../../interfaces/OrderInterface';
import { CHANGE_ORDER_STATUS } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';


const styles = OrderPageStyles
const orderStatus = [
    { label: "Waiting for confirmation", value: "WAITING_CONFIRMATION" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "In Delivery", value: "IN_DELIVERY" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Closed", value: "CLOSED" }
]
const OrderPage = ({ route, navigation }: any) => {
    const { order } = route.params;
    const [open, setOpen] = React.useState(false);
    const [current_order_status, set_current_order_status] = React.useState(order.logs[order.logs.length-1].status);


    const calculateProductTotal = (price: any, quantity: any): any => {
        return (price * quantity).toFixed(2);

    }

    const showSaveButton = () => {
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

    const receivedUpdateStatus = (data:any) => {
        if (data.updateOrderStatus.code === 200) {
            Alert.alert("Status Updated Successfully")
        }else{
            Alert.alert("Error Updating Status")
        }
    }

    const [changeOrderStatus] = useMutation(CHANGE_ORDER_STATUS, {onCompleted: receivedUpdateStatus});


    const sendStatusUpdate = (status: any) => {
        changeOrderStatus({ variables: { orderId: order._id, newStatus: status  } })
    
    }

    //TODO: A REGLER
    const renderProductImage = (imgSrc: any) => {
        if (imgSrc !== "") {
            return (
                <Image
                    source={{ uri: imgSrc}}
                    style={styles.product_image} />
            )
        } else {
            return (
                <Image
                    style={styles.product_image}
                    source={{uri:"http://via.placeholder.com/640x360"}}
                />
            )
        }
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
                    COMMANDE #{order.number}
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

            <ScrollView style={styles.container}
            >
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
                            Total: {order.total} $
                        </Text>
                    </View>


                    <Text style={styles.product_information}>
                        Sous-total : {order.subTotal} $
                    </Text>
                    <Text style={styles.product_information}>
                        Taxes: {order.taxs} $
                    </Text>
                    <Text style={styles.product_information}>
                        Frais de livraison: {order.deliveryFee} $
                    </Text>
                    <Text style={styles.product_information}>
                        Méthode de paiement: {order.paymentMethod}
                    </Text>

                    
                </View>

                <View style={styles.details_container}>
                    <Text style={styles.details_title}>Produits</Text>

                    <View style={styles.product_details_body}>
                        <ScrollView>
                            {order.products.map((product:Product) => {
                                return (
                                    <View style={styles.product_container} key={product._id}>
                                        <View style={styles.product_image_container}>
                                                {renderProductImage(product.imgSrc)}
                                        </View>
                                        <View style={styles.product_details}>
                                            <Text style={styles.product_name}>{product.title}</Text>
                                            <Text style={styles.product_information}>{product.vendor}</Text>
                                            {/* <Text style={styles.product_information}>300 mL</Text> */}
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


