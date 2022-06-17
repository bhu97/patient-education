import React, { PureComponent } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import CustomBreadcrumb from '../custom-breadcrumb/custom-breadcrumb';
import { style } from './style';

interface BreadcrumbFlatListProps {
    breadCrumbList: [];
    onPress: (item: any) => void;
}

interface BreadcrumbFlatListState {}

export default class BreadcrumbFlatList extends PureComponent<BreadcrumbFlatListProps, BreadcrumbFlatListState> {
    flatListRef: any;
    constructor(props: BreadcrumbFlatListProps) {
        super(props);
        this.state = {};
    }

    onPress = (item: any, index: number) => {
        this.props.onPress(item);
    };

    renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                disabled={index == this.props.breadCrumbList.length - 1 ? true : false}
                onPress={() => this.onPress(item, index)}
            >
                <CustomBreadcrumb title={item.title} isFirstCrumb={item.id == 0 ? true : false} />
            </TouchableOpacity>
        );
    };

    scrollIndex = (error: any) => {
        let { breadCrumbList } = this.props;

        this.flatListRef?.scrollToOffset({
            offset: error.averageItemLength * error.index,
            animated: false,
        });

        setTimeout(() => {
            if (breadCrumbList.length !== 0 && this.flatListRef !== null) {
                this.flatListRef.scrollToIndex({
                    index: error.index,
                    animated: false,
                });
            }
        }, 150);
    };

    render() {
        return (
            <View style={style.bottomView}>
                <FlatList
                    ref={(ref) => {
                        this.flatListRef = ref;
                    }}
                    data={this.props.breadCrumbList}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal={true}
                    initialScrollIndex={this.props.breadCrumbList ? this.props.breadCrumbList.length - 1 : 0}
                    onScrollToIndexFailed={(error) => this.scrollIndex(error)}
                />
            </View>
        );
    }
}
