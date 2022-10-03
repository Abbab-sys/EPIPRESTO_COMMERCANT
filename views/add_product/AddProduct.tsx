import CheckBox from "@react-native-community/checkbox";
import React, { useState } from "react";
import { StyleSheet, Text, View  } from "react-native";
import { Button, Divider, HelperText, TextInput } from "react-native-paper";

const AddProcudt = () => {
  const title = "";
  const [isWeightable, setWeightable] = useState(false);

    return (
        <View>
          <Text>AJOUT PRODUIT MANUEL</Text>
          <TextInput
            style={styles.input}
            label='Titre du produit'
            value={title}
            />
          <HelperText type='error'>
          HELPER {title}
          </HelperText>
          <TextInput
            style={styles.input}
            label='Description'
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
          <Divider />
          <Text>AJOUT PHOTO ICI</Text>
          <Divider />
          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Stock</Text>
          </View>
          
          
          <Button mode="contained" onPress={() => console.log("Push to DB")}>
            Enregistrer
          </Button>
          <Divider   />
          <Button mode="contained" onPress={() => console.log("Cancel")}>
            Annuler
          </Button>
        </View>
      )
  };

  const styles = StyleSheet.create({
    input: {
      height: 40,
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