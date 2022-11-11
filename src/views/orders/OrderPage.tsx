import React, { useContext } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {OrderPageStyles} from './OrderPageStyles';
import {Client, Order, Product} from '../../interfaces/OrderInterface';
import {CHANGE_ORDER_STATUS} from '../../graphql/mutations';
import {useMutation, useQuery} from '@apollo/client';
import {useTranslation} from 'react-i18next';
import {
  ORDER_DETAILS_PAYMENT_DELIVERYFEES,
  ORDER_DETAILS_PAYMENT_METHOD,
  ORDER_DETAILS_PAYMENT_SUBTOTAL,
  ORDER_DETAILS_PAYMENT_TAXES,
  ORDER_DETAILS_PAYMENT_TITLE,
  ORDER_DETAILS_PAYMENT_TOTAL,
  ORDER_DETAILS_PRODUCT_TITLE,
  ORDER_DETAILS_SAVE_BUTTON,
  ORDER_DETAILS_TITLE,
  ORDER_STATUS_CLOSED_KEY,
  ORDER_STATUS_CONFIRMED_KEY,
  ORDER_STATUS_DELIVERED_KEY,
  ORDER_STATUS_IN_DELIVERY_KEY,
  ORDER_STATUS_WAITING_KEY,
  ORDERS_CUSTOMER_KEY,
  UPDATE_ALERT_FAILED,
  UPDATE_ALERT_SUCESS,
} from '../../translations/keys/OrdersTranslationKeys';
import {GET_ALL_ORDERS_BY_STORE_ID} from '../../graphql/queries';
import { VendorContext } from '../../context/Vendor';

const styles = OrderPageStyles;

const OrderPage = ({route, navigation}: any) => {
  const receivedUpdateStatus = (data: any) => {
    if (data.updateOrderStatus.code === 200) {
      Alert.alert(translation(UPDATE_ALERT_SUCESS));
    } else {
      Alert.alert(translation(UPDATE_ALERT_FAILED));
    }
  };

  const {storeId} = useContext(VendorContext);


  const [changeOrderStatus] = useMutation(CHANGE_ORDER_STATUS, {
    onCompleted: receivedUpdateStatus,
  });

  const {idOrder} = route.params;

  const [current_order_status, set_current_order_status] = React.useState(
    'WAITING_CONFIRMATION',
  );

  const {data, loading, error} = useQuery(GET_ALL_ORDERS_BY_STORE_ID, {
    variables: {
      idStore:storeId,
      idOrder: idOrder,
    },
    fetchPolicy: 'network-only',
    onCompleted(data) {
      const object = data.getStoreById.store.orders[0].logs;
      set_current_order_status(object[object.length - 1].status); //Set the default value of the dropdown to the last status of the order
    },
  });
  const [open, setOpen] = React.useState(false);

  const {t: translation} = useTranslation('translation');
  const orderStatus = [
    {
      label: translation(ORDER_STATUS_WAITING_KEY),
      value: 'WAITING_CONFIRMATION',
    },
    {label: translation(ORDER_STATUS_CONFIRMED_KEY), value: 'CONFIRMED'},
    {label: translation(ORDER_STATUS_IN_DELIVERY_KEY), value: 'IN_DELIVERY'},
    {label: translation(ORDER_STATUS_DELIVERED_KEY), value: 'DELIVERED'},
    {label: translation(ORDER_STATUS_CLOSED_KEY), value: 'CLOSED'},
  ];

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  if (error) {
    return <Text>Error while loading order</Text>;
  }

  //Mapping the order from the query
  const orderObject = data.getStoreById.store.orders[0];

  const products: Product[] = orderObject.productsVariantsOrdered.map(
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
    _id: orderObject.relatedClient._id,
    lastName: orderObject.relatedClient.lastName,
    firstName: orderObject.relatedClient.firstName,
    email: orderObject.relatedClient.email,
    phone: orderObject.relatedClient.phone,
    address: orderObject.relatedClient.address,
  };
  const order: Order = {
    _id: orderObject._id,
    number: orderObject.orderNumber,
    products: products,
    client: client,
    logs: orderObject.logs,
    total: (
      orderObject.subTotal +
      orderObject.taxs +
      orderObject.deliveryFee
    ).toFixed(2),
    subTotal: orderObject.subTotal.toFixed(2),
    taxs: orderObject.taxs.toFixed(2),
    deliveryFee: orderObject.deliveryFee.toFixed(2),
    paymentMethod: orderObject.paymentMethod,
  };

  const calculateProductTotal = (price: any, quantity: any): any => {
    return (price * quantity).toFixed(2);
  };

  //Save button that will be showed only if the status is changing
  const showSaveButton = () => {
    if (
      current_order_status !== order.logs[order.logs.length - 1].status &&
      current_order_status !== ''
    ) {
      return (
        <SafeAreaView style={styles.saveButtonContainer}>
          <Button
            mode="contained"
            style={styles.saveButtonText}
            onPress={() => sendStatusUpdate(current_order_status)}>
            {translation(ORDER_DETAILS_SAVE_BUTTON)}
          </Button>
        </SafeAreaView>
      );
    }
  };

  //call the mutation to update the status
  const sendStatusUpdate = (status: any) => {
    changeOrderStatus({variables: {orderId: order._id, newStatus: status}});
  };

  //If the image of a product is not available, show a default image
  const renderProductImage = (imgSrc: any) => {
    if (imgSrc !== '') {
      return <Image source={{uri: imgSrc}} style={styles.product_image} />;
    } else {
      return (
        <Image
          style={styles.product_image}
          source={{uri: 'http://via.placeholder.com/640x360'}}
        />
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EAEAEA'}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back_button}
          onPress={() => navigation.goBack()}>
          <Image
            style={styles.back_button_icon}
            source={require('../../assets/icons/back.png')}
          />
        </TouchableOpacity>

        <Text style={styles.header_text}>
          {translation(ORDER_DETAILS_TITLE)} #{order.number}
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
              {translation(ORDERS_CUSTOMER_KEY)}
            </Text>
          </View>

          <Text style={styles.product_name}>
            {order.client.firstName} {order.client.lastName}
          </Text>
          <Text style={styles.product_information}>{order.client.address}</Text>
          <Text style={styles.product_information}>{order.client.email}</Text>
          <Text style={styles.product_name}>{order.client.phone}</Text>
        </View>

        <View style={styles.details_container}>
          <View style={styles.client_header}>
            <Text style={styles.details_title}>
              {translation(ORDER_DETAILS_PAYMENT_TITLE)}
            </Text>

            <Text style={styles.total_price}>
              {translation(ORDER_DETAILS_PAYMENT_TOTAL)}: {order.total} $
            </Text>
          </View>

          <Text style={styles.product_information}>
            {translation(ORDER_DETAILS_PAYMENT_SUBTOTAL)} : {order.subTotal} $
          </Text>
          <Text style={styles.product_information}>
            {translation(ORDER_DETAILS_PAYMENT_TAXES)}: {order.taxs} $
          </Text>
          <Text style={styles.product_information}>
            {translation(ORDER_DETAILS_PAYMENT_DELIVERYFEES)}:{' '}
            {order.deliveryFee} $
          </Text>
          <Text style={styles.product_information}>
            {translation(ORDER_DETAILS_PAYMENT_METHOD)}: {order.paymentMethod}
          </Text>
        </View>

        <View style={styles.details_container}>
          <Text style={styles.details_title}>
            {translation(ORDER_DETAILS_PRODUCT_TITLE)}
          </Text>

          <View style={styles.product_details_body}>
            <ScrollView>
              {order.products.map((product: Product) => {
                return (
                  <View style={styles.product_container} key={product._id}>
                    <View style={styles.product_image_container}>
                      {renderProductImage(product.imgSrc)}
                    </View>
                    <View style={styles.product_details}>
                      <Text style={styles.product_name}>{product.title}</Text>
                      <Text style={styles.product_information}>
                        {product.vendor}
                      </Text>
                      <Text style={styles.product_information}>
                        {calculateProductTotal(product.price, product.quantity)}
                        $ ({product.price}$ x {product.quantity})
                      </Text>
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
};

export default OrderPage;
