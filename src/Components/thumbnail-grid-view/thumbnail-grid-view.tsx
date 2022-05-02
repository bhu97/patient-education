import React, { PureComponent } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { GridViewModel } from '../../Model/GridViewModel';
import CustomIcon from '../custom-icon/custom-icon';
import { style } from './style';

interface ThumbnailGridViewProps {
    gridViewList: GridViewModel[];
}

export default class ThumbnailGridView extends PureComponent<ThumbnailGridViewProps> {
    constructor(props) {
        super(props);
    }

    getImage = (imageName) => {
        return <Image resizeMode="contain" style={style.iconImageStyle} source={imageName} />;
    };

    renderItem = ({ item }) => (
        <View style={style.backgroundViewStyle}>
            <Image style={style.imageStyle} source={item.imageName} />

            <View style={style.itemContainer}>
                <View style={style.textContainer}>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={style.textStyle}>
                        {item.fileName}
                    </Text>
                </View>

                <View style={style.iconContainer}>
                    <CustomIcon name={'more-horizontal'} />
                    <Text style={style.sizeStyle}>{item.fileSize}</Text>
                </View>
            </View>
        </View>
    );

    render() {
        return (
            <View style={style.mainViewStyle}>
                <FlatList
                    data={this.props.gridViewList}
                    renderItem={this.renderItem}
                    numColumns={2}
                    columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}
