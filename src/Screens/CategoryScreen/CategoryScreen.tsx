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
import NavigationManager from '../../Helper/NavigationManager';
import { setCatagoryList } from '../../Redux/catagory/catagorySlice';
import { RootState } from '../../Redux/rootReducer';
import { style } from './style';

interface CategoryScreenProps {
    dispatch: Dispatch;
    catagoryList: any;
    getList: () => void;
    navigation: any;
    route: any;
}

interface CategoryScreenState {
    subCategory: [];
    title: String;
    selectedCategory: any;
}

class CategoryScreen extends Component<CategoryScreenProps, CategoryScreenState> {
    constructor(props: CategoryScreenProps) {
        super(props);
        this.state = {
            subCategory: [],
            title: this.props.route.params.wholeData.key,
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
            NavigationManager.navigate('SubCategoryScreen', {
                wholeData: item,
                selectedCategory: this.state.selectedCategory,
            });
        } else Alert.alert('hi');
    };

    onClickFirstList = () => { };
    onClickSecondList = (item) => {
        this.subCategoryRender(item);
    };
    onClickBredcrum1 = () => {
        Alert.alert('on Click Bredcrum 1');
    };

    render() {
        return (
            <MainContainer>
                <CustomTopNav back subTitle={this.state.title} onPressBack={this.goBack} />
                <CustomBody>
                    <View style={style.container}>
                        <View style={style.flatListViewConatiner}>
                            <CustomFlatList
                                catagoryList={this.props.catagoryList}
                                onPressList={this.onClickFirstList}
                                elementType="key"
                                selectedElement={this.state.selectedCategory}
                            />
                        </View>
                        <View style={style.SecondflatListViewConatiner}>
                            <CustomFlatList
                                catagoryList={this.state.subCategory}
                                onPressList={this.onClickSecondList}
                                elementType="value"
                            />
                        </View>
                    </View>
                </CustomBody>
                <CustomBottomContainer>
                    <View style={style.botomView}>
                        <CustomBredcrum title={'Home'} isFirstCrumb={true} onPress={this.onClickBredcrum1} />
                        <CustomBredcrum title={this.state.title} onPress={this.onClickBredcrum1} />
                    </View>
                </CustomBottomContainer>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    catagoryList: state.catagoryReducer.catagoryList,
});

const mapDispatchToProps = (dispatch: any) => ({
    getList: () => {
        dispatch(setCatagoryList());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
