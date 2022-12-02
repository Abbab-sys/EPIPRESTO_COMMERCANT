import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Modal, ActivityIndicator, Image, RefreshControl } from 'react-native';
import { Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import { ScrollView } from 'react-native-gesture-handler';
import { useLazyQuery } from '@apollo/client';
import { GET_ANALYTICS } from '../../graphql/queries';
import { VendorContext } from '../../context/Vendor';
import { AnalyticsInterface } from '../../interfaces/AnalyticsInterfaces';
import { useTranslation } from 'react-i18next';
import { ANALYTICS_ORDERS_KEY, ANALYTICS_SELECT_PERIOD_FROM_KEY, ANALYTICS_SELECT_PERIOD_KEY, ANALYTICS_SELECT_PERIOD_SUBMIT_KEY, ANALYTICS_SELECT_PERIOD_TO_KEY, ANALYTICS_TITLE_KEY, ANALYTICS_TOP_PRODUCTS_KEY, ANALYTICS_TOP_PRODUCTS_SUBTITLE_KEY, ANALYTICS_TOTAL_ORDERS_KEY, ANALYTICS_TOTAL_ORDERS_SUBTITLE_KEY, ANALYTICS_TOTAL_SALES_KEY, ANALYTICS_TOTAL_SALES_SUBTITLE_KEY } from '../../translations/keys/AnalyticsTranslationKeys';

const text_font_family = 'Lato';
const text_font_style = 'normal';

const Analytics = () => {
    //Default dateFrom is a week ago
    const [dateFrom, setDateFrom] = useState(new Date(new Date().setDate(new Date().getDate() - 7)))
    const [dateTo, setDateTo] = useState(new Date())
    const [openDateFrom, setOpenDateFrom] = useState(false)
    const [openDateTo, setOpenDateTo] = useState(false)

    const [selectedDateFrom, setSelectedDateFrom] = useState(new Date(new Date().setDate(new Date().getDate() - 7)))
    const [selectedDateTo, setSelectedDateTo] = useState(new Date())

    const [modalVisible, setModalVisible] = useState(false)
    const [analyticsObject, setAnalyticsObject] = useState<AnalyticsInterface>({
        totalOrders: 0,
        totalSales: 0,
        topProducts: null,
    })
    const { storeId } = useContext(VendorContext);
    const { t: translation } = useTranslation('translation');

    const [getAnalytics, { data, loading, error }] = useLazyQuery(GET_ANALYTICS, {
        variables: {
            idStore: storeId,
            dateFrom: dateFrom.toUTCString(),
            dateTo: dateTo.toUTCString()

        },
        fetchPolicy: 'network-only',
        onCompleted(data) {
            console.log("on completed called")
            const result = data.getAnalytics
            const object: AnalyticsInterface = {
                totalOrders: result.totalOrders,
                totalSales: result.totalSales.toFixed(2),
                topProducts: result.topProducts
            }
            setAnalyticsObject(object)


        }
    })

    useEffect(() => {
        getAnalytics()
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#FFA500" />
            </View>
        )
    }
    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center' }}>Error:{error.message}</Text>
            </View>
        )
    }


    const topProductsView = () => {
        return (

            <ScrollView>
                {analyticsObject.topProducts?.map((product: any) => {
                    return (
                        <View style={styles.product_container} key={product._id}>

                            <View style={styles.product_img_container}>
                                {renderProductImage(product.imgSrc)}
                            </View>
                            <View style={styles.product_details}>
                                <Text style={styles.product_name}>{product.displayName}</Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>

        )

    }

    const renderProductImage = (imgSrc: any) => {
        if (imgSrc !== '') {
            return <Image source={{ uri: imgSrc }} style={styles.product_image} />;
        } else {
            return (
                <Image
                    style={styles.product_image}
                    source={{ uri: 'https://img.icons8.com/ios/452/no-image.png' }}
                />
            );
        }
    };

    const setNewDateRange = () => {
        setDateFrom(selectedDateFrom)
        setDateTo(selectedDateTo)
        setModalVisible(false)
        getAnalytics()
    }


    const dateRangeSelection = () => {
        return (

            <View style={styles.date_range_container}>
                <Button style={styles.date_button} mode="contained" onPress={() => setModalVisible(true)}>
                    {dateFrom.toDateString()} {translation(ANALYTICS_SELECT_PERIOD_TO_KEY)} {dateTo.toDateString()}
                </Button>

                <Modal visible={modalVisible} animationType="slide" transparent={true}>
                    <View style={styles.modal_container}>
                        <View style={styles.modal_header}>
                            <Text style={styles.modal_title}>{translation(ANALYTICS_SELECT_PERIOD_KEY)}</Text>
                        </View>

                        <View style={styles.modal_date_picker_container}>
                            <Text style={styles.modal_date_picker_title}>{translation(ANALYTICS_SELECT_PERIOD_FROM_KEY)}</Text>
                            <Button  onPress={() => setOpenDateFrom(true)}> {selectedDateFrom.toLocaleDateString()} </Button>
                            <DatePicker
                                modal
                                open={openDateFrom}
                                date={dateFrom}
                                onConfirm={(date) => {
                                    setOpenDateFrom(false)
                                    setSelectedDateFrom(date)
                                }}
                                onCancel={() => {
                                    setOpenDateFrom(false)
                                }}
                                mode="date"
                            />
                            

                        </View>
                        <View style={styles.modal_date_picker_container}>
                            <Text style={styles.modal_date_picker_title}>{translation(ANALYTICS_SELECT_PERIOD_TO_KEY)}</Text>
                            <Button  onPress={() => setOpenDateTo(true)}> {selectedDateTo.toLocaleDateString()} </Button>
                            <DatePicker
                                modal
                                open={openDateTo}
                                date={dateTo}
                                onConfirm={(date) => {
                                    setOpenDateTo(false)
                                    setSelectedDateTo(date)
                                }}
                                onCancel={() => {
                                    setOpenDateTo(false)
                                }}
                                mode="date"
                            />
                           

                        </View>
                        <Button style={styles.date_button} mode="contained" onPress={() => { setNewDateRange() }}>
                            {translation(ANALYTICS_SELECT_PERIOD_SUBMIT_KEY)}
                        </Button>
                    </View>
                </Modal>
            </View>





        )

    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>
            <View style={styles.header}>
                <Text style={styles.header_text}>{translation(ANALYTICS_TITLE_KEY)}</Text>
                {dateRangeSelection()}

            </View>
            <ScrollView style={styles.main_scrollView} refreshControl={
                <RefreshControl refreshing={loading} onRefresh={() => getAnalytics()} />
            }>
                <View style={styles.analytics_container}>
                    <View style={styles.analytics_header}>
                        <Text style={styles.analytics_title}>{translation(ANALYTICS_TOTAL_SALES_KEY)}</Text>
                        <Text style={styles.analytics_subtitle}>{translation(ANALYTICS_TOTAL_SALES_SUBTITLE_KEY)}</Text>
                    </View>
                    <View style={styles.analytics_content}>
                        <Text style={styles.analytics_content_text}>{analyticsObject.totalSales} $</Text>
                    </View>
                </View>
                <View style={styles.analytics_container}>
                    <View style={styles.analytics_header}>
                        <Text style={styles.analytics_title}>{translation(ANALYTICS_TOTAL_ORDERS_KEY)}</Text>
                        <Text style={styles.analytics_subtitle}>{translation(ANALYTICS_TOTAL_ORDERS_SUBTITLE_KEY)}</Text>
                    </View>
                    <View style={styles.analytics_content}>
                        <Text style={styles.analytics_content_text}>{analyticsObject.totalOrders} {translation(ANALYTICS_ORDERS_KEY)}</Text>
                    </View>
                </View>

                <View style={styles.analytics_container}>
                    <View style={styles.analytics_header}>
                        <Text style={styles.analytics_title}>{translation(ANALYTICS_TOP_PRODUCTS_KEY)}</Text>
                        <Text style={styles.analytics_subtitle}>{translation(ANALYTICS_TOP_PRODUCTS_SUBTITLE_KEY)}</Text>
                    </View>
                    <View style={styles.analytics_content}>
                        {topProductsView()}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: 20,
    },
    header_text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        color: '#FFA500',
        fontFamily: text_font_family,
        fontStyle: text_font_style,
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
        flexDirection: 'column',
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
    analytics_subtitle: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontSize: 10,
        lineHeight: 16,
        color: 'grey',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop: 5,
    },
    analytics_content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        //center 
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 10


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
    },
    product_image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    product_img_container: {},





});




export default Analytics;