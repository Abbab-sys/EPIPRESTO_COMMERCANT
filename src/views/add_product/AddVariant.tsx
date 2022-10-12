import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { Image, Keyboard, ScrollView, StyleSheet, Text, View  } from "react-native";
import { Button, Divider, HelperText, IconButton, TextInput } from "react-native-paper";
import { Variant } from "../../../interfaces/VariantInterfaces";
import ImagePicker from 'react-native-image-crop-picker'

interface VariantProps {
    variantId: string,
    variantIndex: number,
    variantTitle: string;
    price: number;
    sku: string;
    taxable: boolean;
    imgSrc: string;
    byWeight: boolean;
    availableForSale: boolean;
    stock: number;
    isValid: boolean;
    isHidden: boolean;
    updateSelf: (variant: Variant) => void;
    deleteSelf: () => void;
}

const AddVariant = (props: VariantProps) => {
  const [title, setTitle] = useState(props.variantTitle);
  const [price, setPrice] = useState(0);
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState(0);
  const [isWeightable, setWeightable] = useState(false);
  const [isAvailableForSale, setAvailableForSale] = useState(false);
  const [isTaxable, setTaxable] = useState(false); 
  const [unitKg, setUnitKg] = useState(false); 
  const [unitLb, setUnitLb] = useState(false); 
  const [isValidInput, setValid] = useState("Veuillez remplir tous les champs obligatoires*");
  const [isHidden, setHide] = useState(false);
  const [variantImage, setVariantImage] = useState<any>()


  useEffect(() => {
    props.updateSelf({variantId: props.variantId, variantTitle: title, price: price, sku: sku, taxable: isTaxable,
         imgSrc: "", byWeight: isWeightable, availableForSale: isAvailableForSale, stock: stock, isValid: isVariantValid(), isHidden: isHidden});
    console.log("valid", props.isValid)
  }, [title, price, sku, stock, isWeightable, isAvailableForSale, isTaxable, isHidden])


  const isVariantValid = () => {
    if (title.trim() && price > 0 && stock > 0) {
      setValid("");
      return true;
    } else {
      setValid("Veuillez remplir tous les champs obligatoires*");
      return false;
    }

  }


  const handleAddViantToList =  () => {
    Keyboard.dismiss()
    let variant;
    variant = {
      variantTitle: title,
      price: price,
      sku: sku,
      taxable: isTaxable,
      imgSrc: "",
      byWeight: isWeightable,
      availableForSale: isAvailableForSale,
      stock: stock
    }
  }

  const handleTakePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => setVariantImage(image.path));
  }

  const handleTakePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => setVariantImage(image.path));
  }

    if(isHidden) return (
      <View style={styles.view}>
        <Text>  Variant # {props.variantIndex +1}</Text>
        <Button style={styles.button} mode="contained" onPress={() => setHide(false)}>
              Show
        </Button>
      </View>
      
    )

    else return (
        <ScrollView style={styles.view}
        >
          <Text>  Variant # {props.variantIndex +1}</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
              <IconButton 
                onPress={handleTakePhotoFromCamera}
                mode="contained"
                icon="camera"
                size={40}/>
              <Text>
                Prendre une photo
              </Text>
            </View>
            <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
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
          <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
            {variantImage && (
              <>
                <Image source={{ uri: variantImage }} style={{ resizeMode: 'contain', height: 100, width: 100 }}></Image>
                <Button onPress={() => setVariantImage(null)}><Text>Supprimer la photo</Text></Button></>
            )}
          </View>
          <TextInput
            style={styles.input}
            label='Titre du variant*'
            value={title}
            onChangeText={text => setTitle(text)}
            />
          <HelperText type='error'>
          </HelperText>

          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Produit vendu au poids</Text>
            <CheckBox
              value={isWeightable}
              onValueChange={setWeightable}
              style={styles.checkbox}
            />
          
          {(<>
          <Text style={styles.label}>unité de mesure</Text>
          <Text style={styles.label}>Lb</Text>
          <CheckBox disabled={!isWeightable}
              value={unitKg}
              onValueChange={setUnitKg}
              style={styles.checkbox}
            />
          <Text style={styles.label}>Kg</Text>
           <CheckBox disabled={!isWeightable}
              value={unitLb}
              onValueChange={setUnitLb}
              style={styles.checkbox}
            /></>)}
          </View>

          <TextInput
            style={styles.input}
            label='Prix*'
            keyboardType= "numeric"
            onChangeText={text => setPrice(parseFloat(text))}
            />
          <HelperText type='error'>
          </HelperText>

          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Produit Taxable</Text>
            <CheckBox
              value={isTaxable}
              onValueChange={setTaxable}
              style={styles.checkbox}
            />
          </View>
          
          <TextInput
            style={styles.input}
            label='Sku'
            value={sku}
            onChangeText={text => setSku(text)}
            />
          <HelperText type='error'>
          </HelperText>

          <TextInput
            style={styles.input}
            label='Stock*'
            keyboardType= "numeric"
            onChangeText={text => setStock(parseFloat(text))}
            />
          <HelperText type='error'>
          </HelperText>

          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Produit disponible a la vente</Text>
            <CheckBox
              value={isAvailableForSale}
              onValueChange={setAvailableForSale}
              style={styles.checkbox}
            />
          </View>


          <HelperText type='error'>
          {
          isValidInput
          }
          </HelperText>

          <Button style={styles.button} mode="contained" onPress={() => props.deleteSelf()}>
              Supprimer
            </Button>
            <Button style={styles.button} mode="contained" onPress={() => setHide(true)}>
              hide
            </Button>
        </ScrollView>
      )
  };

  const styles = StyleSheet.create({
    view: {
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#000000',
      borderRadius: 5,
      width: "80%",
      flex: 1
    },
    input: {
      margin: 10,
      marginBottom: 0,
      borderWidth: 1,
      padding: 2,
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
    },
    button: {
      borderColor: '#FF0000',
      backgroundColor: '#FFA500'
    },
  });

  export default AddVariant;
