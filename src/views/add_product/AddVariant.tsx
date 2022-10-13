import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { Image, Keyboard, ScrollView, StyleSheet, Text, View  } from "react-native";
import { Button, Divider, HelperText, IconButton, RadioButton, TextInput } from "react-native-paper";
import { Variant } from "../../../interfaces/VariantInterfaces";
import ImagePicker from 'react-native-image-crop-picker'
import Icon from "react-native-vector-icons/FontAwesome";
import { addVariantStyles } from './AddVariantStyles'
import { commonStyles } from "./CommonStyles";

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

const text_font_family = 'Lato';
const text_font_style = 'normal';

const AddVariant = (props: VariantProps) => {
  const [title, setTitle] = useState(props.variantTitle);
  const [price, setPrice] = useState(0);
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState(0);
  const [isWeightable, setWeightable] = useState(false);
  const [isAvailableForSale, setAvailableForSale] = useState(false);
  const [isTaxable, setTaxable] = useState(false); 

  const [isValidInput, setValid] = useState("Veuillez remplir tous les champs obligatoires*");
  const [isHidden, setHide] = useState(false);
  const [variantImage, setVariantImage] = useState<any>()

  const [unit, setUnit] = React.useState('first');



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

  

  const handleTakePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
      // @ts-ignore
    }).then(image => setVariantImage("data:image/png;base64,"+image.data));
  }

  const handleTakePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
      // @ts-ignore
    }).then(image => setVariantImage("data:image/png;base64,"+image.data));
  }

    if(isHidden) return (
      <View style={styles.view}>
        <View style={{flex: 1, flexDirection: 'row'}} >
        <Text
          style={styles.title}
          >  Variant # {props.variantIndex +1}</Text>
          <View style={{position: 'absolute', right: 0, flex: 1, flexDirection: 'row'}}>
          <IconButton icon="delete" iconColor="#FFA500" size={20} onPress={() => props.deleteSelf()} />
          <IconButton icon="eye" iconColor="#FFA500"size={20} onPress={() => setHide(false)} />
          </View>
      </View>
      </View>
      
    )

    else return (
        <ScrollView style={addVariantStyles.view}
        >
          <View style={{flex: 1, flexDirection: 'row'}} >
          <Text
          style={styles.title}
          >  Variant # {props.variantIndex +1}</Text>
          <View style={{position: 'absolute', right: 0, flex: 1, flexDirection: 'row'}}>
          <IconButton icon="delete" iconColor="#FFA500" size={20} onPress={() => props.deleteSelf()} />
          <IconButton icon="eye-off" iconColor="#FFA500" size={20} 
            onPress={() => setHide(true)} />
          </View>

          </View>
          <Divider bold style={{backgroundColor: "#FFA500", marginTop: '4%', width: "100%"}}></Divider>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              {variantImage ? (
                <>
                  <Image source={{ uri: variantImage }} style={{ resizeMode: 'contain', height: 100, width: 100 }}></Image>
                  <Button  onPress={() => setVariantImage("")}><Text style={{color: "#ce1212d9" }}>Supprimer la photo</Text></Button></>
              ) : (
                <Icon name="image" size={100}></Icon>
              )}
            </View>
              <View style={commonStyles.imageInnerView}>
                <IconButton 
                  containerColor="#FFA50047"
                  iconColor="#FFA500"
                  onPress={handleTakePhotoFromCamera}
                  mode="contained"
                  icon="camera"
                  size={40}/>
                <Text>
                  Prendre une photo
                </Text>
                <Divider bold style={{backgroundColor: "#FFA500", marginTop: '4%', width: "100%"}}></Divider>
                <IconButton
                  containerColor="#FFA50047"
                  iconColor="#FFA500" 
                  onPress={handleTakePhotoFromGallery}
                  mode="contained"
                  icon="upload"
                  size={40}/>
                <Text style={commonStyles.innerText}>
                  Importer une photo de la galerie
                </Text>
              </View>
            </View>
          <Divider bold style={commonStyles.bottomDivider}></Divider>
          <TextInput
          underlineColor="transparent"
          activeUnderlineColor="#FFA500"
            style={styles.input}
            label='Titre du variant*'
            value={title}
            onChangeText={text => setTitle(text)}
            />
          <HelperText type='error'>
          </HelperText>

          <View style={addVariantStyles.checkboxContainer}>
            <Text style={addVariantStyles.label}>Produit vendu au poids</Text>
            <CheckBox
              value={isWeightable}
              onValueChange={setWeightable}
              style={addVariantStyles.checkbox}
            />
          
          </View>

          <View style={styles.checkboxContainer}>
          {(<>
          <Text style={isWeightable ? styles.label : styles.inactive_label}>Unite de mesure</Text>
          <Text style={isWeightable ? styles.label : styles.inactive_label}>Lb</Text>
          <RadioButton
            disabled={!isWeightable}
            theme={{ colors: { primary: '#FFA500' } }}
            value="Lb"
            status={ unit === 'Lb' ? 'checked' : 'unchecked' }
            onPress={() => setUnit('Lb')}
          />
          <Text style={isWeightable ? styles.label : styles.inactive_label}>Kg</Text>
          <RadioButton
            disabled={!isWeightable}
            theme={{ colors: { primary: '#FFA500' } }}
            value="Kg"
            status={ unit === 'Kg' ? 'checked' : 'unchecked' }
            onPress={() => setUnit('Kg')}
          />
          </>)}
          
        </View>



          <TextInput
          underlineColor="transparent"
          activeUnderlineColor="#FFA500"
            style={styles.input}
            label='Prix*'
            keyboardType= "numeric"
            onChangeText={text => setPrice(parseFloat(parseFloat(text).toFixed(2)))}
            value={price.toString()}
            />
          <HelperText type='error'>
          </HelperText>

          <View style={addVariantStyles.checkboxContainer}>
            <Text style={addVariantStyles.label}>Produit Taxable</Text>
            <CheckBox
              value={isTaxable}
              onValueChange={setTaxable}
              style={addVariantStyles.checkbox}
            />
          </View>
          
          <TextInput
          underlineColor="transparent"
          activeUnderlineColor="#FFA500"
            style={styles.input}
            label='Sku'
            value={sku}
            onChangeText={text => setSku(text)}
            />
          <HelperText type='error'>
          </HelperText>

          <TextInput
          underlineColor="transparent"
          activeUnderlineColor="#FFA500"
            style={styles.input}
            label='Stock*'
            keyboardType= "numeric"
            onChangeText={text => setStock(parseFloat(text))}
            />
          <HelperText type='error'>
          </HelperText>

          <View style={addVariantStyles.checkboxContainer}>
            <Text style={addVariantStyles.label}>Produit disponible a la vente</Text>
            <CheckBox
              value={isAvailableForSale}
              onValueChange={setAvailableForSale}
              style={addVariantStyles.checkbox}
            />
          </View>


          <HelperText type='error'>
          {
          isValidInput
          }
          </HelperText>
        </ScrollView>
      )
  };

  const styles = StyleSheet.create({
    view: {
      width: '90%',
      minHeight: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginBottom: 20,
        alignSelf: 'center',

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
      marginTop: 20,
        width: 200,
        height: 40,
        backgroundColor: '#FFA500',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title:{
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily: text_font_family,
      fontStyle: text_font_style,
      margin: 10,
      color: '#FFA500'
    },
    inactive_label: {
      margin: 5,
      fontFamily: text_font_family,
      fontStyle: text_font_style,
      fontWeight: 'normal',
      fontSize: 15,
      lineHeight: 18,
      },
  });

  export default AddVariant;
