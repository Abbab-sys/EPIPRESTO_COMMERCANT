import CheckBox from "@react-native-community/checkbox";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, SafeAreaView} from "react-native";
import { Button, Chip, Divider, HelperText, IconButton, TextInput } from "react-native-paper";
import { useTranslation } from "react-i18next";
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/FontAwesome';
import { addProductsStyles } from "./Styles/AddProductStyles";
import { commonStyles } from "./Styles/CommonStyles";


interface Product {
  title: string,
  description: string,
  brand: string,
  published: boolean,
  tags: string[],
  imgSrc: string}

const activeUnderlineColor = "#FFA500";
const underlineColor = "transparent";

interface ProductProps {
    title: string,
    description: string,
    brand: string,
    published: boolean,
    tags: string[],
    imgSrc: string,
    updateSelf: (Product: Product) => void;
    refreshed: number;
    children?: React.ReactNode;
  }  

const Product = (props: ProductProps) => {
  const {t} = useTranslation('translation')
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [brand, setBrand] = useState(props.brand);
  const [tags, setTags] = useState(props.tags);
  const [productImage, setProductImage] = useState(props.imgSrc);

  const [isPublished, setPublished] = useState(props.published);
  const [productNameError, setError] = useState("");


  useEffect(() => {
    props.updateSelf({
      title: title,
      description: description,
      brand: brand,
      published: isPublished,
      tags: tags,
      imgSrc: productImage
    });
}, [title, description, brand,tags, isPublished, productImage]);

useEffect(() => {
  // reset all fields after saving product
  if(props.refreshed > 0) {
  setTitle("")
  setDescription("")
  setBrand("")
  setTags([""])
  setProductImage("")
  setPublished(true)
  console.log("resetting product fields", props.refreshed)
  }
}, [props.refreshed])

  
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
    <SafeAreaView style={{ flex: 1}}>
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




}

export default Product;