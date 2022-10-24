import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, SafeAreaView, View } from "react-native";
import { IconButton, Searchbar, Text } from 'react-native-paper';
import { GET_STORE_PRODUCTS_BY_ID, GET_STORE_VARIANTS_BY_ID } from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { VendorContext } from "../../context/Vendor";
import Product, { ProductProps } from "../inventory/subsections/Product";
import { inventoryStyles } from "../inventory/InventoryStyles";
import Variant, { VariantProps } from "./subsections/Variant";
import { UPDATE_VARIANT } from "../../graphql/mutations";

const Stock = () => {

  const {storeId, setStoreId} = useContext(VendorContext)

  const [searchQuery, setSearchQuery] = useState('');

  const { loading, error, data } = useQuery(GET_STORE_VARIANTS_BY_ID, {variables: {idStore: storeId, "offset": 0, "first": 20}})

  const [updateVariant, {loading: updateVariantLoading, error: updateVariantError, data: updateVariantData}] = useMutation(UPDATE_VARIANT);

  const [products, setProducts] = useState<ProductProps[]>([])

  const [variants, setVariants] = useState<VariantProps[]>([])

  const [updateCount, setUpdateCount] = useState(0)

  const [updatedVariants, setUpdatedVariants] = useState<VariantProps[]>([])


  // TODO: ADAPTER LA RECHERCHE POUR LES VARIANTS
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

  const handleUpdate = () => {
    // for each id in updatedVariants console log id
    updatedVariants.forEach((variant) => {
        console.log(variant._id)
        console.log(variant.stock)
        updateVariant({variables: {variantId: variant._id, fieldsToUpdate: {stock: variant.stock}}})
      })
    
  }



  useEffect(() => {
    if(data && data.getStoreById) {
      const products = data.getStoreById.store.products
      // get all variants of all products
        const variants = products.map((product: any) => {
            return product.variants
            })
        // flatten array of arrays
        const flattened = [].concat.apply([], variants)
        setVariants(flattened)
    }
  }, [data])

  return(
    <View style={inventoryStyles.root}>
      <View style={inventoryStyles.view}>
        <Text variant="headlineMedium" style={inventoryStyles.headline}>
          STOCK
        </Text>
      </View>
      <View>
        <IconButton  style={{alignSelf:'flex-end'}}
          onPress={() => {handleUpdate()}}
          mode="contained"
          containerColor="black"
          iconColor="#FFA500"
          icon="content-save-edit"
          size={30}/>
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
            variants.length === 0 ? 
            
              (<Text>YOUR RESEARCH DOES NOT MATCH ANY ITEM</Text>)
              : 
              (
                console.log("variants", variants),
                <FlatList
                numColumns={2}
                data={variants}

                renderItem={({item}) => 
                  <Variant
                    _id={item._id}
                    variantTitle={item.variantTitle}
                    // if no image, use default image
                    imgSrc={item.imgSrc ? item.imgSrc : "https://img.icons8.com/ios/452/no-image.png"}
                    stock={item.stock}
                    updateSelf={(newStock: number) => {
                        const newVariants = variants.map((variant) => {
                            if(variant._id === item._id) {
                                variant.stock = newStock
                            }
                            return variant
                        })
                        setVariants(newVariants)
                        setUpdateCount(updateCount + 1)
                        if(!updatedVariants.includes(item) && updateCount > 0) {
                            setUpdatedVariants([...updatedVariants, item]);
                        }
                    }}
                    /> 
                }
                keyExtractor={item => item._id}
                />
                
              )
          ) }

      </SafeAreaView>
    </View>
  )
}

export default Stock