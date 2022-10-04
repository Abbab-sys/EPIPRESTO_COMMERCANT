import { StyleSheet } from "react-native"

export const homeStyles = StyleSheet.create({
    root: {
        flex: 1,
        margin: 20,
    },
    cardStyle: {
        elevation: 4,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        justifyContent: "center",
        backgroundColor: "#FFA500",
        flexDirection: "column",
    },
    innerView: {
        flexDirection: "row",
    },
    cardContent: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        margin: 4,
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headline: {
        color: "#FFA500"
    },
    cardTitle: {
        color: "white",
        textAlign: 'center',
    },
    innerCardTitle: {
        color: "black"
    }, 
    data: {
        color: "#FFA500"
    },
})
