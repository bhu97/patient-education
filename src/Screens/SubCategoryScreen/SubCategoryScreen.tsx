import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBredcrum from '../../Components/custom-bredcrum/custom-bredcrum';
import CustomFlatList from '../../Components/custom-flat-list/custom-flat-list';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import MainContainer from '../../Components/main-container/main-container';
import NavigationManager from '../../Helper/NavigationManager';
import { setCategoryDetailTitle } from '../../Redux/catagory/catagorySlice';
import { RootState } from '../../Redux/rootReducer';
import { style } from './style';

interface SubCategoryScreenProps {
    subCategoryList: Array<any>;
    selectedCategory: Array<any>;
    dispatch: Dispatch;
    navigation: any;
    mainTitle: String;
    categoryTitle: String;
    setTitleCategory: () => void;
}

interface SubCategoryScreenState {
    isLoading: boolean;
}

class SubCategoryScreen extends Component<SubCategoryScreenProps, SubCategoryScreenState> {
    constructor(props: SubCategoryScreenProps) {
        super(props);
        this.state = {
            isLoading:true
        };
    }
    componentDidMount() {
        setTimeout(() => {
          this.setState({isLoading:false});
        }, 3000);
    }
    onClickFirstList = () => {};

    onClickSecondList = (item) => {
        // console.log(item);

        this.props.setTitleCategoryDetails(item.options);

        NavigationManager.navigate('CategoryDetailScreen');
    };

    goToHomeScreen = () => {
        NavigationManager.navigateAndClear('HomeScreen');
    };

    goBack = () => {
        NavigationManager.goBack();
    };

    render() {
        return (
            this.state.isLoading ? (
                
                <FullScreenLoader isLoading showSpinner/>

            ):( 
            <MainContainer>
                <CustomTopNav back subTitle={this.props.categoryTitle} onPressBack={this.goBack} />
                <CustomBody>
                    <View style={style.container}>
                        <View style={style.flatListViewConatiner}>
                            <CustomFlatList
                                catagoryList={this.props.selectedCategory.array}
                                onPressList={this.onClickFirstList}
                                elementType="value"
                                selectedElement={this.props.subCategoryList}
                                disableClickOnFlatlist
                            />
                        </View>
                        <View style={style.SecondflatListViewConatiner}>
                            <CustomFlatList
                                catagoryList={this.props.subCategoryList.subCategory}
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
                        <CustomBredcrum title={this.props.categoryTitle} />
                    </View>
                </CustomBottomContainer>
            </MainContainer>
            )
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    categoryTitle: state.catagoryReducer.subCategoryTitle,
    mainTitle: state.catagoryReducer.categoryTitle,
    subCategoryList: state.catagoryReducer.subCategoryList,
    selectedCategory: state.catagoryReducer.selectedCategory,
});

const mapDispatchToProps = (dispatch: any) => ({
    setTitleCategoryDetails: (titleText: String) => {
        dispatch(setCategoryDetailTitle(titleText));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryScreen);