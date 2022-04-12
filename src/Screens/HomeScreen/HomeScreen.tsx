import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import MainContainer from '../../Components/main-container/main-container';
import NavigationManager from '../../Helper/NavigationManager';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import BottomContainer from '../../Components/bottom-container/bottom-container';
import { RootState } from '../../Redux/rootReducer';

interface HomePageProps {}

interface HomePageState {}

class HomePage extends Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
    }

    goBack = () => {
        NavigationManager.goBack();
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
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

//export default HomePage;
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
