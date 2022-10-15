import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  divider: {
    backgroundColor: "#FFA500",
    marginTop: '4%',
    width: "100%"
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  imageInnerView: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    resizeMode: 'contain',
    height: 100,
    width: 100
  },
  innerText: {
    textAlign: 'center'
  },
  bottomDivider: {
    backgroundColor: "#FFA500",
    marginVertical: '4%',
    width: "100%"
  }
});