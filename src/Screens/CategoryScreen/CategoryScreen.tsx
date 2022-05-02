import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBredcrum from '../../Components/custom-bredcrum/custom-bredcrum';
import CustomFlatList from '../../Components/custom-flat-list/custom-flat-list';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import MainContainer from '../../Components/main-container/main-container';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { setCatagoryList, setSubCategoryTitle } from '../../Redux/catagory/catagorySlice';
import { RootState } from '../../Redux/rootReducer';
import { style } from './style';

interface CategoryScreenProps {
    catagoryList: any;
    navigation: any;
    route: any;
    mainTitle: string;
}

interface CategoryScreenState {
    subCategory: [];
    selectedCategory: any;
}

class CategoryScreen extends Component<CategoryScreenProps, CategoryScreenState> {
    constructor(props: CategoryScreenProps) {
        super(props);
        this.state = {
            subCategory: [],
            // title: this.props.route.params.wholeData.key,
            selectedCategory: this.props.route.params.wholeData,
        };
    }

    goBack = () => {
        NavigationManager.goBack();
    };

    componentDidMount(): void {
        this.setState({ subCategory: this.state.selectedCategory.array });
    }

    subCategoryRender = (item) => {
        if (item.subCategory) {
           // LogManager.error("selected sub category=", item.value);
            //set sub category tiltle
            this.props.setTileSubCategory(item.value);

            NavigationManager.navigate('SubCategoryScreen', {
                wholeData: item,
                selectedCategory: this.state.selectedCategory,
            });
        } else Alert.alert('hi');
    };

    onHomeBredcrumCLick = () => {
        NavigationManager.navigateAndClear("HomeScreen");
    };

   
    onClickFirstList = () => {
       
    };

    render() {
        return (
            <MainContainer>
                <CustomTopNav back subTitle={this.props.mainTitle} onPressBack={this.goBack} />
                <CustomBody>
                    <View style={style.container}>
                        <View style={style.flatListViewConatiner}>
                            <CustomFlatList
                                catagoryList={this.props.catagoryList}
                                elementType="key"
                                selectedElement={this.state.selectedCategory}
                            />
                        </View>
                        <View style={style.SecondflatListViewConatiner}>
                            <CustomFlatList
                                catagoryList={this.state.subCategory}
                                onPressList={this.subCategoryRender}
                                elementType="value"
                            />
                        </View>
                    </View>
                </CustomBody>
                <CustomBottomContainer>
                    <View style={style.botomView}>
                        <CustomBredcrum title={'Home'} isFirstCrumb={true} onPress={this.onHomeBredcrumCLick} />
                        <CustomBredcrum title={this.props.mainTitle} onPress={this.onClickBredcrum1} />
                    </View>
                </CustomBottomContainer>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    catagoryList: state.catagoryReducer.catagoryList,
    mainTitle: state.catagoryReducer.categoryTitle,
});

const mapDispatchToProps = (dispatch: any) => ({
    setTileSubCategory: (titleText: string) => {
        dispatch(setSubCategoryTitle(titleText));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
