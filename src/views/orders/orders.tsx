//create a simple react native component
import { useQuery } from '@apollo/client';
import React, { Component, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { GET_ALL_ORDERS_BY_STORE_ID } from '../../graphql/queries';
import { Client, Order, Product } from '../../interfaces/OrderInterface';


const text_font_family = 'Lato';
const text_font_style = 'normal';


//TODO: TRANSLATION FR/ENG

const Orders = ({ navigation }: any) => {
    const { data, loading, error } = useQuery(GET_ALL_ORDERS_BY_STORE_ID, {
        variables: {
            idStore: "633cfb2bf7bdb731e893e28b"
        }
    });

    //TODO: GET THE STORE ID FROM THE USER

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         console.log("Orders page rendered");
    //     });
    // }, [navigation]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )

    }

    if (error) {
        return <Text>Error while loading orders</Text>;
    }

    

        const orders: Order[] = data.getStoreById.store.orders.map((order: any) => {

            const products: Product[] = order.productsVariantsOrdered.map(({ relatedProductVariant, quantity }: any) => {
                const newProduct: Product = {
                    _id: relatedProductVariant._id,
                    title: relatedProductVariant.displayName,
                    imgSrc: relatedProductVariant.imgSrc,
                    quantity: quantity,
                    vendor: relatedProductVariant.relatedProduct.relatedStore.name,
                    price: relatedProductVariant.price
                }
                return newProduct;

            })

            const client: Client = {
                _id: order.relatedClient._id,
                lastName: order.relatedClient.lastName,
                firstName: order.relatedClient.firstName,
                email: order.relatedClient.email,
                phone: order.relatedClient.phone,
                address: order.relatedClient.address,
            }
            const newOrder: Order = {
                _id: order._id,
                number: order.orderNumber,
                products: products,
                client: client,
                logs: order.logs,
                total: (order.subTotal + order.taxs + order.deliveryFee).toFixed(2),
                subTotal: order.subTotal.toFixed(2),
                taxs: order.taxs.toFixed(2),
                deliveryFee: order.deliveryFee.toFixed(2),
                paymentMethod: "Apple Pay", //TODO: ADD TO SERVER
            }
            return newOrder;

        })

    

    const status_bar_color = (status: string) => {
        let style = StyleSheet.create({
            status_bar: {
                width: 100,
                height: 30,
                backgroundColor: '#FFA500',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }
        })
        switch (status) {
            case "WAITING_CONFIRMATION":
                style.status_bar.backgroundColor = 'gold';
                return style.status_bar;
            case "CONFIRMED":
                style.status_bar.backgroundColor = 'green';
                return style.status_bar;
            case "IN_DELIVERY":
                style.status_bar.backgroundColor = 'blue';
                return style.status_bar;
            case "DELIVERED":
                style.status_bar.backgroundColor = 'grey';
                return style.status_bar;
            case "CLOSED":
                style.status_bar.backgroundColor = 'red';
                return style.status_bar;
            default:
                return style.status_bar;
        }
    }

    const renderOrderContainer = ({ item }: any) => {
        const order_date = new Date(item.logs[0].time);
        return (
            <View style={styles.order_container}>
                <View style={styles.order_header}>
                    <Text style={styles.order_date}>{order_date.toDateString()}</Text>
                    <Text style={styles.order_number}>{item.number}</Text>
                </View>
                <View style={styles.order_details}>
                    <View style={styles.order_details_left}>
                        <Text style={styles.order_details_left_text}>Client</Text>
                        <Text style={styles.order_details_left_text}>Total</Text>
                        <Text style={styles.order_details_left_text}>Status</Text>
                    </View>
                    <View style={styles.order_details_right}>
                        <Text style={styles.order_details_right_text}>{item.client.firstName} {item.client.lastName}</Text>
                        <Text style={styles.order_details_right_text}>{item.total} $</Text>

                        <View style={status_bar_color(item.logs[item.logs.length - 1].status)}>

                            <Text style={styles.order_status_text}>{item.logs[item.logs.length - 1].status}</Text>

                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.order_button_text}
                    onPress={() => navigation.navigate('OrderPage', { order: item })}

                >
                    <Text style={styles.view_order_button_text}>Détails</Text>
                </TouchableOpacity>
            </View>
        )
    }





    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>
            <View>
                <Text style={styles.titleText}>
                    COMMANDES
                </Text>

            </View>
            <View style={styles.filtering}>
                <Button
                    style={styles.filtering_button}
                    mode="contained"
                    onPress={() => console.log('Pressed')}
                >
                    Trier
                </Button>

            </View>
            <FlatList
                data={orders}
                renderItem={renderOrderContainer}
            ></FlatList>
        </SafeAreaView>
    );

};






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
        fontFamily: text_font_family,
        fontStyle: text_font_style,
    },

    order_container: {
        width: '90%',
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
        fontFamily: text_font_family,
        fontStyle: text_font_style,
    },
    order_number: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: text_font_family,
        fontStyle: text_font_style,
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
        fontFamily: text_font_family,
        fontStyle: text_font_style,
    },
    order_details_left: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,


    },
    order_details_right: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    order_details_left_text: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: text_font_family,
        fontStyle: text_font_style,
    },
    order_details_right_text: {
        fontSize: 12,
        // fontWeight: 'bold',
        marginBottom: 10,
        width: '100%',
        fontFamily: text_font_family,
        fontStyle: text_font_style,

    },
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
        fontFamily: text_font_family,
        fontStyle: text_font_style,
    },
    order_status: {
        width: 100,
        height: 30,
        // backgroundColor: '#FFA500',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    order_status_text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: text_font_family,
        fontStyle: text_font_style,
    },
    filtering: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    filtering_button: {
        width: '100%',
        height: 40,
        backgroundColor: '#FFA500',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: text_font_family,
        fontStyle: text_font_style,
    },
    view_order_button_text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: text_font_family,
        fontStyle: text_font_style,
    },
});


export default Orders;
