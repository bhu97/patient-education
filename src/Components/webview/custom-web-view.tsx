import React, { PureComponent } from 'react'
import WebView, { WebViewNavigation } from 'react-native-webview'
import { connect } from 'react-redux';
import NavigationManager from '../../Helper/NavigationManager';
import { RootState } from '../../Redux/rootReducer';
import CustomTopNav from '../custom-top-nav/custom-top-nav';
import FullScreenLoader from '../full-screen-loader/full-screen-loader';
import MainContainer from '../main-container/main-container';


interface CustomWebViewProps {
    route?: { params: { url: string} };
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

    componentDidMount(){
      
    }
    componentWillUnmount(){
       
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
        return (
            <MainContainer>
                <CustomTopNav  back onPressBack={this.onPressClose} />
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
                />
            </MainContainer>
        );
    }
}
const mapStateToProps = (state: RootState) => ({
    
});

const mapDispatchToProps = (dispatch: any): object => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CustomWebView);