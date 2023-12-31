import React, { Component } from 'react';
import { FlatList, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomIcon from '../../Components/custom-icon/custom-icon';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FavouritThumbnailGridView from '../../Components/favourit-thumbnail-grid-view/favourit-thumbnail-grid-view';
import MainContainer from '../../Components/main-container/main-container';
import dbHelper from '../../Database/DBHelper';
import BaseLocalization from '../../Localization/BaseLocalization';
import { FavoriteGroupModel } from '../../Model/FavouriteGroupModel';
import { setFavGroupData, setFavGroupItemData } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import Images from '../../Theme/Images';
import { style } from './style';

interface FavouritePageProps {
    navigation: any;
    favGroupItem: any;
    setFavGroupItem: (any) => void;
    favGroup: any;
    setFavGroup: (any) => void;
}
interface FavouritePageState {
    visible: boolean;
    groups: Array<FavoriteGroupModel>;
    group_name: string;
    check: boolean;
    favGroupItem: Array<any>;
    favGroupTitle: string;
    selectedGroupItem: FavoriteGroupModel | null;
    renameFavGroup: any;
}

class FavouritePage extends Component<FavouritePageProps, FavouritePageState> {
    _unsubscribe: any;

    constructor(props: FavouritePageProps) {
        super(props);
        this.state = {
            visible: false,
            groups: [],
            group_name: '',
            check: false,
            favGroupItem: [],
            favGroupTitle: '',
            selectedGroupItem: null,
            renameFavGroup: null,
        };
    }

    componentDidMount() {
        this.getGroups();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getFavItems();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    getGroups = async () => {
        let groups = await dbHelper.getFavGroups();

        if (this.state.selectedGroupItem == null && groups.length > 0) {
            this.props.setFavGroup(groups);
            this.setState({ selectedGroupItem: groups[0], favGroupTitle: groups[0].name });
        } else {
            // this.setState({ groups });
            this.props.setFavGroup(groups);
        }
    };

    createGroup = () => {
        let group = {
            name: this.state.group_name,
        };
        return dbHelper.createFavGroup(FavoriteGroupModel.generate(group));
    };

    removeGroup = (item: FavoriteGroupModel) => {
        dbHelper.removeFavGroup(item).then(() => {
            this.setState({ selectedGroupItem: null, favGroupTitle: '' }, () => {
                this.getGroups().then(() => {
                    this.getFavItems();
                });
            });
        });
    };

    renameGroup = (item: FavoriteGroupModel) => {
        let group = {
            name: this.state.group_name,
            id: item.id,
        };
        return dbHelper.createFavGroup(group).then(() => {
            this.getGroups();
            this.setState({ favGroupTitle: this.state.group_name });
        });
    };

    getFavItems = async () => {
        if (this.state.selectedGroupItem) {
            let items = await dbHelper.getFavItems(this.state.selectedGroupItem);
            // this.setState({ favGroupItem: items });
            this.props.setFavGroupItem(items);
        }
    };
    getModal = () => {
        return (
            <Modal animationType="slide" transparent={true} visible={this.state.visible}>
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <View style={{}}>
                            {this.state.renameFavGroup ? (
                                <>
                                    <Text style={style.modalTitle}>{BaseLocalization.getInstance().getObject().editTitle}</Text>
                                    <Text style={style.modalSubTitle}>{BaseLocalization.getInstance().getObject().editSubTitle}</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={style.modalTitle}>{BaseLocalization.getInstance().getObject().newListTitle}</Text>
                                    <Text style={style.modalSubTitle}>{BaseLocalization.getInstance().getObject().newListSubTitle}</Text>
                                </>
                            )}
                        </View>
                        <View style={style.cardStyle}>
                            <TextInput
                                style={style.cardTextInputStyle}
                                placeholder={BaseLocalization.getInstance().getObject().placeholder}
                                placeholderTextColor={BaseThemeStyle.colors.placeholder}
                                value={this.state.group_name}
                                onChangeText={(text) => {
                                    this.setState({ group_name: text });
                                }}
                            />
                        </View>

                        <View style={style.modalBottomRow}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ visible: false, renameFavGroup: null, group_name: '' });
                                }}
                            >
                                <View style={style.cancelButton}>
                                    <Text style={style.modalButton}>{BaseLocalization.getInstance().getObject().cancel}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.state.group_name !== '') {
                                        if (this.state.renameFavGroup) {
                                            this.renameGroup(this.state.renameFavGroup).then(() => {
                                                this.setState({
                                                    group_name: '',
                                                    visible: false,
                                                    renameFavGroup: null,
                                                });
                                                this.getGroups();
                                            });
                                        } else {
                                            this.createGroup().then(() => {
                                                this.setState({ group_name: '', visible: false });
                                                this.getGroups();
                                            });
                                        }
                                    }
                                }}
                            >
                                <View>
                                    <Text style={style.modalButton}>{BaseLocalization.getInstance().getObject().save}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };
    rightSwipeActions = (item) => {
        return (
            <View style={style.crossIconstyle}>
                 <View style={style.listSaprator}></View>
                <TouchableOpacity
                    onPress={() => {
                        this.removeGroup(item);
                    }}
                >
                    <View style={style.deleteGroup}>
                  
                        <Image style={{ height: 50, width: 50 }} source={Images.deleteList} />
                      
                    </View>
                </TouchableOpacity>
                <View style={style.listSaprator}></View>
                <TouchableOpacity
                    onPress={() =>
                        this.setState(
                            {
                                visible: true,
                                renameFavGroup: item,
                                group_name: item.name,
                                favGroupTitle: item.name,
                                selectedGroupItem: item,
                            },
                            () => {
                                this.getFavItems();
                            },
                        )
                    }
                >
                    <View style={style.editGroup}>
                     
                        <Image style={{ height: 50, width: 50 }} source={Images.editList} />  
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    Lists = ({ item }) => (
        <View style={style.listStyle}>
            <Swipeable renderRightActions={item.name == 'Default' ? null : this.rightSwipeActions.bind(this, item)}>
                <View style={style.listviewstyle}>
                    <View style={style.mainIconstyle}>
                        <Image source={Images.favouritesListImage} />
                    </View>
                    <Text
                        style={style.textStyleNew}
                        onPress={async () => {
                            this.setState({ favGroupTitle: item.name, selectedGroupItem: item }, () => {
                                this.getFavItems();
                            });
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
                        title={BaseLocalization.getInstance().getObject().favTitleText}
                        subTitle={BaseLocalization.getInstance().getObject().favSubTitleText}
                    />
                </View>
                <CustomBody>
                    <View style={style.favoritecontainer}>
                        <View style={style.mainContainer}>
                            <View style={style.customcontainerview}>
                                <View style={style.contentContainer}>
                                    <Text style={style.textStyle}>{BaseLocalization.getInstance().getObject().lists}</Text>
                                    <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                                        <Image style={{ height: 30, width: 30 }} source={Images.squarePlus} />
                                    </TouchableOpacity>
                                </View>

                                <View style={style.modalContainer}>{this.getModal()}</View>
                                <ScrollView>
                                    <View style={style.containerView}>
                                        <FlatList
                                            data={this.props.favGroup}
                                            keyExtractor={(item) => item.id}
                                            renderItem={this.Lists}
                                        />
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                        <View style={style.balanceContainer}>
                            <View style={style.favGridContainer}>
                                {this.props.favGroupItem ? (
                                    <View style={style.fileContainer}>
                                        <Text style={style.textStyle}>{this.state.favGroupTitle}</Text>
                                        <FavouritThumbnailGridView
                                            groupName={this.state.favGroupTitle}
                                            groupId={this.state.selectedGroupItem?.id}
                                        />
                                    </View>
                                ) : (
                                    <View style={style.imageContainer}>
                                        <Image style={{ height: 200, width: 200 }} source={Images.emptyImg} />
                                        <Text numberOfLines={3} style={style.secondtextStyle}>
                                            {BaseLocalization.getInstance().getObject().noFavTitle}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </CustomBody>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    favGroupItem: state.categoryReducer.favGroupItemData,
    favGroup: state.categoryReducer.favGroupData,
});

const mapDispatchToProps = (dispatch: any) => ({
    //
    setFavGroupItem: (favGroupItem: any) => {
        dispatch(setFavGroupItemData(favGroupItem));
    },
    setFavGroup: (favGroup: any) => {
        dispatch(setFavGroupData(favGroup));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(FavouritePage);

// export default FavouritePage;
