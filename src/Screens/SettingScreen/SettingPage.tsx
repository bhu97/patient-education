import { Dispatch } from '@reduxjs/toolkit';
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomListWithHeader from '../../Components/custom-list-with-header/custom-list-with-header';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import MainContainer from '../../Components/main-container/main-container';
import dbHelper from '../../Database/DBHelper';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import { setCountryListData} from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';

interface SettingPageProps {
    dispatch: Dispatch;
    setCountryListData : (any) => void;
    isLoading: boolean;
    setIsLoading: (boolean) => void;
} 

interface SettingPageState {}

class SettingPage extends PureComponent<SettingPageProps, SettingPageState> {
    constructor(props: SettingPageProps) {
        super(props);
    }
    async componentDidMount(){
        this.props.setIsLoading(true);
        let countryData = await dbHelper.getAllAvailableCountries();
        this.props.setCountryListData(countryData);
        this.props.setIsLoading(false);
    }

    titleRowView = (leftHeader, rightHeader) => {
        return (
            <View style={style.rowTextContainer}>
                <Text style={style.rowTextStyle}>{leftHeader}</Text>
                <Text style={style.rowTextStyle}>{rightHeader}</Text>
            </View>
        );
    };

    boxRowView = (customListlabel, iconName, customListValue) => {
        return (
            <View style={style.boxContainer}>
                <View style={style.boxView}>
                    <CustomListWithHeader labelText={customListlabel} iconName={iconName} />
                </View>
                <View style={style.textView}>
                    <Text style={style.rowTextStyle}>{customListValue}</Text>
                </View>
            </View>
        );
    };

    headerContainer = (title) => {
        return <Text style={style.headerTextStyle}>{title}</Text>;
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <CustomTopNav
                    title={BaseLocalization.settingTitle}
                    subTitle={BaseLocalization.settingSubTitle}
                    isShowImage={true}
                    imageName={Images.superSignLogoWhite}
                />
                <CustomBody>
                    <View style={style.mainContainer}>
                        <View style={style.contactConatiner}>
                            {this.headerContainer(BaseLocalization.contact)}

                            <CustomListWithHeader
                                headerText={BaseLocalization.generalTitle}
                                labelText={BaseLocalization.contact}
                                iconName="mail"
                            />

                            <CustomListWithHeader
                                headerText={BaseLocalization.generalTitle}
                                labelText={BaseLocalization.contact}
                                iconName="mail"
                            />
                        </View>
                        <View style={style.appInfoConatiner}>
                            {this.headerContainer(BaseLocalization.appInformation)}

                            {this.titleRowView(BaseLocalization.countryTitle, BaseLocalization.version)}

                            {this.boxRowView('Master', 'edit-2', '0.9.2')}

                            {this.headerContainer(BaseLocalization.contentUpdates)}

                            {this.titleRowView(BaseLocalization.contentTitle, BaseLocalization.modificationDate)}

                            {this.boxRowView(BaseLocalization.updateTitle, 'download-cloud', '04.03.2022 14.02')}
                        </View>
                    </View>
                </CustomBody>
            </MainContainer>
        );
        
    }
}
const mapStateToProps = (state:RootState) => ({
    isLoading: state.appDataReducer.appDataLoading
});
const mapDispatchToProps = (dispatch: any) => ({
    setCountryListData: (value: any) => {
        dispatch(setCountryListData(value));
    },
    setIsLoading : (value: boolean) => {
        dispatch(setAppDataLoading(value));
     }
});

export default connect(mapStateToProps,mapDispatchToProps)(SettingPage);
