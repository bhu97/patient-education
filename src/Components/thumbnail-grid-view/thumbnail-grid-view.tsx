import CheckBox from '@react-native-community/checkbox';
import React, { PureComponent, useState } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import dbHelper from '../../Database/DBHelper';
import downloadManager from '../../Download/DownloadManager';
import { getIconByExtension } from '../../Helper/Helper';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { GridViewModel } from '../../Model/GridViewModel';
import { setFavGroupData } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import CustomIcon from '../custom-icon/custom-icon';
import CustomToolTip from '../custom-tool-tip/custom-tool-tip';
import FullScreenLoader from '../full-screen-loader/full-screen-loader';
import { style } from './style';

interface ThumbnailGridViewProps {
    gridViewList: GridViewModel[];
    favGroup: any;
    onFavGroupChange?: Function;
    navigation: any;
    toolTipList: Array<any>;
}
interface ThumbnailGridViewState {
    isVisibleObject: any;
    update: any;
    loader: boolean;
    visible: boolean;
    check: boolean;
    groups: Array<any>;
    selectedGroups: Array<string>;
    selectedItem: any;
    close: boolean;
}

class ThumbnailGridView extends PureComponent<ThumbnailGridViewProps, ThumbnailGridViewState> {
    _unsubscribe: any;
    constructor(props) {
        super(props);
        this.state = {
            isVisibleObject: {},
            update: false,
            loader: false,      
            visible: false,
            check: false,
            groups: [],
            selectedGroups: [],
            selectedItem: null,
            close: false,
        };
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
    }

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
        }else if (tooltip_item.index == 0) {
            downloadManager
                .downloadFile(item)
                .then((res) => {
                  
                })
                .catch((err) => {});
        } else if (tooltip_item.index == 1) {
        }
    };
  
    getToolTip = (index, isVisibleIndicator, item) => {
        return (
            <>
                <CustomToolTip
                    isVisible={isVisibleIndicator}
                    model={this.props.toolTipList}
                    position="right"
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
        downloadManager
            .displayDocument(item)
            .then((res) => {
                this.setState({ loader: false });
            })
            .catch(() => {
                this.setState({ loader: false });
            });
    };

    renderItem = ({ item, index }: any) => {
        const isVisibleIndicator = this.getVisibility(index);
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
                {item.downloadLocation ? 
                <View style={style.downloadedListStyle}></View>: null}
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
                                <Text style={style.modalTitle}>{BaseLocalization.addToFav}</Text>
                                <Text style={style.modalSubTitle}>{BaseLocalization.checkSubTitle}</Text>
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
                                <TouchableOpacity
                                    onPress={async () => {
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
                                            }
                                        });

                                        dbHelper
                                            .createFavouriteEntries(favorites, this.state.selectedItem.uniqueId)
                                            .then(() => {
                                                this.setState({ visible: false });
                                                this.props?.onFavGroupChange();
                                            });
                                    }}
                                >
                                    <View>
                                        <Text style={style.modalButton}>{BaseLocalization.submit}</Text>
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
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <View>
                <CheckBox
                    tintColors={{ true: '#4389BC', false: '#4389BC' }}
                    disabled={false}
                    value={isCheck}
                    onValueChange={() => {
                        setCheck(!isCheck);
                        props?.onSelect(props.id, !isCheck);
                    }}
                />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: 'black' }}>{props.name}</Text>
            </View>
        </View>
    );
};

const mapStateToProps = (state: RootState) => ({
    favGroup: state.categoryReducer.favGroupData,
    toolTipList: state.categoryReducer.toolTipList
});

const mapDispatchToProps = (dispatch: any) => ({
    setFavGroup: (favGroup: any) => {
        dispatch(setFavGroupData(favGroup));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailGridView);
