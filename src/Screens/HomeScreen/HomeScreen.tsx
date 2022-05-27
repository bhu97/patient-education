import React, { Component } from 'react';
import { Image, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import CustomBody from '../../Components/custom-body/custom-body';
import CustomBottomContainer from '../../Components/custom-bottom-container/custom-bottom-container';
import CustomBredcrum from '../../Components/custom-bredcrum/custom-bredcrum';
import CustomFlatList from '../../Components/custom-flat-list/custom-flat-list';
import CustomTopNav from '../../Components/custom-top-nav/custom-top-nav';
import MainContainer from '../../Components/main-container/main-container';
import { API_NAMES } from '../../Constant/Constants';
import { DatabaseManager } from '../../Database/DatabaseManager';
import dbHelper from '../../Database/DBHelper';
import { DriveItemSchema } from '../../Database/Schema';
import { createDriveModelData, createListModelData } from '../../Helper/Helper';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import LocalizationManager from '../../Localization/LocalizationManager';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { ListItemModel } from '../../Model/ListItemModel';
import { setAllDriveResponse, setAllListResponse } from '../../Redux/app-data/appDataSlice';
import { fetchData } from '../../Redux/app-data/appDataThunk';
import { setCategoryList, setCategoryTitle } from '../../Redux/catagory/catagorySlice';
import { RootState } from '../../Redux/rootReducer';
import Images from '../../Theme/Images';
import { style } from './style';

interface HomePageProps {
    driveItems: any;
    listItems: any;
    dispatch: Dispatch;
    mainList: any;
    navigation: any;
    setTitleCategory: (title: string) => void;
    setCategoryData: (data: any) => void;
    setAllDriveItems: (data: DriveItemModel[]) => void;
    setAllListItems: (data: ListItemModel[]) => void;
}

interface HomePageState {}

class HomePage extends Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
    }

    componentDidMount() {
        this.initializeApp();
    }

    async initializeApp() {
        SplashScreen.hide();

        const userData = await dbHelper.getUser();
        LogManager.debug('userData', userData);
        if (!userData) {
            //user not present fetch all data and save it DB

            LogManager.debug('fetch all drive starts=');

            const driveItems = await fetchData(API_NAMES.ALL_DRIVE_ITEM_ENDPOINT);
            LogManager.info('responses driveItems=', driveItems);

            const driveModelData = createDriveModelData(driveItems);
            LogManager.info('driveModelData=', driveModelData);

            //set it to redux for future use
            this.props.setAllDriveItems(driveModelData);

            const listItems = await fetchData(API_NAMES.ALL_LIST_ITEM_ENDPOINT);
            LogManager.info('responses list Item=', listItems);

            const listModelData = createListModelData(listItems);
            LogManager.debug('listModelData=', listModelData);

            LogManager.debug('fetch all drive ends=', driveModelData);

            //set it to redux for future use
            this.props.setAllListItems(listModelData);

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
    }

    goBack = () => {
        NavigationManager.goBack();
    };

    onClickBredcrum1 = () => {
        this.test();
    };

    async test() {
        //await this.props.getAllDriveItems();
        // await this.props.getAllListItems();
    }

    onClick = (item) => {
        this.props.setTitleCategory(item.key);
        this.props.setCategoryData(item);
        NavigationManager.navigate('CategoryScreen');
    };

    render() {
        return (
            <MainContainer>
                <CustomTopNav
                    isShowImage={true}
                    title={BaseLocalization.welcome}
                    subTitle={BaseLocalization.selectCategory}
                />
                <CustomBody>
                    <View style={style.container}>
                        <View style={style.flatListViewConatiner}>
                            <CustomFlatList
                                catagoryList={this.props.mainList}
                                onPressList={this.onClick}
                                elementType="key"
                            />
                        </View>
                        <View style={style.imageViewConatiner}>
                            <View style={style.imageView}>
                                <Image resizeMode="contain" style={style.imageStyle} source={Images.illuHome} />
                            </View>
                        </View>
                    </View>
                </CustomBody>
                <CustomBottomContainer>
                    <View style={style.botomView}>
                        <CustomBredcrum title={'Home'} isFirstCrumb={true} onPress={this.onClickBredcrum1} />
                    </View>
                </CustomBottomContainer>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    mainList: state.catagoryReducer.mainList,
    driveItems: state.appDataReducer.allDriveResponse,
    listItems: state.appDataReducer.allListResponse,
});

const mapDispatchToProps = (dispatch: any) => ({
    setCategoryData: (data: any) => {
        dispatch(setCategoryList(data));
    },
    setTitleCategory: (titleText: string) => {
        dispatch(setCategoryTitle(titleText));
    },
    // getAllDriveItems: () => {
    //     dispatch(fetchAllDriveItems());
    // },
    // getAllListItems: () => {
    //     dispatch(fetchAllListItems());
    // },
    setAllDriveItems: (response: DriveItemModel[]) => {
        dispatch(setAllDriveResponse(response));
    },
    setAllListItems: (response: ListItemModel[]) => {
        dispatch(setAllListResponse(response));
    },
});

//export default HomePage;
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
