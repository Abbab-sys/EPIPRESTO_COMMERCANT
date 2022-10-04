import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Searchbar, Text } from 'react-native-paper';
import { inventoryStyles } from "./InventoryStyles";
import Product, { ProductProps } from "./subsections/Product";
import { mockProducts } from './mockProducts';
// import { GET_PRODUCTS } from "../../queries";
import { useQuery } from "@apollo/client";

const Inventory = () => {

  const [searchQuery, setSearchQuery] = useState('');

  // const [getProduts, { loading, error, data }] = useLazyQuery()

  const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);

  const [products, setProducts] = useState<ProductProps[]>(mockProducts)

  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearchQuery(text)
    if(text.toString() === "") {
      setProducts(mockProducts)
    }
    else {
      const data = products.filter(product => {
        return product.productName.toLowerCase().includes(text.toString())
      })
      setProducts(data)
    }
  }

  return(
    <View style={inventoryStyles.root}>
      <View style={inventoryStyles.view}>
        <Text variant="headlineMedium" style={inventoryStyles.headline}>
          Inventory
        </Text>
      </View>
      <View>
        <Searchbar style={{marginVertical: 10}} placeholder="Search" onChangeText={handleSearch} value={searchQuery}/>
      </View>
      <SafeAreaView style={{flex: 1}}>
        {products.length === 0 ? 
          (<Text>YOUR RESEARCH DOES NOT MATCH ANY ITEM</Text>)
          : 
          (
            <FlatList
            numColumns={2}
            data={products}
            renderItem={({item}) => 
              <Product
                productId={item.productId}
                productName={item.productName}
                productImage={item.productImage} /> 
            }
            keyExtractor={item => item.productId}
            />
          )}
      </SafeAreaView>
    </View>
  )
}

export default Inventory