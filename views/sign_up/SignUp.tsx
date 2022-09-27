import React from "react"
import { View } from "react-native"
import { Button, Text, TextInput, Card} from 'react-native-paper'
import {signUpStyles} from "./SignUpStyles";


const SignUp = () => {
    const fieldsArray = [
        {
            label: "Email",
            value: "",
            type: "email",
            secure: false,
        },
        {
            label: "Password",
            value: "",
            type: "password",
            secure: true,
        },
        {
            label: "Confirm Password",
            value: "",
            type: "password",
            secure: true,
        },
        {
            label: "Username",
            value: "",
            type: "username",
            secure: false,
        },
        {
            label: "Shop Name",
            value: "",
            type: "shopName",
            secure: false,
        },
        {
            label: "Phone Number",
            value: "",
            type: "phoneNumber",
            secure: false,
        },

    ]
    return (
        <View style={signUpStyles.root}>
            <View style={signUpStyles.signUp}>
                <Text >Sign Up</Text>
            </View>
            <Card style={signUpStyles.card}>
                <View style={signUpStyles.fieldsView}>
                    {fieldsArray.map((field, index) => {
                        return (
                            <View style={signUpStyles.fieldView}>
                                <Text>{field.label}</Text>
                                <TextInput
                                    key={index}
                                    label={field.label}
                                    value={field.value}
                                    secureTextEntry={field.secure}
                                    onChangeText={(text) => { }}
                                    mode="outlined"
                                    error={false}
                                />
                            </View>
                        )
                    })}
                    </View>
                    <View style={signUpStyles.buttonView}>
                        <Button style={signUpStyles.button} mode='contained' onPress={() => {}}>Sign Up</Button>
                    </View>
                
            </Card>
        </View>
    )
}

export default SignUp