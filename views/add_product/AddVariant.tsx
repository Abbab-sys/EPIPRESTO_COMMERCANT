import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View  } from "react-native";
import { Button, Divider, HelperText, TextInput } from "react-native-paper";
import { Variant } from "../../interfaces/VariantInterfaces";

interface VariantProps {
    variantId: string,
    variantTitle: string;
    price: number;
    sku: string;
    taxable: boolean;
    imgSrc: string;
    byWeight: boolean;
    availableForSale: boolean;
    stock: number;
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


  useEffect(() => {
    props.updateSelf({variantId: props.variantId, variantTitle: title, price: price, sku: sku, taxable: isTaxable,
         imgSrc: "", byWeight: isWeightable, availableForSale: isAvailableForSale, stock: stock})
  }, [title, price, sku, stock, isWeightable, isAvailableForSale, isTaxable])


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

    return (
        <ScrollView>
          <Text>FIEDLS VARIANTS</Text>

          <TextInput
            style={styles.input}
            label='Titre'
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
          </View>

          <TextInput
            style={styles.input}
            label='Prix'
            keyboardType= "numeric"
            value={price.toString()}
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
            label='Stock'
            keyboardType= "numeric"
            value={stock.toString()}
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

          <Divider />
          <Text>AJOUT PHOTO VARIANT ICI</Text>

          <Button style={styles.button} mode="contained" onPress={() => props.deleteSelf()}>
              Delete
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

  export default AddVariant;
