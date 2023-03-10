import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconButton, Searchbar, Text} from 'react-native-paper';
import {GET_STORE_VARIANTS_BY_ID} from '../../graphql/queries';
import {useLazyQuery, useMutation} from '@apollo/client';
import {VendorContext} from '../../context/Vendor';
import {inventoryStyles} from '../inventory/InventoryStyles';
import Variant, {VariantProps} from './subsections/Variant';
import {UPDATE_VARIANT} from '../../graphql/mutations';
import {addProductsStyles} from '../Product/Styles/AddProductStyles';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';

/*
 * Name: Stock
 * Description: Set the stock of the variants of a store.
 * Author: Ryma Messedaa
 */

const Stock = ({navigation}: any) => {
  const {storeId} = useContext(VendorContext);

  const [searchQuery, setSearchQuery] = useState('');

  const [
    updateVariant,
    {
      loading: updateVariantLoading,
      error: updateVariantError,
      data: updateVariantData,
    },
  ] = useMutation(UPDATE_VARIANT);

  const [variants, setVariants] = useState<VariantProps[]>([]);

  const [updateCount, setUpdateCount] = useState(0);

  const [updatedVariants, setUpdatedVariants] = useState<VariantProps[]>([]);

  const {t} = useTranslation('translation');

  // Handle the search bar
  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearchQuery(text);
    getItems();
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    getItems();
  }, [isFocused]);

  // Get the variants of the store by Id store
  const [getItems, {loading, error, data, fetchMore}] = useLazyQuery(
    GET_STORE_VARIANTS_BY_ID,
    {
      variables: {
        idStore: storeId,
        offset: 0,
        first: 20,
        variantsOffset2: 0,
        variantsFirst2: 20,
        variantsSearchText2: searchQuery,
      },
    },
  );
  // Use Effect to get the variants of the store when data is changed
  useEffect(() => {
    if (data && data.getStoreById) {
      const products = data.getStoreById.store.products;
      // get all variants of all products
      const variants = products.map((product: any) => {
        return product.variants;
      });
      // flatten array of arrays
      const flattened = [].concat.apply([], variants);
      setVariants(flattened);
    }
  }, [data]);

  // Handle the update of the stock
  const handleUpdate = () => {
    // for each id in updatedVariants console log id
    updatedVariants.forEach(variant => {
      updateVariant({
        variables: {
          variantId: variant._id,
          fieldsToUpdate: {stock: variant.stock},
        },
      });
    });
  };

  // Use Effect to handle the update of the stock
  useEffect(() => {
    if (updateVariantLoading || updateVariantError || !updateVariantData) {
      return;
    }
    if (
      updateVariantData &&
      updateVariantData.updateProductVariant.code === 200
    ) {
      // if product is added successfully, show an alert
      alertOnSave(true);
    } else {
      // if an error occurs, show an alert
      alertOnSave(false);
    }
  }, [updateVariantLoading, updateVariantError, updateVariantData]);

  const succesAddMessage = 'Stock modifi?? avec succ??s!';
  const failAddMessage =
    'Une erreur est survenue lors de la modification du stock. Veuillez r??essayer.';

  // Show an alert when the product is added successfully or not
  const alertOnSave = (succes: boolean) =>
    Alert.alert(
      succes ? 'Succes' : 'Erreur',
      succes ? succesAddMessage : failAddMessage,
      succes
        ? [
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ]
        : [{text: 'OK', onPress: () => {}}],
    );

  const messageBack =
    'Voulez-vous vraiment quitter la page? Toutes les modifications non sauvegard??es seront perdues.';
  // Go back to the previous page
  const backToInventory = () => {
    setUpdateCount(0);
    Keyboard.dismiss();
    if (submitButtonShouldBeDisabled()) {
      navigation.goBack();
    } else {
      Alert.alert('Alert', messageBack, [
        {text: 'Quitter', onPress: () => navigation.goBack()},
        {text: 'Annuler', onPress: () => {}},
      ]);
    }
  };

  // Check if the submit button should be disabled
  const submitButtonShouldBeDisabled = () => {
    if (updateCount === 1) {
      return true;
    } else if (updatedVariants.length > 0) {
      return false;
    }
  };

  const searchPlaceholder = t('searchBarPlaceholder');

  return (
    <SafeAreaView style={inventoryStyles.root}>
      <View style={inventoryStyles.view}>
        <Text variant="headlineMedium" style={inventoryStyles.headline}>
          STOCK
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={addProductsStyles.back_button}
          onPress={() => backToInventory()}>
          <Image
            style={addProductsStyles.back_button_icon}
            source={require('../../assets/icons/back.png')}
          />
        </TouchableOpacity>

        <IconButton
          style={{alignSelf: 'flex-end'}}
          onPress={() => {
            handleUpdate();
          }}
          disabled={submitButtonShouldBeDisabled()}
          mode="contained"
          containerColor="black"
          iconColor="#FFA500"
          icon="content-save-edit"
          size={30}
        />
        <Searchbar
          style={{marginVertical: 10}}
          placeholder={searchPlaceholder}
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>

      <SafeAreaView style={{flex: 1}}>
        {loading ? (
          <View style={inventoryStyles.innerContainer}>
            <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
          </View>
        ) : error ? (
          <View style={inventoryStyles.innerContainer}>
            <Text style={inventoryStyles.errorText}>
              OOPS UNE ERREUR EST SURVENUE
            </Text>
          </View>
        ) : variants.length === 0 ? (
          <Text>YOUR RESEARCH DOES NOT MATCH ANY ITEM</Text>
        ) : (
          <FlatList
            numColumns={2}
            data={variants}
            renderItem={({item}) => (
              <Variant
                _id={item._id}
                displayName={item.displayName}
                // if no image, use default image
                imgSrc={
                  item.imgSrc
                    ? item.imgSrc
                    : 'https://img.icons8.com/ios/452/no-image.png'
                }
                stock={item.stock}
                updateSelf={(newStock: number) => {
                  const newVariants = variants.map(variant => {
                    if (variant._id === item._id) {
                      variant.stock = newStock;
                    }
                    return variant;
                  });
                  setVariants(newVariants);
                  setUpdateCount(updateCount + 1);
                  if (!updatedVariants.includes(item) && updateCount > 0) {
                    setUpdatedVariants([...updatedVariants, item]);
                  }
                }}
              />
            )}
            keyExtractor={item => item._id}
            onEndReachedThreshold={1}
            onEndReached={() => {
              fetchMore({
                variables: {
                  offset: variants.length,
                },
                updateQuery(previousQueryResult, {fetchMoreResult}) {
                  const products = fetchMoreResult.getStoreById.store.products;
                  // get all variants of all products
                  const newEntries = products.map((product: any) => {
                    return product.variants;
                  });
                  // flatten array of arrays
                  const newEntriesFlattened = [].concat.apply([], newEntries);
                  setVariants(oldVariants => [
                    ...oldVariants,
                    ...newEntriesFlattened,
                  ]);
                },
              });
            }}
          />
        )}
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Stock;
