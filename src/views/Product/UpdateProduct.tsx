import React, { useContext, useEffect, useState } from "react";
import { Alert, Image, Keyboard, ScrollView, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Button, HelperText, IconButton, Text } from "react-native-paper";
import { addProductsStyles } from "./Styles/AddProductStyles";
import Variant from "./Variant";
import Product from "./Product";
import { useTranslation } from "react-i18next";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import { GET_PRODUCT_BY_ID, GET_STORE_PRODUCTS_BY_ID } from "../../graphql/queries";
import { useIsFocused } from "@react-navigation/native";
import { commonStyles } from "./Styles/CommonStyles";
import { ADD_NEW_VARIANT_TO_PRODUCT, REMOVE_VARIANT_BY_ID, UPDATE_PRODUCT, UPDATE_VARIANT } from "../../graphql/mutations";


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
    isHidden: boolean
    }

const UpdateProduct = ({ route, navigation }: any) => {

  const isFocused = useIsFocused()

  // states to count variants and products updates
    // count 
    const [updateProductCount, setUpdateProductCount] = useState(0);
    const [updateVariantCount, setUpdateVariantCount] = useState(0);

    const [updatedVariants, setUpdatedVariants] = useState<string[]>([]);

    const [product, setProduct] = useState<ProductFields>()
    const [variants , setVariants] = useState<VariantFields[]>([]);
    const [newVariants, setNewVariants] = useState<string[]>([]);
    const [deletedVariants, setDeletedVariants] = useState<string[]>([]);

 //6354a775ab90d4cdffe49b46 : title=prod1, variant = prod1-var1
 //6355939b80483828eb8c4fde : title=prod2, variant = prod2-var1

  const {data, loading, error} = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      idProduct: route.params.idProduct,
    },
    fetchPolicy: 'network-only',
    onCompleted(data) {
      const myProduct = data.getProductById.product
      const productFields: ProductFields = {
        title: myProduct.title,
        description: myProduct.description,
        brand: myProduct.brand,
        published: myProduct.published,
        tags: myProduct.tags,
        imgSrc: myProduct.imgSrc
      }
      const myVariants = myProduct.variants.map((variant: any) => {
        return {
          ...variant,
          variantId: variant._id,
          isValid: true,
          isHidden: false
        }
        
      })
      // dont return _id 
      const myVariants2 = myVariants.map((variant: any) => {
        const {_id, __typename, ...rest} = variant
        return rest
      })
      setProduct(productFields)  
      setVariants(myVariants2)
    },
  });


  // mapping the product from the query
  // const productObject = data?.getProductById.product;
  // console.log("productObject", productObject)
  // let product : ProductFields ={
  //   title: productObject?.title,
  //   description: productObject?.description,
  //   brand: productObject?.brand,
  //   published: productObject?.published,
  //   tags: productObject?.tags,
  //   imgSrc: productObject?.imgSrc
  // };

  // useEffect(() => {
  //   if(!isFocused) return
  //   setIdProduct(route.params.idProduct)
  //   console.log("ID ICII", idProduct)
  //   //getProduct()
  //   console.log("data", data)
  //   if(data && data.getProductById) {
  //     //setProduct(data.getProductById.product)
  //     const myProduct = data.getProductById.product
  //     console.log("product ICIII", data.getProductById.product)
  //     setProduct(
  //       {
  //         title: myProduct.title,
  //         description: myProduct.description,
  //         brand: myProduct.brand,
  //         published: myProduct.published,
  //         tags: myProduct.tags,
  //         imgSrc: myProduct.imgSrc
  //       }
  //     )     
  //     const myVariants = myProduct.variants.map((variant: any) => {
  //       return {
  //         ...variant,
  //         variantId: variant._id,
  //         isValid: true,
  //         isHidden: false
  //       }
        
  //     })
  //     // dont return _id 
  //     const myVariants2 = myVariants.map((variant: any) => {
  //       const {_id, __typename, ...rest} = variant
  //       return rest
  //     })
  //     setVariants(myVariants2)
  //   }
  // }, [isFocused])

    const {t} = useTranslation('translation')
    const [refreshed, setRefreshed] = useState(0);
    const deleteError = t('addProduct.deleteError')
    const [productNameError, setError] = useState("");

    //const [getProduct, { loading, error, data } ]= useLazyQuery(GET_PRODUCT_BY_ID, {variables: {idProduct: route.params.idProduct}})

    const [updateProduct, {loading: updateLoading, error: updateError, data: UpdateData}] = useMutation(UPDATE_PRODUCT);

    const [addNewVariantToProduct, {loading: addVariantLoading, error: aaddVariantError, data: addVariantData}] = useMutation(ADD_NEW_VARIANT_TO_PRODUCT);

    const [removeVariantById, {loading: removeVariantLoading, error: removeVariantError, data: removeVariantData}] = useMutation(REMOVE_VARIANT_BY_ID);
    
    const [updateVariant, {loading: updateVariantLoading, error: updateVariantError, data: updateVariantData}] = useMutation(UPDATE_VARIANT);

  //const [product, setProduct] = useState<ProductFields>();


    

    const defaultVariant: VariantFields = 
    { 
    variantId: new Date().getTime().toString()+1,
    variantTitle: "",
    price: "",
    sku: "",
    taxable: false,
    imgSrc: "",
    byWeight: false,
    availableForSale:false,
    stock: "",
    isValid: false,
    isHidden: false,
    }
    

    const handleUpdate = () => {
        Keyboard.dismiss()
        //console.log("UPDATED product", product)
        // remvoe newVariants from updatedVariants
        const filteredUpdatedVariants = updatedVariants.filter((variantId) => {
          const variant = newVariants.find((variantId) => variantId === variantId);
          return !variant;
        })
        // consider only delted variants that are not in newVariants
        const filteredDeletedVariants = deletedVariants.filter((deletedVariantId) => {
          const variant = newVariants.find((variantId) => deletedVariantId === variantId);
          return !variant;
        })

        // cpnsider only new variants that are not in deletedVariants
        const filteredNewVariants = newVariants.filter((newVariantId) => {
          const variant = deletedVariants.find((variantId) => newVariantId === variantId);
          return !variant;
        })
      
        // if product fields changed, update product
        console.log("count", updateProductCount)
        if (updateProductCount > 1) {
            console.log("UpdateProduct(productId,fieldsToUpdate)")
            // TODO: voir si update de l'image ralenti le process
            // consider only tags that are not empty
            //updateProduct({variables: {productId: idProduct, fieldsToUpdate: product}})
        }
        if( filteredNewVariants.length > 0) {
            console.log("addNewVariantToProduct(productId, newVariant)")
            // get variants that id is in newVariants
            const newVariantsToAdd = variants.filter((variant) => {
              const variantId = filteredNewVariants.find((variantId) => variantId === variant.variantId);
              return variantId;
            })
            const variantsWithoutId = newVariantsToAdd.map((variant) => {
              const {variantId, isHidden, isValid,price, stock, ...rest} = variant;
              return {...rest, price: parseFloat(price), stock: parseInt(stock)};
            })
            // add new variants
            variantsWithoutId.forEach((variant) => {
              //addNewVariantToProduct({variables: {productId: idProduct, newVariant: variant}})
            })
        }            
        if(filteredDeletedVariants.length > 0) {
            console.log("removeVariantById(productVariantId)")
            //for each deleted variant, remove it from the product
            filteredDeletedVariants.forEach((variantId) => {
              //removeVariantById({variables: {productVariantId: variantId}})
            })    
        }
        // call updateVariant mutation for each variant in filtredUpdatedVariants
        if(filteredUpdatedVariants.length > 0){
          // get variants that id is in updatedVariants
          const updatedVariantsToUpdate = variants.filter((variant) => {
            const variantId = filteredUpdatedVariants.find((variantId) => variantId === variant.variantId);
            return variantId;
          })
          // update variants
          updatedVariantsToUpdate.forEach((variant) => {
            // dont consider variantId, isHidden and isValid
            const {variantId, isHidden, isValid,price, stock, ...rest} = variant;
            // change price and stock to number
            const fieldsToUpdate = {...rest, price: parseFloat(price), stock: parseInt(stock)};
            //updateVariant({variables: {variantId: variant.variantId, fieldsToUpdate: fieldsToUpdate}})
          }
          )
      }         
                  
    }


    const submitButtonShouldBeDisabled = () => {
        // if updateProductCount && updateVariantCount is 1, it means that the user has not changed anything
        // First update happens when we load the page, because we set the product and variants
        // If the user has not changed anything, but deleted variant(s), we should enable the submit button
        console.log("updateProductCount", updateProductCount)
        console.log("updateVariantCount", updateVariantCount)
        if(updateProductCount === 1 && updateVariantCount === 1 && deletedVariants.length > 0) {
            return false
        }
        if (updateProductCount === 1 && updateVariantCount === 2) {
            return true;
        }
        // button disabled if the product name is empty
        else if (product && product.title === "") {
            console.log("disabled no name")
            return true;
        }
        // button disabled if one of the variants is not valid
        else if (variants.some((variant) => variant.isValid === false)) {
            console.log("disabled invalid variant")
            return true;
        }      
        return false;
    }
    
    const refreshPage = () => {
        // setRefreshed(refreshed + 1); // update state to trigger useEffect
        // setVariants([defaultVariant]);
        // setError("");
        // setUpdateProductCount(0);
        // setUpdateVariantCount(0);
    }
    
      // TDOO: add message translation
    const succesAddMessage = "Produit modifié avec succès!"
    const failAddMessage = "Une erreur est survenue lors de la modification du produit. Veuillez réessayer."
    
    const alertOnSave = (succes: boolean) =>
        Alert.alert(
        succes? "Succes" : "Erreur",
        succes? succesAddMessage: failAddMessage,
        succes? [
            { text: "OK", onPress: () =>{navigation.navigate("Inventory")}}
        ] : [
            { text: "OK", onPress: () =>  {} }
        ]
    );

    const messageBack = "Voulez-vous vraiment quitter la page? Toutes les modifications non sauvegardées seront perdues."
    const backToInventory = () => {
      setUpdateProductCount(0)
      setUpdateVariantCount(0)
      Keyboard.dismiss()
      if(submitButtonShouldBeDisabled()){
        navigation.navigate("Inventory")
      }
      else{
        Alert.alert(
          "Alert",
          messageBack,
          [
            { text: "Quitter", onPress: () => navigation.navigate("Inventory") },
            { text: "Annuler", onPress: () => {} }
          ]
        );
      }
    }

    useEffect(() => {
      console.log("useEffect", updateLoading, updateError, UpdateData)
        if (updateLoading || updateError || !UpdateData) {
          if(updateError || (updateLoading && !updateError)) {
            // if an error occurs, show an alert
            alertOnSave(false)
          }
          console.log("loading or error")
          return
        }
        console.log("UpdateData", UpdateData)
        if (UpdateData.updateProduct.code === 200) {
          // if product is added successfully, show an alert
          alertOnSave(true)
        } else {
          // if an error occurs, show an alert
          alertOnSave(false)
        }
      }, [updateLoading, updateError, UpdateData])

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
      if (product && !product.title.trim()) {
        setError("Veuillez remplir les champs obligatoires du produit");
      }
      setNewVariants([...newVariants, defaultVariant.variantId]);
      setVariants([...variants, defaultVariant]);
    }      


    return(
        <ScrollView style={{ flex: 1 }}>

          {loading ? (
            <View>
              <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
            </View>
          ) : error ? (
            <View >
              <Text style={{textAlign: 'center'}}>OOPS UNE ERREUR EST SURVENUE</Text>
            </View>)
          : (

            <View>

            <View style={addProductsStyles.headerFix}>
                <TouchableOpacity
                    style={addProductsStyles.back_button}
                    onPress={() => backToInventory()}>
                    <Image
                        style={addProductsStyles.back_button_icon}
                        source={require('../../assets/icons/back.png')}
                    />
                </TouchableOpacity>
                <Text style = {addProductsStyles.header_text}>Update Product {route.params.idProduct}</Text>

                <IconButton
                    style={addProductsStyles.save_button}
                    onPress={() => handleUpdate()}
                    disabled={submitButtonShouldBeDisabled()}
                    mode="contained"
                    icon="content-save"
                    size={30}
                    containerColor="#FFA50047"
                    iconColor="#FFA500"
                    />                
            </View>
          

          {product && (
            <Product
            title={ data.getProductById.product.title}
            description={ data.getProductById.product.description}
            brand={ data.getProductById.product.brand}
            published={true}
            tags= { data.getProductById.product.tags}
            imgSrc={ data.getProductById.product.imgSrc}
            refreshed={refreshed}
            updateSelf={(updatedProduct: ProductFields) => {
                //product = updatedProduct;
                //console.log("updateSelf", updatedProduct)
                setProduct(updatedProduct);
                setUpdateProductCount(updateProductCount + 1);
              }}
            >
            </Product>

          )}
            {product && productNameError && (
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
                //console.log("updatef variant", variant)
                const newVariants = [...variants];
                newVariants[index] = variant;
                setVariants(newVariants);
                setUpdateVariantCount(updateVariantCount + 1);
                // if variants is updated and variantId is not already in updatedVariants, add it
                if(!updatedVariants.includes(variant.variantId) && updateVariantCount > 0) {
                  setUpdatedVariants([...updatedVariants, field.variantId]);
                }
              }}
              deleteSelf={() => {
                const newVariants = [...variants];
                console.log("deleted variant", newVariants[index])
                // add variantId to deletedVariants
                setDeletedVariants([...deletedVariants, newVariants[index].variantId])
                if (newVariants.length > 1) {
                  newVariants.splice(index, 1);
                  setVariants(newVariants);
                  // remove variant id from updatedVariants if it has been updated and then deleted
                  const newUpdatedVariants = updatedVariants.filter((id) => id !== field.variantId);
                  setUpdatedVariants(newUpdatedVariants);
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
          </View>
          )}
        </ScrollView>
    )



}

export default UpdateProduct