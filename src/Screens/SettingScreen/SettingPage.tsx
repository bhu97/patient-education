import { Dispatch } from '@reduxjs/toolkit';
import React, { PureComponent } from 'react';
import { Linking, Text, View } from 'react-native';
import { connect } from 'react-redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomLanguageHeader from '../../Components/custom-list-with-header/custom-language-header';
import CustomListWithHeader from '../../Components/custom-list-with-header/custom-list-with-header';
import CustomToast from '../../Components/custom-toast/custom-toast';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import MainContainer from '../../Components/main-container/main-container';
import { SUPPORT_EMAIL } from '../../Constant/Constants';
import dbHelper from '../../Database/DBHelper';
import { DateUtility } from '../../Helper/date-utility';
import deviceManager from '../../Helper/DeviceManager';
import LogManager from '../../Helper/LogManager';
import networkManager from '../../Helper/NetworkManager';
import BaseLocalization from '../../Localization/BaseLocalization';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import { fetchAllDriveItems, fetchEmailSupport, fetchLanguageSupport, getLanguageData, logout } from '../../Redux/app-data/appDataThunk';
import { setCountryListData, setSelectedCountry } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';
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
    fetchSupportEmail:(any)=>void;
    supportEmailData: any;
    isSupportEmailLoad: boolean;
    fetchLanguage:(code:string)=>void;
    allLanguage:string[],
    selectedLanguage:string,
    getLangData:()=>void;
}

interface SettingPageState {
    lastUpdatedDate: string,
    languageCode:string
}

class SettingPage extends PureComponent<SettingPageProps, SettingPageState> {
    _unsubscribe: any;
    constructor(props: SettingPageProps) {
        super(props);
        this.state = {
            lastUpdatedDate: '',
            languageCode:'English'
        }
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.setIsLoading(true);
            this.initializeSetting();
            
        });
    }
    componentWillUnmount() {
        this._unsubscribe();
    }
    async initializeSetting() {
       
        let countryData = await dbHelper.getAllAvailableCountries();
        this.props.setCountryListData(countryData);
        const userData = await dbHelper.getUser();
        this.props.setSelectedCountry(userData.countryTitle);
        let getDate = (await dbHelper.getLastDateModify())
        let getParsDate = DateUtility.getDateTimeStringFromDateTimeMs(getDate.length > 0 ? getDate[0].lastModifyDate : '')
        this.props.getLangData();
        this.setState({ lastUpdatedDate: getParsDate })
        this.props.fetchSupportEmail(this.props.isSupportEmailLoad);
       
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
        if(title == BaseLocalization.getInstance().getObject().logoutNow){
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

    onLangChange=(lang:string)=>{
        this.props.fetchLanguage(lang)
        
    }

    boxRowViewLang = () => {
       
        return (
            <View style={style.boxContainer}>
                <View style={style.boxView}>
                    <CustomLanguageHeader
                     languageList={this.props.allLanguage} 
                     labelText={this.props.selectedLanguage}
                      iconName={Images.circleEditCountry} 
                      isToolTipEnable={true} 
                      onPressItem={(lng) => {this.onLangChange(lng)}} />
                </View>
                {/* <View style={style.textView}>
                    <Text style={style.rowTextStyle}>{customListValue}</Text>
                </View> */}
            </View>
        );
    };

    getSupportEmail = () => {
        for(var i = 0; i < this.props.supportEmailData.length; i++) {
            if (this.props.supportEmailData[i].country == this.props.selectedCountry) {
               return this.props.supportEmailData[i].email;
            }   
        }
        return this.props.supportEmailData[0].email;
    }

    onPressUpdate = () => {
        networkManager.isNetworkAvailable()
        .then((isNetAvailable) => {
            if(isNetAvailable){
                LogManager.debug("network available ")
                if (this.props.isUpdateNowEnable) {
                    this.props.fetchData()
                }
            } else {
                LogManager.warn("network not available ")
                CustomToast.show(BaseLocalization.getInstance().getObject().noInternetConnection,1000)
            }
        });

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

    sendMail = (isTechnicalSupport) => {
        LogManager.debug("Technical support click=",isTechnicalSupport)
        let mailEmailAddress =SUPPORT_EMAIL;
        if(isTechnicalSupport){
            //Technical support will be always Laura’s Mail
            mailEmailAddress =SUPPORT_EMAIL;
        }else {
            //Content support will be country specific mail address 
            mailEmailAddress= this.getSupportEmail();
        }
        console.log("155 *************mailAdd",mailEmailAddress);
        
        Linking.openURL(`mailto:${mailEmailAddress}`); 
    };

    render() {
        // console.log("allLanguage",this.props.allLanguage);
        
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            
            <MainContainer>

                <View style={style.navContainer}>
                    <CustomTopNav
                        title={BaseLocalization.getInstance().getObject().settingTitle}
                        subTitle={BaseLocalization.getInstance().getObject().settingSubTitle}
                        isShowCard
                        imageName={Images.topNavImageSettingScreen}
                    />
                </View>
                <CustomBody>
                    <View style={style.mainContainer}>
                        <View style={style.contactConatiner}>
                            {this.headerContainer(BaseLocalization.getInstance().getObject().contact)}

                            <CustomListWithHeader
                                headerText={BaseLocalization.getInstance().getObject().generalTitle}
                                labelText={BaseLocalization.getInstance().getObject().contact}
                                iconName={Images.circleMail}
                                selectedCountry={this.props.selectedCountry}
                                onPressItem={() => this.sendMail(false)}
                            />

                            <CustomListWithHeader
                                headerText={BaseLocalization.getInstance().getObject().technicalTitle}
                                labelText={BaseLocalization.getInstance().getObject().contact}
                                iconName={Images.circleMail}
                                selectedCountry={this.props.selectedCountry}
                                onPressItem={() => this.sendMail(true)}
                            />
                        </View>
                        <View style={style.appInfoConatiner}>
                            {this.headerContainer(BaseLocalization.getInstance().getObject().appInformation)}

                            {this.titleRowView(BaseLocalization.getInstance().getObject().countryTitle, BaseLocalization.getInstance().getObject().version)}

                            {this.boxRowView(this.props.selectedCountry, Images.circleEditCountry, deviceManager.getAppVersion())}

                            {this.boxRowViewLang()}

                            {this.headerContainer(BaseLocalization.getInstance().getObject().contentUpdates)}
                            
                            {this.titleRowView(BaseLocalization.getInstance().getObject().contentTitle, BaseLocalization.getInstance().getObject().modificationDate)}

                            {this.boxRowViewSecond(BaseLocalization.getInstance().getObject().updateTitle, Images.circleUpdate)}

                            {this.headerContainer(BaseLocalization.getInstance().getObject().logout)}

                            {this.boxRowView(BaseLocalization.getInstance().getObject().logoutNow, Images.logout, '')}
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
    isUpdateNowEnable: state.categoryReducer.isUpdateNowEnable,
    supportEmailData: state.categoryReducer.supportEmailData,
    isSupportEmailLoad: state.categoryReducer.isSupportEmailLoad,
    allLanguage:state.appDataReducer.allLanguages,
    selectedLanguage:state.appDataReducer.selectedLanguage
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
        dispatch(fetchAllDriveItems(true));
    },
    logoutPress:()=>{
        dispatch(logout())
    },
    fetchSupportEmail:(value: boolean)=>{
        dispatch(fetchEmailSupport(value))
    },
    fetchLanguage:(value: string)=>{
        dispatch(fetchLanguageSupport(value))
    },
    getLangData:()=>{
        dispatch(getLanguageData())
    },
    

});

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
