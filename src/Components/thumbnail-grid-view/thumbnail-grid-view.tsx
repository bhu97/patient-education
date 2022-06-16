import React, { PureComponent } from 'react';
import { Button, FlatList, Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import Tooltip from 'react-native-walkthrough-tooltip';
import { API_NAMES } from '../../Constant/Constants';
import apiManager from '../../Helper/ApiManager';
import { getExtension, getIconByExtension } from '../../Helper/Helper';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { GridViewModel } from '../../Model/GridViewModel';
import Images from '../../Theme/Images';
import CustomIcon from '../custom-icon/custom-icon';
import FullScreenLoader from '../full-screen-loader/full-screen-loader';
import { style } from './style';

interface ThumbnailGridViewProps {
    gridViewList: GridViewModel[];
}
interface ThumbnailGridViewState {
    isVisibleObject: any;
    update: any;
    loader: boolean;
}

export default class ThumbnailGridView extends PureComponent<ThumbnailGridViewProps, ThumbnailGridViewState> {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleObject: {},
            update: false,
            loader: false,
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
    addRemoveFavorite = () => {
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
                        <Text style={style.toolTipHeading}>{BaseLocalization.fileOptions}</Text>
                        {this.toolTipOptionSeparator()}
                        <TouchableOpacity onPress={() => this.download()}>
                            <Text style={style.toolTipOptions}>{BaseLocalization.download}</Text>
                        </TouchableOpacity>
                        {this.toolTipOptionSeparator()}
                        <TouchableOpacity onPress={() => this.removeLocally()}>
                            <Text style={style.toolTipOptions}> {BaseLocalization.removeLocally}</Text>
                        </TouchableOpacity>
                        {this.toolTipOptionSeparator()}
                        <TouchableOpacity onPress={() => this.addRemoveFavorite()}>
                            <Text style={style.toolTipOptions}>{BaseLocalization.addRemoveFavorite}</Text>
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

    // deletion
    deleteDownloadedFile = async (item) => {
        // create a path you want to delete
        var path = RNFS.DocumentDirectoryPath + `/${item}`;
        return (
            RNFS.unlink(path)
                .then(() => {
                    console.log('FILE DELETED');
                })
                // `unlink` will throw an error, if the item to unlink does not exist
                .catch((err) => {
                    console.log(err.message);
                })
        );
    };

    downloadFileAndShow = async (item) => {
        await this.deleteDownloadedFile(item.name);
        const response = await apiManager.callApiToGetData(API_NAMES.THUMBNAIL_LIST_ITEM_DETAILS(item.listItemId));
        const url = response.driveItem['@microsoft.graph.downloadUrl'];
        const fileName = item.name;
        const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        const options = {
            fromUrl: url,
            toFile: localFile,
        };
        // last step it will download open it with fileviewer.
        RNFS.downloadFile(options).promise.then(() => {
            FileViewer.open(localFile);
            this.setState({ loader: false });
        });
    };
    loadDocument = async (item: GridViewModel) => {
        this.setState({ loader: true });
        const fileExt = getExtension(item.webUrl);
        if (fileExt.toLowerCase() === 'pdf') {
            this.downloadFileAndShow(item);
        } else {
            Linking.canOpenURL(item.webUrl).then((supported) => {
                if (supported) {
                    Linking.openURL(item.webUrl);
                    this.setState({ loader: false });
                } else {
                    console.log(item.webUrl);
                    this.setState({ loader: false });
                    console.log('error opening url');
                }
            });
        }
    };

    renderItem = ({ item, index }: any) => {
        const isVisibleIndicator = this.getVisibility(index);
        return (
            <View style={style.backgroundViewStyle}>
                <TouchableOpacity onPress={() => this.loadDocument(item)}>
                    <View>
                        {item.largeUrl ? (
                            <Image style={style.imageStyle} source={{ uri: item.largeUrl }} />
                        ) : (
                            <Image style={style.imageStyle} source={Images.emptyThumbnail} />
                        )}
                        <View style={style.overlay} />

                        <View style={style.svgIconStyle}>{getIconByExtension(item.name)}</View>
                    </View>
                </TouchableOpacity>
                <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={style.textStyle}>
                            {item.name}
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
        return this.state.loader ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <>
                {this.props.gridViewList.length > 0 ? (
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
                ) : (
                    <View style={style.emptyIconStyle}>
                        <Image style={style.emptyImageStyle} source={Images.emptyImg} />
                        <Text style={style.emptyDataText}>{BaseLocalization.noDataOnGrid}</Text>
                    </View>
                )}
            </>
        );
    }
}
