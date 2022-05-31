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
import NavigationManager from '../../Helper/NavigationManager';
import { setSelectedCategory, setSubCategoryList, setSubCategoryTitle } from '../../Redux/catagory/catagorySlice';
import { RootState } from '../../Redux/rootReducer';
import { style } from './style';

interface CategoryScreenProps {
    mainList: any;
    categoryList: Array<any>;
    navigation: any;
    mainTitle: string;
    setSubCategoryData: (any) => void;
    setSelectedCategoryData: (any) => void;
    setTitleCategory: () => void;
    setTitleSubCategory: (string) => void;
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
    }
    goBack = () => {
        NavigationManager.goBack();
    };

    subCategoryRender = (item) => {
        if (item.subCategory) {
            this.props.setTitleSubCategory(item.value);
            this.props.setSubCategoryData(item);
            this.props.setSelectedCategoryData(this.props.categoryList);
            NavigationManager.navigate('SubCategoryScreen');
        } else Alert.alert('hi');
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
                <CustomTopNav back subTitle={this.props.mainTitle} onPressBack={this.goBack} />
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
                                categoryList={this.props.categoryList.array}
                                onPressList={this.subCategoryRender}
                                elementType="value"
                            />
                        </View>
                    </View>
                </CustomBody>
                <CustomBottomContainer>
                    <View style={style.botomView}>
                        <CustomBredcrum title={'Home'} isFirstCrumb={true} onPress={this.onHomeBredcrumClick} />
                        <CustomBredcrum title={this.props.mainTitle} />
                    </View>
                </CustomBottomContainer>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    mainList: state.catagoryReducer.mainList,
    mainTitle: state.catagoryReducer.categoryTitle,
    categoryList: state.catagoryReducer.categoryList,
});

const mapDispatchToProps = (dispatch: any) => ({
    setSubCategoryData: (data: any) => {
        dispatch(setSubCategoryList(data));
    },
    setSelectedCategoryData: (data: any) => {
        dispatch(setSelectedCategory(data));
    },
    setTitleSubCategory: (titleText: string) => {
        dispatch(setSubCategoryTitle(titleText));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
