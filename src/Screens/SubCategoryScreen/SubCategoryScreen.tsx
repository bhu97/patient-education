import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import BreadcrumbFlatList from '../../Components/breadcrumb-flat-list/breadcrumb-flat-list';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomFlatList from '../../Components/custom-flat-list/custom-flat-list';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import MainContainer from '../../Components/main-container/main-container';
import dbHelper from '../../Database/DBHelper';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import {
    clearSubCategoryDataOnBack,
    clearSubCategoryDataOnBreadCrum,
    setSubCategoryItem,
    setSubCategoryList,
} from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';

interface SubCategoryScreenProps {
    //selected category item
    mainCategoryItem: DriveItemModel;
    //selected category item
    categoryItem: DriveItemModel;

    // category screen array
    categoryList: DriveItemModel[];

    // category screen array
    subCategoryList: DriveItemModel[];

    //set category list for selected item
    setSubCategoryList: (data: DriveItemModel[]) => void;

    //set
    setSubCategoryItem: (selectedCategoryItem: DriveItemModel) => void;
    isLoading: boolean;
    setIsLoading: (boolean) => void;
    clearSubCategoryDataOnBack: () => void;
    clearSubCategoryDataOnBreadCrum: () => void;
}

interface SubCategoryScreenState {
    breadCrumbList: any;
}

class SubCategoryScreen extends Component<SubCategoryScreenProps, SubCategoryScreenState> {
    constructor(props: SubCategoryScreenProps) {
        super(props);
        this.state = {
            breadCrumbList: [],
        };
    }
    componentDidMount() {
        this.props.setIsLoading(true);
        this.getCategoryData();
    }

    async getCategoryData() {
        const subCategoryData = await dbHelper.getForSelectedCategory(this.props.categoryItem);
        LogManager.debug('subCategoryData=', subCategoryData);
        this.props.setSubCategoryList(subCategoryData);

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
            {
                id: 2,
                title: this.props.categoryItem.title,
                isFirstCrumb: false,
                isDisabled: true,
            },
        ];

        this.setState({
            breadCrumbList: breadCrumbList,
        });

        this.props.setIsLoading(false);
    }

    onSubCategoryClick = (item) => {
        console.log(item);
        this.props.setSubCategoryItem(item);
        NavigationManager.navigate('CategoryDetailScreen');
    };

    breadcrumbClick = (item: any) => {
        console.log('item =>', item);
        if (item.id === 0) {
            //home click
            NavigationManager.navigateAndClear('HomeScreen');
            this.props.clearSubCategoryDataOnBreadCrum();
        } else if (item.id === 1) {
            //category item clicked
            NavigationManager.goBack();
            this.props.clearSubCategoryDataOnBack();
        }
    };
    goBack = () => {
        this.props.clearSubCategoryDataOnBack();
        NavigationManager.goBack();
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <CustomTopNav back subTitle={this.props.categoryItem.title} onPressBack={this.goBack} />
                <CustomBody>
                    {this.props.subCategoryList && this.props.categoryList ? (
                        <View style={style.container}>
                            <View style={style.flatListViewConatiner}>
                                <CustomFlatList
                                    categoryList={this.props.categoryList}
                                    selectedElement={this.props.categoryItem}
                                    isDisabled={true}
                                />
                            </View>
                            <View style={style.SecondflatListViewConatiner}>
                                <CustomFlatList
                                    categoryList={this.props.subCategoryList}
                                    onPressListItem={this.onSubCategoryClick}
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
    mainCategoryItem: state.categoryReducer.mainCategoryItem,
    categoryItem: state.categoryReducer.categoryItem,
    categoryList: state.categoryReducer.categoryList,
    subCategoryList: state.categoryReducer.subCategoryList,
    isLoading: state.appDataReducer.appDataLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
    //
    setSubCategoryList: (categoryData: DriveItemModel[]) => {
        dispatch(setSubCategoryList(categoryData));
    },
    setSubCategoryItem: (selectedCategoryItems: DriveItemModel) => {
        dispatch(setSubCategoryItem(selectedCategoryItems));
    },
    setIsLoading: (value: boolean) => {
        dispatch(setAppDataLoading());
    },
    clearSubCategoryDataOnBack: () => {
        dispatch(clearSubCategoryDataOnBack());
    },
    clearSubCategoryDataOnBreadCrum: () => {
        dispatch(clearSubCategoryDataOnBreadCrum());
    },
   
});
export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryScreen);
