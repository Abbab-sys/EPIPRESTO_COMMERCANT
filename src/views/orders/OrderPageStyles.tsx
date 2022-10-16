import {StyleSheet} from 'react-native';

const text_font_family = 'Lato';
const text_font_style = 'normal';

export const OrderPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EAEAEA',
        height: 50,
        width: '100%',
        padding: 10,
        marginBottom: 10,
    },
    back_button: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        marginLeft: 10,

    },
    back_button_icon: {
        width: 35,
        height: 35,
        tintColor: '#FFA500',
    },

    header_text: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#FFA500',
    },


    subHeader: {
        height: "auto",
        width: '100%',
        padding: 10,
        marginBottom: 5,
        zIndex: 1,
    },


    details_container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: "100%",
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginBottom: 20,
        alignSelf: 'center',
    },
    details_title: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#FFA500',
    },
    product_details_body: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: "100%",

    },

    product_container: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        padding: 10,
    },

    product_image_container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    product_image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    product_details: {

        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    product_name: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 15,

        textAlign: 'center',
        marginLeft: 10,
        color: 'black',
    },
    product_information: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'normal',
        fontSize: 10,

        textAlign: 'center',
        marginLeft: 10,
        marginBottom: 10,
        color: 'black',
    },
    saveButtonContainer: {
        position: 'relative',
        height: 50,
        width: "50%",
        zIndex: 1,
        alignSelf: 'center',
        marginTop: 10,
    },

    saveButtonText: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#FFA500',
        justifyContent: 'center',
        alignItems: 'center',

    },
    client_header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 50,
        width: '100%',

    },
    chat_button: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        marginRight: 10,
    },
    total_price: {
        fontFamily: text_font_family,
        fontStyle: text_font_style,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#FFA500',
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 50,
        marginRight: 10,
        marginTop: 30,
    }



});