import React, { useContext, useState,useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Modal, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import { ScrollView } from 'react-native-gesture-handler';
import { useLazyQuery } from '@apollo/client';
import { GET_ANALYTICS } from '../../graphql/queries';
import { VendorContext } from '../../context/Vendor';
import {AnalyticsInterface} from '../../interfaces/AnalyticsInterfaces';

const text_font_family = 'Lato';
const text_font_style = 'normal';



//create random products array
const products_mock = [
    {
        id: 1,
        name: 'Product 1',
        price: 10,
        quantity: 1,
    },
    {
        id: 2,
        name: 'Product 2',
        price: 20,
        quantity: 2,
    },
    {
        id: 3,
        name: 'Product 2',
        price: 20,
        quantity: 2,
    },
    {
        id: 4,
        name: 'Product 2',
        price: 20,
        quantity: 2,
    },
    {
        id: 5,
        name: 'Product 2',
        price: 20,
        quantity: 2,
    },

]


const Analytics = ({ navigation }: any) => {
    //Default dateFrom is a week ago
    const [dateFrom, setDateFrom] = useState(new Date(new Date().setDate(new Date().getDate() - 7)))
    const [dateTo, setDateTo] = useState(new Date())
    const [modalVisible, setModalVisible] = useState(false)
    const [analyticsObject, setAnalyticsObject] = useState<AnalyticsInterface>({
        totalOrders: 0,
        totalSales: 0,
        topProducts: null,
    })
    const { storeId } = useContext(VendorContext);

    const [getAnalytics, { data, loading, error }] = useLazyQuery(GET_ANALYTICS, {
        variables: {
            idStore: storeId,
            // dateFrom: dateFrom.toUTCString(),
            // dateTo: dateTo.toUTCString()
            dateFrom: "Sun, 23 Oct 2022 04:22:38 GMT",
            dateTo: "Tue, 25 Oct 2022 04:22:38 GMT"
        },
        fetchPolicy: 'network-only',
        onCompleted(data) {
            // console.log("dateFrom: ", dateFrom.toUTCString())
            // console.log("dateTo: ", dateTo.toUTCString())
           const result = data.getAnalytics
           const object:AnalyticsInterface = {
                totalOrders: result.totalOrders,
                totalSales: result.totalSales,
                topProducts: result.topProducts
           }
            setAnalyticsObject(object)


        }
    })

    //call getAnalytics at the first render
    useEffect(() => {
        getAnalytics()
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    if(error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{textAlign: 'center'}}>Error:{error.message}</Text>
            </View>
        )
    }

    //list products_mock in scrollview
    const topProductsView = () => {
        return (

            <ScrollView>
                {products_mock.map((product: any) => {
                    return (
                        <View style={styles.product_container} key={product.id}>
                            <View style={styles.product_details}>
                                <Text style={styles.product_name}>{product.name}</Text>
                                <Text style={styles.product_information}>
                                    {product.price * product.quantity} $
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>

        )

    }

    //button that displays a modal with a date picker
    const dateRangeSelection = () => {
        return (

            <View style={styles.date_range_container}>
                <Button style={styles.date_button} mode="contained" onPress={() => setModalVisible(true)}>
                    {dateFrom.toDateString()} to {dateTo.toDateString()}
                </Button>

                <Modal visible={modalVisible} animationType="slide" transparent={true}>
                    <View style={styles.modal_container}>
                        <View style={styles.modal_header}>
                            <Text style={styles.modal_title}>Select Analytics Date Range</Text>
                        </View>

                        <View style={styles.modal_date_picker_container}>
                            <Text style={styles.modal_date_picker_title}>From</Text>
                            <DatePicker
                                date={dateFrom}
                                onDateChange={setDateFrom}
                                mode="date"
                            />

                        </View>
                        <View style={styles.modal_date_picker_container}>
                            <Text style={styles.modal_date_picker_title}>To</Text>
                            <DatePicker
                                date={dateTo}
                                onDateChange={setDateTo}
                                mode="date"
                            />

                        </View>
                        <Button style={styles.date_button} mode="contained" onPress={() => {getAnalytics();setModalVisible(false)}}>
                            Done
                        </Button>
                    </View>
                </Modal>
            </View>





        )

    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>
            <View style={styles.header}>
                <Text style={styles.header_text}>Analytics</Text>
                {dateRangeSelection()}

            </View>
            <ScrollView style={styles.main_scrollView}>
                <View style={styles.analytics_container}>
                    <View style={styles.analytics_header}>
                        <Text style={styles.analytics_title}>Total Sales</Text>
                    </View>
                    <View style={styles.analytics_content}>
                        <Text style={styles.analytics_content_text}>{analyticsObject.totalSales} $</Text>
                    </View>
                </View>
                <View style={styles.analytics_container}>
                    <View style={styles.analytics_header}>
                        <Text style={styles.analytics_title}>Total Number Of Orders</Text>
                    </View>
                    <View style={styles.analytics_content}>
                        <Text style={styles.analytics_content_text}>{analyticsObject.totalOrders} Orders</Text>
                    </View>
                </View>

                <View style={styles.analytics_container}>
                    <View style={styles.analytics_header}>
                        <Text style={styles.analytics_title}>Top 5 products</Text>
                    </View>
                    <View style={styles.analytics_content}>
                        {topProductsView()}
                    </View>
                </View>

            </ScrollView>
            {/* <View style={styles.body}>

                    <View style={styles.total_orders}>
                        <Text style={styles.total_orders_text}>Total Sales</Text>
                        <Text style={styles.total_orders_number}>5 $</Text>
                    </View>
                    <View style={styles.total_orders}>
                        <Text style={styles.total_orders_text}>Number of Orders</Text>
                        <Text style={styles.total_orders_number}>5</Text>
                    </View>
                    <View style={styles.total_orders}>
                        <Text style={styles.total_orders_text}>Top 5 products</Text>
                        <Text style={styles.total_orders_number}>5</Text>
                    </View>


                </View> */}







        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // flexDirection: 'column',
    },
    header: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: 20,




    },
    header_text: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontSize: 24,
        lineHeight: 29,
        color: '#FFA500',

    },
    main_scrollView: {
        flex: 1,


    },
    analytics_container: {
        flex: 1,
        flexDirection: 'column',
        width: '70%',
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
    analytics_header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 50,
        width: '100%',
    },
    analytics_title: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontSize: 18,
        lineHeight: 21,
        color: 'black',
        alignSelf: 'flex-start',
        marginLeft: 10,

    },
    analytics_content: {
        //The content should be centeed in the middle of the view
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // height: 50,
        width: '100%',
        marginBottom: 30,
    },
    analytics_content_text: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontSize: 24,
        lineHeight: 29,
        color: '#FFA500',
        alignSelf: 'center',
        marginLeft: 10,

    },
    product_container: {
        flex: 1,
        flexDirection: 'column',
        width: '70%',
        height: "100%",
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    product_details: {},
    product_name: {},
    product_information: {},

    total_orders: {
        flex: 1,
        flexDirection: 'column',
        width: '80%',
        height: "100%",
        //container height
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
    total_orders_text: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontSize: 24,
        lineHeight: 29,
        color: '#FFA500',
    },
    total_orders_number: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontSize: 24,
        lineHeight: 29,
        color: 'black',
        marginTop: 10,
    },
    date_range_container: {
        marginTop: 20,
    },
    date_button: {
        backgroundColor: '#FFA500',
    },

    modal_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
    },
    modal_header: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: 20,

    },
    modal_title: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontSize: 24,
        lineHeight: 29,
        color: '#FFA500',

    },
    modal_date_picker_container: {},
    modal_date_picker_title: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontSize: 18,
        lineHeight: 21,
        color: 'black',
        alignSelf: 'flex-start',
        marginLeft: 10,
    }




});




export default Analytics;


{/* <View style={styles.date_picker}>
                        <Text style={styles.date_picker_text}>From</Text>
                        <Text style={styles.date_picker_date_text} onPress={() => setOpenFrom(true)}>{dateFrom.toDateString()}</Text>


                        <DatePicker
                            modal
                            open={openFrom}
                            date={dateFrom}
                            onConfirm={(date) => {
                                setOpenFrom(false)
                                setDateFrom(date)
                            }}
                            onCancel={() => {
                                setOpenFrom(false)
                            }}
                            mode="date"
                        />

                    </View>
                    <View style={styles.date_picker}>
                        <Text style={styles.date_picker_text}>To</Text>
                        <Text style={styles.date_picker_date_text} onPress={() => setOpenTo(true)}>{dateTo.toDateString()}</Text>

                        <DatePicker
                            modal
                            open={openTo}
                            date={dateTo}
                            onConfirm={(date) => {
                                setOpenTo(false)
                                setDateTo(date)
                            }}
                            onCancel={() => {
                                setOpenTo(false)
                            }}
                            mode="date"
                        />

                    </View> */}