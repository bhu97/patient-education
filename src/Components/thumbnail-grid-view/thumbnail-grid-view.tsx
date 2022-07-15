import React, { PureComponent, useState } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Linking,
    Modal,
    Text,
    TouchableOpacity,
    View,
    Button,
} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import { API_NAMES } from '../../Constant/Constants';
import apiManager from '../../Helper/ApiManager';
import { getExtension, getIconByExtension } from '../../Helper/Helper';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { GridViewModel } from '../../Model/GridViewModel';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import Images from '../../Theme/Images';
import CustomIcon from '../custom-icon/custom-icon';
import CustomToolTip from '../custom-tool-tip/custom-tool-tip';
import FullScreenLoader from '../full-screen-loader/full-screen-loader';
import CheckBox from '@react-native-community/checkbox';
import { style } from './style';
import dbHelper from '../../Database/DBHelper';
import { FavoriteModel } from '../../Model/FavouriteModel';
import { RootState } from '../../Redux/rootReducer';
import { connect } from 'react-redux';
import { setFavGroupData } from '../../Redux/category/categorySlice';
import downloadManager from '../../Download/DownloadManager';
import NavigationManager from '../../Helper/NavigationManager';

interface ThumbnailGridViewProps {
    gridViewList: GridViewModel[];
    favGroup: any;
    onFavGroupChange?: Function;
    navigation:any;
}
interface ThumbnailGridViewState {
    isVisibleObject: any;
    update: any;
    loader: boolean;
    toolTipList: Array<any>;
    visible: boolean;
    check: boolean;
    groups: Array<any>;
    selectedGroups: Array<string>;
    selectedItem: any;
    close: boolean;
    dummy:any;
    lastRefresh:any
}

 class ThumbnailGridView extends PureComponent<ThumbnailGridViewProps, ThumbnailGridViewState> {
    _unsubscribe: any; 
    constructor(props) {
        super(props);
        this.state = {
            isVisibleObject: {},
            update: false,
            loader: false,
            toolTipList: [
                { index: 0, title: 'Download' },
                { index: 1, title: 'Remove Locally' },
                { index: 2, title: 'Add/Remove Favourite' },
            ],
            visible: false,
            check: false,
            groups: [],
            selectedGroups: [],
            selectedItem: null,
            close: false,
       dummy:{},
       lastRefresh: `${new Date().getTime()}`,
        };
        this.refreshScreen = this.refreshScreen.bind(this)
    }
    refreshScreen=()=> {
        this.setState({ dummy:{}})
        console.log("refresh screen")
    }

    componentDidMount(): void {
        let isVisibleArray = {};
        this.props.gridViewList.map((item: any, index: any) => {
            let setIndex = { index: index, isVisible: false };
            isVisibleArray[index] = setIndex;
        });
        this.setState({ isVisibleObject: isVisibleArray });
      
    }
   


    componentDidUpdate(prevProp): void {
        if (prevProp.gridViewList.length !== this.props.gridViewList.length) {
            let isVisibleArray = {};
            this.props.gridViewList.map((item: any, index: any) => {
                let setIndex = { index: index, isVisible: false };
                isVisibleArray[index] = setIndex;
            });
            this.setState({ isVisibleObject: isVisibleArray });
        }
        // this.getGroups();
    }

    // getGroups = async () => {
    //     let groups = await dbHelper.getFavGroups();
    //     this.setState({ groups });
    // };

    getSelectedGroupsFromRealm = async (uniqueId) => {
        let selectedGroups = await dbHelper.getFavItemsByUniqueId(uniqueId);
        console.log('selectedGroups****************', selectedGroups);
        if (selectedGroups.length > 0) {
            let array;
            array = [];
            selectedGroups.forEach((group) => {
                let group_id = group.id.split('_')[0];
                array.push(group_id);
            });
            console.log('array****************', array);
            this.setState({ selectedGroups: array });
        }
    };

    setVisible = (index: any, indicator: boolean) => {
        let isVisibleCheck = this.state.isVisibleObject[index];
        isVisibleCheck.isVisible = indicator;
        this.setState({ isVisibleObject: { ...this.state.isVisibleObject, isVisibleCheck }, update: {} });
    };

    getVisibility = (index: any) => {
        return this.state.isVisibleObject[index]?.isVisible ? true : false;
    };
    getImage = (imageName) => {
        return <Image resizeMode="contain" style={style.iconImageStyle} source={imageName} />;
    };

    getSelectedDataFromToolTip = (tooltip_item: any, item: any) => {
        console.log('tooltip clicked', tooltip_item, item);
        if (tooltip_item.index == 2) {
            this.setState({
                visible: true,
                selectedItem: item,
                close: true,
            });
        }
    };
    getToolTip = (index, isVisibleIndicator, item) => {
        return (
            <>
                <CustomToolTip
                    isVisible={isVisibleIndicator}
                    model={this.state.toolTipList}
                    insideToolTip={this.inside(index, item)}
                    closeToolTip={() => this.setVisible(index, false)}
                    onPressOfToolTipItem={(_tooltip_item) => this.getSelectedDataFromToolTip(_tooltip_item, item)}
                />
                {this.state.close ? this.closeToolTip(index) : null}
            </>
        );
    };
    inside(index, item) {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.setVisible(index, true);
                    this.setState({ selectedGroups: [] });
                    this.getSelectedGroupsFromRealm(item.uniqueId);
                }}
            >
                <CustomIcon name={'more-horizontal'} />
            </TouchableOpacity>
        );
    }

    closeToolTip = (index) => {
        this.setVisible(index, false);
        this.setState({ close: false });
    };
    toolTipOptionSeparator = () => {
        return <View style={style.toolTipOptionSeperator}></View>;
    };

    
    loadDocument = async (item: GridViewModel) => {
        this.setState({ loader: true });
        const fileExt = getExtension(item.webUrl);
        if (fileExt.toLowerCase() === 'pdf') {
            downloadManager.downloadFileAndShow(item).then(() => {
                this.setState({ loader: false });
            }).catch(() => {
                this.setState({ loader: false });
            })
        } else {
            Linking.canOpenURL(item.webUrl).then((supported) => {
                if (supported) {
                    NavigationManager.navigate('CustomWebView',{url:item.webUrl})
                    this.setState({ loader: false });
                } else {
                    console.log(item.webUrl);
                    this.setState({ loader: false });
                    console.log('error opening url');
                }
            });
        }
    };

    renderItem = ({ item, index }: any) => {
        // console.log('item in grid view', item);
        const isVisibleIndicator = this.getVisibility(index);
        let fileName = item.name.split('.');
        console.log('item',item);
        return (
            <View style={style.backgroundViewStyle}>
                <TouchableOpacity onPress={() => this.loadDocument(item)}>
                    {item.largeUrl ? (
                        <Image style={style.imageStyle} source={{ uri: item.largeUrl }} />
                    ) : (
                        <Image style={style.imageStyle} source={Images.emptyThumbnail} />
                    )}

                    <View style={style.overlay} />

                    <View style={style.svgIconStyle}>{getIconByExtension(item.name)}</View>
                </TouchableOpacity>

                <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={style.textStyle}>
                            {fileName[0]}
                        </Text>
                    </View>
                    <View style={style.iconContainer}>
                        {this.getToolTip(index, isVisibleIndicator, item)}
                        <Text style={style.sizeStyle}>{item.fileSize}</Text>
                    </View>
                </View>
            </View>
        );
    };

    getModal = () => {
        console.log('selectec_groups', this.state.selectedGroups);
        return (
            <Modal animationType="slide" transparent={true} visible={this.state.visible}>
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <View style={style.modalContainer}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        paddingRight: 0,
                                        fontSize: 25,
                                        paddingLeft: 20,
                                        color: BaseThemeStyle.colors.black,
                                        marginBottom: 10,
                                    }}
                                >
                                    Add to Favourites
                                </Text>
                            </View>
                            <FlatList
                                data={this.props.favGroup}
                                extraData={this.state}
                                renderItem={({ item }) => {
                                    let isSelected = this.state.selectedGroups.findIndex(
                                        (group_id) => group_id === item.id,
                                    );
                                    return (
                                        <GroupItem
                                            name={item.name}
                                            id={item.id}
                                            isCheck={isSelected >= 0}
                                            onSelect={(id, isCheck) => {
                                                let array = this.state.selectedGroups;
                                                if (isCheck) {
                                                    let _index = array.findIndex((_) => _ === id);
                                                    if (_index == -1) {
                                                        array.push(id);
                                                    }
                                                } else {
                                                    let _index = array.findIndex((_) => _ === id);
                                                    if (_index >= 0) {
                                                        array.splice(_index, 1);
                                                    }
                                                }
                                                console.log(isCheck, array);
                                                this.setState({ selectedGroups: array });
                                            }}
                                        />
                                    );
                                }}
                            />
                            <View
                                style={{
                                    marginTop: 20,
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-evenly',
                                }}
                            >
                                <Button
                                    onPress={() => {
                                        this.setState({ visible: false });
                                    }}
                                    title="Cancel"
                                />
                                <Button
                                    onPress={async () => {
                                        let favorites;
                                        favorites = [];
                                        this.state.selectedGroups.map((item) => {
                                            let _group = this.props.favGroup.find((group) => group.id == item);
                                            if (_group) {
                                                favorites.push({
                                                    uniqueId: this.state.selectedItem.uniqueId,
                                                    id: `${_group.id}_${new Date().getTime()}`,
                                                    favoriteGroupName: _group.name,
                                                    fileExtension: this.state.selectedItem.fileExtension,
                                                    fileSize: this.state.selectedItem.fileSize,
                                                    largeUrl: this.state.selectedItem.largeUrl,
                                                    listItemId: this.state.selectedItem.listItemId,
                                                    mediumUrl: this.state.selectedItem.mediumUrl,
                                                    name: this.state.selectedItem.name,
                                                    parentReferenceId: this.state.selectedItem.parentReferenceId,
                                                    smallUrl: this.state.selectedItem.smallUrl,
                                                    title: this.state.selectedItem.title,
                                                    webUrl: this.state.selectedItem.webUrl,
                                                });
                                            }
                                       
                                        });
                                    
                                        dbHelper
                                            .createFavouriteEntries(favorites, this.state.selectedItem.uniqueId)
                                            .then(() => {
                                                this.setState({ visible: false });
                                               this.props?.onFavGroupChange()
                                            });
                                           
                                    }}
                                    title="Okay"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    render() {
        console.log('isVisibleObject^^^^^^^^^^^^^^^^^^^',this.state.isVisibleObject);
        return this.state.loader ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <>
                {this.props.gridViewList.length > 0 ? (
                    <View style={style.mainViewStyle}>
                        <FlatList
                            data={this.props.gridViewList}
                            renderItem={this.renderItem}
                            numColumns={2}
                            columnWrapperStyle={{}}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state.update}
                        />
                        {this.getModal()}
                    </View>
                ) : (
                    
                    <View style={style.emptyIconStyle}>
                        <Image style={style.emptyImageStyle} source={Images.emptyImg} />
                        <Text style={style.emptyDataText}>{BaseLocalization.noDataText}</Text>
                    </View>
                  
                )}
            </>
        );
    }
}

const GroupItem = (props) => {
    const [isCheck, setCheck] = useState(props.isCheck);
    return (
        <View style={{ flexDirection: 'row' }}>
            <View>
                <CheckBox
                    disabled={false}
                    value={isCheck}
                    onValueChange={() => {
                        setCheck(!isCheck);
                        props?.onSelect(props.id, !isCheck);
                    }}
                />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black' }}>{props.name}</Text>
            </View>
        </View>
    );
};

const mapStateToProps = (state: RootState) => ({
    favGroup: state.categoryReducer.favGroupData 
});

const mapDispatchToProps = (dispatch: any) => ({
    //
  
    setFavGroup: (favGroup: any) => {
        dispatch(setFavGroupData(favGroup))
    }
 
});
export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailGridView);