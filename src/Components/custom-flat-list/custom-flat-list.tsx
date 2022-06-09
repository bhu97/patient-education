import React, { PureComponent } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import Images from '../../Theme/Images';
import { style } from './style';

interface CustomFlatListProps {
    categoryList: any;
    isDisabled?: boolean;
    onPressListItem?: (item: any) => void;
    selectedElement?: DriveItemModel;
}
interface CustomFlatListState {}

export default class CustomFlatList extends PureComponent<CustomFlatListProps, CustomFlatListState> {
    constructor(props: CustomFlatListProps) {
        super(props);
        this.state = {};
    }

    getImage = (imageName) => {
        return <Image resizeMode="contain" style={style.imageStyle} source={imageName} />;
    };

    flatListItemSeparator = () => {
        return <View style={style.lineSeparator} />;
    };
    toolTipOptionSeparator = () => {
        return <View style={style.toolTipOptionSeperator}></View>;
    };

    onPress = (item: any, index: number) => {
        console.log('onPressListItem item=>>', item);
        this.props.onPressListItem(item);
    };

    renderItem = ({ item, index }: any) => {
        const backgroundColor =
            this.props.selectedElement === item // check if item matched with selected item
                ? BaseThemeStyle.colors.gray // then selected color
                : this.props.isDisabled // else if list disabled
                ? BaseThemeStyle.colors.listItemBackgroundColor // then light color
                : BaseThemeStyle.colors.white; // else default color

        return (
            <View style={{ ...style.listItemContainer, backgroundColor: backgroundColor }}>
                <Text numberOfLines={2} style={style.textStyle}>
                    {item.title}
                </Text>

                <View style={style.imageViewStyle}>
                    <TouchableOpacity
                        disabled={this.props.isDisabled ? true : false}
                        onPress={() => this.onPress(item, index)}
                    >
                        <View style={style.rightArrow}>{this.getImage(Images.rightArrow)}</View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    nestedScrollEnabled
                    ItemSeparatorComponent={this.flatListItemSeparator}
                    data={this.props.categoryList}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}
