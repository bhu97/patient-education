import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';
import BreadcrumbFlatList from '../../Components/breadcrumb-flat-list/breadcrumb-flat-list';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBredcrum from '../../Components/custom-bredcrum/custom-bredcrum';
import CustomFlatList from '../../Components/custom-flat-list/custom-flat-list';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import MainContainer from '../../Components/main-container/main-container';
import dbHelper from '../../Database/DBHelper';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import { setCategoryItem, setCategoryList } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
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
        this.props.setCategoryList([]);

        NavigationManager.navigateAndClear('HomeScreen');
    };

    subCategoryRender = (item) => {
        this.props.setCategoryItem(item);
        NavigationManager.navigate('SubCategoryScreen');
    };

    breadcrumbClick = (item: any) => {
        console.log('item =>', item);
        if (item.id === 0) {
            //home click
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
                    <View style={style.container}>
                        <View style={style.flatListViewConatiner}>
                            <CustomFlatList
                                categoryList={this.props.mainList}
                                elementType="name"
                                selectedElement={this.props.categoryList}
                                disableClickOnFlatList
                            />
                        </View>
                        <View style={style.SecondflatListViewConatiner}>
                            <CustomFlatList
                                categoryList={this.props.categoryList}
                                onPressList={this.subCategoryRender}
                                elementType="name"
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
    setIsLoading: (value: boolean) => {
        dispatch(setAppDataLoading(value));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
