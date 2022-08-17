import React, { PureComponent } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import Images from '../../Theme/Images';
import { style } from './style';

interface CustomFlatListProps {
    categoryList: any;
    onPressListItem: (item: any) => void;
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
        this.props.onPressListItem(item);
    };

    renderItem = ({ item, index }: any) => {
        const backgroundColor =
            this.props.selectedElement === item // check if item matched with selected item
                ? BaseThemeStyle.colors.selectedListColor // then selected color
                : //: this.props.isDisabled // else if list disabled
                  //? BaseThemeStyle.colors.listItemBackgroundColor // then light color
                  BaseThemeStyle.colors.white; // else default color

        return (
            <TouchableOpacity onPress={() => this.onPress(item, index)}>
                <View style={{ ...style.listItemContainer, backgroundColor: backgroundColor }}>
                    <View style={style.textView}>
                        <Text numberOfLines={2} style={style.textStyle}>
                            {item.title != '' ? item.title : item.name}
                        </Text>
                    </View>
                    <View style={style.otherView}>
                        <View style={style.imageViewStyle}>
                            <View style={style.rightArrow}>{this.getImage(Images.rightArrow)}</View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
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
