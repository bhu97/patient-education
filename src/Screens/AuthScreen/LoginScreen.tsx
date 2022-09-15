import React, { Component } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import ApplicationAlert from '../../Components/custom-alert/custom-alert-component';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import LocalizationManager from '../../Localization/LocalizationManager';
import { setIsAlertShown } from '../../Redux/app-data/appDataSlice';
import {  userLoginCalled } from '../../Redux/app-data/appDataThunk';
import { RootState } from '../../Redux/rootReducer';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import Images from '../../Theme/Images';
import { style } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface LoginScreenProps {
    navigation: any;
    isAlertShown: boolean;
    appDataLoading: boolean;
    setIsAlertShown: (value: boolean) => void;
    login: () => void;
    isLogout:boolean;
}

interface LoginScreenState {}

class LoginScreen extends Component<LoginScreenProps, LoginScreenState> {
    constructor(props: LoginScreenProps) {
        super(props);
        this.state = {};
        LocalizationManager.initializeAppLanguage();
    }

    async componentDidMount() {
     let  isLogout = await AsyncStorage.getItem('isLogout');
     console.log("isLogout",isLogout);
     
        SplashScreen.hide();
        if(isLogout == 'false'){
            this.props.login();
        }
    }

    hideAlert = () => {
        this.props.setIsAlertShown(false);
    };
    onLogin = () => {
        this.props.login();
    };

    reTry = () => {
        this.props.setIsAlertShown(false);
        this.onLogin();
    };

    render() {
        const { appDataLoading } = this.props;
        return (
            <View style={style.container}>
                {appDataLoading ? (
                    <FullScreenLoader isLoading showSpinner />
                ) : (
                    <View style={style.buttonLogoContainer}>
                        <Image
                            style={(Platform.OS='ios')?style.iOSImg:style.androidImg}
                            source={Images.launchScreen}
                            resizeMode="stretch"
                        />
                        <TouchableOpacity style={style.buttonStyle} onPress={this.onLogin}>
                            <Text style={[BaseThemeStyle.fonts.h8, { color: BaseThemeStyle.colors.white }]}>
                                {BaseLocalization.login}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                <ApplicationAlert
                    visible={this.props.isAlertShown}
                    onRightPress={this.reTry}
                    onLeftPress={this.hideAlert}
                    alertMsg={BaseLocalization.authFailed}
                    rightButtonText={BaseLocalization.reTry}
                    leftButtonText={BaseLocalization.cancel}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    isAlertShown: state.appDataReducer.isAlertShown,
    appDataLoading: state.appDataReducer.appDataLoading,
    isLogout:state.appDataReducer.isLogout
});

const mapDispatchToProps = (dispatch: any) => ({
    setIsAlertShown: (value: boolean) => {
        dispatch(setIsAlertShown(value));
    },
    login: () => {
        dispatch(userLoginCalled());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
