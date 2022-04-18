import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBredcrum from '../../Components/custom-bredcrum/custom-bredcrum';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import MainContainer from '../../Components/main-container/main-container';
import NavigationManager from '../../Helper/NavigationManager';
import { RootState } from '../../Redux/rootReducer';

interface HomePageProps {}

interface HomePageState {}

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

    onClickBredcrum2 = () => {
        Alert.alert('on Click Bredcrum 2');
    };

    onClickBredcrum3 = () => {
        Alert.alert('on Click Bredcrum 3');
    };

    render() {
        return (
            <MainContainer>
                <CustomTopNav
                    title="Welcome!"
                    // back
                    subTitle="Please select your catagory"
                    onPressBack={this.goBack}
                />

                <CustomBody>
                    <Text>{'Body Details'}</Text>
                </CustomBody>

                <CustomBottomContainer>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 8 }}>
                        <CustomBredcrum title={'Home'} isFirstCrumb={true} onPress={this.onClickBredcrum1} />
                        <CustomBredcrum title={'Test'} onPress={this.onClickBredcrum2} />
                        <CustomBredcrum title={'Watch out for 12345'} onPress={this.onClickBredcrum3} />
                    </View>
                </CustomBottomContainer>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

//export default HomePage;
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
