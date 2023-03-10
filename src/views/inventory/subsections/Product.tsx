import React from 'react';
import {Image, View} from 'react-native';
import {Button, Card, Divider, Text} from 'react-native-paper';
import {productStyles} from './ProductStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {INVENTORY_MODIFY_KEY} from '../../../translations/keys/InventoryTranslationKeys';

/*
 * Name: Product
 * Description: This file contains the product component.
 * Author: Khalil Zriba, Adam Naoui-Busson, Alessandro van Reusel, Zouhair Derouich, Ryma Messedaa
 */
export interface ProductProps {
  _id: string;
  title: string;
  imgSrc: any;
  navigation: any;
}

const Product = (props: ProductProps) => {
  const {t} = useTranslation('translation');
  return (
    <View style={productStyles.root}>
      <Card style={productStyles.cardStyle}>
        {props.imgSrc ? (
          <Image style={productStyles.image} source={{uri: props.imgSrc}} />
        ) : (
          <Icon style={productStyles.icon} name="image" size={100}></Icon>
        )}
        <Divider
          bold
          style={{backgroundColor: '#FFA500', marginTop: '4%'}}></Divider>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          variant="titleSmall"
          style={productStyles.productName}>
          {props.title}
        </Text>
        <Button
          style={productStyles.buttonStyle}
          onPress={() => {
            props.navigation.navigate('UpdateProduct', {idProduct: props._id});
          }}>
          <Text style={productStyles.buttonText}>
            {t(INVENTORY_MODIFY_KEY)}
          </Text>
        </Button>
      </Card>
    </View>
  );
};

export default Product;
