import React, { useContext, useEffect, useState } from "react";
import { Alert, Image, Keyboard, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, HelperText, IconButton, Text } from "react-native-paper";
import { addProductsStyles } from "./Styles/AddProductStyles";
import Variant from "./Variant";
import Product from "./Product";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client/react";
import { ADD_PRODUCT } from "../../graphql/mutations";
import { VendorContext } from "../../context/Vendor";


interface ProductFields {
    title: string,
    description: string,
    brand: string,
    published: boolean,
    tags: string[],
    imgSrc: string}

 interface VariantFields {
    variantId: string;
    variantTitle: string,
    price: string,
    sku: string,
    taxable: boolean,
    imgSrc: string,
    byWeight:boolean,
    availableForSale:boolean,
    stock: string,
    isValid: boolean,
    isHidden: boolean,
    }

const AddProduct = ({ navigation }: any) => {

    const {t} = useTranslation('translation')
    const {storeId, setStoreId} = useContext(VendorContext)
    const [addProduct, {loading: addLoading, error: addError, data: addData}] = useMutation(ADD_PRODUCT);
    const [refreshed, setRefreshed] = useState(0);
    const deleteError = t('addProduct.deleteError')
    const [productNameError, setError] = useState("");

    // TODO: add button to refresh page (calls function )

    const productDef = {
        title : "",
        description: "",
        brand: "",
        published: true,
        tags: [""],
        imgSrc: ""
    }
    const [product, setProduct] = useState(productDef);

    const defaultVariant: VariantFields = 
    { 
    variantId: new Date().getTime().toString()+1,
    variantTitle: "",
    price: "",
    sku: "",
    taxable: true,
    imgSrc: "",
    byWeight: false,
    availableForSale:true,
    stock: "",
    isValid: false,
    isHidden: false,
    }

    const [variants , setVariants] = useState([defaultVariant]);

    const handleAdd =  () => {
        Keyboard.dismiss()
        // return variants without variantId, isHidden and isValid
        // change price and stock to number
        const variantsWithoutId = variants.map((variant) => {
          const {variantId, isHidden, isValid,price, stock, ...rest} = variant;
          return {...rest, price: parseFloat(price), stock: parseInt(stock)};
        })
        // consider only tags that are not empty
        const filteredTags = product.tags.filter((tag) => tag.trim());
        let finalProduct;
        finalProduct = {
          title: product.title,
          description: product.description,
          brand: product.brand,
          published: product.published,
          tags: filteredTags,
          imgSrc: product.imgSrc,
          variants: variantsWithoutId
        }
        addProduct({variables:{storeId: storeId, newProduct: finalProduct} })
        }

    const submitButtonShouldBeDisabled = () => {
      console.log("store id is: ", storeId)
        // enable submit button if all variants are valid
        // & product name is not empty
        return (
            variants.some((variant) => !variant.isValid) ||
            !product.title.trim()
        );
        };
    
    const refreshPage = () => {
        setRefreshed(refreshed + 1) // update state to trigger useEffect
        setVariants([defaultVariant])
        setError("")
    }

    const messageBack = "Voulez-vous vraiment quitter la page? Le produit n'a pas été ajouté."
    const backToInventory = () => {
      Keyboard.dismiss()
      Alert.alert(
        "Alert",
        messageBack,
        [
          { text: "Quitter", onPress: () => navigation.goBack() },
          { text: "Annuler", onPress: () => {} }
        ]
      );
    }
    
    const save = () => {
        console.log("product", product)
        console.log("variants", variants)
        refreshPage()
        alertOnSave(true)
      }
    
      // TDOO: add message translation
    const succesAddMessage = "Produit ajouté avec succès. Voulez-vous ajouter un autre produit ?"
    const failAddMessage = "Une erreur est survenue lors de l'ajout du produit. Veuillez réessayer."
    
    const alertOnSave = (succes: boolean) =>
        Alert.alert(
        succes? "Succes" : "Erreur",
        succes? succesAddMessage: failAddMessage,
        succes? [
            { text: "Oui", onPress: () =>  {}},
            { text: "Non", onPress: () =>{navigation.goBack()}}
        ] : [
            { text: "OK", onPress: () =>  {} }
        ]
    );

    useEffect(() => {
        if (addLoading || addError || !addData) {
          if(addError) {
            // if an error occurs, show an alert
            alertOnSave(false)
          }
          return
        }
        if (addData.addNewProductToStore.code === 200) {
          // if product is added successfully, show an alert
            save()
        } else {
          // if an error occurs, show an alert
          alertOnSave(false)
        }
      }, [addLoading, addError, addData])

      const alertOnDelete = (message: string) =>
      // Show this alert when user tries to delete the default variant
      Alert.alert(
        "Alert",
        message,
        [
          { text: "OK", onPress: () => {} }
        ]
      );

      const addDefaultVariant = () => {
        // check if the product title is empty
        if (!product.title.trim()) {
          setError("Veuillez remplir les champs obligatoires du produit");
        }
        setVariants([...variants, defaultVariant]);
      }      


    return(
      <SafeAreaView style={{flex: 1, backgroundColor: '#EAEAEA'}}>
        <ScrollView style={{ flex: 1 }}>
            <View style={addProductsStyles.headerFix}>
                <TouchableOpacity
                    style={addProductsStyles.back_button}
                    onPress={() => {backToInventory()}}>
                    <Image
                        style={addProductsStyles.back_button_icon}
                        source={require('../../assets/icons/back.png')}
                    />
                </TouchableOpacity>
                <Text style = {addProductsStyles.header_text}>{t('addProduct.title')}</Text>

                <IconButton
                    style={addProductsStyles.save_button}
                    onPress={() => handleAdd()}
                    disabled={submitButtonShouldBeDisabled()}
                    mode="contained"
                    icon="content-save"
                    size={30}
                    containerColor="#FFA50047"
                    iconColor="#FFA500"
                    />                
            </View>


            <Product
            title={product.title}
            description={product.description}
            brand={product.brand}
            published={true}
            tags= {product.tags}
            imgSrc={product.imgSrc}
            refreshed={refreshed}
            updateSelf={(product: ProductFields) => {
                setProduct(product);
              }}
            >
            </Product>
            {productNameError && (
              <HelperText type='error' style={{
                    height: product.title.length < 1  ? 'auto' : 0,
                  }}>
                    {productNameError}
              </HelperText>
            )}

            <Text style={addProductsStyles.titleText}>VARIANTS</Text>

            <ScrollView>
            {variants.map((field, index) => (    
            <Variant
              key={field.variantId}
              variantIndex={index}
              variantId={field.variantId}
              variantTitle={field.variantTitle}
              price={field.price.toString()}
              sku={field.sku}
              taxable={field.taxable}
              imgSrc={field.imgSrc}
              byWeight={field.byWeight}
              availableForSale={field.availableForSale}
              stock={field.stock.toString()}
              isValid={field.isValid}
              isHidden={field.isHidden}
              isRefreshed={0}
              updateSelf={(variant: VariantFields) => {
                const newVariants = [...variants];
                newVariants[index] = variant;
                setVariants(newVariants);
              }}
              deleteSelf={() => {
                const newVariants = [...variants];
                console.log("newVariants", newVariants)
                if (newVariants.length > 1) {
                  console.log(index)
                  newVariants.splice(index, 1);
                  setVariants(newVariants);
                }
                else {
                  alertOnDelete(deleteError);
                }
              }}                   
            />
            ))}
          </ScrollView>
          <Button style={addProductsStyles.button} mode="contained" onPress={() => addDefaultVariant()}>
            {t('addProduct.addVariant')}
          </Button>
        
        </ScrollView>
      </SafeAreaView>
    )



}

export default AddProduct