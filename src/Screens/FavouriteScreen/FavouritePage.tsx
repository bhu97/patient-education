import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomList from '../../Components/custom-list-component/CustomList';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import MainContainer from '../../Components/main-container/main-container';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import Images from '../../Theme/Images';

export default function FavouritePage() {
    return (
        <MainContainer>
            <View style={styles.navContainer}>
                <CustomTopNav
                    imageName={Images.favoritesHeaderImg}
                    isShowCard
                    title={BaseLocalization.favTitleText}
                    subTitle={BaseLocalization.favSubTitleText}
                />
            </View>
            <CustomBody>
                <CustomList />
            </CustomBody>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECEFF1',
    },
    navContainer: {
        paddingLeft: 16,
        paddingRight: 16,
    },
});
