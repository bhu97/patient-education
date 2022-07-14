import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import BreadcrumbFlatList from '../../Components/breadcrumb-flat-list/breadcrumb-flat-list';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomFlatList from '../../Components/custom-flat-list/custom-flat-list';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import MainContainer from '../../Components/main-container/main-container';
import { SCREEN_NAME } from '../../Constant/Constants';
import dbHelper from '../../Database/DBHelper';
import { createBredCrumbList } from '../../Helper/Helper';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import { setCategoryList, setSelectedCategoryData } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';

interface CategoryScreenProps {
    // main category screen array
    mainList: DriveItemModel[];
    // category screen array
    categoryList: DriveItemModel[];

    //set category list for selected item
    setCategoryList: (data: DriveItemModel[]) => void;

    isLoading: boolean;
    setIsLoading: (value: boolean) => void;

    //all selected selectedCategoryData
    selectedCategoryData: any[];
    setSelectedCategoryData: (selectedItem: DriveItemModel[]) => void;
}

interface CategoryScreenState {
    breadCrumbList: any;
    pageTitle: string;
    selectedElement: DriveItemModel;
}

class CategoryScreen extends Component<CategoryScreenProps, CategoryScreenState> {
    constructor(props: CategoryScreenProps) {
        super(props);
        this.state = {
            breadCrumbList: [],
            pageTitle: '',
            selectedElement: {
                uniqueId: '0',
            },
        };
    }
    componentDidMount() {
        this.getCategoryData();
    }

    componentDidUpdate(prevProp: CategoryScreenProps) {
        if (
            this.props.selectedCategoryData &&
            this.props.selectedCategoryData.length > 0 &&
            this.props.selectedCategoryData[0] !== prevProp.selectedCategoryData[0]
        ) {
            if (this.props.selectedCategoryData[0].data.contentType == 'Folder') {
                console.log('category screen', 'refresh UI');
                this.getCategoryData();
            }
        }
    }

    async getCategoryData() {
        this.props.setIsLoading(true);
        const screenCategoryObj = this.props.selectedCategoryData;

        let selectedItem = screenCategoryObj[0].data;
        LogManager.debug('selectedItem for screen data=', selectedItem);

        const categoryData = await dbHelper.getForSelectedCategory(selectedItem);
        LogManager.debug('categoryData=', categoryData);
        this.props.setCategoryList(categoryData);

        //create breadcrumb array
        let breadCrumbList = createBredCrumbList(screenCategoryObj);
        LogManager.debug('breadCrumbList=', breadCrumbList);

        this.setState({
            breadCrumbList: breadCrumbList,
            pageTitle: selectedItem.title,
            selectedElement: selectedItem,
        });
        this.props.setIsLoading(false);
    }

    goBack = () => {
        // reset all data;
        this.props.setSelectedCategoryData([]);
        NavigationManager.navigateAndClear('HomeScreen');
    };

    onCategoryClick = (item) => {
        LogManager.warn('category screen click=', item);
        let data = Object.assign([], this.props.selectedCategoryData);
        let test: any = {
            data: item,
            label: item.title,
            prvIndex: this.props.selectedCategoryData.length,
            id: this.props.selectedCategoryData.length + 1,
        };
        data.push(test);
        this.props.setSelectedCategoryData(data);

        if (item.contentType == 'Document Set') {
            NavigationManager.navigate(SCREEN_NAME.CategoryDetailScreen);
        } else {
            NavigationManager.navigate(SCREEN_NAME.SubCategoryScreen);
        }
    };

    breadcrumbClick = (item: any) => {
        this.goBack();
    };

    onMainCategoryChangeClick = (item) => {
        LogManager.warn('Main category item changed click=', item);
        let data = Object.assign([], this.props.selectedCategoryData);
        data.pop();
        let test: any = {
            data: item,
            label: item.title,
            prvIndex: data.length,
        };
        data.push(test);
        this.props.setSelectedCategoryData(data);
        if (item.contentType == 'Document Set') {
            NavigationManager.navigatePop(SCREEN_NAME.CategoryDetailScreen, 2);
        }
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <View style={style.navContainer}>
                    <CustomTopNav back subTitle={this.state.pageTitle} onPressBack={this.goBack} />
                </View>
                <CustomBody>
                    {this.props.mainList && this.props.categoryList ? (
                        <View style={style.container}>
                            <View style={style.flatListViewConatiner}>
                                <CustomFlatList
                                    categoryList={this.props.mainList}
                                    selectedElement={this.state.selectedElement}
                                    onPressListItem={this.onMainCategoryChangeClick}
                                />
                            </View>
                            <View style={style.SecondflatListViewConatiner}>
                                <CustomFlatList
                                    categoryList={this.props.categoryList}
                                    onPressListItem={this.onCategoryClick}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={style.container}>
                            <View style={style.imageContainer}>
                                <Image style={{ height: 200, width: 200 }} source={Images.emptyImg} />
                                <Text style={style.secondtextStyle} numberOfLines={3}>
                                    {BaseLocalization.noDataText}
                                </Text>
                            </View>
                        </View>
                    )}
                </CustomBody>
                <View style={style.navContainer}>
                    <CustomBottomContainer>
                        {this.state.breadCrumbList.length > 0 && (
                            <BreadcrumbFlatList
                                breadCrumbList={this.state.breadCrumbList}
                                onPress={this.breadcrumbClick}
                            />
                        )}
                    </CustomBottomContainer>
                </View>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    mainList: state.categoryReducer.mainList,
    categoryList: state.categoryReducer.categoryList,
    isLoading: state.appDataReducer.appDataLoading,
    selectedCategoryData: state.categoryReducer.selectedCategoryData,
});

const mapDispatchToProps = (dispatch: any) => ({
    //
    setCategoryList: (categoryData: DriveItemModel[]) => {
        dispatch(setCategoryList(categoryData));
    },
    setIsLoading: (isLoading: boolean) => {
        dispatch(setAppDataLoading(isLoading));
    },
    setSelectedCategoryData: (selectedItems: DriveItemModel[]) => {
        dispatch(setSelectedCategoryData(selectedItems));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
