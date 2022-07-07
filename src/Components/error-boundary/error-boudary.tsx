
import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {styles} from './style'

interface ErrorBoundaryProps {
    children: any;
}
interface ErrorBoundaryState {
    hasError: boolean;
    error: string;
}
export default class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: '' };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ error: error });
        // You can also log the error to an error reporting service
      //  firebase.crashlytics().log('ErrorBoundary----------->' + error + JSON.stringify(errorInfo));
        //firebase.crashlytics().recordError(new Error(error));
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.content}>
                        {/* <ServerMaintenance /> */}
                        <Text style={styles.subtitle}>{this.state.error.toString()}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.setState({ hasError: false });
                            }}
                        >
                            <Text style={styles.buttonText}>Try again</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            );
        }

        return this.props.children;
    }
}

