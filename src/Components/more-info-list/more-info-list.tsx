import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';
import { MoreInfoListModel } from '../../Model/MoreInfoListModel';
import CustomIcon from '../custom-icon/custom-icon';
import { style } from './style';

interface MoreInfoListProps {
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
                    <View style={style.textContainer}>
                        <Text style={style.textStyle}>{item.fileName}</Text>
                    </View>
                    <View style={style.iconContainer}>
                        <CustomIcon name={'more-horizontal'} />
                        <Text style={style.flatSizeStyle}>{item.fileSize}</Text>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <FlatList
                nestedScrollEnabled
                ItemSeparatorComponent={this.flatListItemSeparator}
                data={this.props.moreInfoList}
                renderItem={this.renderItem}
            />
        );
    }
}
