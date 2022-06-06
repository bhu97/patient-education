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
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
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
    isLoading: boolean;
    setIsLoading: (boolean) => void;
}

interface SubCategoryScreenState {
 
}

class SubCategoryScreen extends Component<SubCategoryScreenProps, SubCategoryScreenState> {
    constructor(props: SubCategoryScreenProps) {
        super(props);
        this.state = {
         
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
        this.props.setIsLoading(false);
    }

    onClickFirstList = () => {};

    onClickSecondList = (item) => {
        console.log(item);
        // this.props.setTitleCategoryDetails(item.options);
        // NavigationManager.navigate('CategoryDetailScreen');
        this.props.setSubCategoryItem(item);
        NavigationManager.navigate('CategoryDetailScreen');
    };

    goToHomeScreen = () => {
        NavigationManager.navigateAndClear('HomeScreen');
    };

    goBack = () => {
        NavigationManager.goBack();
    };

    render() {
        return this.props.isLoading ? (
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
                                elementType="name"
                                selectedElement={this.props.subCategoryList}
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
                        <CustomBredcrum title={this.props.categoryItem.title} isClickDisable/>
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
    isLoading:state.appDataReducer.appDataLoading
});

const mapDispatchToProps = (dispatch: any) => ({
    //
    setSubCategoryList: (categoryData: DriveItemModel[]) => {
        dispatch(setSubCategoryList(categoryData));
    },
    setSubCategoryItem: (selectedCategoryItems: DriveItemModel) => {
        dispatch(setSubCategoryItem(selectedCategoryItems));
    },
    setIsLoading : (value: boolean) => {
        dispatch(setAppDataLoading(value));
     }
});
export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryScreen);
