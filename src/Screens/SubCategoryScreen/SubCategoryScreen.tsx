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
import dbHelper from '../../Database/DBHelper';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import { setSelectedCategoryData, setSubCategoryItem, setSubCategoryList } from '../../Redux/category/categorySlice';
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
    selectedCategoryData: DriveItemModel[];
    setSelectedCategoryData: (selectedItem: DriveItemModel[]) => void;
}

interface SubCategoryScreenState {
    breadCrumbList: any;
    pageTitle: string;
    subTitle: string;
}

class SubCategoryScreen extends Component<SubCategoryScreenProps, SubCategoryScreenState> {
    constructor(props: SubCategoryScreenProps) {
        super(props);
        this.state = {
            breadCrumbList: [],
            pageTitle: '',
            subTitle: '',
        };
    }
    componentDidMount() {
        this.getCategoryData();
    }

    async getCategoryData() {
        this.props.setIsLoading(true);
        const selectedCategoryData = this.props.selectedCategoryData;
        let item: any = {};
        item = selectedCategoryData[selectedCategoryData.length - 1];

        let subItem: any = {};
        subItem = selectedCategoryData[selectedCategoryData.length - 2];

        const subCategoryData = await dbHelper.getForSelectedCategory(item);
        LogManager.debug('subCategoryData=', subCategoryData);
        this.props.setSubCategoryList(subCategoryData);

        //create breadcrumb array
        let breadCrumbList = [
            {
                id: 0,
                title: 'Home',
                isFirstCrumb: true,
            },
            {
                id: 1,
                title: item.title,
                isFirstCrumb: false,
            },
            {
                id: 2,
                title: subItem.title,
                isFirstCrumb: false,
                isDisabled: true,
            },
        ];

        this.setState({
            breadCrumbList: breadCrumbList,
            pageTitle: item.title,
            subTitle: subItem.title,
        });

        this.props.setIsLoading(false);
    }

    componentDidUpdate(prevProp: SubCategoryScreenProps) {
        console.log('componentDidUpdate here for sub Category');

        if (
            this.props.selectedCategoryData &&
            this.props.selectedCategoryData.length > 1 &&
            this.props.selectedCategoryData[1] !== prevProp.selectedCategoryData[1]
        ) {
            console.log('CategoryItem changed');

            if (this.props.selectedCategoryData[1].contentType == 'Document Set') {
                NavigationManager.navigatePop('CategoryDetailScreen', 2);
            } else {
                this.getCategoryData();
            }
        }
    }

    onSubCategoryClick = (item) => {
        console.log(item);
        LogManager.warn('sub category screen click=', item);
        let data = Object.assign([], this.props.selectedCategoryData);
        data.push(item);
        this.props.setSelectedCategoryData(data);

        NavigationManager.navigate('CategoryDetailScreen');
    };

    breadcrumbClick = (item: any) => {
        console.log('breadcrumb Sub Category screen =>', item);
        if (item.id === 0) {
            //home click
            let data = [];
            this.props.setSelectedCategoryData(data);
            NavigationManager.navigateAndClear('HomeScreen');
        } else {
            this.goBack();
        }
    };
    goBack = () => {
        let data = Object.assign([], this.props.selectedCategoryData);
        if (data.length > 1) data.pop();
        this.props.setSelectedCategoryData(data);
        NavigationManager.goBack();
    };

    onCategoryClick = (item) => {
        LogManager.warn('category item changed click=', item);
        let data = Object.assign([], this.props.selectedCategoryData);
        data.pop();
        data.push(item);
        this.props.setSelectedCategoryData(data);

        if (item.contentType == 'Document Set') {
            NavigationManager.navigate('CategoryDetailScreen');
        }
    };

    render() {
        return this.props.isLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
               <View style={style.navContainer}>
                <CustomTopNav back subTitle={this.state.subTitle} onPressBack={this.goBack} smallHeader isShowCard/>
                </View>
                <CustomBody>
                    {this.props.subCategoryList && this.props.categoryList ? (
                        <View style={style.container}>
                            <View style={style.flatListViewConatiner}>
                                <CustomFlatList
                                    categoryList={this.props.categoryList}
                                    selectedElement={this.props.selectedCategoryData[1]}
                                    onPressListItem={this.onCategoryClick}
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
                <CustomBottomContainer>
                    {this.state.breadCrumbList.length > 0 && (
                        <BreadcrumbFlatList breadCrumbList={this.state.breadCrumbList} onPress={this.breadcrumbClick} />
                    )}
                </CustomBottomContainer>
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
    setSubCategoryItem: (selectedCategoryItems: DriveItemModel) => {
        dispatch(setSubCategoryItem(selectedCategoryItems));
    },
    setIsLoading: (isLoading: boolean) => {
        dispatch(setAppDataLoading(isLoading));
    },
    setSelectedCategoryData: (selectedItems: DriveItemModel[]) => {
        dispatch(setSelectedCategoryData(selectedItems));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryScreen);
