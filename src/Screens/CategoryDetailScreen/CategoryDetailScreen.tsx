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
import { clearCategoryDetailsData, clearCategoryDetailsDataOnCategoryBreadCrum, clearCategoryDetailsDataOnHomeBreadCrum, setGridViewData, setMoreInfoData, setMoreInfoScreenData } from '../../Redux/category/categorySlice';
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
    clearCategoryDetailsData: () => void;
    clearCategoryDetailsDataOnCategoryBreadCrum: () => void;
    clearCategoryDetailsDataOnHomeBreadCrum: () => void;
}

interface CategoryDetailScreenState {
    breadCrumbList: any;
    pageTitle: string;
}

class CategoryDetailScreen extends Component<CategoryDetailScreenProps, CategoryDetailScreenState> {
    constructor(props: CategoryDetailScreenProps) {
        super(props);
        this.state = {
            breadCrumbList: [],
            pageTitle: '',
        };
    }

    componentDidMount() {
        this.getCategoryDetailData();
    }

    async getCategoryDetailData() {
        this.props.setIsLoading(true);
        let breadCrumbList = [
            {
                id: 0,
                title: 'Home',
                isFirstCrumb: true,
            },
            {
                id: 1,
                title: this.props.mainCategoryItem.title,
                isFirstCrumb: false,
            },
        ];
        let item: any = {};

        if (this.props.categoryItem.uniqueId != '0' && this.props.subCategoryItem.uniqueId != '0') {
            console.log('all 4 options present');
            //we have category /subcategory present
            item = this.props.subCategoryItem;

            //create breadcrumb array
            breadCrumbList.push(
                {
                    id: 2,
                    title: this.props.categoryItem.title,
                    isFirstCrumb: false,
                },
                {
                    id: 3,
                    title: this.props.subCategoryItem.title,
                    isFirstCrumb: false,
                },
            );
        } else if (this.props.categoryItem.uniqueId != '0' && this.props.subCategoryItem.uniqueId == '0') {
            console.log('only 3 options present Home , main category & category');
            //if subcategory category items unique id is 0 means no subcategory present
            item = this.props.categoryItem;
            breadCrumbList.push({
                id: 2,
                title: this.props.categoryItem.title,
                isFirstCrumb: false,
            });
        } else {
            console.log('only 2 options present Home & main category');
            //if category items unique id is 0 means no category/subcategory present
            item = this.props.mainCategoryItem;
        }

        LogManager.debug('CategoryDetailScreen Item =>', item);

        let pageTitle = item.title;
        let linkedFolder = item.linkedFolders ? item.linkedFolders : '';
        let linkedFiles = item.linkedFiles ? item.linkedFiles : '';

        const categoryDetailData = await dbHelper.getForSelectedCategory(item);
        LogManager.info('categoryDetailData=', categoryDetailData);

        const thumbnailList = await fetchAllThumbnails(item.uniqueId);
        LogManager.info('responses list Item=', thumbnailList);

        const gridData = await createGridModelData(categoryDetailData, thumbnailList);
        LogManager.info('gridData=', gridData);

        this.props.setGridViewList(gridData);

        let moreFolderData = [];
        let moreFileData = [];

        if (linkedFolder != null && linkedFolder != '') {
            const linkedFolderData = linkedUrlListToArray(linkedFolder);
            LogManager.debug('linkedFolderData=', linkedFolderData);

            const moreInfo = await dbHelper.getItemsForContentPageWebUrls(linkedFolderData, true);
            console.log('moreInfo folder=', moreInfo);

            moreFolderData.push(moreInfo);
        }
        if (linkedFiles != null && linkedFiles != '') {
            const linkedFileItemData = linkedUrlListToArray(linkedFiles);
            LogManager.debug('linkedFileItemData=', linkedFileItemData);

            const moreInfo = await dbHelper.getItemsForContentPageWebUrls(linkedFileItemData, false);
            console.log('moreInfo file=', moreInfo);
            moreFileData.push(moreInfo);
        }

        // Merge arrays
        let MoreInfoListData = [];
        var moreViewData = [];
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
        this.props.setIsLoading(false);
        this.props.setMoreInfoList(MoreInfoListData);

        this.setState({
            breadCrumbList: breadCrumbList,
            pageTitle: pageTitle,
        });
    }

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
            this.props.clearCategoryDetailsDataOnHomeBreadCrum();
        } else if (item.id === 1) {
            //category item clicked
            NavigationManager.navigateAndClear('CategoryScreen');
            this.props.clearCategoryDetailsDataOnCategoryBreadCrum();
        } else if (item.id === 2) {
            //sub category item clicked
            NavigationManager.goBack();
            this.props.clearCategoryDetailsData();
        }
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <CustomTopNav back subTitle={this.state.pageTitle} onPressBack={this.goBack} />
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
    clearCategoryDetailsData: () => {
        dispatch( clearCategoryDetailsData());
    },
    clearCategoryDetailsDataOnHomeBreadCrum: () => {
        dispatch(clearCategoryDetailsDataOnHomeBreadCrum());
    },
    clearCategoryDetailsDataOnCategoryBreadCrum: () => {
        dispatch(clearCategoryDetailsDataOnCategoryBreadCrum());
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailScreen);
