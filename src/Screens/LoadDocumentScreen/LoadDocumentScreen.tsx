import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Pdf from 'react-native-pdf';
import { style } from './style';

interface LoadDocumentScreenProps {
    webUrl: string;
}
interface LoadDocumentScreenState {
    isVisibleObject: any;
    update: any;
}

export default class LoadDocumentScreen extends PureComponent<LoadDocumentScreenProps, LoadDocumentScreenState> {
    constructor(props: LoadDocumentScreenProps) {
        super(props);
    }

    render() {
        console.log('this.props.webUrl=', this.props.route.params.webUrl);
        const source = {
            uri: this.props.route.params.webUrl,
            cache: true,
        };

        return (
            <View style={style.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    trustAllCerts={false}
                    style={style.pdf}
                />
            </View>
        );
    }
}
