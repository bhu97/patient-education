import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';
import { MoreInfoListModel } from '../../Model/MoreInfoListModel';
import CustomIcon from '../custom-icon/custom-icon';
import { style } from './style';

interface MoreInfoListProps {
    title?: string;
    moreInfoList: MoreInfoListModel[];
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
            <View style={style.mainContainer}>
                <View style={style.itemContainer}>
                    <View style={style.circleIconContainer}>{<CustomIcon name={item.iconName} />}</View>
                    {item.isFolder && (
                        <View style={style.folderTextContainer}>
                            <Text style={style.textStyle}>{item.title}</Text>
                        </View>
                    )}

                    {!item.isFolder && (
                        <View style={style.iconContainer}>
                            <CustomIcon name={'more-horizontal'} />
                            <Text style={style.flatSizeStyle}>{item.fileSize}</Text>
                        </View>
                    )}
                </View>
            </View>
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
