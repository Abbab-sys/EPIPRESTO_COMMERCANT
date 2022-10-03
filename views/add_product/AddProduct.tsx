import { useMutation } from "@apollo/client/react";
import CheckBox from "@react-native-community/checkbox";
import React, { useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View  } from "react-native";
import { Button, Divider, HelperText, TextInput } from "react-native-paper";
import { ADD_PRODUCT } from "../../mutations";

const AddProcudt = () => {
  const [title, setTitle] = useState("");
  const [isWeightable, setWeightable] = useState(false);
  const [isPublished, setPublished] = useState(false);
  const [isAvailableForSale, setAvailableForSale] = useState(false);
  const [isTaxable, setTaxable] = useState(false);

  const [addProduct] = useMutation(ADD_PRODUCT);

  const handleAdd = async () => {
    Keyboard.dismiss()
    let product;
    product = {
      title: "test",
      description: "",
      brand: "",
      published: false,
      tags: [],
      imgSrc: "",
      variants: []
    }
    console.log("OKOK")
    const response =  await addProduct({variables:{storeID: "6339c917efbeebd69ad55561", newProduct: product} })
    if (response.data.code !== 404) {
        console.log("ITEM AJOUTÉ!")
    } else {
        console.log("FAIL")
    }
    }

    return (
        <ScrollView>
          <Text>AJOUT PRODUIT MANUEL..</Text>
          <Text>FIEDLS PRODUIT</Text>
          <TextInput
            style={styles.input}
            label='Titre du produit..'
            onChangeText={text => setTitle(text)}
            />
          <HelperText type='error' style={{
                height: title.length < 1  ? 'auto' : 0,
              }}>
            Champ obligatoire!
          </HelperText>
          
          <TextInput
            style={styles.input}
            label='Description'
            />
          <HelperText type='error'>
          HELPER
          </HelperText>

          <TextInput
            style={styles.input}
            label='Marque'
            />
          <HelperText type='error'>
          HELPER
          </HelperText>

          <TextInput
            style={styles.input}
            label='Tags'
            />
          <HelperText type='error'>
          HELPER
          </HelperText>

          <Text>AJOUT PHOTO PRODUIT ICI</Text>

          <Text>FIEDLS VARIANTS</Text>

          <TextInput
            style={styles.input}
            label='Titre'
            />
          <HelperText type='error'>
          HELPER
          </HelperText>

          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Produit vendu au poids</Text>
            <CheckBox
              value={isWeightable}
              onValueChange={setWeightable}
              style={styles.checkbox}
            />
          </View>
          <Text>Is CheckBox selected: {isWeightable ? "👍" : "👎"}</Text>

          <TextInput
            style={styles.input}
            label='Prix'
            />
          <HelperText type='error'>
          HELPER
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
          HELPER
          </HelperText>

          <TextInput
            style={styles.input}
            label='Stock'
            />
          <HelperText type='error'>
          HELPER
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
          <Text>AJOUT PHOTO ICI</Text>
          <Divider />
          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Stock</Text>
          </View>
          


          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Publier l'article </Text>
            <CheckBox
              value={isPublished}
              onValueChange={setPublished}
              style={styles.checkbox}
            />
          </View>
          
          <Button mode="contained" onPress={() => handleAdd()}>
            Enregistrer
          </Button>
          <Divider   />
          <Button mode="contained" onPress={() => console.log("Cancel")}>
            Annuler
          </Button>
        </ScrollView>
      )
  };

  const styles = StyleSheet.create({
    input: {
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10,
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
    }
  });

  export default AddProcudt;