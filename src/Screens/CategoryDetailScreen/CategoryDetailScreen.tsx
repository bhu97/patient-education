import NetInfo from '@react-native-community/netinfo';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import BreadcrumbFlatList from '../../Components/breadcrumb-flat-list/breadcrumb-flat-list';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomIcon from '../../Components/custom-icon/custom-icon';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import MainContainer from '../../Components/main-container/main-container';
import MoreInfoList from '../../Components/more-info-list/more-info-list';
import ThumbnailGridView from '../../Components/thumbnail-grid-view/thumbnail-grid-view';
import dbHelper from '../../Database/DBHelper';
import { createBredCrumbList, createGridModelData, isStringEmpty, linkedUrlListToArray } from '../../Helper/Helper';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { GridViewModel } from '../../Model/GridViewModel';
import { MoreInfoListModel } from '../../Model/MoreInfoListModel';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import { downloadFolder, fetchAllThumbnails, removeDownloadedFolder } from '../../Redux/app-data/appDataThunk';
import {
    setGridViewData,
    setMoreInfoData,
    setMoreInfoScreenData,
    setRefreshDetailScreen,
    setSelectedCategoryData
} from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';

interface CategoryDetailScreenProps {
    gridViewData: GridViewModel[];
    moreInfoData: MoreInfoListModel[];
    //set grid list for selected item
    setGridViewList: (data: GridViewModel[]) => void;
    //set more info list for selected item
    setMoreInfoList: (data: MoreInfoListModel[]) => void;
    setMoreInfoScreenData: (data: MoreInfoListModel[]) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    navigation: any;
    //all selected selectedCategoryData
    selectedCategoryData: any[];
    setSelectedCategoryData: (selectedItem: DriveItemModel[]) => void;
    isRefreshDetailScreen: boolean;
    setRefreshDetailScreen: (isRefresh: boolean) => void;
    isFetchAllThumbnailLoaded: boolean;
    downloadAll: (currentArray: any[]) => void;
    removeAll: (currentArray: any[]) => void;
}

interface CategoryDetailScreenState {
    breadCrumbList: any;
    pageTitle: string;
}

class CategoryDetailScreen extends Component<CategoryDetailScreenProps, CategoryDetailScreenState> {
    _unsubscribe: any;
    _unsubscribeNetworkCheck: any;
    constructor(props: CategoryDetailScreenProps) {
        super(props);
        this.state = {
            breadCrumbList: [],
            pageTitle: '',
        };
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this._unsubscribeNetworkCheck = NetInfo.addEventListener((state) => {
                if (state.isConnected) {
                    if (!this.props.isFetchAllThumbnailLoaded) {
                        this.getCategoryDetailData(true);
                    }
                } else {
                    this.getCategoryDetailData(false);
                }
            });
        });
    }

    componentWillUnmount() {
        // this._unsubscribe();
        this._unsubscribeNetworkCheck();
    }

    async getCategoryDetailData(isConnected: boolean) {
        this.props.setIsLoading(isConnected);
        const selectedCategoryData = this.props.selectedCategoryData;

        const categoryDetailDataItem: any = selectedCategoryData[selectedCategoryData.length - 1];
        const item = categoryDetailDataItem.data;

        let pageTitle = item.title;
        let linkedFolder = item.linkedFolders ? item.linkedFolders : '';
        let linkedFiles = item.linkedFiles ? item.linkedFiles : '';
        const categoryDetailData = await dbHelper.getForSelectedCategory(item);
        // LogManager.info('categoryDetailData=', categoryDetailData);

        let thumbnailList: any[] = [];
        if (isConnected) {
            thumbnailList = await fetchAllThumbnails(item.uniqueId);
        } else {
            thumbnailList = [];
        }
        //   LogManager.info('responses list Item=', thumbnailList);
        const gridData = await createGridModelData(categoryDetailData, thumbnailList);
        // LogManager.info('gridData=', gridData);

        this.props.setGridViewList(gridData);

        let moreFolderData: any = [];
        let moreFileData: any = [];

        if (linkedFolder != null && linkedFolder != '') {
            const linkedFolderData = linkedUrlListToArray(linkedFolder);
            // LogManager.debug('linkedFolderData=', linkedFolderData);

            const moreInfo = await dbHelper.getItemsForContentPageWebUrls(linkedFolderData, true);
            LogManager.debug('moreInfo folder=', moreInfo);

            moreFolderData.push(moreInfo);
        }
        if (linkedFiles != null && linkedFiles != '') {
            const linkedFileItemData = linkedUrlListToArray(linkedFiles);
            LogManager.debug('linkedFileItemData=', linkedFileItemData);

            const moreInfo = await dbHelper.getItemsForContentPageWebUrls(linkedFileItemData, false);
            LogManager.debug('moreInfo file=', moreInfo);
            moreFileData.push(moreInfo);
        }

        // Merge arrays
        let MoreInfoListData: any = [];
        var moreViewData: any = [];

        if (
            (moreFolderData.length == 0 && moreFileData.length == 0) ||
            (moreFolderData.length == 0 && moreFileData.length == 1) ||
            (moreFolderData.length == 1 && moreFileData.length == 0)
        ) {
            moreViewData = [...moreFolderData, ...moreFileData];
            MoreInfoListData = moreViewData.length == 0 ? [] : moreViewData[0];
        } else if (moreFolderData.length == 1 && moreFileData.length == 1) {
            moreViewData = [...moreFolderData[0], ...moreFileData[0]];
            MoreInfoListData = moreViewData;
        } else {
            MoreInfoListData = [];
        }

        this.props.setMoreInfoList(MoreInfoListData);
        this.props.setRefreshDetailScreen(false);

        //create breadcrumb array
        let breadCrumbList = createBredCrumbList(selectedCategoryData);
        LogManager.debug('categoryScreen breadCrumbList=', breadCrumbList);

        this.setState({
            breadCrumbList: breadCrumbList,
            pageTitle: pageTitle,
        });
        this.props.setIsLoading(false);
    }

    componentDidUpdate(prevProp: CategoryDetailScreenProps) {
        if (this.props.isRefreshDetailScreen != prevProp.isRefreshDetailScreen) {
            if (this.props.isRefreshDetailScreen) {
                LogManager.debug('refresh screen');
                this.getCategoryDetailData(true);
            }
        }
    }

    goBack = () => {
        let data: any = Object.assign([], this.props.selectedCategoryData);
        let isDetailScreen = data[data.length - 1].isDetailScreen ?? false;
        data.pop();
        this.props.setSelectedCategoryData(data);
        if (!isDetailScreen) NavigationManager.goBack();
        else this.props.setRefreshDetailScreen(true);
    };

    loadMoreScreenData = (moreItem: MoreInfoListModel) => {
        let data = Object.assign([], this.props.selectedCategoryData);

        let test: any = {
            data: moreItem,
            label: moreItem.title,
            prvIndex: this.props.selectedCategoryData.length,
            isDetailScreen: true,
        };
        data.push(test);
        this.props.setSelectedCategoryData(data);
        this.props.setRefreshDetailScreen(true);
    };

    breadcrumbClick = (item: any) => {
        if (item.prvIndex >= 0) {
            const prvIndex = item.prvIndex;
            let data: any = Object.assign([], this.props.selectedCategoryData);
            let totalDataLength = data.length;

            let isDetailScreen = data[prvIndex + 1].isDetailScreen ?? false;

            data.splice(prvIndex + 1);

            this.props.setSelectedCategoryData(data);

            if (!isDetailScreen) NavigationManager.pop(totalDataLength - item.id);
            else this.props.setRefreshDetailScreen(true);
        } else {
            // reset all data;
            this.props.setSelectedCategoryData([]);
            //go back to Home screen
            NavigationManager.navigateAndClear('HomeScreen');
        }
    };
    onClickDownloadFolder = async () => {
      
       if( this.props.gridViewData.filter((item) => {
            return isStringEmpty(item.downloadLocation);
        }).length )
        this.props.downloadAll(this.props.gridViewData);
        else
        this.props.removeAll(this.props.gridViewData);
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <View style={style.navContainer}>
                    <CustomTopNav
                        back
                        subTitle={this.state.pageTitle}
                        onPressBack={this.goBack}
                        smallHeader
                        isShowCard
                        largeTitle
                        imageName={Images.detailImage}
                    />
                </View>
                <CustomBody>
                    <View style={style.mainContainer}>
                        {this.props.gridViewData && (
                            <View style={style.fileContainer}>
                                <ThumbnailGridView gridViewList={this.props.gridViewData} />
                            </View>
                        )}

                        <View style={style.moreInfoContainer}>
                            <TouchableOpacity onPress={this.onClickDownloadFolder}>
                                <View style={style.mainContainerForCard}>
                                    <View style={style.itemContainer}>
                                        <View style={style.circleIconContainer}>
                                            <CustomIcon name={this.props.gridViewData.filter((item) => {
                                                    return isStringEmpty(item.downloadLocation);
                                                }).length
                                                    ? 'download'
                                                    : 'trash-2'} />
                                        </View>
                                        <View style={style.folderTextContainer}>
                                            <Text style={style.textStyle}>
                                                {this.props.gridViewData.filter((item) => {
                                                    return isStringEmpty(item.downloadLocation);
                                                }).length
                                                    ? BaseLocalization.downloadFolder
                                                    : BaseLocalization.removeFolder}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={style.seperator}></View>
                            {this.props.moreInfoData && (
                                <MoreInfoList
                                    title={BaseLocalization.moreInfoTitle}
                                    moreInfoList={this.props.moreInfoData}
                                    onPress={this.loadMoreScreenData}
                                />
                            )}
                        </View>
                    </View>
                </CustomBody>
                <View style={style.navContainer}>
                    <CustomBottomContainer>
                        <CustomBottomContainer>
                            {this.state.breadCrumbList.length > 0 && (
                                <BreadcrumbFlatList
                                    breadCrumbList={this.state.breadCrumbList}
                                    onPress={this.breadcrumbClick}
                                />
                            )}
                        </CustomBottomContainer>
                    </CustomBottomContainer>
                </View>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    gridViewData: state.categoryReducer.gridViewData,
    moreInfoData: state.categoryReducer.moreInfoData,
    isLoading: state.appDataReducer.appDataLoading,
    isRefreshDetailScreen: state.categoryReducer.isRefreshDetailScreen,
    selectedCategoryData: state.categoryReducer.selectedCategoryData,
});

const mapDispatchToProps = (dispatch: any) => ({
    setGridViewList: (gridData: GridViewModel[]) => {
        dispatch(setGridViewData(gridData));
    },
    setMoreInfoList: (moreInfoData: MoreInfoListModel[]) => {
        dispatch(setMoreInfoData(moreInfoData));
    },
    setIsLoading: (value: boolean) => {
        dispatch(setAppDataLoading(value));
    },
    setMoreInfoScreenData: (data: MoreInfoListModel[]) => {
        dispatch(setMoreInfoScreenData(data));
    },
    setSelectedCategoryData: (selectedItems: DriveItemModel[]) => {
        dispatch(setSelectedCategoryData(selectedItems));
    },
    setRefreshDetailScreen: (isRefresh: boolean) => {
        dispatch(setRefreshDetailScreen(isRefresh));
    },
    downloadAll: (data: any[]) => {
        dispatch(downloadFolder(data));
    },
    removeAll: (data: any[]) => {
        dispatch(removeDownloadedFolder(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailScreen);
