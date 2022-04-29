import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBredcrum from '../../Components/custom-bredcrum/custom-bredcrum';
import CustomFlatList from '../../Components/custom-flat-list/custom-flat-list';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import MainContainer from '../../Components/main-container/main-container';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { setCatagoryList, setCategoryDetailTitle } from '../../Redux/catagory/catagorySlice';
import { RootState } from '../../Redux/rootReducer';
import { style } from './style';

interface SubCategoryScreenProps {
    dispatch: Dispatch;
    catagoryList: any;
    getList: () => void;
    navigation: any;
    route: any;
    mainTitle: String;
    categoryTitle: String;
}

interface SubCategoryScreenState {
    subCategory: any;
    selectedSubCategory: any;
}

class SubCategoryScreen extends Component<SubCategoryScreenProps, SubCategoryScreenState> {
    constructor(props: SubCategoryScreenProps) {
        super(props);
        this.state = {
            subCategory: this.props.route.params.wholeData,
            selectedSubCategory: this.props.route.params.selectedCategory.array,
        };
    }

    
    onClickFirstList = () => { };

    onClickSecondList = (item) => {
        console.log(item);
        //LogManager.error("selected detail category=", item.options);
        //set sub category tiltle
        this.props.setTileCategoryDetails(item.options);

        NavigationManager.navigate('CategoryDetailScreen');
    };

    goToHomeScreen = () => {
        NavigationManager.navigateAndClear("HomeScreen");
    };

    goBack = () => {
         NavigationManager.goBack();
    };

    render() {
        return (
            <MainContainer>
                <CustomTopNav back subTitle={this.props.categoryTitle} onPressBack={this.goBack} />
                <CustomBody>
                    <View style={style.container}>
                        <View style={style.flatListViewConatiner}>
                            <CustomFlatList
                                catagoryList={this.state.selectedSubCategory}
                                onPressList={this.onClickFirstList}
                                elementType="value"
                                selectedElement={this.state.subCategory}
                            />
                        </View>
                        <View style={style.SecondflatListViewConatiner}>
                            <CustomFlatList
                                catagoryList={this.state.subCategory.subCategory}
                                onPressList={this.onClickSecondList}
                                elementType="options"
                            />
                        </View>
                    </View>
                </CustomBody>
                <CustomBottomContainer>
                    <View style={style.botomView}>
                        <CustomBredcrum title={'Home'} isFirstCrumb={true} onPress={this.goToHomeScreen} />
                        <CustomBredcrum title={this.props.mainTitle} onPress={this.goBack} />
                        <CustomBredcrum title={this.props.categoryTitle}  />
                    </View>
                </CustomBottomContainer>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    catagoryList: state.catagoryReducer.catagoryList,
    categoryTitle: state.catagoryReducer.subCategoryTitle,
    mainTitle: state.catagoryReducer.categoryTitle,
});

const mapDispatchToProps = (dispatch: any) => ({
    getList: () => {
        dispatch(setCatagoryList());
    },
    setTileCategoryDetails: (titleText: String) => {
        dispatch(setCategoryDetailTitle(titleText));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryScreen);
