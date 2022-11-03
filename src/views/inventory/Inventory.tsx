import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, SafeAreaView, View } from "react-native";
import { IconButton, Searchbar, Text } from 'react-native-paper';
import { inventoryStyles } from "./InventoryStyles";
import Product, { ProductProps } from "./subsections/Product";
import { mockProducts } from './mockProducts';
import { GET_STORE_PRODUCTS_BY_ID } from "../../graphql/queries";
import { InMemoryCache, useLazyQuery, useQuery } from "@apollo/client";
import { VendorContext } from "../../context/Vendor";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const Inventory = ({navigation}: any) => {

  const {storeId, setStoreId} = useContext(VendorContext)

  const {t} = useTranslation('translation')

  const isFocused = useIsFocused()

  useEffect(() => {
    if(!isFocused) return
    console.log("INVENTORY: ", storeId)
    getItems()
    console.log(data)
  }, [isFocused])

  const [searchQuery, setSearchQuery] = useState('');

  const [products, setProducts] = useState<ProductProps[]>([])

  
  const [getItems, { loading, error, data, fetchMore }] = useLazyQuery(
    GET_STORE_PRODUCTS_BY_ID, 
    {
      variables: {
        idStore: storeId,
        offset: 0,
        first: 20,
        searchText: searchQuery
      },
    
    }
  )

  
  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearchQuery(text)
    getItems()
  }

  useEffect(() => {
    console.log("DATA: ", data)
    if(data && data.getStoreById) {
      setProducts(data.getStoreById.store.products)
      console.log("PRODUCTS: ", products)
    }
  }, [data])

  //getItems should also be called when focus is on this screen
  




  const searchPlaceholder = t('searchBarPlaceholder')
  return(
    <SafeAreaView style={inventoryStyles.root}>
      <View style={inventoryStyles.view}>
        <Text variant="headlineMedium" style={inventoryStyles.headline}>
          {t('inventory.title')}
        </Text>
      </View>
      <View>
        <Searchbar style={{marginVertical: 10}} placeholder={searchPlaceholder} onChangeText={handleSearch} value={searchQuery}/>
      </View>
      <SafeAreaView style={{flex: 1}}>
        {loading ? (
            <View style={inventoryStyles.innerContainer}>
              <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
            </View>
          ) : error ? (
            <View style={inventoryStyles.innerContainer}>
              <Text style={inventoryStyles.errorText}>{t('inventory.error')}</Text>
            </View>)
          : (
            products.length === 0 ? 
              (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>{t('inventory.noProducts')}</Text>
                </View> 
              )
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
                      navigation={navigation} /> 
                  }
                  keyExtractor={item => item._id}
                  onEndReachedThreshold={0.8}
                  onEndReached={() => 
                    {
                      fetchMore({
                        variables: {
                          offset: products.length
                        },
                        updateQuery(previousQueryResult, { fetchMoreResult }) {
                          const newEntries = fetchMoreResult.getStoreById.store.products
                          setProducts(oldProducts => [...oldProducts, ...newEntries])
                        },
                      })
                    }
                  }
                />
              )
          ) }
      </SafeAreaView>
      <View style={{position:'absolute', bottom: 0, alignSelf:'flex-end'}}>
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
    </SafeAreaView>
  )
}

export default Inventory