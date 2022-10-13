import { useMutation } from "@apollo/client/react";
import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Alert  } from "react-native";
import { Button, Chip, Divider, HelperText, IconButton, TextInput } from "react-native-paper";
import { Variant } from "../../../interfaces/VariantInterfaces";
import { ADD_PRODUCT } from "../../graphql/mutations";
import AddVariant from "./AddVariant";
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/FontAwesome';
import { addProductsStyles } from "./AddProductStyles";
import { commonStyles } from "./CommonStyles";

const text_font_family = 'Lato';
const text_font_style = 'normal';

const AddProduct = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [tags, setTags] = useState([""]);
  const [isPublished, setPublished] = useState(false);
  const [addProduct, {loading: addLoading, error: addError, data: addData}] = useMutation(ADD_PRODUCT);
  const [productNameError, setError] = useState("");

  const deleteError = "You must have at least one variant"

  const [productImage, setProductImage] = useState("")

  const [variants, setVariants]  = useState([
    { 
      variantId: "",
      variantTitle: "",
      price: 0,
      sku: "",
      taxable: false,
      imgSrc: "",
      byWeight: false,
      availableForSale:false,
      stock: 0,
      isValid: false,
      isHidden: false}]);

  const submitButtonShouldBeDisabled = () => {
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
    console.log("OKOK", product)
    addProduct({variables:{storeId: "633ce2e380d8336eb96ea105", newProduct: product} })
    console.log("DONE")
    }

  const addDefaultVariant = () => {
    // check if the product title is empty
    if (!title.trim()) {
      setError("Veuillez remplir le titre du produit");
    }
    setVariants([...variants, {
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
      isHidden: false
    }])
  }

  const alertOnDelete = (message: string) =>
    Alert.alert(
      "Alert",
      message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  useEffect(() => {
      if (addLoading || addError || !addData) return
      if (addData.addNewProductToStore.code === 200) {
          console.log("PRODUIT AJOUTÉ")
      } else {
        console.log("FAIL")
      }
  }, [addLoading, addError, addData])

  let options = {
    title: 'Select Image',
    customButtons: [
      { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const handleTakePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
      // @ts-ignore
    }).then(image => setProductImage("data:image/png;base64,"+image.data));
  }

  const handleTakePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
      // @ts-ignore
    }).then(image => setProductImage("data:image/png;base64,"+image.data));
  }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>
        <View style={styles.headerFix}>
        <TouchableOpacity
                    style={styles.back_button}
                    onPress={() => console.log("navigation BACK")}
                >
                    <Image
                        style={styles.back_button_icon}
                        source={require('../../assets/icons/back.png')}
                    />
                </TouchableOpacity>

                <Text style = {styles.header_text}>Ajout Produit à la boutique</Text>

                <IconButton 
                style={styles.save_button}
                onPress={() => handleAdd()}
                disabled={submitButtonShouldBeDisabled()}
                  mode="contained"
                  icon="content-save"
                  size={30}
                  containerColor="#FFA50047"
                  iconColor="#FFA500"
                  />
                <Text></Text>
                
            </View>

        <ScrollView 
        style={styles.root}
        showsVerticalScrollIndicator={false}
        >

          <View style={{justifyContent: 'center', alignItems: 'center'
          }} >
          <Divider bold style={styles.divider}></Divider>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              {productImage ? (
                <>
                  <Image source={{ uri: productImage }} style={{ resizeMode: 'contain', height: 100, width: 100 }}></Image>
                  <Button onPress={() => setProductImage("")}><Text style={{color: "#ce1212d9" }}>Supprimer la photo</Text></Button></>
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
                  Prendre une photo
                </Text>
                <Divider bold style={commonStyles.divider}></Divider>
                <IconButton 
                  onPress={handleTakePhotoFromGallery}
                  mode="contained"
                  icon="upload"
                  size={40}/>
                <Text style={commonStyles.innerText}>
                  Importer une photo de la galerie
                </Text>
              </View>
            </View>
          <Divider bold style={styles.divider}></Divider>

          <TextInput
          underlineColor="transparent"
          activeUnderlineColor="#FFA500"
            style={styles.input}
            label='Titre du produit*'
            onChangeText={text => setTitle(text)}
            />

          <>
          {productNameError && (
            <HelperText type='error' style={{
                  height: title.length < 1  ? 'auto' : 0,
                }}>
                  {productNameError}
            </HelperText>
          )}
          
          </>
          
          <TextInput
          multiline={true}
            underlineColor="transparent"
            activeUnderlineColor="#FFA500"
            style={styles.inputDescription}
            label='Description'
            onChangeText={text => setDescription(text)}
            />


          <TextInput
            underlineColor="transparent"
            activeUnderlineColor="#FFA500"
            style={styles.input}
            label='Marque'
            onChangeText={text => setBrand(text)}
            />

          <TextInput
            underlineColor="transparent"
            activeUnderlineColor="#FFA500"
            style={styles.input}
            label='Tags (separate your tags with a space)'
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
                  style={{margin: 2, color: "white", backgroundColor:'#FFA50047' , 
                  fontSize: 15,
                  fontWeight: 'bold',
                  fontFamily: text_font_family,
                  fontStyle: text_font_style,
                  borderColor: '#FFA500',
                  borderWidth: 1, borderRadius: 5}}
                >
                {tag}</Chip>
            )))}
          </ScrollView>
          </View>
          

          <Text style={styles.titleText}>VARIANTS</Text>

          <ScrollView >
          {variants.map((field, index) => (    
          <AddVariant 
          key={field.variantId}
          variantIndex={index}
          variantId={field.variantId}
          variantTitle={field.variantTitle}
          price={field.price}
          sku={field.sku}
          taxable={field.taxable}
          imgSrc={field.imgSrc}
          byWeight={field.byWeight}
          availableForSale={field.availableForSale}
          stock={field.stock}
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
                              
          ></AddVariant>
        ))}
        </ScrollView>

        <Button style={styles.button} mode="contained" onPress={() => addDefaultVariant()}>
              Ajouter un variant
          </Button>

          <View style={addProductsStyles.checkboxContainer}>
            <Text style={addProductsStyles.label}>Publier l'article </Text>
            <CheckBox
              value={isPublished}
              onValueChange={setPublished}
              style={addProductsStyles.checkbox}
            />
          </View>
          
    </ScrollView>
    </SafeAreaView>
  )
  };

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      margin: "4%",
    },
    input: {
      margin: 10,
      marginBottom: 0,
      borderWidth: 1,
      padding: 0,
      backgroundColor: '#FFFFFF',
      borderColor: '#FFA500',
      borderRadius: 10,
      width: '90%',
      fontFamily: text_font_family,
      fontStyle: text_font_style,
      fontWeight: 'normal',
      fontSize: 15,
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 10,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 5,
      fontFamily: text_font_family,
      fontStyle: text_font_style,
      fontWeight: 'normal',
      fontSize: 15,
      lineHeight: 18,
      color: 'black'        
    },
    button: {
      borderColor: '#FF0000',
      backgroundColor: '#FFA500',
      flex: 1,
      margin: '3%'
    },
    header: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: 'center',
      margin: 10,
      color: '#FFA500',
      fontFamily: text_font_family,
      fontStyle: text_font_style,
  },
    titleText: {
      fontSize: 17,
        fontWeight: "bold",
        textAlign: 'center',
        margin: 10,
        color: '#FFA500',
        fontFamily: text_font_family,
        fontStyle: text_font_style,
    },
    divider: {
      backgroundColor: "#FFA500",
      marginVertical: '4%',
      width: "100%"
    },
    headerFix: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EAEAEA',
      height: 50,
      width: '100%',
      padding: 10,
      marginBottom: 10,
  },
  back_button: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      marginLeft: 10,

  },
  back_button_icon: {
      width: 35,
      height: 35,
      tintColor: '#FFA500',
  },

  header_text: {
      fontFamily: text_font_family,
      fontStyle: text_font_style,
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      color: '#FFA500',
  },
  save_button: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      marginRight: 10,
  },
  inputDescription: {
    margin: 10,
      marginBottom: 0,
      borderWidth: 1,
      padding: 0,
      backgroundColor: '#FFFFFF',
      borderColor: '#FFA500',
      borderRadius: 10,
      width: '90%',
      fontFamily: text_font_family,
      fontStyle: text_font_style,
      fontWeight: 'normal',
      fontSize: 15,
      minHeight: 120,
  }

  });

  export default AddProduct;