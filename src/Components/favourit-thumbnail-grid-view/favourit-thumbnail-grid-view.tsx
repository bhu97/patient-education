import React, { PureComponent } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import dbHelper from '../../Database/DBHelper';
import downloadManager from '../../Download/DownloadManager';
import { getIconByExtension } from '../../Helper/Helper';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { GridViewModel } from '../../Model/GridViewModel';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import { download } from '../../Redux/app-data/appDataThunk';
import { setFavGroupData, setFavGroupItemData, setShowToolTip } from '../../Redux/category/categorySlice';
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
    toolTipList: Array<any>;
    setDownloadItem: (any) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    showToolTipData: ComponentData.ShowToolTipData;
    setShowToolTip: (data: ComponentData.ShowToolTipData) => void;

}
interface FavouritThumbnailGridViewState {
    visible: boolean;
    groups: Array<any>;
    selectedGroups: Array<string>;
    selectedItem: any;
}

class FavouritThumbnailGridView extends PureComponent<FavouritThumbnailGridViewProps, FavouritThumbnailGridViewState> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            groups: [],
            selectedGroups: [],
            selectedItem: null,
        };
    }

    componentDidMount(): void {
    }

    componentDidUpdate(prevProp): void {
        if (prevProp.gridViewList.length !== this.props.gridViewList.length && this.props.gridViewList.length > 0) {

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


    getImage = (imageName) => {
        return <Image resizeMode="contain" style={style.iconImageStyle} source={imageName} />;
    };

    getSelectedDataFromToolTip = async (tooltip_item: any, item: any, parentIndex: number) => {
        if (tooltip_item.index == 2) {
            this.setState({ visible: true, selectedItem: item }, () => {
                this.props.setShowToolTip({ isVisible: false, currentIndex: -1 })
            },
            );
        } else if (tooltip_item.index == 0) {
            this.props.setIsLoading(true)
            downloadManager
                .downloadFile(item, true)
                .then((res) => {
                   // console.log("return path", res);
                    this.refreshList(parentIndex);
                })
                .catch((err) => { this.errorData() });
        } else if (tooltip_item.index == 1) {
            this.props.setIsLoading(true)
            downloadManager
                .removeFile(item, true)
                .then((res) => {
                    this.refreshList(parentIndex);
                })
                .catch((err) => { this.errorData() });
        }
    };
    errorData = () => {
        this.props.setIsLoading(false);
        this.props.setShowToolTip({ isVisible: false, currentIndex: -1 })
    }
    refreshList = async (parentIndex?: number) => {
        if (parentIndex) {
            this.props.setShowToolTip({ isVisible: false, currentIndex: -1 })
        }
        let items = await dbHelper.getFavItems({
            name: this.props.groupName,
            id: this.props.groupId,
        });        
        this.props.setFavGroupItem(items);
        this.props.setIsLoading(false)
    };
    getToolTip = (index, item) => {      
        return (
            <>
                <CustomToolTip
                    isVisible={this.props.showToolTipData.isVisible && this.props.showToolTipData.currentIndex == index}
                    model={this.props.toolTipList}
                    insideToolTip={this.inside(index, item)}
                    closeToolTip={() => this.props.setShowToolTip({ isVisible: false, currentIndex: -1 })}
                    position={(index + 1) % 2 == 0 ? 'left' : 'right'}
                    onPressOfToolTipItem={(_tooltip_item) =>
                        this.getSelectedDataFromToolTip(_tooltip_item, item, index)
                    }
                />
            </>
        );
    };
    inside(index, item) {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.getSelectedGroupsFromRealm(item.uniqueId);
                    this.props.setShowToolTip({ isVisible: true, currentIndex: index })
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
        this.props.setIsLoading(true)
        downloadManager
            .displayDocument(item)
            .then((res) => {
                this.props.setIsLoading(false)
            })
            .catch(() => {
                this.props.setIsLoading(false)
            });
    };

    renderItem = ({ item, index }: any) => {

        let fileName = item.name.split('.');
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
                    {item.downloadLocation ? <View style={style.downloadedListStyle}></View> : null}
                    <View style={style.textContainer}>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={style.textStyle}>
                            {fileName[0]}
                        </Text>
                    </View>
                    <View style={style.iconContainer}>
                        {this.getToolTip(index, item)}
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

        this.setState({ selectedGroups: array });
    };

    renderGroupItem = (item: any) => {
        let isSelected = this.state.selectedGroups.findIndex((group_id) => group_id === item.id);
        return (
            <GroupItem
                name={item.name}
                id={item.id}
                isCheck={isSelected >= 0}
                onSelect={(id, isCheck) => this.onSlectedCheckbox(id, isCheck)}
            />
        );
    };

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
                    downloadLocation: this.state.selectedItem.downloadLocation
                });
            } else {
                console.log();
            }
        });
        dbHelper.createFavouriteEntries(favorites, this.state.selectedItem.uniqueId).then(async () => {
            this.refreshList();
            this.setState({ visible: false });
        });
    };
    getModal = () => {
        return (
            <CustomModal isVisible={this.state.visible} onPressClose={() => this.setState({ visible: false })}>
                <View style={style.modalView}>
                    <View style={{}}>
                        <Text style={style.modalTitle}>{BaseLocalization.addToFav}</Text>
                        <Text style={style.modalSubTitle}>{BaseLocalization.checkSubTitle}</Text>
                    </View>
                    <FlatList data={this.props.favGroup} renderItem={({ item }) => this.renderGroupItem(item)} />

                    <View style={style.modalBottomRow}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ visible: false });
                            }}
                        >
                            <View style={{ marginRight: 20 }}>
                                <Text style={style.modalButton}>{BaseLocalization.cancel}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.updateModal()}>
                            <View>
                                <Text style={style.modalButton}>{BaseLocalization.submit}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </CustomModal>
        );
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading={this.props.isLoading} showSpinner />
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
    toolTipList: state.categoryReducer.toolTipList,
    isLoading: state.appDataReducer.appDataLoading,
    showToolTipData: state.categoryReducer.showToolTipData
});

const mapDispatchToProps = (dispatch: any) => ({
    setFavGroup: (favGroup: any) => {
        dispatch(setFavGroupData(favGroup));
    },
    setFavGroupItem: (favGroupItem: any) => {
        dispatch(setFavGroupItemData(favGroupItem));
    },
    setDownloadItem: (item: any) => {
        dispatch(download(item));
    },
    setIsLoading: (value: boolean) => {
        dispatch(setAppDataLoading(value));
    },
    setShowToolTip: (value: ComponentData.ShowToolTipData) => {
        dispatch(setShowToolTip(value));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(FavouritThumbnailGridView);
