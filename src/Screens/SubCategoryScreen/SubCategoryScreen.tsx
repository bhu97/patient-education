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

interface SubCategoryScreenProps {
    dispatch: Dispatch;
    catagoryList: any;
    getList: () => void;
    navigation: any;
    route: any;
}

interface SubCategoryScreenState {
    title: String;
    subCategory: any;
    selectedSubCategory: any;
}

class SubCategoryScreen extends Component<SubCategoryScreenProps, SubCategoryScreenState> {
    constructor(props: SubCategoryScreenProps) {
        super(props);
        this.state = {
            title: this.props.route.params.wholeData.value,
            subCategory: this.props.route.params.wholeData,
            selectedSubCategory: this.props.route.params.selectedCategory.array,
        };
    }

    goBack = () => {
        NavigationManager.goBack();
    };

    onClickFirstList = () => { };
    onClickSecondList = (item) => {
        console.log('last page', item.options);
        NavigationManager.navigate('CategoryDetailScreen');
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
export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryScreen);
