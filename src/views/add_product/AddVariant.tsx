import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { Image, Keyboard, ScrollView, StyleSheet, Text, View  } from "react-native";
import { Button, Divider, HelperText, IconButton, RadioButton, TextInput } from "react-native-paper";
import { Variant } from "../../../interfaces/VariantInterfaces";
import ImagePicker from 'react-native-image-crop-picker'
import Icon from "react-native-vector-icons/FontAwesome";
import { addVariantStyles } from './AddVariantStyles'
import { commonStyles } from "./CommonStyles";
import { useTranslation } from "react-i18next";

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
  const {t} = useTranslation()
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
      setValid(t('addVariant.errorMessage'));
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
      <View style={addVariantStyles.view}>
        <View style={commonStyles.imageInnerView} >
        <Text
          style={addVariantStyles.title}
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
          <View style={commonStyles.imageContainer} >
          <Text
          style={addVariantStyles.title}
          >  Variant # {props.variantIndex +1}</Text>
          <View style={{position: 'absolute', right: 0, flex: 1, flexDirection: 'row'}}>
          <IconButton icon="delete" iconColor="#FFA500" size={20} onPress={() => props.deleteSelf()} />
          <IconButton icon="eye-off" iconColor="#FFA500" size={20} 
            onPress={() => setHide(true)} />
          </View>

          </View>
          <Divider bold style={commonStyles.divider}></Divider>
          <View style={commonStyles.imageContainer}>
            <View style={commonStyles.imageInnerView}>
              {variantImage ? (
                <>
                  <Image source={{ uri: variantImage }} style={commonStyles.image}></Image>
                  <Button  onPress={() => setVariantImage("")}>
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
                  containerColor="#FFA50047"
                  iconColor="#FFA500"
                  onPress={handleTakePhotoFromCamera}
                  mode="contained"
                  icon="camera"
                  size={40}/>
                <Text>
                  {t('addProduct.takePicture')}
                </Text>
                <Divider bold style={commonStyles.divider}></Divider>
                <IconButton
                  containerColor="#FFA50047"
                  iconColor="#FFA500" 
                  onPress={handleTakePhotoFromGallery}
                  mode="contained"
                  icon="upload"
                  size={40}/>
                <Text style={commonStyles.innerText}>
                  {t('addProduct.importPicture')}
                </Text>
              </View>
            </View>
          <Divider bold style={commonStyles.bottomDivider}></Divider>
          <TextInput
          underlineColor="transparent"
          activeUnderlineColor="#FFA500"
            style={addVariantStyles.input}
            label='Titre du variant*'
            value={title}
            onChangeText={text => setTitle(text)}
            />
          <HelperText type='error'>
          </HelperText>

          <View style={addVariantStyles.checkboxContainer}>
            <Text style={addVariantStyles.label}>{t('addVariant.boughtByWeight')}</Text>
            <CheckBox
              value={isWeightable}
              onValueChange={setWeightable}
              style={addVariantStyles.checkbox}
            />
          
          </View>

          <View style={addVariantStyles.checkboxContainer}>
          {(<>
          <Text style={isWeightable ? addVariantStyles.label : addVariantStyles.inactive_label}>{t('addVariant.unit')}</Text>
          <Text style={isWeightable ? addVariantStyles.label : addVariantStyles.inactive_label}>Lb</Text>
          <RadioButton
            disabled={!isWeightable}
            theme={{ colors: { primary: '#FFA500' } }}
            value="Lb"
            status={ unit === 'Lb' ? 'checked' : 'unchecked' }
            onPress={() => setUnit('Lb')}
          />
          <Text style={isWeightable ? addVariantStyles.label : addVariantStyles.inactive_label}>Kg</Text>
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
            style={addVariantStyles.input}
            label={t('addVariant.labels.price')}
            keyboardType= "numeric"
            onChangeText={text => setPrice(parseFloat(parseFloat(text).toFixed(2)))}
            value={price.toString()}
            />
          <HelperText type='error'>
          </HelperText>

          <View style={addVariantStyles.checkboxContainer}>
            <Text style={addVariantStyles.label}>{t('addVariant.taxable')}</Text>
            <CheckBox
              value={isTaxable}
              onValueChange={setTaxable}
              style={addVariantStyles.checkbox}
            />
          </View>
          
          <TextInput
          underlineColor="transparent"
          activeUnderlineColor="#FFA500"
            style={addVariantStyles.input}
            label={t('addVariant.labels.sku')}
            value={sku}
            onChangeText={text => setSku(text)}
            />
          <HelperText type='error'>
          </HelperText>

          <TextInput
          underlineColor="transparent"
          activeUnderlineColor="#FFA500"
            style={addVariantStyles.input}
            label={t('addVariant.labels.stock')}
            keyboardType= "numeric"
            onChangeText={text => setStock(parseFloat(text))}
            />
          <HelperText type='error'>
          </HelperText>

          <View style={addVariantStyles.checkboxContainer}>
            <Text style={addVariantStyles.label}>{t('addVariant.labels.forSale')}</Text>
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

  export default AddVariant;
