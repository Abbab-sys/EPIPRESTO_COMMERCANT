export const fieldsArray = [
  {
    key: "",
    label: "Email",
    attribute: "email",
    keyboardType: "email-address",
    secure: false,
    onChange: (text: string) => {
      return {
        type: "CHANGE_EMAIL",
        newEmail: text,
      };
    },
  },
  {
    label: "Password",
    attribute: "password",
    keyboardType: "default",
    secure: true,
    onChange: (text: string) => {
      return {
        type: "CHANGE_PASSWORD",
        newPassword: text,
      };
    },
  },
  {
    label: "Confirm Password",
    attribute: "confirmPassword",
    keyboardType: "default",
    secure: true,
    onChange: (text: string) => {
      return {
        type: "CHANGE_CONFIRM_PASSWORD",
        newConfirmPassword: text,
      };
    },
  },
  {
    label: "Username",
    attribute: "username",
    keyboardType: "default",
    secure: false,
    onChange: (text: string) => {
      return {
        type: "CHANGE_USERNAME",
        newUsername: text,
      };
    },
  },
  {
    label: "Shop Name",
    attribute: "shopName",
    keyboardType: "default",
    secure: false,
    onChange: (text: string) => {
      return {
        type: "CHANGE_SHOP_NAME",
        newShopName: text,
      };
    },
  },
  {
    label: "Phone Number",
    attribute: "phone",
    keyboardType: "phone-pad",
    secure: false,
    onChange: (text: string) => {
      return {
        type: "CHANGE_PHONE",
        newPhone: text,
      };
    },
  },
];
