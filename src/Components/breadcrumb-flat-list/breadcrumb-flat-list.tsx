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
    constructor(props: BreadcrumbFlatListProps) {
        super(props);
        this.state = {};
    }

    onPress = (item: any, index: number) => {
        console.log('onPress item=>>', item);
        this.props.onPress(item);
    };

    renderItem = ({ item, index }: any) => {
        console.log('renderItem =', item.title);
        return (
            <TouchableOpacity disabled={item.isDisabled ? true : false} onPress={() => this.onPress(item, index)}>
                <CustomBreadcrumb title={item.title} isFirstCrumb={item.id == 0 ? true : false} />
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={style.bottomView}>
                <FlatList
                    data={this.props.breadCrumbList}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal={true}
                    // initialScrollIndex={this.props.breadCrumbList.length > 3 ? (this.props.breadCrumbList.length- 1): 0}
                />
            </View>
        );
    }
}
