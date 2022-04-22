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
import NavigationManager from '../../Helper/NavigationManager';
import { setCatagoryList } from '../../Redux/catagory/catagorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';

interface HomePageProps {
    dispatch: Dispatch;
    catagoryList: any;
    getList: () => void;
    navigation: any;
}

interface HomePageState {
}

class HomePage extends Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
    }

    componentDidMount() {
        //hide splash screen
        SplashScreen.hide();
    }

    goBack = () => {
        NavigationManager.goBack();
    };

    onClickBredcrum1 = () => {
        Alert.alert('on Click Bredcrum 1');
    };


    render() {
        return (

            <MainContainer>

                <CustomTopNav title={BaseLocalization.welcome} subTitle={BaseLocalization.selectCatgory} />
                <CustomBody>
                    <View style={{ height: '60%' }}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={{ marginLeft: '5%', width: '40%' }}>
                                <CustomFlatList
                                    catagoryList={this.props.catagoryList}
                                />
                            </View>
                            <View style={{ marginTop: '20%', width: '100%', height: '100%', marginBottom: '5%' }}>
                                <Image
                                    resizeMode="contain"
                                    style={{ width: 600, height: 380 }}
                                    source={Images.illuHome}
                                />
                            </View>
                        </View>
                    </View>
                </CustomBody>
                <CustomBottomContainer>
                    <CustomBredcrum title={'Home'} isFirstCrumb={true} onPress={this.onClickBredcrum1} />
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

//export default HomePage;
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
