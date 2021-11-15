import { StyleSheet } from 'react-native';
import COLORS from '../consts/colors';

const Styles = StyleSheet.create({
    gcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        alignSelf: 'center',
        resizeMode: 'contain',
        width: '80%',
    },

    icon: {
        width: 24,
        height: 24,
    },

    inputContainer: {
        flexDirection: 'row',
        marginTop: 15
    },

    inputWrapper: {
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderColor: COLORS.light,
        borderBottomWidth: 0.5,
        flex: 1,
        flexDirection: 'row',
        height: 45,
        fontSize: 14,
        alignItems: "center",
        alignContent: "center",
    },

    input: {
        flexBasis: "80%",
        margin: "5%",
        width: "100%",
        height: "100%",
    },

    inputIcon: {
        position: 'absolute',
        width: 16,
        height: 16,

    },

    btnPrimary: {
        backgroundColor: COLORS.primary,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },

    
    btnActive: {
        height: 50,
        backgroundColor: COLORS.dark,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },

    btnSecondary: {
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
    },

    btnImage: {
        width: 20,
        height: 20,
        marginLeft: 5
    },

    line: {
        height: 1,
        width: 30,
        backgroundColor: COLORS.primary
    },


    header: {
        paddingTop: 40,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.white,
        height: 40,
    },


    siteName: {
        paddingTop: 40,
        paddingBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    container: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 2,
    },
    logincontainer: {
        backgroundColor: COLORS.light,
        paddingTop: 30,
        paddingLeft: 30,
        paddingBottom: 40,
        paddingRight: 30,
        opacity: 0.6,
    },
    footer: {
        flex: 1,
    },

    text: {
        color: COLORS.white,
        fontSize: 40,
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch', // or 'stretch'
    },

    /** channel */
    ItemSeparatorChannel: {
        backgroundColor: COLORS.dark,
        height: 2,

    },
    channelcontainer: {
        paddingTop: 10,
    },

    channelList: {
        flex:1,
        flexDirection:"row",
        fontSize: 14,
        backgroundColor: COLORS.light,
        color: COLORS.black,
        padding: 10,
        marginBottom: 10
    },

    channelListText: {
        flexBasis:'90%',
    },

    /** colors & fonts*/
    blackText: {
        color: COLORS.black,
        fontSize: 40,
    },

    primaryText: {
        color: COLORS.primary,
        fontSize: 24,
    },

    blackText14: {
        fontSize: 14,
        color: COLORS.black
    }



});

export default Styles;