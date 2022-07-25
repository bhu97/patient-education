import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBreadcrumb from '../../Components/custom-breadcrumb/custom-breadcrumb';
import CustomFlatList from '../../Components/custom-flat-list/custom-flat-list';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import MainContainer from '../../Components/main-container/main-container';
import { SCREEN_NAME } from '../../Constant/Constants';
import dbHelper from '../../Database/DBHelper';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { fetchAllDriveItems, fetchLastModifiedDate } from '../../Redux/app-data/appDataThunk';
import { setIsCountrySelected, setMainCategoryList, setSelectedCategoryData } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';

interface HomePageProps {
    mainList: DriveItemModel[];
    setMainList: (data: DriveItemModel[]) => void;
    appDataLoading: boolean;
    navigation: any;
    setSelectedCategoryData: (selectedItem: DriveItemModel[]) => void;
    //all selected selectedCategoryData
    selectedCategoryData: any[];
    fetchLastModifyDate:()=>void;
    isCountrySelected: boolean;
    setIsCountrySelected: (boolean) => void;
}

interface HomePageState {}

class HomePage extends Component<HomePageProps, HomePageState> {
    _unsubscribe: any;
    constructor(props: HomePageProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.initializeApp();
        });
        
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    async initializeApp() {
        const userData: any = await dbHelper.getUser();
        LogManager.debug('userData', userData);
        // db present load data from database to redux
        LogManager.debug('valid db present');
        const mainCategoryData = await dbHelper.getRootItemsForCountry(userData);
        LogManager.debug('mainCategoryData=', mainCategoryData);
        this.props.setMainList(mainCategoryData);
        this.props.fetchLastModifyDate();
    }
    componentDidUpdate(prevProp): void {
        if (prevProp.isCountrySelected !== this.props.isCountrySelected) {
            NavigationManager.navigateAndClear('HomeScreen');
            this.props.setIsCountrySelected(false);
        }
    }
    onClick = (item) => {
        LogManager.warn('home screen click=', item);
        let test: any = {
            data: item,
            label: item.title,
            prvIndex: this.props.selectedCategoryData.length, //0
        };
        let data: any = [];
        data.push(test);
        this.props.setSelectedCategoryData(data);

        if (item.contentType == 'Document Set') {
            NavigationManager.navigate(SCREEN_NAME.CategoryDetailScreen);
        } else {
            NavigationManager.navigate(SCREEN_NAME.CategoryScreen);
        }
    };

    render() {
        return this.props.appDataLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <View style={style.navContainer}>
                    <CustomTopNav title={BaseLocalization.welcome} subTitle={BaseLocalization.selectCategory} />
                </View>
                <CustomBody>
                    {this.props.mainList ? (
                        <View style={style.container}>
                            <View style={style.flatListViewContainer}>
                                {this.props.mainList && (
                                    <CustomFlatList categoryList={this.props.mainList} onPressListItem={this.onClick} />
                                )}
                            </View>
                            <View style={style.imageViewContainer}>
                                <View style={style.imageView}>
                                    <Image resizeMode="contain" style={style.imageStyle} source={Images.illuHome} />
                                </View>
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
                    <View style={style.bottomView}>
                        <CustomBreadcrumb title={'Home'} isFirstCrumb={true} />
                        </View>
                    </CustomBottomContainer>
                </View>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    mainList: state.categoryReducer.mainList,
    appDataLoading: state.appDataReducer.appDataLoading,
    selectedCategoryData: state.categoryReducer.selectedCategoryData,
    isCountrySelected: state.categoryReducer.isCountrySelected
});

const mapDispatchToProps = (dispatch: any) => ({
    setMainList: (rootItems: DriveItemModel[]) => {
        dispatch(setMainCategoryList(rootItems));
    },
    setSelectedCategoryData: (selectedItems: DriveItemModel[]) => {
        dispatch(setSelectedCategoryData(selectedItems));
    },
    fetchLastModifyDate: () => {
        dispatch(fetchLastModifiedDate());
    },
    setIsCountrySelected: (value : boolean) => {
        dispatch(setIsCountrySelected(value))
    }
});

//export default HomePage;
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
