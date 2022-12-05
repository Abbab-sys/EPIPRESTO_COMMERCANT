import {useQuery} from '@apollo/client';
import React, {useContext, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GET_ALL_ORDERS_BY_STORE_ID} from '../../graphql/queries';
import {Client, Order, Product} from '../../interfaces/OrderInterface';
import {VendorContext} from '../../context/Vendor';
import {useTranslation} from 'react-i18next';
import {
  ORDER_DETAILS_PAYMENT_TOTAL,
  ORDERS_CUSTOMER_KEY,
  ORDERS_DETAILS_BUTTON_KEY,
  ORDERS_STATUS_KEY,
  ORDERS_TITLE_KEY,
} from '../../translations/keys/OrdersTranslationKeys';

/*
 * Name: Orders
 * Description: This page displays all the orders.
 * Author: Khalil Zriba, Adam Naoui-Busson, Zouhair Derouich
 */

const text_font_family = 'Lato';
const text_font_style = 'normal';

const Orders = ({navigation}: any) => {
  const {t} = useTranslation('translation');
  const {storeId, isAdmin} = useContext(VendorContext);
  const {t: translation} = useTranslation('translation');

  // Query to get all orders by store id
  const {data, loading, error, refetch} = useQuery(GET_ALL_ORDERS_BY_STORE_ID, {
    variables: {
      idStore: storeId,
    },
    fetchPolicy: 'network-only',
  });

  // Update status in the UI when navigating back to orders page
  useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  if (error) {
    return <Text>Error while loading orders</Text>;
  }

  //Get Orders from server and map them
  const orders: Order[] = data.getStoreById.store.orders
    .map((order: any) => {
      const products: Product[] = order.productsVariantsOrdered.map(
        ({relatedProductVariant, quantity}: any) => {
          const newProduct: Product = {
            _id: relatedProductVariant._id,
            title: relatedProductVariant.displayName,
            imgSrc: relatedProductVariant.imgSrc,
            quantity: quantity,
            vendor: relatedProductVariant.relatedProduct.relatedStore.name,
            price: relatedProductVariant.price,
          };
          return newProduct;
        },
      );

      const client: Client = {
        _id: order.relatedClient._id,
        lastName: order.relatedClient.lastName,
        firstName: order.relatedClient.firstName,
        email: order.relatedClient.email,
        phone: order.relatedClient.phone,
        address: order.relatedClient.address,
      };

      let status = [];

      if (isAdmin) {
        status = order.subOrdersStatus;
      } else {
        status = order.subOrdersStatus.find(
          (orderStatus: any) => orderStatus.relatedStore._id === storeId,
        );
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
        subOrdersStatus: status,
        deliveryFee: order.deliveryFee.toFixed(2),
        paymentMethod: order.paymentMethod,
      };

      return newOrder;
    })
    .reverse();

  //Change the color of the status field for each order based on the status
  const status_bar_color = (status: string, globalStatus: string) => {
    let switchCondition = status;
    if (isAdmin) {
      switchCondition = globalStatus;
    }
    let style = StyleSheet.create({
      status_bar: {
        width: 100,
        height: 30,
        backgroundColor: '#FFA500',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    switch (switchCondition) {
      case 'WAITING_CONFIRMATION':
        style.status_bar.backgroundColor = 'gold';
        return style.status_bar;
      case 'CONFIRMED':
        style.status_bar.backgroundColor = 'green';
        return style.status_bar;
      case 'IN_DELIVERY':
        style.status_bar.backgroundColor = 'blue';
        return style.status_bar;
      case 'DELIVERED':
        style.status_bar.backgroundColor = 'grey';
        return style.status_bar;
      case 'CLOSED':
        style.status_bar.backgroundColor = 'red';
        return style.status_bar;
      default:
        return style.status_bar;
    }
  };

  //Status text based on language
  const status_bar_text = (status: string, globalStatus: string) => {
    let orderStatusText = status;

    if (isAdmin) {
      orderStatusText = globalStatus;
    }
    return translation('order.status.' + orderStatusText);
  };

  //This is to render each order in the list
  const renderOrderContainer = ({item}: any) => {
    const order_date = new Date(item.logs[0].time);
    return (
      <View style={styles.order_container}>
        <View style={styles.order_header}>
          <Text style={styles.order_date}>{order_date.toDateString()}</Text>
          <Text style={styles.order_number}>{item.number}</Text>
        </View>
        <View style={styles.order_details}>
          <View style={styles.order_details_left}>
            <Text style={styles.order_details_left_text}>
              {translation(ORDERS_CUSTOMER_KEY)}
            </Text>
            <Text style={styles.order_details_left_text}>
              {translation(ORDER_DETAILS_PAYMENT_TOTAL)}
            </Text>
            <Text style={styles.order_details_left_text}>
              {translation(ORDERS_STATUS_KEY)}
            </Text>
          </View>
          <View style={styles.order_details_right}>
            <Text style={styles.order_details_right_text}>
              {item.client.firstName} {item.client.lastName}
            </Text>
            <Text style={styles.order_details_right_text}>{item.total} $</Text>

            <View
              style={status_bar_color(
                item.subOrdersStatus.status,
                item.logs[item.logs.length - 1].status,
              )}>
              <Text style={styles.order_status_text}>
                {status_bar_text(
                  item.subOrdersStatus.status,
                  item.logs[item.logs.length - 1].status,
                )}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.order_button_text}
          onPress={() => navigation.navigate('OrderPage', {idOrder: item._id})}>
          <Text style={styles.view_order_button_text}>
            {translation(ORDERS_DETAILS_BUTTON_KEY)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EAEAEA'}}>
      <View>
        <Text style={styles.titleText}>{translation(ORDERS_TITLE_KEY)}</Text>
      </View>

      {orders.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{t('orders.noOrders')}</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderContainer}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                refetch();
              }}
            />
          }
        />
      )}
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
    fontWeight: 'bold',
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
    shadowColor: '#000',
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
    shadowColor: '#000',
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
    justifyContent: 'flex-start',
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
