import React, { PureComponent } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import dbHelper from '../../Database/DBHelper';
import downloadManager from '../../Download/DownloadManager';
import { createGridModelData, getIconByExtension, isStringEmpty } from '../../Helper/Helper';
import BaseLocalization from '../../Localization/BaseLocalization';
import { GridViewModel } from '../../Model/GridViewModel';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import { fetchAllThumbnails } from '../../Redux/app-data/appDataThunk';
import { setFavGroupData, setGridViewData, setShowToolTip } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import CustomToolTip from '../custom-tool-tip/custom-tool-tip';
import GroupItem from '../favourit-thumbnail-grid-view/group-item';
import FullScreenLoader from '../full-screen-loader/full-screen-loader';
import CustomIcon from '../custom-icon/custom-icon';
import { style } from './style';
import permissions from '../../Helper/Permission';

interface ThumbnailGridViewProps {
    gridViewList: GridViewModel[];
    favGroup: any;
    onFavGroupChange?: Function;
    navigation: any;
    toolTipList: Array<any>;
    isLoading: boolean;
    showToolTipData: ComponentData.ShowToolTipData;
    setShowToolTip: (data: ComponentData.ShowToolTipData) => void;
    setIsLoading: (boolean) => void;
    selectedCategoryData: any[];
    setGridViewList: (data: GridViewModel[]) => void;
}
interface ThumbnailGridViewState {
    visible: boolean;
    selectedGroups: Array<string>;
    selectedItem: any;
    toolTipData: any[];
}

class ThumbnailGridView extends PureComponent<ThumbnailGridViewProps, ThumbnailGridViewState> {
    _unsubscribe: any;
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectedGroups: [],
            selectedItem: null,
            toolTipData: [
                { index: 0, title: BaseLocalization.getInstance().getObject().download, isEnable: true },
                { index: 1, title: BaseLocalization.getInstance().getObject().removeLocally, isEnable: true },
                { index: 2, title: BaseLocalization.getInstance().getObject().addRemoveFavorite, isEnable: true },
            ],
        };
    }

    async componentDidMount():  Promise<void> {
       await permissions.checkPermission();
    }

    componentDidUpdate(prevProp): void {
        if (prevProp.gridViewList.length !== this.props.gridViewList.length) {
        }
    }

    getSelectedGroupsFromRealm = async (uniqueId) => {
        let selectedGroups = await dbHelper.getFavItemsByUniqueId(uniqueId);
        // console.log('selectedGroups****************', selectedGroups);
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
    errorData = () => {
        this.props.setIsLoading(false);
        this.props.setShowToolTip({ isVisible: false, currentIndex: -1 });
    };

    getImage = (imageName) => {
        return <Image resizeMode="contain" style={style.iconImageStyle} source={imageName} />;
    };

    getSelectedDataFromToolTip = (tooltip_item: any, item: any) => {
        this.props.setShowToolTip({ isVisible: false, currentIndex: -1 });
        if (tooltip_item.index == 2) {
            this.setState({ visible: true, selectedItem: item }, () => {
            });
        } else if (tooltip_item.index == 0) {
            this.props.setIsLoading(true)
            downloadManager.downloadFile(item, false).then(() => {
                this.refreshList();
            });
        } else if (tooltip_item.index == 1) {
            this.props.setIsLoading(true)
            downloadManager.removeFile(item, false).then(() => {
                this.refreshList();
            });
        }
    };

    refreshList = async () => {
        const selectedCategoryData = this.props.selectedCategoryData;

        const categoryDetailDataItem: any = selectedCategoryData[selectedCategoryData.length - 1];
        const item = categoryDetailDataItem.data;
        const categoryDetailData = await dbHelper.getForSelectedCategory(item);
        // LogManager.info('categoryDetailData=', categoryDetailData);

     
       let  thumbnailList = await fetchAllThumbnails(item.uniqueId);
       
        //   LogManager.info('responses list Item=', thumbnailList);
        const gridData = await createGridModelData(categoryDetailData, thumbnailList);
        // LogManager.info('gridData=', gridData);

        this.props.setGridViewList(gridData);
        this.errorData();
    };

    getToolTipList = (index: number, item: any) => {
        let localToolTip = [...this.state.toolTipData];
        const isEmpaty = isStringEmpty(this.props.gridViewList[index].downloadLocation);
        let downloadEnable;
        if(item.timeDownloaded)
        {
            downloadEnable=  item.timeDownloaded.localeCompare(item.lastModifiedDateTime); 
        }
        console.log("downloadEnable",downloadEnable);
        
        localToolTip.map((ele: any, ind: number) => {
            if (isEmpaty || downloadEnable == -1) {
                if (ind == 0) {
                    ele.isEnable = true;
                } else if (ind == 1) {
                    ele.isEnable = false;
                }
            } else {
                if (ind == 0) {
                    ele.isEnable = false;
                } else if (ind == 1) {
                    ele.isEnable = true;
                }
            }
        });

        this.setState({ toolTipData: localToolTip });
    };

    getToolTip = (index, item) => {
        return (
            <>
                <CustomToolTip
                    isVisible={this.props.showToolTipData.isVisible && this.props.showToolTipData.currentIndex == index}
                    model={this.state.toolTipData}
                    position="right"
                    insideToolTip={this.inside(index, item)}
                    closeToolTip={() => this.props.setShowToolTip({ isVisible: false, currentIndex: -1 })}
                    onPressOfToolTipItem={(_tooltip_item) => this.getSelectedDataFromToolTip(_tooltip_item, item)}
                />
            </>
        );
    };
    inside(index, item) {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.getToolTipList(index,item);
                    this.props.setShowToolTip({ isVisible: true, currentIndex: index });
                    this.setState({ selectedGroups: [] });
                    this.getSelectedGroupsFromRealm(item.uniqueId);
                }}
                hitSlop={{top: 20, bottom: 20, left: 40, right: 40}}
            >
                <View style={style.sepration}>
                     <Image source={Images.dots} /> 
                </View>
            </TouchableOpacity>
        );
    }

    toolTipOptionSeparator = () => {
        return <View style={style.toolTipOptionSeperator}></View>;
    };

    loadDocument = async (item: GridViewModel) => {
        this.props.setIsLoading(true);
        downloadManager
            .displayDocument(item,false)
            .then((res) => {
                this.props.setIsLoading(false);
            })
            .catch(() => {
                this.props.setIsLoading(false);
            });
    };

    renderItem = ({ item, index }: any) => {
        let changeInFile;
        console.log("item.lastModifiedDateTime",item.lastModifiedDateTime,"/n item.timeDownloaded",item.timeDownloaded);
        
        if(item.timeDownloaded && item.lastModifiedDateTime){
            changeInFile =  item.timeDownloaded.localeCompare(item.lastModifiedDateTime);
        }
        let fileName = item.name.split('.');
        console.log("changeInFile",changeInFile);
        
        return (
            <View style={style.backgroundViewStyle}>
                <TouchableOpacity onPress={() => this.loadDocument(item)}>
                    {item.largeUrl ? (
                        <Image style={{...style.imageStyle, resizeMode: item.name.startsWith("iPDF") ? 'contain' : 'cover'}}source={{ uri: item.largeUrl }} />
                    ) : (
                        <Image style={style.imageStyle} source={Images.emptyThumbnail} />
                    )}

                    <View style={style.overlay} />

                    <View style={style.svgIconStyle}>{getIconByExtension(item.name)}</View>
                </TouchableOpacity>

                <View style={style.itemContainer}>
                    {item.downloadLocation ? <View style={[ (changeInFile == -1) ? style.downloadedListStyleForUpdatedFile : style.downloadedListStyle ]}></View> : null}
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
                    downloadLocation: this.state.selectedItem.downloadLocation,
                    timeDownloaded: this.state.selectedItem.timeDownloaded,
                    lastModifiedDateTime: this.state.selectedItem.lastModifiedDateTime
                });
            } else {
                //console.log();
            }
        });
        dbHelper.createFavouriteEntries(favorites, this.state.selectedItem.uniqueId).then(async () => {
            // this.refreshList();
            this.setState({ visible: false });
        });
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

    getModal = () => {
        return (
            <Modal animationType="slide" transparent={true} visible={this.state.visible}>
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <View style={style.modalContainer}>
                            <View
                                style={{
                                    marginHorizontal: 10,
                                }}
                            >
                                <Text style={style.modalTitle}>{BaseLocalization.getInstance().getObject().addToFav}</Text>
                                <Text style={style.modalSubTitle}>{BaseLocalization.getInstance().getObject().checkSubTitle}</Text>
                            </View>
                            <FlatList
                                data={this.props.favGroup}
                                renderItem={({ item }) => this.renderGroupItem(item)}
                            />

                            <View style={style.modalBottomRow}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ visible: false });
                                    }}
                                >
                                    <View style={{ marginRight: 20 }}>
                                        <Text style={style.modalButton}>{BaseLocalization.getInstance().getObject().cancel}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.updateModal()}>
                                    <View>
                                        <Text style={style.modalButton}>{BaseLocalization.getInstance().getObject().submit}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    render() {
        return this.props.isLoading ? (
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
                            // extraData={this.state.update}
                        />
                        {this.getModal()}
                    </View>
                ) : (
                    <View style={style.emptyIconStyle}>
                        <Image style={style.emptyImageStyle} source={Images.emptyImg} />
                        <Text style={style.emptyDataText}>{BaseLocalization.getInstance().getObject().noDataText}</Text>
                    </View>
                )}
            </>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    favGroup: state.categoryReducer.favGroupData,
    toolTipList: state.categoryReducer.toolTipList,
    showToolTipData: state.categoryReducer.showToolTipData,
    isLoading: state.appDataReducer.appDataLoading,
    selectedCategoryData: state.categoryReducer.selectedCategoryData,
});

const mapDispatchToProps = (dispatch: any) => ({
    setFavGroup: (favGroup: any) => {
        dispatch(setFavGroupData(favGroup));
    },

    setShowToolTip: (value: ComponentData.ShowToolTipData) => {
        dispatch(setShowToolTip(value));
    },
    setIsLoading: (value: boolean) => {
        dispatch(setAppDataLoading(value));
    },
    setGridViewList: (gridData: GridViewModel[]) => {
        dispatch(setGridViewData(gridData));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailGridView);
