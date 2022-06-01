import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';
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
}

interface CategoryScreenState {
    isLoading: boolean;
}

class CategoryScreen extends Component<CategoryScreenProps, CategoryScreenState> {
    constructor(props: CategoryScreenProps) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 3000);
        this.getCategoryData();
    }

    async getCategoryData() {
        const categoryData = await dbHelper.getForSelectedCategory(this.props.mainCategoryItem);
        LogManager.debug('categoryData=', categoryData);
        this.props.setCategoryList(categoryData);
    }

    goBack = () => {
        NavigationManager.goBack();
    };

    subCategoryRender = (item) => {
        this.props.setCategoryItem(item);
        NavigationManager.navigate('SubCategoryScreen');
    };

    onHomeBredcrumClick = () => {
        NavigationManager.navigateAndClear('HomeScreen');
    };

    onClickFirstList = () => {};

    render() {
        return this.state.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <CustomTopNav back subTitle={this.props.mainCategoryItem.title} onPressBack={this.goBack} />
                <CustomBody>
                    <View style={style.container}>
                        <View style={style.flatListViewConatiner}>
                            <CustomFlatList
                                categoryList={this.props.mainList}
                                elementType="key"
                                selectedElement={this.props.categoryList}
                                disableClickOnFlatList
                            />
                        </View>
                        <View style={style.SecondflatListViewConatiner}>
                            <CustomFlatList
                                categoryList={this.props.categoryList}
                                onPressList={this.subCategoryRender}
                                elementType="value"
                            />
                        </View>
                    </View>
                </CustomBody>
                <CustomBottomContainer>
                    <View style={style.botomView}>
                        <CustomBredcrum title={'Home'} isFirstCrumb={true} onPress={this.onHomeBredcrumClick} />
                        <CustomBredcrum title={this.props.mainCategoryItem.title} />
                    </View>
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
});

const mapDispatchToProps = (dispatch: any) => ({
    //
    setCategoryList: (categoryData: DriveItemModel[]) => {
        dispatch(setCategoryList(categoryData));
    },
    setCategoryItem: (selectedCategoryItems: DriveItemModel) => {
        dispatch(setCategoryItem(selectedCategoryItems));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
