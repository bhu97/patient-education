import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import BreadcrumbFlatList from '../../Components/breadcrumb-flat-list/breadcrumb-flat-list';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomFlatList from '../../Components/custom-flat-list/custom-flat-list';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import MainContainer from '../../Components/main-container/main-container';
import { SCREEN_NAME } from '../../Constant/Constants';
import dbHelper from '../../Database/DBHelper';
import { createBredCrumbList } from '../../Helper/Helper';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import { setSelectedCategoryData, setSubCategoryList } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';

interface SubCategoryScreenProps {
    // category screen array
    categoryList: DriveItemModel[];

    // category screen array
    subCategoryList: DriveItemModel[];

    //set category list for selected item
    setSubCategoryList: (data: DriveItemModel[]) => void;

    isLoading: boolean;
    setIsLoading: (boolean) => void;
    //all selected selectedCategoryData
    selectedCategoryData: any[];
    setSelectedCategoryData: (selectedItem: DriveItemModel[]) => void;
}

interface SubCategoryScreenState {
    breadCrumbList: any;
    pageTitle: string;
    selectedElement: DriveItemModel;
}

class SubCategoryScreen extends Component<SubCategoryScreenProps, SubCategoryScreenState> {
    constructor(props: SubCategoryScreenProps) {
        super(props);
        this.state = {
            breadCrumbList: [],
            pageTitle: '',
            selectedElement: {
                uniqueId: '0',
            },
        };
    }
    componentDidMount() {
        this.getCategoryData();
    }

    async getCategoryData() {
        this.props.setIsLoading(true);

        const selectedCategoryData = this.props.selectedCategoryData;

        const subCategoryDataItem: any = selectedCategoryData[selectedCategoryData.length - 1];

        const subItem = subCategoryDataItem.data;

        const subCategoryData = await dbHelper.getForSelectedCategory(subItem);
        LogManager.debug('subCategoryData=', subCategoryData);
        this.props.setSubCategoryList(subCategoryData);

        //create breadcrumb array
        let breadCrumbList = createBredCrumbList(selectedCategoryData);
        LogManager.debug('categoryScreen breadCrumbList=', breadCrumbList);

        this.setState({
            breadCrumbList: breadCrumbList,
            pageTitle: subItem.title,
            selectedElement: subItem,
        });

        this.props.setIsLoading(false);
    }

    onSubCategoryClick = (item) => {
        console.log(item);
        LogManager.warn('sub category screen click=', item);

        let data = Object.assign([], this.props.selectedCategoryData);

        let test: any = {
            data: item,
            label: item.title,
            prvIndex: this.props.selectedCategoryData.length,
        };

        data.push(test);

        this.props.setSelectedCategoryData(data);

        NavigationManager.navigate(SCREEN_NAME.CategoryDetailScreen);
    };

    breadcrumbClick = (item: any) => {
        if (item.prvIndex >= 0) {
            console.log('breadcrumb Sub Category screen =>', item);
            const prvIndex = item.prvIndex;
            let data = Object.assign([], this.props.selectedCategoryData);
            let totalDataLength = data.length;
            data.splice(prvIndex + 1);
            this.props.setSelectedCategoryData(data);
            NavigationManager.pop(totalDataLength - item.id);
        } else {
            // reset all data;
            this.props.setSelectedCategoryData([]);
            //go back to Home screen
            NavigationManager.navigateAndClear('HomeScreen');
        }
    };
    goBack = () => {
        //remove last and move back
        let data = Object.assign([], this.props.selectedCategoryData);
        data.pop();
        this.props.setSelectedCategoryData(data);
        NavigationManager.goBack();
    };

    onCategoryChangeClick = (item) => {
        LogManager.warn('category item changed click=', item);
        let data = Object.assign([], this.props.selectedCategoryData);
        data.pop();
        let test: any = {
            data: item,
            label: item.title,
            prvIndex: data.length,
        };

        data.push(test);
        this.props.setSelectedCategoryData(data);

        if (item.contentType == 'Document Set') {
            NavigationManager.navigatePop(SCREEN_NAME.CategoryDetailScreen, 1);
        }
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <View style={style.navContainer}>
                    <CustomTopNav
                        back
                        subTitle={this.state.pageTitle}
                        onPressBack={this.goBack}
                        smallHeader
                        isShowCard
                    />
                </View>
                <CustomBody>
                    {this.props.subCategoryList && this.props.categoryList ? (
                        <View style={style.container}>
                            <View style={style.flatListViewConatiner}>
                                <CustomFlatList
                                    categoryList={this.props.categoryList}
                                    selectedElement={this.state.selectedElement}
                                    onPressListItem={this.onCategoryChangeClick}
                                />
                            </View>
                            <View style={style.SecondflatListViewConatiner}>
                                <CustomFlatList
                                    categoryList={this.props.subCategoryList}
                                    onPressListItem={this.onSubCategoryClick}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={style.container}>
                            <View style={style.imageContainer}>
                                <Image style={{ height: 200, width: 200 }} source={Images.emptyImg} />
                                <Text style={style.secondtextStyle} numberOfLines={3}>
                                    {BaseLocalization.noDataText}
                                </Text>
                            </View>
                        </View>
                    )}
                </CustomBody>
                <View style={style.navContainer}>
                    <CustomBottomContainer>
                        {this.state.breadCrumbList.length > 0 && (
                            <BreadcrumbFlatList
                                breadCrumbList={this.state.breadCrumbList}
                                onPress={this.breadcrumbClick}
                            />
                        )}
                    </CustomBottomContainer>
                </View>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    categoryList: state.categoryReducer.categoryList,
    subCategoryList: state.categoryReducer.subCategoryList,
    isLoading: state.appDataReducer.appDataLoading,
    selectedCategoryData: state.categoryReducer.selectedCategoryData,
});

const mapDispatchToProps = (dispatch: any) => ({
    //
    setSubCategoryList: (categoryData: DriveItemModel[]) => {
        dispatch(setSubCategoryList(categoryData));
    },
    setIsLoading: (isLoading: boolean) => {
        dispatch(setAppDataLoading(isLoading));
    },
    setSelectedCategoryData: (selectedItems: DriveItemModel[]) => {
        dispatch(setSelectedCategoryData(selectedItems));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryScreen);
