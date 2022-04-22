import React from 'react';
import { Text, View } from 'react-native';
import { style } from './style';
import Icon from 'react-native-vector-icons/Entypo';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import CustomIcon from '../custom-icon/custom-icon';

interface CustomListWithHeaderProps {
    iconName: string;
    labelText: string;
    headerText?: string;
}

const CustomListWithHeader = (props: CustomListWithHeaderProps) => {
    return (
        <View style={style.mainContainer}>
            <View style={style.headerTextContainer}>
                <Text style={style.headerTextStyle}>{props.headerText}</Text>
            </View>
            <View style={style.itemContainer}>
                <View style={style.circleIconContainer}>
                    <CustomIcon
                        name={props.iconName}
                        size={35}
                        color={BaseThemeStyle.colors.black}
                    />
                </View>
                <View style={style.textContainer}>
                    <Text style={style.textStyle}>{props.labelText}</Text>
                </View>
                <View style={style.iconContainer}>
                    <CustomIcon
                        name={'chevron-right'}
                        size={35}
                        color={BaseThemeStyle.colors.black}
                    />
                </View>
            </View>
        </View>
    );
};

export default CustomListWithHeader;
