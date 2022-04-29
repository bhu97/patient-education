import React, { PureComponent } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import Images from '../../Theme/Images';
import { style } from './style';

interface customFlatListProps {
    catagoryList: any;
    onPressList?: any;
    elementType: string;
    selectedElement?: any;
}
interface customFlatListState { }

export default class customFlatList extends PureComponent<customFlatListProps, customFlatListState> {
    constructor(props: customFlatListProps) {
        super(props);
    }

    getImage = (imageName) => {
        return <Image resizeMode="contain" style={style.imageStyle} source={imageName} />;
    };

    flatListItemSeparator = () => {
        return <View style={style.lineSeparator} />;
    };

    renderItem = ({ item }: any) => {
        const backgroundColor = this.props.selectedElement
            ? item[this.props.elementType] === this.props.selectedElement[this.props.elementType]
                ? BaseThemeStyle.colors.lightGray
                : BaseThemeStyle.colors.white
            : BaseThemeStyle.colors.white;

        return (
            <TouchableOpacity onPress={() => this.props.onPressList(item)}>
                <View style={{ ...style.listItemContainer, backgroundColor: backgroundColor }}>
                    <Text numberOfLines={2} style={style.textStyle}>
                        {item[this.props.elementType]}
                    </Text>
                    <View style={style.iamgeViewStyle}>
                        {this.getImage(Images.menuBlueDots)}

                        {this.getImage(Images.rightArrow)}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <FlatList
                nestedScrollEnabled
                ItemSeparatorComponent={this.flatListItemSeparator}
                data={this.props.catagoryList}
                renderItem={this.renderItem}
            />
        );
    }
}
