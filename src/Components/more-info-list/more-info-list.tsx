import React, { PureComponent } from 'react';
import { FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { MoreInfoListModel } from '../../Model/MoreInfoListModel';
import Images from '../../Theme/Images';
import { style } from './style';

interface MoreInfoListProps {
    title?: string;
    moreInfoList: MoreInfoListModel[];
    onPress: (item: any) => void;
}

export default class MoreInfoList extends PureComponent<MoreInfoListProps> {
    constructor(props: MoreInfoListProps) {
        super(props);
    }

    flatListItemSeparator = () => {
        return <View style={style.lineSeparator} />;
    };

    renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity onPress={() => this.props.onPress(item)}>
                <View style={style.mainContainer}>
                    <View style={style.itemContainer}>
                        {item.isFolder ? (
                            <>
                                <View style={style.circleIconContainer}>
                                    <Image style={{ height: 35, width: 35 }} source={Images.circleFolder} />
                                </View>

                                <View style={style.folderTextContainer}>
                                    <Text style={style.textStyle}>{item.title}</Text>
                                </View>
                            </>
                        ) : null}

                        {!item.isFolder ? (
                            <>
                                <View style={style.circleIconContainer}>
                                    <Image style={{ height: 40, width: 40 }} source={Images.file} />
                                </View>

                                <View style={style.fileTextContainer}>
                                    <Text style={style.textStyle}>{item.title}</Text>
                                </View>
                            </>
                        ) : null}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    listHeader = () => {
        return this.props.title != null && this.props.title != '' ? (
            <View style={style.headerStyle}>
                <Text style={style.titleStyle}>{this.props.title}</Text>
            </View>
        ) : null;
    };

    render() {
        return (
            <View style={style.container}>
                <FlatList
                    nestedScrollEnabled
                    ItemSeparatorComponent={this.flatListItemSeparator}
                    data={this.props.moreInfoList}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.listHeader}
                    stickyHeaderIndices={[0]}
                />
            </View>
        );
    }
}
