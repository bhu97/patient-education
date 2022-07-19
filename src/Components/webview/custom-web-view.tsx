import React, { PureComponent } from 'react'
import WebView, { WebViewNavigation } from 'react-native-webview'
import { connect } from 'react-redux';
import {View} from 'react-native'
import NavigationManager from '../../Helper/NavigationManager';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { RootState } from '../../Redux/rootReducer';
import CustomTopNav from '../custom-top-nav/custom-top-nav';
import FullScreenLoader from '../full-screen-loader/full-screen-loader';
import MainContainer from '../main-container/main-container';
import Pdf from 'react-native-pdf';
import { style } from './style'

interface CustomWebViewProps {
    route?: { params: { url: string, fileName: string,isPdf:boolean } };
    html?: any,
    onBack?: () => void
    onHttpError?: (event: any) => void;
    headers?: any;
    customNavTitle?: string;
    setCurrentUrl?: (e: string) => void;
}

interface CustomWebViewState {
    currentUrl: string;
    downloadUrl: string;
}

class CustomWebView extends PureComponent<CustomWebViewProps, CustomWebViewState> {
    constructor(props: CustomWebViewProps) {
        super(props);
        this.state = {
            currentUrl: '',
            downloadUrl: ''
        };
    }

    ref = React.createRef<WebView>();

    componentDidMount() {

    }
    componentWillUnmount() {

    }
    onPressClose = () => {
        // this.props.onBack && this.props.onBack();
        NavigationManager.goBack()
    }

    onPressBack = () => {
        this.ref?.current?.goBack();
    }

    renderLoading = () => (
        <FullScreenLoader isLoading showSpinner />
    )

    setCurrentUrl = (e: WebViewNavigation) => {
        // this.setState({ currentUrl: e.url });
        this.props.setCurrentUrl && this.props.setCurrentUrl(e.url);
    }


    onFileDownload = ({ nativeEvent }) => {
        const { downloadUrl } = nativeEvent;
        this.setState({ downloadUrl: downloadUrl });
    }

    render() {
        console.log("this.props.route?.params?.isPdf",this.props.route?.params?.isPdf);
        
        return (
            <MainContainer>
                <CustomTopNav
                    back
                    subTitle={this.props.route?.params?.fileName}
                    onPressBack={this.onPressClose}
                    smallHeader
                    isShowCard
                    largeTitle
                />
               

                {(this.props.route?.params?.isPdf) && (
                    <View style={style.pdfContainer}>
                        <Pdf
                            source={{ uri: this.props.route?.params?.url }}
                            onLoadComplete={(numberOfPages, filePath) => {
                            }}
                            onPageChanged={(page, numberOfPages) => {
                            }}
                            onError={(error) => {
                            }}
                            onPressLink={(uri) => {
                            }}
                            style={style.pdf} />
                    </View>
                )}
                {/* {(this.props.route?.params?.isPdf == false) && (
                <WebView
                    ref={this.ref}
                    source={{
                        uri: this.props.route?.params?.url,
                        html: this.props.html,
                        headers: this.props.headers,
                    }}
                    startInLoadingState={true}
                    renderLoading={this.renderLoading}
                    onNavigationStateChange={this.setCurrentUrl}
                    onFileDownload={this.onFileDownload}
                    onHttpError={this.props.onHttpError}
                />)} */}


            </MainContainer>
        );
    }
}
const mapStateToProps = (state: RootState) => ({

});

const mapDispatchToProps = (dispatch: any): object => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CustomWebView);