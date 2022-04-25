import React, { PureComponent } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Images from '../../Theme/Images';
import { style } from './style';

interface customFlatListProps {
    catagoryList: any
}
interface customFlatListState {

}

export default class customFlatList extends PureComponent<customFlatListProps, customFlatListState> {
    constructor(props: customFlatListProps) {
        super(props);
    }


    getImage = (imageName) => {
        return (
            <Image
                resizeMode="contain"
                style={style.imageStyle}
                source={imageName}
            />
        )
    };

    flatListItemSeparator = () => {
        return (
            <View
                style={style.lineSeparator}
            />
        )

    };

    renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity onPress={() => this.onPress(item)} >
                <View style={style.listItemContainer} >
                    <Text numberOfLines={2} style={style.textStyle} >
                        {item.key}
                    </Text>
                    <View style={style.iamgeViewStyle}>

                        {this.getImage(Images.menuBlueDots)}

                        {this.getImage(Images.rightArrow)}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    onPress = (item: any) => {
        console.log(item)
    }

    render() {
        return <FlatList
            nestedScrollEnabled
            ItemSeparatorComponent={this.flatListItemSeparator}
            data={this.props.catagoryList}
            renderItem={this.renderItem}
        />
    }

};
