import { StyleSheet } from "react-native"

const text_font_family = 'Lato';
const text_font_style = 'normal';

export const homeStyles = StyleSheet.create({
    root: {
        flex: 1,
    },
    cardStyle: {
        elevation: 4,
        borderRadius: 30,
        margin: '3%',
        padding: '2%',
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        color: '#FFA500',
        fontFamily: text_font_family,
        fontStyle: text_font_style,
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
