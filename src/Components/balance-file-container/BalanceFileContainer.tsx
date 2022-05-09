import React, { Component } from 'react';
import { Text, View, Alert, FlatList, ScrollView, Button, Image } from 'react-native';
import { style } from './style';
import Icon from 'react-native-vector-icons/Entypo';
import ListFlatlist from '../list-flatlist-component/ListFlatlist';
import FileContainer from '../custom-file-container/FileContainer';
import Images from '../../Theme/Images';

export default class BalanceFileContainer extends Component {
    render() {
        return (
            <View>
                <Text style={style.textStyle}>Balance Files</Text>
                <View style={style.imageContainer}>
                    <Image style={{ height: 200, width: 200 }} source={Images.emptyImg} />
                    <Text style={style.secondtextStyle}>
                        There are no favorites entries here yet. Please choose documents to be displayed here. Choose
                        some files to add as a favorite.
                    </Text>
                </View>
            </View>
        );
    }
}
