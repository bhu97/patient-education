import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomListWithHeader from '../../Components/custom-list-with-header/custom-list-with-header';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import MainContainer from '../../Components/main-container/main-container';
import { BaseLocalization } from '../../Helper/Localization/BaseLocalization';
import Images from '../../Theme/Images';
import { style } from './style';

interface SettingPageProps {}

interface SettingPageState {}

class SettingPage extends PureComponent<SettingPageProps, SettingPageState> {
    constructor(props: SettingPageProps) {
        super(props);
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
        return (
            <MainContainer>
                <CustomTopNav
                    title={BaseLocalization.settingTitle}
                    subTitle={BaseLocalization.settingSubTitle}
                    isShowImage={true}
                    imageName={Images.superSignLogoWhite}
                    // back
                    // onPressBack={() => {
                    //     console.log('back press');
                    // }}
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

export default SettingPage;
