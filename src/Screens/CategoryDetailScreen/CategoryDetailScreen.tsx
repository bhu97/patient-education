import React, { Component } from 'react';
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
import {
    clearCategoryData,
    clearCategoryDetailsData,
    clearMainListData,
    clearSubCategoryData,
    setGridViewData,
    setMoreInfoData,
    setMoreInfoScreenData,
} from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import { style } from './style';

interface CategoryDetailScreenProps {
    gridViewData: GridViewModel[];
    moreInfoData: MoreInfoListModel[];
    //selected category item
    mainCategoryItem: DriveItemModel;
    //selected category item
    categoryItem: DriveItemModel;
    //selected sub category item
    subCategoryItem: DriveItemModel;
    //set grid list for selected item
    setGridViewList: (data: GridViewModel[]) => void;
    //set more info list for selected item
    setMoreInfoList: (data: MoreInfoListModel[]) => void;
    setMoreInfoScreenData: (data: MoreInfoListModel[]) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    clearMainListData: () => void;
    clearCategoryData: () => void;
    clearSubCategoryData: () => void;
    clearCategoryDetailsData: () => void;
}

interface CategoryDetailScreenState {
    breadCrumbList: any;
}

class CategoryDetailScreen extends Component<CategoryDetailScreenProps, CategoryDetailScreenState> {
    constructor(props: CategoryDetailScreenProps) {
        super(props);
        this.state = {
            breadCrumbList: [],
        };
    }

    componentDidMount() {
        this.getCategoryDetailData();
    }

    async getCategoryDetailData() {
        this.props.setIsLoading(true);
        const categoryDetailData = await dbHelper.getForSelectedCategory(this.props.subCategoryItem);
        LogManager.debug('categoryDetailData=', categoryDetailData);

        const thumbnailList = await fetchAllThumbnails(this.props.subCategoryItem.uniqueId);
        LogManager.debug('responses list Item=', thumbnailList);

        const gridData = await createGridModelData(categoryDetailData, thumbnailList);
        LogManager.debug('gridData=', gridData);

        this.props.setGridViewList(gridData);

        if (this.props.subCategoryItem.linkedFolders != null || this.props.subCategoryItem.linkedFolders != '') {
            const linkedItemData = linkedUrlListToArray(this.props.subCategoryItem.linkedFolders);
            LogManager.debug('linkedItemData=', linkedItemData);

            const moreInfoData = await dbHelper.getItemsForContentPageWebUrls(linkedItemData);
            console.debug('moreInfoData=', moreInfoData);
            this.props.setMoreInfoList(moreInfoData);
        }

        //create breadcrumb array
        let breadCrumbList = [
            {
                id: 0,
                title: 'Home',
                isFirstCrumb: true,
            },
            {
                id: 1,
                title: this.props.mainCategoryItem.title,
            },
            {
                id: 2,
                title: this.props.categoryItem.title,
            },
            {
                id: 3,
                title: this.props.subCategoryItem.title,
                isDisabled: true,
            },
        ];

        this.setState({
            breadCrumbList: breadCrumbList,
        });

        this.props.setIsLoading(false);
    }

    goToHomeScreen = () => {
        NavigationManager.navigateAndClear('HomeScreen');
    };

    gotoCategoryScreen = () => {
        NavigationManager.navigateAndClear('CategoryScreen');
    };

    goBack = () => {
        this.props.clearCategoryDetailsData();
        NavigationManager.goBack();
    };

    goToMoreScreen = (moreItem: MoreInfoListModel) => {
        let data = [];
        data.push(moreItem);
        this.props.setMoreInfoScreenData(data);
        NavigationManager.navigate('MoreInfoScreen');
    };

    breadcrumbClick = (item: any) => {
        console.log('item =>', item);
        if (item.id === 0) {
            //home click
            NavigationManager.navigateAndClear('HomeScreen');
            this.props.clearMainListData();
            this.props.clearCategoryData();
            this.props.clearSubCategoryData();
            this.props.clearCategoryDetailsData();
        } else if (item.id === 1) {
            //category item clicked
            NavigationManager.navigateAndClear('CategoryScreen');
        } else if (item.id === 2) {
            //sub category item clicked
            NavigationManager.goBack();
        }
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <CustomTopNav back subTitle={this.props.subCategoryItem.title} onPressBack={this.goBack} />
                <CustomBody>
                    <View style={style.mainContainer}>
                        {this.props.gridViewData && (
                            <View style={style.fileContainer}>
                                <ThumbnailGridView gridViewList={this.props.gridViewData} />
                            </View>
                        )}

                        {this.props.moreInfoData && (
                            <View style={style.moreInfoContainer}>
                                <MoreInfoList
                                    title={BaseLocalization.moreInfoTitle}
                                    moreInfoList={this.props.moreInfoData}
                                    onPress={this.goToMoreScreen}
                                />
                            </View>
                        )}
                    </View>
                </CustomBody>
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
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    gridViewData: state.categoryReducer.gridViewData,
    moreInfoData: state.categoryReducer.moreInfoData,
    mainCategoryItem: state.categoryReducer.mainCategoryItem,
    categoryItem: state.categoryReducer.categoryItem,
    subCategoryItem: state.categoryReducer.subCategoryItem,
    isLoading: state.appDataReducer.appDataLoading,
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
    clearCategoryData: (value: any) => {
        dispatch(clearCategoryData(value));
    },
    clearSubCategoryData: (value: any) => {
        dispatch(clearSubCategoryData(value));
    },
    clearMainListData: (value: any) => {
        dispatch(clearMainListData(value));
    },
    clearCategoryDetailsData: (value: any) => {
        dispatch(clearCategoryDetailsData(value));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailScreen);
