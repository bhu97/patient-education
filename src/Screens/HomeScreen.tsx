import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import CustomBody from '../Components/custom-body/custom-body';
import CustomButton from '../Components/custom-button/custom-button';
import CustomWrapper from '../Components/custom-wrapper/custom-wrapper';
import FormBottomContainer from '../Components/form-bottom-container/form-bottom-container';
import FullScreenLoader from '../Components/full-screen-loader/full-screen-loader';
import MainContainer from '../Components/main-container/main-container';
import { envConfiguration } from '../Helper/EnvConfigurations';
import { BaseLocalization } from '../Helper/Localization/BaseLocalization';
import logManager from '../Helper/LogManager';
import networkManager from '../Helper/NetworkManager';
import { decrementValue, incrementValue, setMessageText } from '../Redux/message/messageSlice';
import { fetchPost } from '../Redux/posts/postThunk';
import { RootState } from '../Redux/rootReducer';
import { BaseThemeStyle } from '../Theme/BaseThemeStyle';

interface HomePageProps {
    dispatch: Dispatch;
    messageText: string;
    count: number;
    getPostData: () => void;
    apiDataLoading: boolean;
    decrementCount: () => void;
    incrementCount: () => void;
}

interface HomePageState {}

class HomePage extends Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
    }

    componentDidMount() {}

    buttonPressI = () => {
        //this.props.dispatch(incrementValue());
        this.props.incrementCount();
    };

    buttonPressD = () => {
        //this.props.dispatch(decrementValue());
        this.props.decrementCount();
    };

    buttonPress = () => {
        this.props.dispatch(setMessageText('Message from button'));
        //NavigationManager.navigate('TestPage');
    };

    buttonPressApi = () => {
        networkManager.isConnected().then((isConnected) => {
            if (!isConnected) {
                logManager.info('network disconnected');
            } else {
                logManager.info('network connected');
                this.props.getPostData();
            }
        });
    };

    render() {
        return (
            <MainContainer>
                <Text style={BaseThemeStyle.fonts.h2}>{BaseLocalization.welcome} </Text>

                <CustomBody>
                    <CustomWrapper paddingVertical paddingHorizontal>
                        <CustomButton text={'Increment'} onPress={this.buttonPressI} rounded />

                        <Text style={BaseThemeStyle.fonts.body1}>Count is = {this.props.count}</Text>

                        <CustomButton text={'Decrement'} onPress={this.buttonPressD} rounded />
                    </CustomWrapper>
                    <CustomWrapper paddingVertical>
                        <Text style={BaseThemeStyle.fonts.body1}>{this.props.messageText}</Text>
                    </CustomWrapper>

                    <CustomButton
                        text={'Test API for ' + envConfiguration.envName}
                        onPress={this.buttonPressApi}
                        rounded
                    />
                </CustomBody>

                <FormBottomContainer>
                    <CustomWrapper paddingVertical paddingHorizontal>
                        <CustomButton text={'change message'} onPress={this.buttonPress} rounded />
                    </CustomWrapper>
                </FormBottomContainer>

                <FullScreenLoader isLoading={this.props.apiDataLoading} showSpinner />
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    messageText: state.messageReducer.messageText,
    count: state.messageReducer.value,
    apiDataLoading: state.postReducer.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
    getPostData: () => {
        dispatch(fetchPost());
    },
    incrementCount: () => {
        dispatch(incrementValue());
    },
    decrementCount: () => {
        dispatch(decrementValue());
    },
});

//export default HomePage;
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
