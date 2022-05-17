import React, { PureComponent } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import Images from '../../Theme/Images';
import { style } from './style';

interface customFlatListProps {
    catagoryList: any;
    onPressList?: any;
    elementType: string;
    selectedElement?: any;
    onPressTool?: any;
    disableClickOnFlatlist?: boolean;
}
interface customFlatListState {
    isVisibleObject: any;
    update: any;
}

export default class customFlatList extends PureComponent<customFlatListProps, customFlatListState> {
    constructor(props: customFlatListProps) {
        super(props);
        this.state = {
            isVisibleObject: {},
            update: false,
        };
    }

    componentDidMount(): void {
        let isVisibleArray = {};
        this.props.catagoryList.map((item: any, index: any) => {
            let setIndex = { index: index, isVisible: false };
            isVisibleArray[index] = setIndex;
        });
        this.setState({ isVisibleObject: isVisibleArray });
    }

    getImage = (imageName) => {
        return <Image resizeMode="contain" style={style.imageStyle} source={imageName} />;
    };
    download = () => {
        console.log('Download Clicked');
    };
    remove = () => {
        console.log('Remove locally Clicked');
    };
    getToolTip = (index, isVisibleIndicator) => {
        return (
            <Tooltip
                contentStyle={style.toolTipBorder}
                arrowSize={style.toolTipArrow}
                isVisible={isVisibleIndicator}
                content={
                    <View style={style.toolTipContainer}>
                        <Text style={style.toolTipHeading}>File Options</Text>
                        {this.toolTipOptionSeparator()}
                        <TouchableOpacity onPress={() => this.download()}>
                            <Text style={style.toolTipOptions}>Download Folder</Text>
                        </TouchableOpacity>
                        {this.toolTipOptionSeparator()}
                        <TouchableOpacity onPress={() => this.remove()}>
                            <Text style={style.toolTipOptions}>Remove Local Files</Text>
                        </TouchableOpacity>
                    </View>
                }
                placement="bottom"
                onClose={() => this.setVisible(index, false)}
            >
                <TouchableOpacity onPress={() => this.setVisible(index, true)}>
                    <View style={style.blueDotImage}>{this.getImage(Images.menuBlueDots)}</View>
                </TouchableOpacity>
            </Tooltip>
        );
    };

    flatListItemSeparator = () => {
        return <View style={style.lineSeparator} />;
    };
    toolTipOptionSeparator = () => {
        return <View style={style.toolTipOptionSeperator}></View>;
    };

    setVisible = (index: any, indicator: boolean) => {
        let isVisibleCheck = this.state.isVisibleObject[index];
        isVisibleCheck.isVisible = indicator;
        this.setState({ isVisibleObject: { ...this.state.isVisibleObject, isVisibleCheck }, update: {} });
    };

    getVisibility = (index: any) => {
        return this.state.isVisibleObject[index]?.isVisible ? true : false;
    };
    onPressListItem = (item) => {
        {
            !this.props.disableClickOnFlatlist ? this.props.onPressList(item) : null;
        }
    };

    renderItem = ({ item, index }: any) => {
        const backgroundColor = this.props.selectedElement
            ? item[this.props.elementType] === this.props.selectedElement[this.props.elementType]
                ? BaseThemeStyle.colors.lightGray
                : BaseThemeStyle.colors.white
            : BaseThemeStyle.colors.white;

        const isVisibleIndicator = this.getVisibility(index);

        return (
            <View style={{ ...style.listItemContainer, backgroundColor: backgroundColor }}>
                <Text numberOfLines={2} style={style.textStyle}>
                    {item[this.props.elementType]}
                </Text>

                <View style={style.iamgeViewStyle}>
                    {this.getToolTip(index, isVisibleIndicator)}
                    <TouchableOpacity onPress={() => this.onPressListItem(item)}>
                        <View style={style.rightArrow}>{this.getImage(Images.rightArrow)}</View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    nestedScrollEnabled
                    ItemSeparatorComponent={this.flatListItemSeparator}
                    data={this.props.catagoryList}
                    renderItem={this.renderItem}
                    extraData={this.state.update}
                />
            </View>
        );
    }
}
