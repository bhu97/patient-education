const FontFamily = {
    LatoLight: 'Lato-Light',
    LatoRegular: 'Lato-Regular',
    LatoBold: 'Lato-Bold',
} as const;


export const BaseThemeStyle = {
    //add color code here
    colors: {
        danger: '#E36363',
        warning: '#F2994A',
        success: '#4ACA9B',
        error: '#FF0C3E',
        black: '#000000',
        gray: '#9E9E9E',
        white: '#FFFFFF',
    },
    paddings: {
        bodyHorizontal: 0,
        bodyVertical: 0,
        containers: 16,
        wrapperHorizontal: 16,
        wrapperVertical: 16,
        formFieldsHorizontal: 16,
        formFieldsVertical: 8,
    },
    margin: {
        containers: 8,
        formElements: 16,
    },
    dimensions: {
        widths: {
            dots: 10,
            radio: 20,
            checkBox: 24,
            fabs: 40,
            marker: 50,
            roundedIcon: 147,
        },
        heights: {
            dots: 10,
            radio: 20,
            separatorContainer:16,
            checkBox: 24,
            buttons: 44,
            topBars: 56,
            bottomBars: 56,
            formFields: 40,
            formTwoLinesFields: 64,
            headers: 64,
            listsItems: 80,
            customItemsList: 50,
            tabMenus: 48,
            tutorialTop: 18,
            infoTouchableIcon: 30,
            cardContactImportHeight: 118,
            amountFieldBold: 90,
            roundedIcon: 147,
            apiTimeText: 14.4,
        },
        borderWidths: {
            buttons: 1,
            formFields: 1.2,
            radio: 2,
            listsItems: 1,
        },
        borderRadiuses: {
            containers: 8,
            buttons: 22,
            formFields: 4,
            customItemsList: 4,
        },
    },
    decorations: {
        opacity: {
            disabledButtons: 0.5,
        },
    },

    fonts: {
        h1: {
            fontFamily: FontFamily.LatoLight,
            fontSize: 96,
        },
        h2: {
            fontFamily: FontFamily.LatoLight,
            fontSize: 60,
        },
        gimme5LabelLight: {
            fontFamily: FontFamily.LatoLight,
            fontSize: 14,
        },
        h3: {
            fontFamily: FontFamily.LatoRegular,
            fontSize: 42,
        },
        h4: {
            fontFamily: FontFamily.LatoBold,
            fontSize: 34,
        },
        h5: {
            fontFamily: FontFamily.LatoRegular,
            fontSize: 22,
        },
        h6: {
            fontFamily: FontFamily.LatoBold,
            fontSize: 21,
        },
        h7: {
            fontFamily: FontFamily.LatoBold,
            fontSize: 20,
        },
        h8: {
            fontFamily: FontFamily.LatoRegular,
            fontSize: 18,
        },
        body1: {
            fontFamily: FontFamily.LatoRegular,
            fontSize: 16,
        },
        body2: {
            fontFamily: FontFamily.LatoRegular,
            fontSize: 15,
        },
        subtitle0: {
            fontFamily: FontFamily.LatoBold,
            fontSize: 17,
        },
        subtitle1: {
            fontFamily: FontFamily.LatoBold,
            fontSize: 16,
        },
        subtitle2: {
            fontFamily: FontFamily.LatoBold,
            fontSize: 15,
        },
        button: {
            fontFamily: FontFamily.LatoBold,
            fontSize: 13,
        },
        subtitle3: {
            fontFamily: FontFamily.LatoBold,
            fontSize: 12,
        },
    }
    
}