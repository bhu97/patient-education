import React, { Component } from 'react';
import { Image, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBredcrum from '../../Components/custom-bredcrum/custom-bredcrum';
import CustomFlatList from '../../Components/custom-flat-list/custom-flat-list';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import FullScreenLoader from '../../Components/full-screen-loader/full-screen-loader';
import MainContainer from '../../Components/main-container/main-container';
import { API_NAMES } from '../../Constant/Constants';
import { DatabaseManager } from '../../Database/DatabaseManager';
import dbHelper from '../../Database/DBHelper';
import { DriveItemSchema } from '../../Database/Schema';
import { createDriveModelData, createListModelData } from '../../Helper/Helper';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { setAppDataLoading } from '../../Redux/app-data/appDataSlice';
import { fetchData } from '../../Redux/app-data/appDataThunk';
import { setMainCategoryItem, setMainCategoryList } from '../../Redux/category/categorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';

interface HomePageProps {
    mainList: DriveItemModel[];
    setMainCategoryItem: (selectedItem: DriveItemModel) => void;
    setMainList: (data: DriveItemModel[]) => void;
    setIsLoading: (boolean) => void;
    appDataLoading:boolean;
}

interface HomePageState {
}

class HomePage extends Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.initializeApp();
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 5000);
    }

    async initializeApp() {
        SplashScreen.hide();
this.props.setIsLoading(true);
        const userData = await dbHelper.getUser();
        LogManager.debug('userData', userData);
        if (!userData) {
            //user not present fetch all data and save it DB

            LogManager.debug('fetch all drive starts=');

            const driveItems = await fetchData(API_NAMES.ALL_DRIVE_ITEM_ENDPOINT);
            LogManager.info('responses driveItems=', driveItems);

            const driveModelData = createDriveModelData(driveItems);
            LogManager.info('driveModelData=', driveModelData);

            const listItems = await fetchData(API_NAMES.ALL_LIST_ITEM_ENDPOINT);
            LogManager.info('responses list Item=', listItems);

            const listModelData = createListModelData(listItems);
            LogManager.debug('listModelData=', listModelData);

            LogManager.debug('fetch all drive ends=', driveModelData);

            //insert drive items and list items to DB
            LogManager.debug('insert DB stars=');

            await DatabaseManager.getInstance().createEntity(DriveItemSchema.name, driveModelData);

            await DatabaseManager.getInstance().createEntity(DriveItemSchema.name, listModelData);

            LogManager.debug('insert DB ends=');

            // create user into DB
            const userCountry = dbHelper.createUserIfEmpty();

            LogManager.debug('userCountry=', userCountry);
            //TODO: set it in redux
        } else {
            // db present load data from database to redux
            LogManager.debug('valid db present');
        }

        await dbHelper.createUser('master');
        const mainCategoryData = await dbHelper.getRootItemsForCountry(userData.country);
        LogManager.debug('mainCategoryData=', mainCategoryData);
        this.props.setMainList(mainCategoryData);
        this.props.setIsLoading(false);
    }

    goBack = () => {
        NavigationManager.goBack();
    };

    onClick = (item) => {
        console.log('home pe konsa click hua hai',item)
        LogManager.info('selected item=>', item);
        this.props.setMainCategoryItem(item);
        NavigationManager.navigate('CategoryScreen');
    };

    render() {
        // console.log("checking loader",this.props.appDataLoading)
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
                        <CustomBredcrum title={'Home'} isFirstCrumb={true} isClickDisable/>
                    </View>
                </CustomBottomContainer>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    mainList: state.categoryReducer.mainList,
    appDataLoading:state.appDataReducer.appDataLoading
});

const mapDispatchToProps = (dispatch: any) => ({
    setMainList: (rootItems: DriveItemModel[]) => {
        dispatch(setMainCategoryList(rootItems));
    },
    setMainCategoryItem: (selectedItems: DriveItemModel) => {
        dispatch(setMainCategoryItem(selectedItems));
    },
    setIsLoading : (value: boolean) => {
       dispatch(setAppDataLoading(value));
    }
});

//export default HomePage;
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
