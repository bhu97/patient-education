import React, { Component } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import ApplicationAlert from '../../Components/custom-alert/custom-alert-component';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';

import LocalizationManager from '../../Localization/LocalizationManager';
import { setIsAlertShown } from '../../Redux/app-data/appDataSlice';
import { fetchLanguageSupport, userLoginCalled } from '../../Redux/app-data/appDataThunk';
import { RootState } from '../../Redux/rootReducer';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import Images from '../../Theme/Images';
import { style } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dispatchState } from '../../Redux/store';
import BaseLocalization from '../../Localization/BaseLocalization';


interface LoginScreenProps {
    navigation: any;
    isAlertShown: boolean;
    appDataLoading: boolean;
    setIsAlertShown: (value: boolean) => void;
    login: () => void;
    isLogout: boolean;
}

interface LoginScreenState { }

class LoginScreen extends Component<LoginScreenProps, LoginScreenState> {
    constructor(props: LoginScreenProps) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        let isLogout = await AsyncStorage.getItem('isLogout');
        console.log("isLogout", isLogout);
        if (isLogout == 'false' || isLogout == null) {
            this.props.login();
        }
        SplashScreen.hide();
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
                        {(Platform.OS == 'android') && (
                            <Image
                                style={style.androidImg}
                                source={Images.launchScreen}
                                resizeMode="stretch"
                            />
                        )}
                        
                             {(Platform.OS == 'ios') && (
                            <Image
                                style={style.iOSImg}
                                source={Images.launchScreen}
                                resizeMode="stretch"
                            />
                        )}

                        <TouchableOpacity style={style.buttonStyle} onPress={this.onLogin}>
                            <Text style={[BaseThemeStyle.fonts.h8, { color: BaseThemeStyle.colors.white }]}>
                                {BaseLocalization.getInstance().getObject().login}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                <ApplicationAlert
                    visible={this.props.isAlertShown}
                    onRightPress={this.reTry}
                    onLeftPress={this.hideAlert}
                    alertMsg={BaseLocalization.getInstance().getObject().authFailed}
                    rightButtonText={BaseLocalization.getInstance().getObject().reTry}
                    leftButtonText={BaseLocalization.getInstance().getObject().cancel}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    isAlertShown: state.appDataReducer.isAlertShown,
    appDataLoading: state.appDataReducer.appDataLoading,
    isLogout: state.appDataReducer.isLogout
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
