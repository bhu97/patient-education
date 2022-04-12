import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function FavouritePage() {
    return (
        <View style={styles.MainContainer}>
            <Text style={{ fontSize: 22, textAlign: 'center' }}> Checking tooltip </Text>
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
