import React, { PureComponent } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Images from '../../Theme/Images';
import { style } from './style';

interface CustomTopNavProps {
    title?: string;
    subTitle?: string;
    back?: boolean;
    onPressBack?: () => void;
    isShowCard?: boolean | false;
    imageName?: any;
    backgroundColor?: string;
    smallHeader?:boolean;
}

interface CustomTopNavState { }

export default class CustomTopNav extends PureComponent<CustomTopNavProps, CustomTopNavState> {
    constructor(props: CustomTopNavProps) {
        super(props);
    }

    render() {
        return (
            <View style={[{...style.container, height: this.props.smallHeader  ? 80 :125 },this.props.isShowCard?style.containerShadow:style.container]}>
                 <View style={[this.props.smallHeader?style.smallHeaderText:style.textContainer]}>
                    {this.props.back ? (
                        <TouchableOpacity onPress={this.props.onPressBack}>
                             <Image source={Images.backArrowImage} />
                        </TouchableOpacity>
                    ):<Text style={style.titleText}>{this.props.title}</Text>}
                    <Text style={{...style.subTitleText,marginLeft:this.props.smallHeader?30:0,marginTop:this.props.smallHeader?0:10}} numberOfLines={2}>
                        {this.props.subTitle}
                    </Text>
                </View>
               
                <View style={style.imageContainer}>
                    <Image source={this.props.imageName} style={style.imageStyle} />
                    </View>
            </View>
        );
    }
}
