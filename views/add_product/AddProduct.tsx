import { useMutation } from "@apollo/client/react";
import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { FlatList, Keyboard, ScrollView, StyleSheet, Text, View  } from "react-native";
import { Button, Divider, HelperText, TextInput } from "react-native-paper";
import { Variant } from "../../interfaces/VariantInterfaces";
import { ADD_PRODUCT } from "../../mutations";
import AddVariant from "./AddVariant";

const AddProcudt = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [tags, setTgas] = useState([]);
  const [isWeightable, setWeightable] = useState(false);
  const [isPublished, setPublished] = useState(false);
  const [isAvailableForSale, setAvailableForSale] = useState(false);
  const [isTaxable, setTaxable] = useState(false);

  const [addProduct, {loading: addLoading, error: addError, data: addData}] = useMutation(ADD_PRODUCT);

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
      stock: 0}]);

  const handleAdd =  () => {
    Keyboard.dismiss()
    // return variants without variantId
    const variantsWithoutId = variants.map((variant) => {
      const {variantId, ...rest} = variant;
      return rest;
    })
    let product;
    product = {
      title: title,
      description: description,
      brand: brand,
      published: false,
      tags: tags,
      imgSrc: "gre",
      variants: variantsWithoutId
    }
    console.log("OKOK", product)
    addProduct({variables:{storeId: "6339c917efbeebd69ad55561", newProduct: product} })
    console.log("DONE")
    }

  const addDefaultVariant = () => {
    setVariants([...variants, {
      variantId: new Date().getTime().toString(),
      variantTitle: "",
      price: 0,
      sku: "",
      taxable: false,
      imgSrc: "",
      byWeight: false,
      availableForSale:false,
      stock: 0
    }])
    console.log("variants", variants)
  }

  useEffect(() => {
      if (addLoading || addError || !addData) return
      if (addData.addNewProductToStore.code === 200) {
          console.log("SUCCES")
      } else {
        console.log("FAIL")
      }
  }, [addLoading, addError, addData])

    return (
        <ScrollView>
          <Text>FIEDLS PRODUIT</Text>
          <TextInput
            style={styles.input}
            label='Titre du produit'
            onChangeText={text => setTitle(text)}
            />
          <HelperText type='error' style={{
                height: title.length < 1  ? 'auto' : 0,
              }}>
          </HelperText>
          
          <TextInput
            style={styles.input}
            label='Description'
            onChangeText={text => setDescription(text)}
            />
          <HelperText type='error'>
          </HelperText>

          <TextInput
            style={styles.input}
            label='Marque'
            onChangeText={text => setBrand(text)}
            />
          <HelperText type='error'>
          </HelperText>

          <TextInput
            style={styles.input}
            label='Tags'
            />
          <HelperText type='error'>
          </HelperText>

          <Text>AJOUT PHOTO PRODUIT ICI</Text>

          <ScrollView horizontal>
          {variants.map((field, index) => (
          <AddVariant 
          key={field.variantId}
          variantId={field.variantId}
          variantTitle={field.variantTitle}
          price={field.price}
          sku={field.sku}
          taxable={field.taxable}
          imgSrc={field.imgSrc}
          byWeight={field.byWeight}
          availableForSale={field.availableForSale}
          stock={field.stock}
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
              console.log("You must have at least one variant");
            }
          }}
                              
          ></AddVariant>
        ))}
        </ScrollView>

        <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Publier l'article </Text>
            <CheckBox
              value={isPublished}
              onValueChange={setPublished}
              style={styles.checkbox}
            />
          </View>

            <Button style={styles.button} mode="contained" onPress={() => addDefaultVariant()}>
              Add variant
            </Button>

          <Button style={styles.button} mode="contained" onPress={() => handleAdd()}>
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
      backgroundColor: '#FFA500'
    },
  });

  export default AddProcudt;