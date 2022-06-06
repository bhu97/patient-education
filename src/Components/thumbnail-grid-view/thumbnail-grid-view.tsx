import React, { PureComponent } from 'react';
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { PNG } from '../../../assets/extensions/PNG';
import { getIconByExtension } from '../../Helper/Helper';
import { GridViewModel } from '../../Model/GridViewModel';
import Images from '../../Theme/Images';
import CustomIcon from '../custom-icon/custom-icon';
import { style } from './style';

interface ThumbnailGridViewProps {
    gridViewList: GridViewModel[];
}
interface ThumbnailGridViewState {
    isVisibleObject: any;
    update: any;
}

export default class ThumbnailGridView extends PureComponent<ThumbnailGridViewProps, ThumbnailGridViewState> {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleObject: {},
            update: false,
        };
    }
    componentDidMount(): void {
        let isVisibleArray = {};
        this.props.gridViewList.map((item: any, index: any) => {
            let setIndex = { index: index, isVisible: false };
            isVisibleArray[index] = setIndex;
        });
        this.setState({ isVisibleObject: isVisibleArray });
    }
    setVisible = (index: any, indicator: boolean) => {
        let isVisibleCheck = this.state.isVisibleObject[index];
        isVisibleCheck.isVisible = indicator;
        this.setState({ isVisibleObject: { ...this.state.isVisibleObject, isVisibleCheck }, update: {} });
    };

    getVisibility = (index: any) => {
        return this.state.isVisibleObject[index]?.isVisible ? true : false;
    };
    getImage = (imageName) => {
        return <Image resizeMode="contain" style={style.iconImageStyle} source={imageName} />;
    };
    download = () => {
        console.log('Download Clicked');
    };
    removeLocally = () => {
        console.log('Remove locally Clicked');
    };
    addRemoveFavourite = () => {
        console.log('Add/Remove favourite Clicked');
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
                            <Text style={style.toolTipOptions}>Download</Text>
                        </TouchableOpacity>
                        {this.toolTipOptionSeparator()}
                        <TouchableOpacity onPress={() => this.removeLocally()}>
                            <Text style={style.toolTipOptions}>Remove locally</Text>
                        </TouchableOpacity>
                        {this.toolTipOptionSeparator()}
                        <TouchableOpacity onPress={() => this.addRemoveFavourite()}>
                            <Text style={style.toolTipOptions}>Add/remove favourite</Text>
                        </TouchableOpacity>
                    </View>
                }
                placement="right"
                onClose={() => this.setVisible(index, false)}
            >
                <TouchableOpacity onPress={() => this.setVisible(index, true)}>
                    <CustomIcon name={'more-horizontal'} />
                </TouchableOpacity>
            </Tooltip>
        );
    };

    toolTipOptionSeparator = () => {
        return <View style={style.toolTipOptionSeperator}></View>;
    };

    renderItem = ({ item, index }: any) => {
        console.log('ThumbnailGridView item=>', item);
        const isVisibleIndicator = this.getVisibility(index);
        return (
            <View style={style.backgroundViewStyle}>
                {item.largeUrl ? (
                    <Image style={style.imageStyle} source={{ uri: item.largeUrl }} />
                ) : (
                    <Image style={style.imageStyle} source={Images.emptyThumbnail} />
                )}

                <View style={style.svgIconStyle}>{getIconByExtension(item.name)}</View>
                {/* <View style={{ margin: 5, width: 160, height: 200 }}>
                    <Image
                        resizeMode="cover"
                        style={{
                            flex: 1,
                            borderRadius: 5,
                        }}
                        source={{ uri: item.largeUrl }}
                    />
                     {item.fileExtension}
                    <Text numberOfLines={2} ellipsizeMode="tail" style={style.textStyle}>
                        {item.title}
                    </Text>
                </View> */}

                <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={style.textStyle}>
                            {item.title}
                        </Text>
                    </View>

                    <View style={style.iconContainer}>
                        {this.getToolTip(index, isVisibleIndicator)}
                        <Text style={style.sizeStyle}>{item.fileSize}</Text>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={style.mainViewStyle}>
                <FlatList
                    data={this.props.gridViewList}
                    renderItem={this.renderItem}
                    numColumns={2}
                    columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state.update}
                />
            </View>
        );
    }
}
