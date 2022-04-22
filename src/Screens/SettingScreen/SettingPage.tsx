import React, { PureComponent } from 'react';
import { View } from 'react-native';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBredcrum from '../../Components/custom-bredcrum/custom-bredcrum';
import CustomListWithHeader from '../../Components/custom-list-with-header/custom-list-with-header';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import MainContainer from '../../Components/main-container/main-container';
import { BaseLocalization } from '../../Helper/Localization/BaseLocalization';
import Images from '../../Theme/Images';

interface SettingPageProps {}

interface SettingPageState {}

class SettingPage extends PureComponent<SettingPageProps, SettingPageState> {
    constructor(props: SettingPageProps) {
        super(props);
    }

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
                    <View style={{ backgroundColor: 'yellow', padding: 8, width: '40%' , flexDirection: 'column' }}>
                      
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
                </CustomBody>
                <CustomBottomContainer>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 8 }}>
                        <CustomBredcrum title={'Home'} isFirstCrumb={true} />
                        <CustomBredcrum title={'Test'} />
                        <CustomBredcrum title={'Watch out for 12345'} />
                    </View>
                </CustomBottomContainer>
            </MainContainer>
        );
    }
}

export default SettingPage;
