import React, { Fragment, PureComponent } from 'react';
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { style } from './style';

interface CustomToolTipProps {
    isVisible: boolean;
    model: Array<any>;
    onPressOfToolTipItem?: (item: any) => void;
    insideToolTip?: any;
    closeToolTip?: any;
    isCountryList?: boolean;
    position:string,
    isEmpty:boolean
}

interface CustomToolTipState {
    isVisible: boolean;
    model: Array<any>;
}

export default class CustomToolTip extends PureComponent<CustomToolTipProps, CustomToolTipState> {
    constructor(props: CustomToolTipProps) {
        super(props);
        this.state = {
            isVisible: false,
            model:this.props.model
        };
    }


    
    onPressOfToolTipItem = (item: any) => {
        if(item.isEnable){
            this.props.onPressOfToolTipItem && this.props.onPressOfToolTipItem?.(item); // The optional chaining (?.) operator short-circuits instead of throwing an error if the reference is undefined or null.
        }
    };

    toolTipList = () => {
        return (
            <View>
                <FlatList
                    ItemSeparatorComponent={this.toolTipOptionSeparator}
                    data={this.props.model}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => this.onPressOfToolTipItem(item)}>
                                <View style={[this.props.isCountryList ? style.listView : [style.categoryListView,{opacity:item.isEnable?1:0.3}]]}>
                                    <Text
                                        style={[
                                            this.props.isCountryList
                                                ? style.textStyleToolTip
                                                : style.categoryTextStyleToolTip,
                                        ]}
                                    >
                                        {this.props.isCountryList ? item.countryTitle : item.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        );
    };

    toolTipOptionSeparator = () => {
        return <View style={style.toolTipOptionSeperator}></View>;
    };
    render() {
        return (
            <View>
                <Tooltip
                    contentStyle={style.toolTipBorder}
                    arrowSize={style.toolTipArrow}
                    isVisible={this.props.isVisible}
                    content={
                        <View style={[{ ...style.toolTipContainer, height: this.props.isCountryList ? 610 : 220 }]}>
                            {!this.props.isCountryList ? (
                                <>
                                    <Text style={{ fontSize: 20, marginTop: 40, marginBottom: 10, fontWeight: 'bold' }}>
                                        Folder Options
                                    </Text>
                                    {this.toolTipOptionSeparator()}
                                </>
                            ) : null}
                            {this.toolTipList()}
                        </View>
                    }
                    placement={this.props.position}
                    onClose={this.props.closeToolTip}
                    showChildInTooltip={false}
                >
                    {this.props.insideToolTip}
                </Tooltip>
            </View>
        );
    }
}
