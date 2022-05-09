import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomList from '../../Components/custom-list-component/CustomList'
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav'
import { BaseLocalization } from '../../Helper/Localization/BaseLocalization';

export default function FavouritePage() {
    return (
        <View style={styles.MainContainer}>
            <CustomTopNav isShowImage={true} title={BaseLocalization.welcome} subTitle={BaseLocalization.selectCatgory}/>
            {/* <Text style={{ fontSize: 22, textAlign: 'center' }}> Checking tooltip </Text> */}
            <CustomList/>
        </View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECEFF1',
    },
});
