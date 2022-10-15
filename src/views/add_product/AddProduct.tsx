import { useMutation } from "@apollo/client/react";
import CheckBox from "@react-native-community/checkbox";
import React, { useContext, useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Alert  } from "react-native";
import { Button, Chip, Divider, HelperText, IconButton, TextInput } from "react-native-paper";
import { Variant } from "../../../interfaces/VariantInterfaces";
import { ADD_PRODUCT } from "../../graphql/mutations";
import AddVariant from "./AddVariant";
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/FontAwesome';
import { addProductsStyles } from "./AddProductStyles";
import { commonStyles } from "./CommonStyles";
import { useTranslation } from "react-i18next";
import { VendorContext } from "../../context/Vendor";

const activeUnderlineColor = "#FFA500";
const underlineColor = "transparent";

const AddProduct = ({ navigation }: any) => {

  const {storeId, setStoreId} = useContext(VendorContext)
  const {t} = useTranslation('translation')
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [tags, setTags] = useState([""]);
  const [isPublished, setPublished] = useState(true);
  const [addProduct, {loading: addLoading, error: addError, data: addData}] = useMutation(ADD_PRODUCT);
  const [productNameError, setError] = useState("");

  const deleteError = t('addProduct.deleteError')

  const [productImage, setProductImage] = useState("")

  const [refreshed, setRefreshed] = useState(0)

  const defaultVariant: Variant = 
  { 
    variantId: new Date().getTime().toString(),
    variantTitle: "",
    price: 0,
    sku: "",
    taxable: false,
    imgSrc: "",
    byWeight: false,
    availableForSale:false,
    stock: 0,
    isValid: false,
    isHidden: false}

  const [variants, setVariants]  = useState([defaultVariant]);

  const resetAll= () => {
    setTitle("");
    setDescription("");
    setBrand("");
    setTags([""]);
    setPublished(true);
    setProductImage("");
    setVariants([defaultVariant]);
    setError("");
  }

  
  const submitButtonShouldBeDisabled = () => {
    // enable submit button if all variants are valid
    // & product name is not empty
    return (
      variants.some((variant) => !variant.isValid) ||
      !title.trim()
    );
  };
 
  const handleAdd =  () => {
    Keyboard.dismiss()
    // return variants without variantId, isHidden and isValid
    const variantsWithoutId = variants.map((variant) => {
      const {variantId, isHidden, isValid, ...rest} = variant;
      return rest;
    })
    // consider only tags that are not empty
    const filteredTags = tags.filter((tag) => tag.trim());
    console.log(variantsWithoutId);
    let product;
    product = {
      title: title,
      description: description,
      brand: brand,
      published: false,
      tags: tags,
      imgSrc: productImage,
      variants: variantsWithoutId
    }
    addProduct({variables:{storeId: storeId, newProduct: product} })
    }

  const addDefaultVariant = () => {
    // check if the product title is empty
    if (!title.trim()) {
      setError("Veuillez remplir le titre du produit");
    }
    setVariants([...variants, defaultVariant]);
  }

  const alertOnDelete = (message: string) =>
    // Show this alert when user tries to delete the default variant
    Alert.alert(
      "Alert",
      message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
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

  const save = () => {
    setRefreshed(refreshed+1)
    resetAll();
    alertOnSave(true)
  }

  const succesAddMessage = "Produit ajouté avec succès. Voulez-vous ajouter un autre produit ?"
  const failAddMessage = "Une erreur est survenue lors de l'ajout du produit. Veuillez réessayer."
  
  const alertOnSave = (succes: boolean) =>
  Alert.alert(
    succes? "Succes" : "Erreur",
    succes? succesAddMessage: failAddMessage,
    succes? [
      { text: "Oui", onPress: () =>  {}},
      { text: "Non", onPress: () =>{navigation.navigate("Inventory")}}
    ] : [
      { text: "OK", onPress: () =>  {} }
    ]
  );

  const handleTakePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
      // ts-ignore is used because data is a property of image but still showing error
      // @ts-ignore
    }).then(image => setProductImage("data:image/png;base64,"+image.data));
  }

  const handleTakePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
      // ts-ignore is used because data is a property of image but still showing error
      // @ts-ignore
    }).then(image => setProductImage("data:image/png;base64,"+image.data));
  }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>
        <View style={addProductsStyles.headerFix}>
          <TouchableOpacity
            style={addProductsStyles.back_button}
            onPress={() => {navigation.navigate('Inventory');}}>
              <Image
                style={addProductsStyles.back_button_icon}
                source={require('../../assets/icons/back.png')}
              />
          </TouchableOpacity>
          <Text style = {addProductsStyles.header_text}>{t('addProduct.title')}</Text>

          <IconButton
            style={addProductsStyles.save_button}
            onPress={() => save()}
            disabled={submitButtonShouldBeDisabled()}
            mode="contained"
            icon="content-save"
            size={30}
            containerColor="#FFA50047"
            iconColor="#FFA500"
            />                
        </View>

        <ScrollView 
          style={addProductsStyles.root}
          showsVerticalScrollIndicator={false}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Divider bold style={addProductsStyles.divider}></Divider>
            <View style={commonStyles.imageContainer}>
              <View style={commonStyles.imageInnerView}>
                {productImage ? (
                  <>
                    <Image source={{ uri: productImage }} style={commonStyles.image}></Image>
                    <Button onPress={() => setProductImage("")}>
                      <Text style={{color: "#ce1212d9" }}>
                        {t('addProduct.deletePhoto')}
                      </Text>
                    </Button>
                  </>
                  ) : (
                  <Icon name="image" size={100}></Icon>
                )}
              </View>
              <View style={commonStyles.imageInnerView}>
                <IconButton 
                  onPress={handleTakePhotoFromCamera}
                  mode="contained"
                  icon="camera"
                  size={40}
                  containerColor="#FFA50047"
                  iconColor="#FFA500"
                  />
                <Text>
                  {t('addProduct.takePicture')}
                </Text>
                <Divider bold style={commonStyles.divider}></Divider>
                <IconButton 
                  onPress={handleTakePhotoFromGallery}
                  mode="contained"
                  icon="upload"
                  size={40}
                  containerColor="#FFA50047"
                  iconColor="#FFA500"
                  />
                <Text style={commonStyles.innerText}>
                  {t('addProduct.importPicture')}
                </Text>
              </View>
            </View>
            <Divider bold style={commonStyles.divider}></Divider>

            <TextInput
              underlineColor={underlineColor}
              activeUnderlineColor={activeUnderlineColor}
              style={addProductsStyles.input}
              label={t('addProduct.labels.name')}
              onChangeText={text => setTitle(text)}
              value={title}
              />

            {productNameError && (
              <HelperText type='error' style={{
                    height: title.length < 1  ? 'auto' : 0,
                  }}>
                    {productNameError}
              </HelperText>
            )}
            
            
            <TextInput
              multiline={true}
              underlineColor={underlineColor}
              activeUnderlineColor={activeUnderlineColor}
              style={addProductsStyles.inputDescription}
              label={t('addProduct.labels.description')}
              numberOfLines={4}
              onChangeText={text => setDescription(text)}
              value={description}
              />

            <TextInput
              underlineColor={underlineColor}
              activeUnderlineColor={activeUnderlineColor}
              style={addProductsStyles.input}
              label={t('addProduct.labels.brand')}
              onChangeText={text => setBrand(text)}
              value={brand}
              />

            <TextInput
              underlineColor={underlineColor}
              activeUnderlineColor={activeUnderlineColor}
              style={addProductsStyles.input}
              label={t('addProduct.labels.tags')}
              onChangeText={text => setTags(text.split(" "))}
              value={tags.join(" ")}
            />
            <ScrollView horizontal style = {{paddingTop:5}}>
              {tags.map((tag , index) => (
                tag.trim() && (
                  // put close icon right
                  <Chip
                    key={index}
                    icon="close"
                    onPress={() => {
                      const newTags = [...tags];
                      newTags.splice(index, 1);
                      setTags(newTags);
                    }}
                    style={addProductsStyles.chip}
                  >
                  {tag}</Chip>
              )))}
            </ScrollView>
          </View>

          <Text style={addProductsStyles.titleText}>VARIANTS</Text>

          <ScrollView>
            {variants.map((field, index) => (    
            <AddVariant
              isRefreshed={refreshed} 
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
              updateSelf={(variant: Variant) => {
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

        <View style={addProductsStyles.checkboxContainer}>
          <Text style={addProductsStyles.label}>{t('addProduct.publishProduct')}</Text>
          <CheckBox
            value={isPublished}
            onValueChange={setPublished}
            style={addProductsStyles.checkbox}/>
        </View>

      </ScrollView>

    </SafeAreaView>
  )
  };

  export default AddProduct;