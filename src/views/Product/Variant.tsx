import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { Image, Keyboard, ScrollView, StyleSheet, Text, View  } from "react-native";
import { Button, Divider, HelperText, IconButton, RadioButton, TextInput } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import ImagePicker from 'react-native-image-crop-picker';
import Icon from "react-native-vector-icons/FontAwesome";
import { addVariantStyles } from "./Styles/AddVariantStyles";
import { commonStyles } from "./Styles/CommonStyles";


const activeUnderlineColor = "#FFA500";
const underlineColor = "transparent";


export interface Variant {
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

interface VariantProps {
    variantId: string,
    variantIndex: number,
    variantTitle: string;
    price: string;
    sku: string;
    taxable: boolean;
    imgSrc: string;
    byWeight: boolean;
    availableForSale: boolean;
    stock: string;
    isValid: boolean;
    isHidden: boolean;
    isRefreshed: number;
    updateSelf: (variant: Variant) => void;
    deleteSelf: () => void;
}


const Variant = (props: VariantProps) => {
    const {t} = useTranslation()
    const [title, setTitle] = useState(props.variantTitle);
    const [price, setPrice] = useState(props.price);
    const [sku, setSku] = useState(props.sku);
    const [stock, setStock] = useState(props.stock);
    const [isWeightable, setWeightable] = useState(props.byWeight);
    const [isAvailableForSale, setAvailableForSale] = useState(props.availableForSale);
    const [isTaxable, setTaxable] = useState(props.taxable); 
  
    const [isValidInput, setValid] = useState("Veuillez remplir tous les champs obligatoires*");
    const [isHidden, setHide] = useState(props.isHidden);
    const [variantImage, setVariantImage] = useState(props.imgSrc)
  
    const [unit, setUnit] = useState('Lb');

    useEffect(() => {
      props.updateSelf({variantId: props.variantId, variantTitle: title, price: price, sku: sku, taxable: isTaxable,
           imgSrc: props.imgSrc, byWeight: isWeightable, availableForSale: isAvailableForSale, stock: stock, isValid: isVariantValid(), isHidden: isHidden});
        }, [title, price, sku, stock, isWeightable, isAvailableForSale, isTaxable, isHidden])
    
    const isVariantValid = () => {
        // check if all required fields are filled
        if (title && title.trim() && parseFloat(price) > 0 && stock && stock.trim() ) {
          setValid("");
          return true;
        } else {
          setValid(t('addVariant.errorMessage'));
          return false;
        }  
    }  

    const handleTakePhotoFromCamera = () => {
        // open camera to take photo
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true
          // ts-ignore is used because data is a property of image but still showing error
          // @ts-ignore
        }).then(image => setVariantImage("data:image/png;base64,"+image.data));
      }
    
      const handleTakePhotoFromGallery = () => {
        // open gallery to select photo
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          // ts-ignore is used because data is a property of image but still showing error
          // @ts-ignore
        }).then(image => setVariantImage("data:image/png;base64,"+image.data));
      }

    
      if(isHidden) return (
        // if variant is hidden, show only title & isValid icon
        <View style={addVariantStyles.view}>
          <View style={commonStyles.imageContainer} >
          <>{!props.isValid && (<IconButton icon="alert" iconColor="#ce1212d9" size={20}/>)}</>
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
            underlineColor={underlineColor}
            activeUnderlineColor={activeUnderlineColor}
              style={addVariantStyles.input}
              label={t('addVariant.labels.name')}
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
            underlineColor={underlineColor}
            activeUnderlineColor={activeUnderlineColor}
              style={addVariantStyles.input}
              label={t('addVariant.labels.price')}
              keyboardType= "numeric"
              onChangeText={text => setPrice(parseFloat(text).toFixed(2))}
              value={price}
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
            underlineColor={underlineColor}
            activeUnderlineColor={activeUnderlineColor}
              style={addVariantStyles.input}
              label={t('addVariant.labels.sku')}
              value={sku}
              onChangeText={text => setSku(text)}
              />
            <HelperText type='error'>
            </HelperText>
  
            <TextInput
            underlineColor={underlineColor}
            activeUnderlineColor={activeUnderlineColor}
              style={addVariantStyles.input}
              label={t('addVariant.labels.stock')}
              keyboardType= "numeric"
              value = {stock}
              onChangeText={text => setStock(text)}
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
  
    
}

export default Variant;