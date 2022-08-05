import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: BaseThemeStyle.colors.white,
    },
    backgroundViewStyle: {
        flexBasis: 0.5,
        flexGrow: 0.5,
        flexShrink: 0.5,
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft: 0,
        paddingBottom: 0,
    },
    imageStyle: {
        resizeMode: 'contain',
        height: 200,
        width: 'auto',
        opacity: 1,
        justifyContent: 'center',
        flex: 1,
    },
    emptyImage: {
        resizeMode: 'contain',
        height: 200,
        width: 'auto',
        opacity: 1,
    },
    emptyImageStyle: {
        resizeMode: 'contain',
        height: 200,
        width: 200,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
        opacity: 0.2,
    },
    svgIconStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImageStyle: {
        height: 20,
        width: 20,
    },
    emptyIconStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        height: 55,
        backgroundColor: BaseThemeStyle.colors.listItemBackgroundColor,
        paddingTop: 5,
        paddingBottom: 5,
        boxShadow: '10px 10px 5px lightblue',
        alignItems: 'center',
    },
    textContainer: {
        marginHorizontal: BaseThemeStyle.margin.formElements,
        flex: 0.6,
    },
    downloadedListStyle: {
        backgroundColor:BaseThemeStyle.colors.blue,height:55,width:5
    },
    textStyle: {
        ...BaseThemeStyle.fonts.listTitle,
        color: BaseThemeStyle.colors.titleColor,
        fontSize: 16,
    },
    iconContainer: {
        flex: 0.3,
        alignItems: 'flex-end',
    },
    sizeStyle: {
        ...BaseThemeStyle.fonts.subtitle3,
        color: BaseThemeStyle.colors.titleColor,
    },
    toolTipBorder: {
        borderRadius: 12.5,
    },
    toolTipArrow: {
        width: 16,
        height: 8,
    },
    toolTipContainer: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toolTipOptions: {
        fontSize: 24,
        fontWeight: '500',
        padding: 10,
        color: BaseThemeStyle.colors.blue,
    },
    toolTipHeading: {
        fontSize: 20,
        fontWeight: '500',
        padding: 5,
    },
    toolTipOptionSeperator: {
        height: 1,
        width: 300,
        backgroundColor: 'black',
    },
    blueDotImage: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightArrow: {
        width: '350%',
        height: 60,
    },
    centerData: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyDataText: {
        fontSize: 22,
        fontWeight: '500',
        padding: 10,
        color: BaseThemeStyle.colors.textColor,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBottomRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    modalButton: {
        color: BaseThemeStyle.colors.blue,
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalView: {
        backgroundColor: 'white',
        justifyContent: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,

        width: '25%',
        borderRadius: 5,
    },
    modalTitle: {
        ...BaseThemeStyle.fonts.h7,
        color: BaseThemeStyle.colors.black,
        fontWeight: 'bold',
    },
    modalSubTitle: {
        ...BaseThemeStyle.fonts.h8,
        color: BaseThemeStyle.colors.lightGrayOnModal,
        marginBottom: 10,
    },
    modalContainer: {
        margin: '5%',
    },
    cardStyle: {
        backgroundColor: 'white',
        padding: '3%',
    },
    cardTextInputStyle: {
        borderBottomColor: 'grey',
        borderBottomWidth: 2,

        fontSize: 24,
    },
});
