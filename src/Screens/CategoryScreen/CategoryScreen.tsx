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
    selectedCategoryData: DriveItemModel[];
    setSelectedCategoryData: (selectedItem: DriveItemModel[]) => void;
}

interface CategoryScreenState {
    breadCrumbList: any;
    pageTitle: string;
}

class CategoryScreen extends Component<CategoryScreenProps, CategoryScreenState> {
    constructor(props: CategoryScreenProps) {
        super(props);
        this.state = {
            breadCrumbList: [],
            pageTitle: '',
        };
    }
    componentDidMount() {
        this.getCategoryData();
    }

    componentDidUpdate(prevProp: CategoryScreenProps) {
        console.log('componentDidUpdate here for category');

        if (
            this.props.selectedCategoryData &&
            this.props.selectedCategoryData.length > 0 &&
            this.props.selectedCategoryData[0] !== prevProp.selectedCategoryData[0]
        ) {
            console.log('mainCategoryItem changed =', this.props.selectedCategoryData[0]);
            console.log('mainCategoryItem old  =', prevProp.selectedCategoryData[0]);

            if (this.props.selectedCategoryData[0].contentType == 'Document Set') {
                //NavigationManager.navigate('CategoryDetailScreen');
                NavigationManager.navigatePop('CategoryDetailScreen', 1);
            } else {
                //NavigationManager.navigate('CategoryScreen');
                this.getCategoryData();
            }
        }
    }

    async getCategoryData() {
        this.props.setIsLoading(true);
        const selectedCategoryData = this.props.selectedCategoryData;
        let item: any = {};
        item = selectedCategoryData[selectedCategoryData.length - 1];

        const categoryData = await dbHelper.getForSelectedCategory(item);
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
                title: item.title,
                isFirstCrumb: false,
                isDisabled: true,
            },
        ];

        this.setState({
            breadCrumbList: breadCrumbList,
            pageTitle: item.title,
        });
    }

    goBack = () => {
        // reset all data;
        let data = Object.assign([], this.props.selectedCategoryData);
        data.pop();
        this.props.setSelectedCategoryData(data);

        NavigationManager.navigateAndClear('HomeScreen');
    };

    onCategoryClick = (item) => {
        LogManager.warn('category screen click=', item);
        let data = Object.assign([], this.props.selectedCategoryData);
        data.push(item);
        this.props.setSelectedCategoryData(data);

        if (item.contentType == 'Document Set') {
            NavigationManager.navigate('CategoryDetailScreen');
        } else {
            NavigationManager.navigate('SubCategoryScreen');
        }
    };

    breadcrumbClick = (item: any) => {
        console.log('breadcrumb Category screen =>', item);
        if (item.id === 0) {
            //home click
            this.goBack();
        }
    };

    onMainCategoryClick = (item) => {
        LogManager.warn('Main category item changed click=', item);
        let data: any = [];
        data.push(item);
        this.props.setSelectedCategoryData(data);
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <CustomTopNav back subTitle={this.state.pageTitle} onPressBack={this.goBack} />
                <CustomBody>
                    {this.props.mainList && this.props.categoryList ? (
                        <View style={style.container}>
                            <View style={style.flatListViewConatiner}>
                                <CustomFlatList
                                    categoryList={this.props.mainList}
                                    selectedElement={this.props.selectedCategoryData[0]}
                                    onPressListItem={this.onMainCategoryClick}
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
