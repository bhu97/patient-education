import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { GridViewModel } from '../../Model/GridViewModel';
import Images from '../../Theme/Images';
import BalanceFileContainer from '../balance-file-container/BalanceFileContainer';
import ListFlatlist from '../list-flatlist-component/ListFlatlist';
import { style } from './style';

interface CategoryDetailScreenState {
    dummyData: GridViewModel[];
}

const CustomList = () => {
    const [dummyImgs, setDummyImgs] = useState([]);

    useEffect(() => {
        let dummyImages = [];
        const labelText = [
            'GDP Fluids',
            'Balance Overview1 Balance Overview2 Balance Overview3',
            'ABD dffsdf sdfdf dsf',
            'DEF asf asjfh  ',
            'GHI asd asd',
            'Jkl',
            'AB',
            'AB',
        ];
        const fileSize = ['64 KB', '12 KB', '16KB', '24KB', '8KB', '20KB', '2 KB', '14 KB'];

        for (let i = 0; i < 8; i++) {
            dummyImages.push({ source: Images.illuHome, labelText: labelText[i], fileSize: fileSize[i] });
        }
        setDummyImgs(dummyImages);
    }, []);

    return (
        <View style={style.favoritecontainer}>
            <View style={style.mainContainer}>
                <View style={style.customcontainerview}>
                    <View style={style.contentContainer}>
                        <Text style={style.textStyle}>Lists</Text>
                        <View style={style.plusIconstyle}>
                            <Icon name="squared-plus" size={35} bold color="#979797" />
                        </View>
                    </View>
                    <ListFlatlist />
                </View>
            </View>
            <View style={style.balanceContainer}>
                <BalanceFileContainer />
                {/* <ThumbnailGridView gridViewData={dummyImgs} /> */}
            </View>
        </View>
    );
};

export default CustomList;
