export const fieldsArray = [
    {
        label: "Email",
        attribut: "email",
        keyboardType: "email-adress",
        secure: false,
        onChange: (text: string) => {
            return {
                type: "CHANGE_EMAIL",
                newEmail: text
            }
        },
    },
    {
        label: "Password",
        attribut: "password",
        keyboardType: "default",
        secure: true,
        onChange: (text: string) => {
            return {
                type: "CHANGE_PASSWORD",
                newPassword: text
            }
        },
    },
    {
        label: "Confirm Password",
        attribut: "confirmPassword",
        keyboardType: "default",
        secure: true,
        onChange: (text: string) => {
            return {
                type: "CHANGE_CONFIRM_PASSWORD",
                newConfirmPassword: text
            }
        },
    },
    {
        label: "Username",
        attribut: "username",
        keyboardType: "default",
        secure: false,
        onChange: (text: string) => {
            return {
                type: "CHANGE_USERNAME",
                newUsername: text
            }
        },
        
    },
    {
        label: "Shop Name",
        attribut: "shopName",
        keyboardType: "default",
        secure: false,
        onChange: (text: string) => {
            return {
                type: "CHANGE_SHOP_NAME",
                newShopName: text
            }
        },
    },
    {
        label: "Phone Number",
        attribut: "phone",
        keyboardType: "phone-pad",
        secure: false,
        onChange: (text: string) => {
            return {
                type: "CHANGE_PHONE",
                newPhone: text
            }
        },
    },

]