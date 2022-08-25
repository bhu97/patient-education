import { Dispatch } from '@reduxjs/toolkit';
import React, { PureComponent } from 'react';
import { SUPPORT_EMAIL } from '../../Constant/Constants';
import { Text, View, Linking } from 'react-native';
import { connect } from 'react-redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomListWithHeader from '../../Components/custom-list-with-header/custom-list-with-header';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import MainContainer from '../../Components/main-container/main-container';
import dbHelper from '../../Database/DBHelper';
import { DateUtility } from '../../Helper/date-utility';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import { fetchAllDriveItems, fetchEmailSupport, logout, onLogout } from '../../Redux/app-data/appDataThunk';
import { setCountryListData, setSelectedCountry } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';
import deviceManager from '../../Helper/DeviceManager';

interface SettingPageProps {
    dispatch: Dispatch;
    setCountryListData: (any) => void;
    isLoading: boolean;
    setIsLoading: (boolean) => void;
    setSelectedCountry: (value: string) => void;
    selectedCountry: string;
    navigation: any;
    isUpdateNowEnable: boolean
    fetchData: () => void;
    logoutPress:()=>void;
    fetchSupportEmail:()=>void;
}

interface SettingPageState {
    lastUpdatedDate: string
}

class SettingPage extends PureComponent<SettingPageProps, SettingPageState> {
    _unsubscribe: any;
    constructor(props: SettingPageProps) {
        super(props);
        this.state = {
            lastUpdatedDate: ''
        }
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.initializeSetting();
            
        });
    }
    componentWillUnmount() {
        this._unsubscribe();
    }
    async initializeSetting() {
        this.props.setIsLoading(true);
        let countryData = await dbHelper.getAllAvailableCountries();
        this.props.setCountryListData(countryData);
        const userData = await dbHelper.getUser();
        this.props.setSelectedCountry(userData.countryTitle);
        let getDate = (await dbHelper.getLastDateModify())
        let getParsDate = DateUtility.getDateTimeStringFromDateTimeMs(getDate.length > 0 ? getDate[0].lastModifyDate : '')
        this.setState({ lastUpdatedDate: getParsDate })
        this.props.setIsLoading(false);
        this.props.fetchSupportEmail();
    }

    titleRowView = (leftHeader, rightHeader) => {
        return (
            <View style={style.rowTextContainer}>
                <Text style={style.rowTextStyle}>{leftHeader}</Text>
                <Text style={style.rowTextStyle}>{rightHeader}</Text>
            </View>
        );
    };
    onCustomItemPress=(title)=>{
        if(title == BaseLocalization.logoutNow){
            this.props.logoutPress()
        }
    }

    boxRowView = (customListlabel, source, customListValue) => {
       
        return (
            <View style={style.boxContainer}>
                <View style={style.boxView}>
                    <CustomListWithHeader labelText={customListlabel} iconName={source} isToolTipEnable={source == Images.circleEditCountry} onPressItem={() => {this.onCustomItemPress(customListlabel)}} />
                </View>
                <View style={style.textView}>
                    <Text style={style.rowTextStyle}>{customListValue}</Text>
                </View>
            </View>
        );
    };

    onPressUpdate = () => {
        if (this.props.isUpdateNowEnable) {
            this.props.fetchData()
        }
    }

    boxRowViewSecond = (customListlabel, iconName) => {
        return (
            <View style={[style.boxContainer, { opacity: this.props.isUpdateNowEnable ? 1 : 0.2 }]}>
                <View style={style.boxView}>
                    <CustomListWithHeader labelText={customListlabel} iconName={iconName} isToolTipEnable={false} onPressItem={this.onPressUpdate} />
                </View>
                <View style={style.textView}>
                    <Text style={style.rowTextStyle}>{this.state.lastUpdatedDate}</Text>
                </View>
            </View>
        );
    };



    headerContainer = (title) => {
        return <Text style={style.headerTextStyle}>{title}</Text>;
    };

    sendMail = () => {
        Linking.openURL(`mailto:${SUPPORT_EMAIL}`);
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <View style={style.navContainer}>
                    <CustomTopNav
                        title={BaseLocalization.settingTitle}
                        subTitle={BaseLocalization.settingSubTitle}
                        isShowCard
                        imageName={Images.topNavImageSettingScreen}
                    />
                </View>
                <CustomBody>
                    <View style={style.mainContainer}>
                        <View style={style.contactConatiner}>
                            {this.headerContainer(BaseLocalization.contact)}

                            <CustomListWithHeader
                                headerText={BaseLocalization.generalTitle}
                                labelText={BaseLocalization.contact}
                                iconName={Images.circleMail}
                                selectedCountry={this.props.selectedCountry}
                                onPressItem={this.sendMail}
                            />

                            <CustomListWithHeader
                                headerText={BaseLocalization.technicalTitle}
                                labelText={BaseLocalization.contact}
                                iconName={Images.circleMail}
                                selectedCountry={this.props.selectedCountry}
                                onPressItem={this.sendMail}
                            />
                        </View>
                        <View style={style.appInfoConatiner}>
                            {this.headerContainer(BaseLocalization.appInformation)}

                            {this.titleRowView(BaseLocalization.countryTitle, BaseLocalization.version)}

                            {this.boxRowView(this.props.selectedCountry, Images.circleEditCountry, deviceManager.getAppVersion())}

                            {this.headerContainer(BaseLocalization.contentUpdates)}

                            {this.titleRowView(BaseLocalization.contentTitle, BaseLocalization.modificationDate)}

                            {this.boxRowViewSecond(BaseLocalization.updateTitle, Images.circleUpdate)}

                            {this.headerContainer(BaseLocalization.logout)}

                            {this.boxRowView(BaseLocalization.logoutNow, Images.logout, '')}
                        </View>
                    </View>
                </CustomBody>
            </MainContainer>
        );
    }
}
const mapStateToProps = (state: RootState) => ({
    isLoading: state.appDataReducer.appDataLoading,
    selectedCountry: state.categoryReducer.selectedCountry,
    isUpdateNowEnable: state.categoryReducer.isUpdateNowEnable
});
const mapDispatchToProps = (dispatch: any) => ({
    setCountryListData: (value: any) => {
        dispatch(setCountryListData(value));
    },
    setIsLoading: (value: boolean) => {
        dispatch(setAppDataLoading(value));
    },
    setSelectedCountry: (value: string) => {
        dispatch(setSelectedCountry(value));
    },
    fetchData: () => {
        dispatch(fetchAllDriveItems());
    },
    logoutPress:()=>{
        dispatch(logout())
    },
    fetchSupportEmail:()=>{
        dispatch(fetchEmailSupport())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
