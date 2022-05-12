import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableHighlight } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

export default function CustomToolTip(props: any) {
    const [visibleState, setVisibleState] = useState(false);

    return (
     
            <View style={styles.MainContainer}>
                {/* <Text style={{ fontSize: 22, textAlign: 'center' }}> Checking tooltip </Text> */}

                <Tooltip
                    contentStyle={{ borderRadius: 12.5 }}
                    //   tooltipStyle={{borderRadius:250}}
                    //   backgroundStyle={{borderRadius:50}}
                    animated={true}
                    arrowSize={{ width: 16, height: 8 }}
                    // backgroundColor="gray"
                    isVisible={visibleState}
                    content={
                        <View style={{ width: 300, height: 200, borderRadius: 10 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: '500', padding: 5 }}>File Options</Text>
                                <View style={{ height: 1, width: 300, backgroundColor: 'black' }}></View>
                                <Text style={{ fontSize: 25, fontWeight: '500', padding: 10 }}>Downloads</Text>
                                <View style={{ height: 1, width: 300, backgroundColor: 'black' }}></View>
                                <Text style={{ fontSize: 25, fontWeight: '500', padding: 10 }}>Remove Locally</Text>
                                <View style={{ height: 1, width: 300, backgroundColor: 'black' }}></View>
                                <Text style={{ fontSize: 25, fontWeight: '500', padding: 10 }}>
                                    Add/remove favourite
                                </Text>
                            </View>
                        </View>
                    }
                    placement="right"
                    onClose={() => setVisibleState(false)}
                >
                    <TouchableHighlight style={styles.button} onPress={() => setVisibleState(true)}>
                        <Text style={styles.buttonText}> Checking tooltip </Text>
                    </TouchableHighlight>
                </Tooltip>
            </View>
     
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#ECEFF1',
    },
    button: {
        width: '100%',
        height: 40,
        padding: 10,
        backgroundColor: '#00C853',
        marginTop: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});
