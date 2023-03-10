import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {Card, Divider, IconButton, Text, TextInput} from 'react-native-paper';
import {productStyles} from '../../inventory/subsections/ProductStyles';

/*
 * Name: Variant Product
 * Description: Display the product information.
 * Author: Ryma Messedaa
 */
export interface VariantProps {
  _id: string;
  displayName: string;
  imgSrc: any;
  stock: number;
  updateSelf: (stock: number) => void;
}

const Variant = (props: VariantProps) => {
  const [stock, setStock] = React.useState(props.stock.toString());

  //Use Effect to update the stock of the variant
  useEffect(() => {
    props.updateSelf(parseInt(stock));
  }, [stock]);

  // Handle the stock input
  const handleStock = (text: React.SetStateAction<string>) => {
    setStock(text);
  };

  return (
    <View style={productStyles.root}>
      <Card style={productStyles.cardStyle}>
        <Image style={productStyles.image} source={{uri: props.imgSrc}} />
        <Divider
          bold
          style={{backgroundColor: '#FFA500', marginTop: '4%'}}></Divider>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          variant="titleSmall"
          style={productStyles.productName}>
          {props.displayName}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '4%',
          }}>
          <IconButton
            onPress={() => {
              handleStock((parseFloat(stock) - 1).toString());
            }}
            mode="contained"
            icon="minus"
            iconColor="white"
            style={{backgroundColor: '#FFA500'}}
          />

          <TextInput
            underlineColor="#FFA500"
            activeUnderlineColor="transparent"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#FFA500',
              textAlign: 'center',
            }}
            keyboardType="numeric"
            value={stock}
            onChangeText={text => handleStock(text)}
          />

          <IconButton
            onPress={() => {
              handleStock((parseFloat(stock) + 1).toString());
            }}
            mode="contained"
            icon="plus"
            iconColor="white"
            style={{backgroundColor: '#FFA500'}}
          />
        </View>
      </Card>
    </View>
  );
};

export default Variant;
