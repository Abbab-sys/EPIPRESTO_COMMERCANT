import React from "react";
import { Image, View } from "react-native";
import { Button, Card, Divider, Text } from 'react-native-paper';
import { productStyles } from "./ProductStyles";

export interface ProductProps {
  productId: string;
  productName: string;
  productImage: any;
}

const Product = (props: ProductProps) => {

  return(
    <View style={productStyles.root}>
      <Card style={productStyles.cardStyle}>
        <Image style={productStyles.image} source={props.productImage}/>
        <Divider bold style={{backgroundColor: "#FFA500", marginTop: '4%'}}></Divider>
        <Text ellipsizeMode='tail' numberOfLines={2} variant="titleSmall" style={productStyles.productName}>
          {props.productName}
        </Text>
        <Button style={productStyles.buttonStyle}>
          <Text style={productStyles.buttonText}>
            VOIR
          </Text>
        </Button>
      </Card>
    </View>
  )
}

export default Product