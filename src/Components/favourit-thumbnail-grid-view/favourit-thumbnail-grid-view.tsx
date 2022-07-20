import React,{ PureComponent } from 'react';
import {
    Button, FlatList,
    Image, Linking, Text,
    TouchableOpacity,
    View
} from 'react-native';
import { connect } from 'react-redux';
import dbHelper from '../../Database/DBHelper';
import downloadManager from '../../Download/DownloadManager';
import { getExtension, getIconByExtension } from '../../Helper/Helper';
import NavigationManager from '../../Helper/NavigationManager';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { GridViewModel } from '../../Model/GridViewModel';
import { setFavGroupData, setFavGroupItemData } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import CustomIcon from '../custom-icon/custom-icon';
import CustomModal from '../custom-modal/custom-modal';
import CustomToolTip from '../custom-tool-tip/custom-tool-tip';
import FullScreenLoader from '../full-screen-loader/full-screen-loader';
import GroupItem from './group-item';
import { style } from './style';

interface FavouritThumbnailGridViewProps {
    gridViewList: GridViewModel[];
    favGroup: any;
    setFavGroupItem: (itemArray: any[]) => void;
    groupName: string;
    groupId: string;
}
interface FavouritThumbnailGridViewState {
    isVisibleObject: any;
    loader: boolean;
    toolTipList: Array<any>;
    visible: boolean;
    groups: Array<any>;
    selectedGroups: Array<string>;
    selectedItem: any;
    webviewUrl: string;
}

class FavouritThumbnailGridView extends PureComponent<FavouritThumbnailGridViewProps, FavouritThumbnailGridViewState> {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleObject: {},
            loader: false,
            toolTipList: [
                { index: 0, title: 'Download' },
                { index: 1, title: 'Remove Locally' },
                { index: 2, title: 'Add/Remove Favourite' },
            ],
            visible: false,
            groups: [],
            selectedGroups: [],
            selectedItem: null,
            webviewUrl: ''


        };
    }

    componentDidMount(): void {
        let isVisibleArray = {};
        this.props.gridViewList && this.props.gridViewList.map((item: any, index: any) => {
            let setIndex = { index: index, isVisible: false };
            isVisibleArray[index] = setIndex;
        });
        this.setState({ isVisibleObject: isVisibleArray });

    }


    componentDidUpdate(prevProp): void {
        if (prevProp.gridViewList.length !== this.props.gridViewList.length && this.props.gridViewList.length > 0) {
            let isVisibleArray = {};
            this.props.gridViewList.map((item: any, index: any) => {
                let setIndex = { index: index, isVisible: false };
                isVisibleArray[index] = setIndex;
            });
            this.setState({ isVisibleObject: isVisibleArray });
        }
    }

    getSelectedGroupsFromRealm = async (uniqueId) => {
        let selectedGroups = await dbHelper.getFavItemsByUniqueId(uniqueId);
        if (selectedGroups.length > 0) {
            let array;
            array = [];
            selectedGroups.forEach((group) => {
                let group_id = group.id.split('_')[0];
                array.push(group_id);
            });
            this.setState({ selectedGroups: array });
        }
    };

    setVisible = (index: any, indicator: boolean = false) => {
        let isVisibleCheck = this.state.isVisibleObject[index];
        isVisibleCheck.isVisible = indicator;
        this.setState({ isVisibleObject: { ...this.state.isVisibleObject, isVisibleCheck } });
    };

    getVisibility = (index: any) => {
        return this.state.isVisibleObject[index]?.isVisible ? true : false;
    };
    getImage = (imageName) => {
        return <Image resizeMode="contain" style={style.iconImageStyle} source={imageName} />;
    };

    getSelectedDataFromToolTip = (tooltip_item: any, item: any, parentIndex: number) => {
        if (tooltip_item.index == 2) {
            this.setState({
                visible: true,
                selectedItem: item,
            }, () => {
                this.setVisible(parentIndex, false)
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
                    position={(index + 1) % 2 == 0 ? 'left' : 'right'}
                    onPressOfToolTipItem={(_tooltip_item) => this.getSelectedDataFromToolTip(_tooltip_item, item, index)}
                />
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


    toolTipOptionSeparator = () => {
        return <View style={style.toolTipOptionSeperator}></View>;
    };


    loadDocument = async (item: GridViewModel) => {
        this.setState({ loader: true });
        const fileExt = getExtension(item.webUrl);
        if (fileExt.toLowerCase() === 'url') {
            downloadManager.getUrl(item).then((res) => {             
                 NavigationManager.navigate('CustomWebView',{url:res,fileName:'URL',isPdf:false})
                this.setState({ loader: false });
            }).catch(() => {
                this.setState({ loader: false });
            })
        }
        else if (fileExt.toLowerCase() === 'pdf') {
            downloadManager.downloadFileAndShow(item).then((res) => {
               NavigationManager.navigate('CustomWebView',{url:res,fileName:downloadManager.getFileName(res),isPdf:true})
                this.setState({ loader: false });
            }).catch(() => {
                this.setState({ loader: false });
            })
        } else {
            Linking.canOpenURL(item.webUrl).then((supported) => {
                if (supported) {
                    let fileName = item.name.split('.');
                    NavigationManager.navigate('CustomWebView',{url:item.webUrl,fileName:downloadManager.getFileName(item.webUrl),isPdf:false})
                   //Linking.openURL(item.webUrl)
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
        const isVisibleIndicator = this.getVisibility(index);
        let fileName = item.name.split('.');
        console.log('item', item);
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

    onSlectedCheckbox = (id, isCheck) => {
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
        console.log(isCheck, array.length);
        this.setState({ selectedGroups: array });
    }

    renderGroupItem = (item: any) => {
        let isSelected = this.state.selectedGroups.findIndex(
            (group_id) => group_id === item.id,
        );
        return (
            <GroupItem
                name={item.name}
                id={item.id}
                isCheck={isSelected >= 0}
                onSelect={(id, isCheck) => this.onSlectedCheckbox(id, isCheck)}
            />
        );
    }

    updateModal = async () => {
        let favorites;
        favorites = [];
        this.state.selectedGroups.map((item) => {
            let _group = this.props.favGroup.find((group) => group.id == item);
            if (_group) {
                favorites.push({
                    uniqueId: this.state.selectedItem.uniqueId,
                    id: `${_group.id}_${new Date().getTime()}`,
                    favoriteGroupName: _group.id,
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
            } else {
                console.log();

            }
        });
        dbHelper
            .createFavouriteEntries(favorites, this.state.selectedItem.uniqueId)
            .then(async () => {
                let items = await dbHelper.getFavItems({
                    name: this.props.groupName,
                    id: this.props.groupId
                })
                this.props.setFavGroupItem(items);
                this.setState({ visible: false });
            });
    }
    getModal = () => {
        return (
            <CustomModal isVisible={this.state.visible} onPressClose={() => this.setState({ visible: false })}>
                <View style={style.modalView}>
                    <View style={{}}>
                    <Text style={style.modalTitle}>
                        {BaseLocalization.addToFav}
                    </Text>
                    <Text style={style.modalSubTitle}>
                       Please select a list.
                    </Text>
                    </View>
                    <FlatList
                        data={this.props.favGroup}
                        renderItem={({ item }) => this.renderGroupItem(item)}
                    />
                   
                    <View style={style.modalBottomRow}> 
                        <TouchableOpacity onPress={() => {
                                this.setState({ visible: false });
                            }}>
                        <View style={{marginRight:20}}><Text style={{color:'#4389BC',fontSize:18,fontWeight:'bold'}}>CANCEL</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => this.updateModal()}>
                        <View><Text style={{color:'#4389BC',fontSize:18,fontWeight:'bold'}}>SUBMIT</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </CustomModal>
        );
    };

    render() {
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

const mapStateToProps = (state: RootState) => ({
    favGroup: state.categoryReducer.favGroupData,
    gridViewList: state.categoryReducer.favGroupItemData,
});

const mapDispatchToProps = (dispatch: any) => ({

    setFavGroup: (favGroup: any) => {
        dispatch(setFavGroupData(favGroup))
    },
    setFavGroupItem: (favGroupItem: any) => {
        dispatch(setFavGroupItemData(favGroupItem));
    },

});
export default connect(mapStateToProps, mapDispatchToProps)(FavouritThumbnailGridView);