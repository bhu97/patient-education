import React, { Component } from 'react';
import { Image, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBreadcrumb from '../../Components/custom-breadcrumb/custom-breadcrumb';
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
import { fetchAllDriveItems } from '../../Redux/app-data/appDataThunk';
import { setMainCategoryItem, setMainCategoryList } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';

interface HomePageProps {
    mainList: DriveItemModel[];
    setMainCategoryItem: (selectedItem: DriveItemModel) => void;
    setMainList: (data: DriveItemModel[]) => void;
    setIsLoading: (boolean) => void;
    appDataLoading: boolean;
    fetchData: () => void;
}

interface HomePageState {}

class HomePage extends Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.initializeApp();
    }

    async initializeApp() {
        SplashScreen.hide();
        // this.props.setIsLoading(true);
        const userData = await dbHelper.getUser();
        LogManager.debug('userData', userData);

        if (!userData) {
            //user not present fetch all data and save it DB

            this.props.fetchData();

            //TODO: set it in redux
        } else {
            // db present load data from database to redux
            LogManager.debug('valid db present');
        }

        //await dbHelper.createUser('master');
        this.props.setIsLoading(true);
        const mainCategoryData = await dbHelper.getRootItemsForCountry(userData.country);
        LogManager.debug('mainCategoryData=', mainCategoryData);
        this.props.setMainList(mainCategoryData);
        this.props.setIsLoading(false);
    }

    goBack = () => {
        NavigationManager.goBack();
    };

    onClick = (item) => {
        LogManager.info('selected item=>', item);
        this.props.setMainCategoryItem(item);
        NavigationManager.navigate('CategoryScreen');
    };

    render() {
        return this.props.appDataLoading ? (
            <FullScreenLoader isLoading showSpinner />
        ) : (
            <MainContainer>
                <CustomTopNav
                    isShowImage={true}
                    title={BaseLocalization.welcome}
                    subTitle={BaseLocalization.selectCategory}
                />
                <CustomBody>
                    <View style={style.container}>
                        <View style={style.flatListViewContainer}>
                            {this.props.mainList && (
                                <CustomFlatList
                                    categoryList={this.props.mainList}
                                    onPressList={this.onClick}
                                    elementType="name"
                                />
                            )}
                        </View>
                        <View style={style.imageViewContainer}>
                            <View style={style.imageView}>
                                <Image resizeMode="contain" style={style.imageStyle} source={Images.illuHome} />
                            </View>
                        </View>
                    </View>
                </CustomBody>
                <CustomBottomContainer>
                    <View style={style.bottomView}>
                        <CustomBreadcrumb title={'Home'} isFirstCrumb={true} />
                    </View>
                </CustomBottomContainer>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    mainList: state.categoryReducer.mainList,
    appDataLoading: state.appDataReducer.appDataLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
    setMainList: (rootItems: DriveItemModel[]) => {
        dispatch(setMainCategoryList(rootItems));
    },
    setMainCategoryItem: (selectedItems: DriveItemModel) => {
        dispatch(setMainCategoryItem(selectedItems));
    },
    setIsLoading: (value: boolean) => {
        dispatch(setAppDataLoading(value));
    },
    fetchData: () => {
        dispatch(fetchAllDriveItems());
    },
});

//export default HomePage;
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
