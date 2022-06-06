import React, { PureComponent } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { connect } from 'react-redux';
import { setSelectedCountry } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import CustomIcon from '../custom-icon/custom-icon';
import { style } from './style';

interface CustomListWithHeaderProps {
    countryList: any;
    iconName: string;
    labelText: string;
    headerText?: string;
    setSelectedCountry: (string) => void;
    selectedCountry: string;
}
interface CustomListWithHeaderState {
    visible: boolean;
}
class CustomListWithHeader extends PureComponent<CustomListWithHeaderProps, CustomListWithHeaderState> {
    constructor(props: CustomListWithHeaderProps) {
        super(props);
        this.state = {
            visible: false,
        };
    }
    getToolTip = (label) => {
        return (
            <Tooltip
                contentStyle={style.toolTipBorder}
                arrowSize={style.toolTipArrow}
                isVisible={this.state.visible}
                content={<View style={style.toolTipContainer}>{this.toolTipList()}</View>}
                placement="right"
                onClose={() => this.setState({ visible: false })}
                showChildInTooltip={false}
            >
                <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                    <Text style={style.textStyle}>{this.props.selectedCountry}</Text>
                </TouchableOpacity>
            </Tooltip>
        );
    };
    onPressFlatlist = (item) => {
        this.props.setSelectedCountry(item);
        this.setState({ visible: false });
    };
    toolTipList = () => {
        return (
            <View>
                <FlatList
                    ItemSeparatorComponent={this.toolTipOptionSeparator}
                    data={this.props.countryList}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => this.onPressFlatlist(item)}>
                                <View style={style.listView}>
                                    <Text style={style.textStyleToolTip}> {item}</Text>
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
            <View style={style.mainContainer}>
                {this.props.headerText && (
                    <View style={style.headerTextContainer}>
                        <Text style={style.headerTextStyle}>{this.props.headerText}</Text>
                    </View>
                )}
                <View style={style.itemContainer}>
                    <View style={style.circleIconContainer}>
                        <CustomIcon name={this.props.iconName} />
                    </View>

                    <View style={style.textContainer}>
                        {this.props.labelText != 'Master' && this.state.visible == false ? (
                            <Text style={style.textStyle}>{this.props.labelText}</Text>
                        ) : (
                            this.getToolTip(this.props.labelText)
                        )}
                    </View>

                    <View style={style.iconContainer}>
                        <CustomIcon name={'chevron-right'} />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    countryList: state.categoryReducer.countryListData,
    selectedCountry: state.categoryReducer.selectedCountry,
});
const mapDispatchToProps = (dispatch: any) => ({
    setSelectedCountry: (value: string) => {
        dispatch(setSelectedCountry(value));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomListWithHeader);
