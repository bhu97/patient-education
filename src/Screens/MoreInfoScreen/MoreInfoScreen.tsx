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
import { setMoreInfoScreenData } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import { style } from '../CategoryDetailScreen/style';

interface MoreInfoScreenProps {
    setMoreInfoScreenData: (data: MoreInfoListModel[]) => void;
    moreInfoScreenData: MoreInfoListModel[];
    //selected category item
    mainCategoryItem: DriveItemModel;
    //selected category item
    categoryItem: DriveItemModel;
    //selected sub category item
    subCategoryItem: DriveItemModel;
    setIsLoading: (value: boolean) => void;
    isLoading: boolean;
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

        let moreFolderData = [];
        let moreFileData = [];

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

        //create breadcrumb list along with title to display, index and screen name on click
        //default 0 will home, 1 will be category 2 will be sub category and 3 will be category details
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
                isFirstCrumb: false,
            },
        ];

        if (this.props.categoryItem.uniqueId != '0' && this.props.subCategoryItem.uniqueId != '0') {
            console.log('all 4 options present');
            //we have category /subcategory present

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
            breadCrumbList.push({
                id: 2,
                title: this.props.categoryItem.title,
                isFirstCrumb: false,
            });
        } else {
            console.log('only 2 options present Home & main category');
            //if category items unique id is 0 means no category/subcategory present
        }

        //check more info array and update breadcrumb to its list

        moreInfoScreenData.forEach((moreInfoScreenDataObj, index) => {
            console.log('Index: ' + index + ' Value: ' + moreInfoScreenDataObj);
            // 4 because till index 3 (home,category,subcategory, category details are considered)
            let breadCrumbListIndex = 4 + index;
            var obj = {
                id: breadCrumbListIndex,
                title: moreInfoScreenDataObj.title,
                isFirstCrumb: false,
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
            NavigationManager.goBack();
        }
    };

    refreshMoreScreen = (moreItem: MoreInfoListModel) => {
        let data = Object.assign([], this.props.moreInfoScreenData);
        data.push(moreItem);
        this.props.setMoreInfoScreenData(data);
        this.loadScreenData();
    };

    breadcrumbClick = (item: any) => {
        console.log('item1 =>', item);
        if (item.id === 0) {
            //home click
            NavigationManager.navigateAndClear('HomeScreen');
        } else if (item.id === 1) {
            //category item clicked
            NavigationManager.navigateAndClear('CategoryScreen');
        } else if (item.id === 2) {
            //sub category item clicked
            NavigationManager.navigateAndClear('SubCategoryScreen');
        } else if (item.id === 3) {
            NavigationManager.navigateAndClear('CategoryDetailScreen');
        } else {
            this.goBack();
        }
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <CustomTopNav back subTitle={this.state.currentTitle} onPressBack={this.goBack} />
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
                <CustomBottomContainer>
                    {this.state.breadCrumbList.length > 0 && (
                        <BreadcrumbFlatList breadCrumbList={this.state.breadCrumbList} onPress={this.breadcrumbClick} />
                    )}
                </CustomBottomContainer>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    moreInfoScreenData: state.categoryReducer.moreInfoScreenData,
    mainCategoryItem: state.categoryReducer.mainCategoryItem,
    categoryItem: state.categoryReducer.categoryItem,
    subCategoryItem: state.categoryReducer.subCategoryItem,
    isLoading: state.appDataReducer.appDataLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
    setMoreInfoScreenData: (data: MoreInfoListModel[]) => {
        dispatch(setMoreInfoScreenData(data));
    },
    setIsLoading: (value: boolean) => {
        dispatch(setAppDataLoading(value));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoScreen);
