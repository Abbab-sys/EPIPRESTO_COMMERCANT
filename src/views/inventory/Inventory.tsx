import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, SafeAreaView, View } from "react-native";
import { IconButton, Searchbar, Text } from 'react-native-paper';
import { inventoryStyles } from "./InventoryStyles";
import Product, { ProductProps } from "./subsections/Product";
import { mockProducts } from './mockProducts';
import { GET_STORE_PRODUCTS_BY_ID } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { VendorContext } from "../../context/Vendor";

const Inventory = ({navigation}: any) => {

  const {storeId, setStoreId} = useContext(VendorContext)

  const [searchQuery, setSearchQuery] = useState('');

  const { loading, error, data } = useQuery(GET_STORE_PRODUCTS_BY_ID, {variables: {idStore: storeId, "offset": 0, "first": 20}})

  const [products, setProducts] = useState<ProductProps[]>([])

  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearchQuery(text)
    if(text.toString() === "") {
      setProducts([])
      if(data) {
        setProducts(data.getStoreById.store.products)
      }
    }
    else {
      const data = products.filter(product => {
        return product.title.toLowerCase().includes(text.toString().toLowerCase())
      })
      setProducts(data)
    }
  }

  useEffect(() => {
    if(data && data.getStoreById) {
      setProducts(data.getStoreById.store.products)
      console.log(data.getStoreById.store.products)
    }
  }, [data])

  return(
    <View style={inventoryStyles.root}>
      <View style={inventoryStyles.view}>
        <Text variant="headlineMedium" style={inventoryStyles.headline}>
          INVENTORY
        </Text>
      </View>
      <View>
        <Searchbar style={{marginVertical: 10}} placeholder="Search" onChangeText={handleSearch} value={searchQuery}/>
      </View>
      <SafeAreaView style={{flex: 1}}>
        {loading ? (
            <View style={inventoryStyles.innerContainer}>
              <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
            </View>
          ) : error ? (
            <View style={inventoryStyles.innerContainer}>
              <Text style={inventoryStyles.errorText}>OOPS UNE ERREUR EST SURVENUE</Text>
            </View>)
          : (
            products.length === 0 ? 
              (<Text>YOUR RESEARCH DOES NOT MATCH ANY ITEM</Text>)
              : 
              (
                <FlatList
                numColumns={2}
                data={products}
                renderItem={({item}) => 
                  <Product
                    _id={item._id}
                    title={item.title}
                    imgSrc={item.imgSrc}
                    navigation={navigation}/> 
                }
                keyExtractor={item => item._id}
                />
              )
          ) }
      </SafeAreaView>
      <View style={{position:'absolute',bottom:0,alignSelf:'flex-end'}}>
      <IconButton 
          onPress={() => {navigation.navigate('AddProduct');}}
          mode="contained"
          containerColor="black"
          iconColor="#FFA500"
          icon="tag-plus"
          size={40}/>
      <IconButton 
          onPress={() => {navigation.navigate('Stock');}}
          mode="contained"
          containerColor="black"
          iconColor="#FFA500"
          icon="store-check"
          size={40}/>
      </View>
    </View>
  )
}

export default Inventory