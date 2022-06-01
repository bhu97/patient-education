import React, { Component } from 'react';
import { View } from 'react-native';
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
import { setSubCategoryItem, setSubCategoryList } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import { style } from './style';

interface SubCategoryScreenProps {
    // subCategoryList: Array<any>;
    // selectedCategory: Array<any>;
    // dispatch: Dispatch;
    // navigation: any;
    // mainTitle: string;
    // categoryTitle: string;
    // setTitleCategoryDetails: (string) => void;

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
}

interface SubCategoryScreenState {
    isLoading: boolean;
}

class SubCategoryScreen extends Component<SubCategoryScreenProps, SubCategoryScreenState> {
    constructor(props: SubCategoryScreenProps) {
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
        const subCategoryData = await dbHelper.getForSelectedCategory(this.props.categoryItem);
        LogManager.debug('subCategoryData=', subCategoryData);
        this.props.setSubCategoryList(subCategoryData);
    }

    onClickFirstList = () => {};

    onClickSecondList = (item) => {
        // console.log(item);
        // this.props.setTitleCategoryDetails(item.options);
        // NavigationManager.navigate('CategoryDetailScreen');
    };

    goToHomeScreen = () => {
        NavigationManager.navigateAndClear('HomeScreen');
    };

    goBack = () => {
        NavigationManager.goBack();
    };

    render() {
        return this.state.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <CustomTopNav back subTitle={this.props.categoryItem.title} onPressBack={this.goBack} />
                <CustomBody>
                    <View style={style.container}>
                        <View style={style.flatListViewConatiner}>
                            <CustomFlatList
                                categoryList={this.props.categoryList}
                                onPressList={this.onClickFirstList}
                                elementType="value"
                                // selectedElement={this.props.subCategoryList}
                                disableClickOnFlatList
                            />
                        </View>
                        <View style={style.SecondflatListViewConatiner}>
                            <CustomFlatList
                                categoryList={this.props.subCategoryList}
                                onPressList={this.onClickSecondList}
                                elementType="options"
                            />
                        </View>
                    </View>
                </CustomBody>
                <CustomBottomContainer>
                    <View style={style.botomView}>
                        <CustomBredcrum title={'Home'} isFirstCrumb={true} onPress={this.goToHomeScreen} />
                        <CustomBredcrum title={this.props.mainCategoryItem.title} onPress={this.goBack} />
                        <CustomBredcrum title={this.props.categoryItem.title} />
                    </View>
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
});

const mapDispatchToProps = (dispatch: any) => ({
    //
    setSubCategoryList: (categoryData: DriveItemModel[]) => {
        dispatch(setSubCategoryList(categoryData));
    },
    setSubCategoryItem: (selectedCategoryItems: DriveItemModel) => {
        dispatch(setSubCategoryItem(selectedCategoryItems));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryScreen);
