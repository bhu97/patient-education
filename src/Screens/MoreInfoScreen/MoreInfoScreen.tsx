import React, { PureComponent } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import BreadcrumbFlatList from '../../Components/breadcrumb-flat-list/breadcrumb-flat-list';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBredcrum from '../../Components/custom-bredcrum/custom-bredcrum';
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
}

interface MoreInfoScreenState {
    isLoading: boolean;
    currentTitle: string;
    gridViewData: GridViewModel[];
    moreInfoData: MoreInfoListModel[];
    breadCrumbList: any;
}

class MoreInfoScreen extends PureComponent<MoreInfoScreenProps, MoreInfoScreenState> {
    constructor(props: MoreInfoScreenProps) {
        super(props);
        this.state = {
            isLoading: true,
            currentTitle: '',
            gridViewData: [],
            moreInfoData: [],
            breadCrumbList: [],
        };
    }

    componentDidMount() {
        this.loadScreenData();
    }

    async loadScreenData() {
        const moreInfoScreenData = this.props.moreInfoScreenData;
        console.log('moreInfoScreenData=', moreInfoScreenData);

        const currentMoreInfoObject: MoreInfoListModel = moreInfoScreenData[moreInfoScreenData.length - 1];
        console.log('currentMoreInfoObject=', currentMoreInfoObject);

        const categoryDetailData = await dbHelper.getForSelectedCategory(currentMoreInfoObject);
        LogManager.debug('categoryDetailData on More=', categoryDetailData);

        const thumbnailList = await fetchAllThumbnails(currentMoreInfoObject.uniqueId);
        LogManager.info('responses list Item on More=', thumbnailList);

        const gridData = await createGridModelData(categoryDetailData, thumbnailList);
        LogManager.debug('gridData=', gridData);

        let moreInfoData = [];
        for (let categoryItemObj of categoryDetailData) {
            console.log('categoryItemObj=', categoryItemObj);
            if (categoryItemObj.linkedFolders != null && categoryItemObj.linkedFolders != '') {
                const linkedItemData = linkedUrlListToArray(categoryItemObj.linkedFolders);
                LogManager.debug('linkedItemData more=', linkedItemData);

                const moreInfo = await dbHelper.getItemsForContentPageWebUrls(linkedItemData);
                console.log('moreInfo more=', moreInfo);
                moreInfoData.push(moreInfo);
            }
        }

        //create bredcrumb list along with title to display, index and screen name on click
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
            },
            {
                id: 2,
                title: this.props.categoryItem.title,
            },
            {
                id: 3,
                title: this.props.subCategoryItem.title,
            },
        ];

        //check more info array and update breadcrumb to its list

        moreInfoScreenData.forEach((moreInfoScreenDataObj, index) => {
            console.log('Index: ' + index + ' Value: ' + moreInfoScreenDataObj);
            let isLastIndex = index == moreInfoScreenData.length - 1 ? true : false;
            var obj = {
                id: breadCrumbList.length,
                title: moreInfoScreenDataObj.title,
                isDisabled: isLastIndex,
            };
            breadCrumbList.push(obj);
        });

        const currentTitle = currentMoreInfoObject.title;

        this.setState({
            currentTitle: currentTitle,
            gridViewData: gridData,
            moreInfoData: moreInfoData,
            breadCrumbList: breadCrumbList,
        });
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
        let data = this.props.moreInfoScreenData ? this.props.moreInfoScreenData : [];
        data.push(moreItem);
        this.props.setMoreInfoScreenData(data);
        this.loadScreenData();
    };

    breadcrumbClick = (item: any) => {
        console.log('item =>', item);
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
        }
    };

    render() {
        return this.state.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <CustomTopNav back subTitle={this.state.currentTitle} onPressBack={this.goBack} />
                <CustomBody>
                    <View style={style.mainContainer}>
                        {this.state.gridViewData.length > 0 ? (
                            <View style={style.fileContainer}>
                                <ThumbnailGridView gridViewList={this.state.gridViewData} />
                            </View>
                        ) : (
                            <View style={style.fileContainer}>
                                <Text>{'Hello'}</Text>
                            </View>
                        )}
                        <View style={style.moreInfoContainer}>
                            <MoreInfoList
                                title={BaseLocalization.moreInfoTitle}
                                moreInfoList={this.state.moreInfoData}
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
});

const mapDispatchToProps = (dispatch: any) => ({
    setMoreInfoScreenData: (data: MoreInfoListModel[]) => {
        dispatch(setMoreInfoScreenData(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoScreen);
