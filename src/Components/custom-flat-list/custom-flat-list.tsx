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
                style={{ width: 20, height: 20 }}
                source={imageName}
            />
        )
    };

    flatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 20,
                    width: '45%',
                }}
            />
        );
    };

    renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => console.log("here")}
            >
                <View
                    style={style.listItemContainer}
                >
                    <View style={{ flex: 1, height: 38, justifyContent: 'center' }}>
                        <Text
                            numberOfLines={2}
                            style={style.textStyle}
                        >
                            {item.key}
                        </Text>
                    </View>
                    <View style={{ marginRight: 10 }}>
                        {this.getImage(Images.menuBlueDots)}
                    </View>
                    <View style={{}}>
                        {this.getImage(Images.rightArrow)}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    render() {
        return <FlatList
            nestedScrollEnabled
            ItemSeparatorComponent={this.flatListItemSeparator}
            data={this.props.catagoryList}
            renderItem={this.renderItem}
        />
    }

};
