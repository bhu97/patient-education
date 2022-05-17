import React, { PureComponent } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { connect } from 'react-redux';
import { RootState } from '../../Redux/rootReducer';
import CustomIcon from '../custom-icon/custom-icon';
import { style } from './style';

interface CustomListWithHeaderProps {
    masterOptions: Array<any>;
    iconName: string;
    labelText: string;
    headerText?: string;
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
                    <Text style={style.textStyle}>{label}</Text>
                </TouchableOpacity>
            </Tooltip>
        );
    };
    toolTipList = () => {
        return (
            <View>
                <FlatList
                    ItemSeparatorComponent={this.toolTipOptionSeparator}
                    data={this.props.masterOptions}
                    renderItem={({ item }) => {
                        return (
                            <View style={style.listView}>
                                <Text style={style.textStyleToolTip}> {item.title}</Text>
                            </View>
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
    masterOptions: state.catagoryReducer.masterOptionsData,
});

export default connect(mapStateToProps)(CustomListWithHeader);
