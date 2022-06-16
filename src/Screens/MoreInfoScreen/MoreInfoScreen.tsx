import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import BreadcrumbFlatList from '../../Components/breadcrumb-flat-list/breadcrumb-flat-list';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import MainContainer from '../../Components/main-container/main-container';
import MoreInfoList from '../../Components/more-info-list/more-info-list';
import ThumbnailGridView from '../../Components/thumbnail-grid-view/thumbnail-grid-view';
import dbHelper from '../../Database/DBHelper';
import { createGridModelData, linkedUrlListToArray } from '../../Helper/Helper';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { GridViewModel } from '../../Model/GridViewModel';
import { MoreInfoListModel } from '../../Model/MoreInfoListModel';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import { fetchAllThumbnails } from '../../Redux/app-data/appDataThunk';
import { setMoreInfoScreenData, setSelectedCategoryData } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';

interface MoreInfoScreenProps {
    setMoreInfoScreenData: (data: MoreInfoListModel[]) => void;
    moreInfoScreenData: MoreInfoListModel[];
    setIsLoading: (value: boolean) => void;
    isLoading: boolean;
    //all selected selectedCategoryData
    selectedCategoryData: DriveItemModel[];
    // Method to set new selected details
    setSelectedCategoryData: (selectedItem: DriveItemModel[]) => void;
}

interface MoreInfoScreenState {
    isLoading: boolean;
    currentTitle: string;
    gridViewData: GridViewModel[];
    moreViewData: MoreInfoListModel[];
    breadCrumbList: any;
}

class MoreInfoScreen extends PureComponent<MoreInfoScreenProps, MoreInfoScreenState> {
    constructor(props: MoreInfoScreenProps) {
        super(props);
        this.state = {
            isLoading: true,
            currentTitle: '',
            gridViewData: [],
            moreViewData: [],
            breadCrumbList: [],
        };
    }

    componentDidMount() {
        this.loadScreenData();
    }

    async loadScreenData() {
        this.props.setIsLoading(true);
        const moreInfoScreenData = this.props.moreInfoScreenData;

        console.log('moreInfoScreenData=', moreInfoScreenData);

        const currentMoreInfoObject: MoreInfoListModel = moreInfoScreenData[moreInfoScreenData.length - 1];
        console.log('currentMoreInfoObject=', currentMoreInfoObject);

        const categoryDetailData = await dbHelper.getForSelectedCategory(currentMoreInfoObject);
        LogManager.debug('categoryDetailData on More=', categoryDetailData);

        const thumbnailList = await fetchAllThumbnails(currentMoreInfoObject.uniqueId);
        LogManager.debug('responses list Item on More=', thumbnailList);

        const gridData = await createGridModelData(categoryDetailData, thumbnailList);
        LogManager.debug('gridData=', gridData);

        let moreFolderData: any = [];
        let moreFileData: any = [];

        if (currentMoreInfoObject.linkedFolders != null && currentMoreInfoObject.linkedFolders != '') {
            const linkedFolderData = linkedUrlListToArray(currentMoreInfoObject.linkedFolders);
            LogManager.debug('linkedFolderData=', linkedFolderData);

            const moreInfo = await dbHelper.getItemsForContentPageWebUrls(linkedFolderData, true);
            console.debug('moreInfo=', moreInfo);
            moreFolderData.push(moreInfo);
        }
        if (currentMoreInfoObject.linkedFiles != null && currentMoreInfoObject.linkedFiles != '') {
            const linkedFileItemData = linkedUrlListToArray(currentMoreInfoObject.linkedFiles);
            LogManager.debug('linkedFileItemData=', linkedFileItemData);

            const moreInfo = await dbHelper.getItemsForContentPageWebUrls(linkedFileItemData, false);
            console.debug('moreInfo=', moreInfo);
            moreFileData.push(moreInfo);
        }

        // Merge arrays
        let MoreInfoListData: any = [];
        var moreViewData: any = [];
        console.log('start =', MoreInfoListData);

        if (
            (moreFolderData.length == 0 && moreFileData.length == 0) ||
            (moreFolderData.length == 0 && moreFileData.length == 1) ||
            (moreFolderData.length == 1 && moreFileData.length == 0)
        ) {
            moreViewData = [...moreFolderData, ...moreFileData];
            console.log('moreViewData=', moreViewData);
            MoreInfoListData = moreViewData.length == 0 ? [] : moreViewData[0];
            console.log('single / no data MoreInfoListData=', MoreInfoListData);
        } else if (moreFolderData.length == 1 && moreFileData.length == 1) {
            moreViewData = [...moreFolderData[0], ...moreFileData[0]];
            console.log('moreViewData=', moreViewData);
            MoreInfoListData = moreViewData;
            console.log('both data MoreInfoListData=', MoreInfoListData);
        } else {
            MoreInfoListData = [];
        }
        console.log('ends =', MoreInfoListData);

        //create breadcrumb list
        let breadCrumbList = [
            {
                id: 0,
                title: 'Home',
                isFirstCrumb: true,
            },
        ];

        const selectedCategoryData = this.props.selectedCategoryData;

        selectedCategoryData.forEach((selectedCategoryDataObj, index) => {
            console.log('Index: ' + index + ' Value: ' + selectedCategoryDataObj);
            let breadCrumbListIndex = 1 + index;
            var obj = {
                id: breadCrumbListIndex,
                title: selectedCategoryDataObj.title ? selectedCategoryDataObj.title : '',
                isFirstCrumb: false,
                uniqueId: selectedCategoryDataObj.uniqueId,
            };
            breadCrumbList.push(obj);
        });

        moreInfoScreenData.forEach((moreInfoScreenDataObj, index) => {
            console.log('Index: ' + index + ' Value: ' + moreInfoScreenDataObj);
            let breadCrumbListIndex = 4 + index;
            var obj = {
                id: breadCrumbListIndex,
                title: moreInfoScreenDataObj.title,
                isFirstCrumb: false,
                uniqueId: moreInfoScreenDataObj.uniqueId,
            };
            breadCrumbList.push(obj);
        });

        const currentTitle = currentMoreInfoObject.title;

        this.setState({
            currentTitle: currentTitle,
            gridViewData: gridData,
            moreViewData: MoreInfoListData,
            breadCrumbList: breadCrumbList,
        });
        this.props.setIsLoading(false);
    }

    componentDidUpdate(prevProp: MoreInfoScreenProps) {
        console.log('componentDidUpdate here for More info sscren');

        if (
            this.props.moreInfoScreenData.length > 0 &&
            this.props.moreInfoScreenData.length !== prevProp.moreInfoScreenData.length
        ) {
            console.log('data added');
            this.loadScreenData();
        } else if (this.props.moreInfoScreenData.length == 0) {
            console.log('No more info');
        }
    }

    goBack = () => {
        let data = Object.assign([], this.props.moreInfoScreenData);
        if (data.length > 1) {
            let currentTitle = data[data.length - 1];
            const index = data.indexOf(currentTitle);
            if (index > -1) {
                data.splice(index, 1);
            }
            this.props.setMoreInfoScreenData(data);
        } else {
            let data = [];
            this.props.setMoreInfoScreenData(data);
            NavigationManager.goBack();
        }
    };

    refreshMoreScreen = (moreItem: MoreInfoListModel) => {
        let data = Object.assign([], this.props.moreInfoScreenData);
        data.push(moreItem);
        this.props.setMoreInfoScreenData(data);
    };

    breadcrumbClick = (item: any) => {
        console.log('breadcrumb More info screen =>', item);

        if (item.id === 0) {
            //home click
            let data = [];
            this.props.setSelectedCategoryData(data);
            NavigationManager.navigateAndClear('HomeScreen');
        } else if (item.id === 1 || item.id === 2) {
            let categoryData = Object.assign([], this.props.selectedCategoryData);
            console.log('categoryData=>', categoryData);

            var clickedIndex = categoryData.findIndex((x) => x.uniqueId === item.uniqueId);
            console.log('clickedIndex=>', clickedIndex);

            if (clickedIndex != -1) {
                //as we need to remove more info object after selected index hence +1
                categoryData.length = clickedIndex + 1;
                console.log('new categoryData->', categoryData);
                this.props.setSelectedCategoryData(categoryData);
            }

            if (item.id == 1) {
                console.log('category');
                NavigationManager.navigateAndClear('CategoryScreen');
            } else if (item.id == 2) {
                console.log('subcategory=>');
                NavigationManager.navigateAndClear('CategoryDetailScreen');
            }
        } else if (item.id > 3) {
            let moreInfoData = Object.assign([], this.props.moreInfoScreenData);
            console.log('moreInfoData=>', moreInfoData);

            var clickedIndex = moreInfoData.findIndex((x) => x.uniqueId === item.uniqueId);
            console.log('clickedIndex=>', clickedIndex);

            if (clickedIndex != -1) {
                //as we need to remove more info object after selected index hence +1
                moreInfoData.length = clickedIndex + 1;
                console.log('new moreInfoData->', moreInfoData);
                this.props.setMoreInfoScreenData(moreInfoData);
            }
        } else {
            console.log('add here');
        }
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <View style={style.navContainer}>
                    <CustomTopNav
                        back
                        subTitle={this.state.currentTitle}
                        onPressBack={this.goBack}
                        smallHeader
                        isShowCard
                        imageName={Images.detailImage}
                    />
                </View>
                <CustomBody>
                    <View style={style.mainContainer}>
                        {this.state.gridViewData && (
                            <View style={style.fileContainer}>
                                <ThumbnailGridView gridViewList={this.state.gridViewData} />
                            </View>
                        )}
                        <View style={style.moreInfoContainer}>
                            <MoreInfoList
                                title={BaseLocalization.moreInfoTitle}
                                moreInfoList={this.state.moreViewData}
                                onPress={this.refreshMoreScreen}
                            />
                        </View>
                    </View>
                </CustomBody>
                <View style={style.navContainer}>
                <CustomBottomContainer>
                    {this.state.breadCrumbList.length > 0 && (
                        <BreadcrumbFlatList breadCrumbList={this.state.breadCrumbList} onPress={this.breadcrumbClick} />
                    )}
                </CustomBottomContainer>
                </View>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    moreInfoScreenData: state.categoryReducer.moreInfoScreenData,
    isLoading: state.appDataReducer.appDataLoading,
    selectedCategoryData: state.categoryReducer.selectedCategoryData,
});

const mapDispatchToProps = (dispatch: any) => ({
    setMoreInfoScreenData: (data: MoreInfoListModel[]) => {
        dispatch(setMoreInfoScreenData(data));
    },
    setIsLoading: (value: boolean) => {
        dispatch(setAppDataLoading(value));
    },
    setSelectedCategoryData: (selectedItems: DriveItemModel[]) => {
        dispatch(setSelectedCategoryData(selectedItems));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoScreen);
