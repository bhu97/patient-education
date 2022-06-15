import React, { Component } from 'react';
import { Text, View, Alert, FlatList, ScrollView, Button, Animated, Image, StyleSheet } from 'react-native';
import { style } from './style';
import Icon from 'react-native-vector-icons/Entypo';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { listitem } from '../../Model/list-data-model';
import Images from '../../Theme/Images';

const rightSwipeActions = () => {
    return (
        <View style={style.crossIconstyle}>
            <Icon style={style.crossIconcolor} name="cross" size={50} bold />
        </View>
    );
};

const Lists = ({ item }) => (
    <View style={style.listStyle}>
        <Swipeable renderRightActions={rightSwipeActions}>
            <View style={style.listviewstyle}>
                <View style={style.mainIconstyle}>
                    <Image source={Images.favouritesListImage} />
                </View>
                <Text style={style.textStyle}>{item.text}</Text>
                <View style={style.rightIconstyle}>
                <Image source={Images.favouritesListNavImage} />
                </View>
            </View>
        </Swipeable>
    </View>
);

const ListFlatlist = () => {
    return (
        <View style={style.containerView}>
            <FlatList data={listitem} keyExtractor={(item) => item.id} renderItem={Lists} />
        </View>
    );
};

export default ListFlatlist;
