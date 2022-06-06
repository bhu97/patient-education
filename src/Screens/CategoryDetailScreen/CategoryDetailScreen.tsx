import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBredcrum from '../../Components/custom-bredcrum/custom-bredcrum';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import MainContainer from '../../Components/main-container/main-container';
import MoreInfoList from '../../Components/more-info-list/more-info-list';
import ThumbnailGridView from '../../Components/thumbnail-grid-view/thumbnail-grid-view';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import NavigationManager from '../../Helper/NavigationManager';
import { GridViewModel } from '../../Model/GridViewModel';
import { MoreInfoListModel } from '../../Model/MoreInfoListModel';
import { setGridViewData, setMoreInfoData } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import { style } from './style';
import dbHelper from '../../Database/DBHelper';
import LogManager from '../../Helper/LogManager';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { createGridModelData, linkedUrlListToArray, normalizeUrl } from '../../Helper/Helper';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import { API_NAMES } from '../../Constant/Constants';
import { fetchAllThumbnails, fetchData, fetchThumbnail } from '../../Redux/app-data/appDataThunk';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';

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
    isLoading: boolean;
    setIsLoading: (boolean) => void;
}

interface CategoryDetailScreenState {
}

class CategoryDetailScreen extends PureComponent<CategoryDetailScreenProps, CategoryDetailScreenState> {
    constructor(props: CategoryDetailScreenProps) {
        super(props);
        this.state = {
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
        LogManager.info('responses list Item=', thumbnailList);

        const gridData = await createGridModelData(categoryDetailData, thumbnailList);
        LogManager.debug('gridData=', gridData);

        this.props.setGridViewList(gridData);

        if (this.props.subCategoryItem.linkedFolders != null || this.props.subCategoryItem.linkedFolders != '') {
            const linkedItemData = linkedUrlListToArray(this.props.subCategoryItem.linkedFolders);
            LogManager.debug('linkedItemData=', linkedItemData);

            const moreInfoData = await dbHelper.getItemsForContentPageWebUrls(linkedItemData);
            console.log('moreInfoData=', moreInfoData);
            this.props.setMoreInfoList(moreInfoData);
        }
        this.props.setIsLoading(false);
    }

    goToHomeScreen = () => {
        NavigationManager.navigateAndClear('HomeScreen');
    };

    gotoCategoryScreen = () => {
        NavigationManager.navigateAndClear('CategoryScreen');
    };

    goBack = () => {
        NavigationManager.goBack();
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
                        <View style={style.moreInfoContainer}>
                            <MoreInfoList
                                title={BaseLocalization.moreInfoTitle}
                                moreInfoList={this.props.moreInfoData}
                            />
                        </View>
                    </View>
                </CustomBody>
                <CustomBottomContainer>
                    <CustomBottomContainer>
                        <View style={style.botomView}>
                            <CustomBredcrum title={'Home'} isFirstCrumb={true} onPress={this.goToHomeScreen} />
                            <CustomBredcrum
                                title={this.props.mainCategoryItem.title}
                                onPress={this.gotoCategoryScreen}
                            />
                            <CustomBredcrum title={this.props.categoryItem.title} onPress={this.goBack} />
                            <CustomBredcrum title={this.props.subCategoryItem.title} isClickDisable />
                        </View>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailScreen);
