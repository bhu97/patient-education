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
import dbHelper from '../../Database/DBHelper';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import { clearCategoryData, setCategoryItem, setCategoryList } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';

interface CategoryScreenProps {
    // main category screen array
    mainList: DriveItemModel[];
    // category screen array
    categoryList: DriveItemModel[];
    //selected category item
    mainCategoryItem: DriveItemModel;
    //set category list for selected item
    setCategoryList: (data: DriveItemModel[]) => void;

    //set
    setCategoryItem: (selectedCategoryItem: DriveItemModel) => void;
    isLoading: boolean;
    setIsLoading: (boolean) => void;
    clearCategoryData: () => void;
}

interface CategoryScreenState {
    breadCrumbList: any;
}

class CategoryScreen extends Component<CategoryScreenProps, CategoryScreenState> {
    constructor(props: CategoryScreenProps) {
        super(props);
        this.state = {
            breadCrumbList: [],
        };
    }
    componentDidMount() {
        this.getCategoryData();
    }

    async getCategoryData() {
        this.props.setIsLoading(true);
        const categoryData = await dbHelper.getForSelectedCategory(this.props.mainCategoryItem);
        LogManager.debug('categoryData=', categoryData);
        this.props.setCategoryList(categoryData);
        this.props.setIsLoading(false);

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
                isDisabled: true,
            },
        ];

        this.setState({
            breadCrumbList: breadCrumbList,
        });
    }

    goBack = () => {
        this.props.clearCategoryData();
        NavigationManager.navigateAndClear('HomeScreen');
    };

    onCategoryClick = (item) => {
        LogManager.warn('category screen click=', item);
        this.props.setCategoryItem(item);
        if (item.contentType == 'Document Set') {
            NavigationManager.navigate('CategoryDetailScreen');
        } else {
            NavigationManager.navigate('SubCategoryScreen');
        }
    };

    breadcrumbClick = (item: any) => {
        console.log('item =>', item);
        if (item.id === 0) {
            //home click
            this.props.clearCategoryData();
            NavigationManager.navigateAndClear('HomeScreen');
        }
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <CustomTopNav back subTitle={this.props.mainCategoryItem.title} onPressBack={this.goBack} />
                <CustomBody>
                    {this.props.mainList && this.props.categoryList ? (
                        <View style={style.container}>
                            <View style={style.flatListViewConatiner}>
                                <CustomFlatList
                                    isDisabled={true}
                                    categoryList={this.props.mainList}
                                    selectedElement={this.props.mainCategoryItem}
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
    //
    mainList: state.categoryReducer.mainList,
    categoryList: state.categoryReducer.categoryList,
    mainCategoryItem: state.categoryReducer.mainCategoryItem,
    isLoading: state.appDataReducer.appDataLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
    //
    setCategoryList: (categoryData: DriveItemModel[]) => {
        dispatch(setCategoryList(categoryData));
    },
    setCategoryItem: (selectedCategoryItems: DriveItemModel) => {
        dispatch(setCategoryItem(selectedCategoryItems));
    },
    setIsLoading: () => {
        dispatch(setAppDataLoading());
    },
    clearCategoryData: () => {
        dispatch(clearCategoryData());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
