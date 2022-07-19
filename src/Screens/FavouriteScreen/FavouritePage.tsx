import React, { Component } from 'react';
import { Button, FlatList, Image, Modal, ScrollView, Text, TextInput, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FavouritThumbnailGridView from '../../Components/favourit-thumbnail-grid-view/favourit-thumbnail-grid-view';
import MainContainer from '../../Components/main-container/main-container';
import dbHelper from '../../Database/DBHelper';
import { BaseLocalization } from '../../Localization/BaseLocalization';
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
            this.setState({selectedGroupItem:null,favGroupTitle:''},()=>{ 
                this.getGroups().then(()=>{ this.getFavItems()})
               
            })
           
        });
    };

    renameGroup = (item: FavoriteGroupModel) => {
        let group = {
            name: this.state.group_name,
            id:item.id
        };
        return dbHelper.createFavGroup(group).then(() => {
            this.getGroups();
            this.setState({favGroupTitle:this.state.group_name})
        });;
       
    };

    getFavItems = async () => {
        if (this.state.selectedGroupItem) {
            let items = await dbHelper.getFavItems(this.state.selectedGroupItem);
            // this.setState({ favGroupItem: items });
            this.props.setFavGroupItem(items);
            console.log('items with details=====================', items); // set this item to get data on thumbnail
        }
    };
   
    getModal = () => {
        return (
            <View style={style.centeredView}>
                <Modal animationType="slide" transparent={true} visible={this.state.visible}>
                    <View style={style.modalView}>
                        {this.state.renameFavGroup ?
                        <Text style={style.modalHeader}>Edit: {this.state.renameFavGroup.name} </Text>:
                        <Text style={style.modalHeader}>New Category</Text>}

                        <View style={style.cardStyle}>
                            <TextInput
                                style={style.cardTextInputStyle}
                                 placeholder='Enter'
                                // defaultValue={this.state.renameFavGroup?.name}
                                value={this.state.group_name}
                                onChangeText={(text) => {
                                    this.setState({ group_name: text });
                                }}
                            />
                        </View>

                        <View style={style.modalButtonContainer}>
                            <View style={{ flex: 0.4, paddingRight: 10 }}>
                                <Button onPress={() => this.setState({ visible: false })} title="Cencel" />
                            </View>
                            <View style={{ flex: 0.4 }}>
                                <Button 
                         
                                    onPress={() => {
                                      
                                        if (this.state.group_name !== '') {
                                            if(this.state.renameFavGroup)
                                            {
                                            this.renameGroup(this.state.renameFavGroup).then(() => {
                                                this.setState({ group_name: '', visible: false,renameFavGroup:null });
                                                this.getGroups();
                                            });
                                            }
                                            else{
                                            this.createGroup().then(() => {
                                                this.setState({ group_name: '', visible: false });
                                                this.getGroups();
                                            });
                                        }
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
        console.log('delete item console', item);
        return (
            <View style={style.crossIconstyle}>
                <TouchableOpacity onPress={() => {this.removeGroup(item)}}>
                    <View style={style.deleteGroup}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ visible: true, renameFavGroup: item,group_name:item.name })}>
                <View style={style.editGroup}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit</Text>
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
                                    <Icon
                                        name="plussquare"
                                        size={28}
                                        bold
                                        color="#979797"
                                        onPress={() => this.setState({ visible: true })}
                                    />
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    {this.getModal()}
                                </View>
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
                                        <FavouritThumbnailGridView groupName={this.state.favGroupTitle} groupId={this.state.selectedGroupItem?.id} />
                                    </View>
                                ) : (
                                    <View style={style.imageContainer}>
                                        <Image style={{ height: 200, width: 200 }} source={Images.emptyImg} />
                                        <Text numberOfLines={3} style={style.secondtextStyle}>
                                            {BaseLocalization.noFavTitle}
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
