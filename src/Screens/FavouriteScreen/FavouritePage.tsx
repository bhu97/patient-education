import React, { Component } from 'react';
import {
    FlatList,
    Text,
    View,
    Image,
    Modal,
    Alert,
    TouchableOpacity,
    Button,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';
import BalanceFileContainer from '../../Components/balance-file-container/BalanceFileContainer';
import CustomBody from '../../Components/custom-body/custom-body';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import MainContainer from '../../Components/main-container/main-container';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import Images from '../../Theme/Images';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { listitem } from '../../Model/list-data-model';
import { style } from './style';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import dbHelper from '../../Database/DBHelper';
import { FavoriteGroupModel } from '../../Model/FavouriteGroupModel';
import CheckBox from '@react-native-community/checkbox';

interface FavouritePageProps {}
interface FavouritePageState {
    visible: boolean;
    groups: Array<FavoriteGroupModel>;
    group_name: string;
    check: boolean;
}

class FavouritePage extends Component<FavouritePageProps, FavouritePageState> {
    constructor(props: FavouritePageProps) {
        super(props);
        this.state = {
            visible: false,
            groups: [],
            group_name: '',
            check: false,
        };
    }

    componentDidMount() {
        this.getGroups();
    }

    getGroups = async () => {
        let groups = await dbHelper.getFavGroups();
        this.setState({ groups });
    };

    createGroup = () => {
        let group = {
            name: this.state.group_name,
        };
        return dbHelper.createFavGroup(FavoriteGroupModel.generate(group));
    };

    removeGroup = (item: FavoriteGroupModel) => {
        dbHelper.removeFavGroup(item).then(() => {
            this.getGroups();
        });
    };

    getModal = () => {
        return (
            <View style={style.centeredView}>
                <Modal animationType="slide" transparent={true} visible={this.state.visible}>
                    <View style={style.modalView}>
                        <Text
                            style={{
                                paddingRight: 0,
                                fontSize: 25,
                                paddingLeft: 10,
                                color: BaseThemeStyle.colors.black,
                            }}
                        >
                            New Category
                        </Text>

                        <View style={style.cardStyle}>
                            <TextInput
                                style={style.cardTextInputStyle}
                                placeholder="ENTER"
                                value={this.state.group_name}
                                onChangeText={(text) => {
                                    this.setState({ group_name: text });
                                }}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                padding: 10,
                                paddingTop: 10,
                                alignItems: 'flex-end',
                            }}
                        >
                            <View style={{ flex: 0.4, paddingRight: 10 }}>
                                <Button onPress={() => this.setState({ visible: false })} title="Cencel" />
                            </View>
                            <View style={{ flex: 0.4 }}>
                                <Button
                                    onPress={() => {
                                        if (this.state.group_name !== '') {
                                            this.createGroup().then(() => {
                                                this.setState({ group_name: '', visible: false });
                                                this.getGroups();
                                            });
                                        }
                                    }}
                                    title="save"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };
    rightSwipeActions = (item) => {
        return (
            <View style={style.crossIconstyle}>
                <Icon
                    style={style.crossIconcolor}
                    name="closecircle"
                    size={40}
                    bold
                    onPress={() => {
                        this.removeGroup(item);
                    }}
                />
            </View>
        );
    };

    Lists = ({ item }) => (
        <View style={style.listStyle}>
            <Swipeable renderRightActions={this.rightSwipeActions.bind(this, item)}>
                <View style={style.listviewstyle}>
                    <View style={style.mainIconstyle}>
                        <Image source={Images.favouritesListImage} />
                    </View>
                    <Text
                        style={style.textStyleNew}
                        onPress={() => {
                            dbHelper.getFavItems(item);
                        }}
                    >
                        {item.name}
                    </Text>
                    <View style={style.rightIconstyle}>
                        <Image source={Images.favouritesListNavImage} />
                    </View>
                </View>
            </Swipeable>
        </View>
    );
    render() {
        return (
            <MainContainer>
                <View style={style.navContainer}>
                    <CustomTopNav
                        imageName={Images.favoritesHeaderImg}
                        isShowCard
                        title={BaseLocalization.favTitleText}
                        subTitle={BaseLocalization.favSubTitleText}
                    />
                </View>
                <CustomBody>
                    <View style={style.favoritecontainer}>
                        <View style={style.mainContainer}>
                            <View style={style.customcontainerview}>
                                <View style={style.contentContainer}>
                                    <Text style={style.textStyle}>Lists</Text>

                                    <View style={style.plusIconstyle}>
                                        <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                                            <Icon name="plussquare" size={35} bold color="#979797" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        {this.getModal()}
                                    </View>
                                </View>
                                <View style={style.containerView}>
                                    <FlatList
                                        data={this.state.groups}
                                        keyExtractor={(item) => item.id}
                                        renderItem={this.Lists}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={style.balanceContainer}>
                            <BalanceFileContainer />
                        </View>
                    </View>
                </CustomBody>
            </MainContainer>
        );
    }
}

export default FavouritePage;
