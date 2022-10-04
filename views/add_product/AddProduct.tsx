import { useMutation } from "@apollo/client/react";
import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View  } from "react-native";
import { Button, Divider, HelperText, TextInput } from "react-native-paper";
import { ADD_PRODUCT } from "../../mutations";

const AddProcudt = () => {
  const [title, setTitle] = useState("");
  const [isWeightable, setWeightable] = useState(false);
  const [isPublished, setPublished] = useState(false);
  const [isAvailableForSale, setAvailableForSale] = useState(false);
  const [isTaxable, setTaxable] = useState(false);

  const [addProduct, {loading: addLoading, error: addError, data: addData}] = useMutation(ADD_PRODUCT);
 

  const handleAdd =  () => {
    Keyboard.dismiss()
    let product;
    product = {
      title: "test",
      description: "gre",
      brand: "ger",
      published: false,
      tags: [],
      imgSrc: "gre",
      variants: []
    }
    console.log("OKOK", product)
    addProduct({variables:{storeID: "6339c917efbeebd69ad55561", newProduct: product} })
    console.log("DONE")
    }

  useEffect(() => {
    console.log('LOL')
      if (addLoading || addError || !addData) return
      const serverResponse = addData.loginVendorByEmail
      const loggedWithSuccess = serverResponse.code === 200
      if (loggedWithSuccess) {
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
            />
          <HelperText type='error'>
          </HelperText>

          <TextInput
            style={styles.input}
            label='Marque'
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

          <Text>FIEDLS VARIANTS</Text>

          <TextInput
            style={styles.input}
            label='Titre'
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
          </View>

          <TextInput
            style={styles.input}
            label='Prix'
            keyboardType= "numeric"
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
            />
          <HelperText type='error'>
          </HelperText>

          <TextInput
            style={styles.input}
            label='Stock'
            keyboardType= "numeric"
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

          <Divider />
          <Text>AJOUT PHOTO VARIANT ICI</Text>
          <Divider />          


          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Publier l'article </Text>
            <CheckBox
              value={isPublished}
              onValueChange={setPublished}
              style={styles.checkbox}
            />
          </View>
          
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
      margin: 8,
    },
    button: {
      borderColor: '#FF0000',
      backgroundColor: '#FFA500'
    },
  });

  export default AddProcudt;