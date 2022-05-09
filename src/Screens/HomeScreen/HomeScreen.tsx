import React, { Component } from 'react';
import { Alert, Image, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBredcrum from '../../Components/custom-bredcrum/custom-bredcrum';
import CustomFlatList from '../../Components/custom-flat-list/custom-flat-list';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import MainContainer from '../../Components/main-container/main-container';
import { BaseLocalization } from '../../Helper/Localization/BaseLocalization';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { setCatagoryList, setCategoryTitle } from '../../Redux/catagory/catagorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';
import categoryData from '../../Json/category';

interface HomePageProps {
    dispatch: Dispatch;
    catagoryList: any;
    setCategoryList: () => void;
    navigation: any;
}

interface HomePageState { }

class HomePage extends Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
    }

    componentDidMount() {
        this.props.setCategoryList(categoryData);
        //hide splash screen
        setTimeout(() => {
            SplashScreen.hide();
        }, 3000);
    }

    goBack = () => {
        NavigationManager.goBack();
    };

    onClickBredcrum1 = () => {
        Alert.alert('on Click Bredcrum 1');
    };

    onClick = (item) => {

        //LogManager.error("selected category=", item.key);
        //set category tiltle
        this.props.setTileCategory(item.key);

        //set category 
        NavigationManager.navigate('CategoryScreen', { wholeData: item });
    };

    render() {
        return (
            <MainContainer>
                <CustomTopNav isShowImage={true} title={BaseLocalization.welcome} subTitle={BaseLocalization.selectCategory} />
                <CustomBody>
                    <View style={style.container}>
                        <View style={style.flatListViewConatiner}>
                            <CustomFlatList
                                catagoryList={this.props.catagoryList}
                                onPressList={this.onClick}
                                elementType="key"
                            />
                        </View>
                        <View style={style.imageViewConatiner}>
                            <View style={style.imageView}>
                                <Image resizeMode="contain" style={style.imageStyle} source={Images.illuHome} />
                            </View>
                        </View>
                    </View>
                </CustomBody>
                <CustomBottomContainer>
                    <View style={style.botomView}>
                        <CustomBredcrum title={'Home'} isFirstCrumb={true} />
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
    setCategoryList: (data: any) => {
        dispatch(setCatagoryList(data));
    },
    setTileCategory: (titleText: String) => {
        dispatch(setCategoryTitle(titleText));
    },
});

//export default HomePage;
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
