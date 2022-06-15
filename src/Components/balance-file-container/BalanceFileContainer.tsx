import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import Images from '../../Theme/Images';
import { style } from './style';

export default class BalanceFileContainer extends Component {
    render() {
        return (
            <View style={style.mainContainer}>
                <Text style={style.textStyle}>Balance Files</Text>
                <View style={style.imageContainer}>
                    <Image style={{ height: 200, width: 200 }} source={Images.emptyImg} />
                    <Text numberOfLines={3} style={style.secondtextStyle}>
                        There are no favorites entries here yet. Please choose documents to be displayed here. Choose
                        some files to add as a favorite.
                    </Text>
                </View>
            </View>
        );
    }
}
