import { Dimensions, StyleSheet } from "react-native"

const width = Dimensions.get('window').width

export const dailyDataStyles = StyleSheet.create({
  root: {
    width: width / 2,
    flex: 1
  },
  cardStyle: {
    elevation: 4,
    borderRadius: 10,
    margin: '5%',
    padding: '5%',
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: "row",
  },
  innerCardTitle: {
    color: "black",
    textAlign: 'center',
  },
  data: {
    color: "#FFA500",
    textAlign: 'center',
  }
})