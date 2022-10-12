import { useMutation } from "@apollo/client/react";
import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { FlatList, Keyboard, ScrollView, StyleSheet, Text, View, Image  } from "react-native";
import { Button, Divider, HelperText, IconButton, TextInput } from "react-native-paper";
import { Variant } from "../../../interfaces/VariantInterfaces";
import { ADD_PRODUCT } from "../../graphql/mutations";
import AddVariant from "./AddVariant";
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/FontAwesome';

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [tags, setTags] = useState(["lol","okok"]);
  const [isPublished, setPublished] = useState(false);
  const [addProduct, {loading: addLoading, error: addError, data: addData}] = useMutation(ADD_PRODUCT);
  const [productNameError, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");

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
        <ScrollView style={styles.root}>
          <Text style = {styles.header}>Ajout Produit à la boutique</Text>
          <Divider bold style={{backgroundColor: "#FFA500", marginTop: '4%', width: "100%"}}></Divider>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              {productImage ? (
                <>
                  <Image source={{ uri: productImage }} style={{ resizeMode: 'contain', height: 100, width: 100 }}></Image>
                  <Button onPress={() => setProductImage("")}><Text>Supprimer la photo</Text></Button></>
              ) : (
                <Icon name="image" size={100}></Icon>
              )}
            </View>
              <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                <IconButton 
                  onPress={handleTakePhotoFromCamera}
                  mode="contained"
                  icon="camera"
                  size={40}/>
                <Text>
                  Prendre une photo
                </Text>
                <Divider bold style={{backgroundColor: "#FFA500", marginTop: '4%', width: "100%"}}></Divider>
                <IconButton 
                  onPress={handleTakePhotoFromGallery}
                  mode="contained"
                  icon="upload"
                  size={40}/>
                <Text style={{textAlign: 'center'}}>
                  Importer une photo de la galerie
                </Text>
              </View>
            </View>
          <Divider bold style={{backgroundColor: "#FFA500", marginVertical: '4%', width: "100%"}}></Divider>

          <TextInput
            style={styles.input}
            label='Titre du produit*'
            onChangeText={text => setTitle(text)}
            />
          <HelperText type='error' style={{
                height: title.length < 1  ? 'auto' : 0,
              }}>
                {productNameError}
          </HelperText>
          
          <TextInput
            style={styles.input}
            label='Description'
            onChangeText={text => setDescription(text)}
            />


          <TextInput
            style={styles.input}
            label='Marque'
            onChangeText={text => setBrand(text)}
            />

          <TextInput
            style={styles.input}
            label='Tags (separate your tags with a space)'
            onChangeText={text => setTags(text.split(" "))}
            value={tags.join(" ")}
          />
          <ScrollView horizontal>
            {tags.map((tag , index) => (
              <View 
              style={styles.tag}
              key = {index}
              >
              <Text style={styles.tagLabel}>{tag}</Text>
            </View>
            ))}
          </ScrollView>


          <Button style={styles.button} mode="contained" onPress={() => addDefaultVariant()}>
              Ajouter un variant
          </Button>
          <HelperText type='error' >
                {deleteError}
          </HelperText>

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
              setDeleteError("You must have at least one variant");
              // Hide the error message afetr 5 seconds
              setTimeout(() => {
                setDeleteError("");
              }, 5000);
            }
          }}
                              
          ></AddVariant>
        ))}
        </ScrollView>

          

          <Divider   />
          <Divider   />
          <Divider   />
          <Divider   />
          <Divider   />
          <Divider   />

          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Publier l'article </Text>
            <CheckBox
              value={isPublished}
              onValueChange={setPublished}
              style={styles.checkbox}
            />
          </View>


          <Button style={styles.button} 
          mode="contained" 
          onPress={() => handleAdd()}
          disabled={submitButtonShouldBeDisabled()}>
            Enregistrer
          </Button>
          <Divider   />
          <Button style={styles.button} mode="contained" onPress={() => console.log("Cancel")}>
            Annuler
          </Button>
          
    </ScrollView>        
  )
  };

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      margin: "4%"
    },
    input: {
      height: 50,
      margin: 10,
      borderWidth: 1,
      padding: 2,
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 5,
    },
    button: {
      borderColor: '#FF0000',
      backgroundColor: '#FFA500',
      flex: 1,
      margin: '3%'
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 10,
    },
    // tags
    tag: {
      backgroundColor: 'lightgray',
      borderRadius: 5,
      padding: 5,
      margin: 5,
    },
    tagLabel: {
      color: '#FFFFFF',
    },
  });

  export default AddProduct;