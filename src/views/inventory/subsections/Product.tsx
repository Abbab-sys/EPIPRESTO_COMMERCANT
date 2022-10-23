import React from "react";
import { Image, View } from "react-native";
import { Button, Card, Divider, Text } from 'react-native-paper';
import { productStyles } from "./ProductStyles";

export interface ProductProps {
  _id: string;
  title: string;
  imgSrc: any;
}

const Product = (props: ProductProps, navigation : any) => {

  return(
    <View style={productStyles.root}>
      <Card style={productStyles.cardStyle}>
        <Image style={productStyles.image} source={{uri: props.imgSrc}}/>
        <Divider bold style={{backgroundColor: "#FFA500", marginTop: '4%'}}></Divider>
        <Text ellipsizeMode='tail' numberOfLines={2} variant="titleSmall" style={productStyles.productName}>
          {props.title}
        </Text>
        <Button style={productStyles.buttonStyle}
        onPress={() => {navigation.navigate('UpdateProduct', {idProduct: props._id})}}>
          <Text style={productStyles.buttonText}>
            VOIR
          </Text>
        </Button>
      </Card>
    </View>
  )
}

export default Product