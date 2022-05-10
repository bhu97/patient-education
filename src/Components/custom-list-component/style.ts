import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({

    mainContainer: {
        flex: 1,
     padding:25,
    
    },
    customcontainerview: {
        backgroundColor: BaseThemeStyle.colors.white,
        flex: 0.8,
       
    },
    contentContainer:{ 
        flexDirection: 'row', 
 padding:20,
    },
    textStyle:{ 
        fontSize: 27, 
        fontWeight: 'bold', 
        color: BaseThemeStyle.colors.black, 
    },
    plusIconstyle:{ 
        marginLeft: 'auto' ,

    },
balanceContainer:{ 
    flex: 2, 
    paddingHorizontal: 25, 
    paddingVertical: 20 
},
favoritecontainer:{ flex: 1, flexDirection: 'row' }

});
