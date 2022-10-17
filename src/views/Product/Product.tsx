import { useMutation } from "@apollo/client/react";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { Variant } from "../../../interfaces/VariantInterfaces";
import { VendorContext } from "../../context/Vendor";
import { ADD_PRODUCT } from "../../graphql/mutations";
import ImagePicker from 'react-native-image-crop-picker'
import { Product } from "../../../interfaces/ProductInterfaces";


const activeUnderlineColor = "#FFA500";
const underlineColor = "transparent";

interface ProductProps {
    title: string,
    description: string,
    brand: string,
    published: boolean,
    tags: string[],
    imgSrc: string,
    variants: Variant[],
    updateSelf: (Product: Product) => void;
    children?: React.ReactNode;
  }  

const Product = (props: ProductProps) => {
  const {storeId, setStoreId} = useContext(VendorContext)
  const {t} = useTranslation('translation')
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [brand, setBrand] = useState(props.brand);
  console.log("props tags", props.tags)
  const [tags, setTags] = useState(props.tags);
  const [variants, setVariants]  = useState([props.variants]);
  const [productImage, setProductImage] = useState(props.imgSrc);

  const [isPublished, setPublished] = useState(props.published);
  const [addProduct, {loading: addLoading, error: addError, data: addData}] = useMutation(ADD_PRODUCT);
  const [productNameError, setError] = useState("");

  const deleteError = t('addProduct.deleteError')
  const succesAddMessage = "Produit ajouté avec succès. Voulez-vous ajouter un autre produit ?"
  const failAddMessage = "Une erreur est survenue lors de l'ajout du produit. Veuillez réessayer."
  
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




}

export default Product;