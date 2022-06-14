import React, { PureComponent } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import Images from '../../Theme/Images';
import CustomIcon from '../custom-icon/custom-icon';
import { style } from './style';

interface CustomTopNavProps {
    title?: string;
    subTitle?: string;
    back?: boolean;
    onPressBack?: () => void;
    isShowImage?: boolean | false;
    imageName?: string;
    backgroundColor?: string;
}

interface CustomTopNavState { }

export default class CustomTopNav extends PureComponent<CustomTopNavProps, CustomTopNavState> {
    constructor(props: CustomTopNavProps) {
        super(props);
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.backIcon}>
                    {this.props.back && (
                        <TouchableOpacity onPress={this.props.onPressBack}>
                            <CustomIcon
                                name={'arrow-left'}
                                size={50}
                                color={BaseThemeStyle.colors.iconColor}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={style.textContainer}>
                    <Text style={style.titleText}>{this.props.title}</Text>
                    <Text style={style.subTitleText} numberOfLines={2}>
                        {this.props.subTitle}
                    </Text>
                </View>
                {this.props.isShowImage ? 
                <View style={style.imageContainer}>
                    <Image source={Images.topNavImageSettingScreen} style={style.imageStyle} />
                    </View>
                    : null
                }
            </View>
        );
    }
}
