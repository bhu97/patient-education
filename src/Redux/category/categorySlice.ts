import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DriveItemModel, IDriveItem } from '../../Model/DriveItemModel';
import { GridViewModel } from '../../Model/GridViewModel';
import { MoreInfoListModel } from '../../Model/MoreInfoListModel';
import { UserModel } from '../../Model/UserModel';

// interface to declare all required variables
export interface CategoryState {
    gridViewData: GridViewModel[];
    moreInfoData: MoreInfoListModel[];

    selectedCategory: Array<any>;
    categoryTitle: string;
    subCategoryTitle: string;
    categoryDetailTitle: string;

    // used for / on home screen
    mainList: IDriveItem[];

    // used for / on category screen
    categoryList: IDriveItem[];
    categoryItem: IDriveItem;
    // used for / on sub category screen
    subCategoryList: IDriveItem[];
    subCategoryItem: IDriveItem;
    countryListData: Array<any>;
    selectedCountry: string;
    //
    moreInfoScreenData: MoreInfoListModel[];
    // used for user data
    userModelData: UserModel[];

    //
    selectedCategoryData: DriveItemModel[];
}

// to set initial value for all variable
const initialState: CategoryState = {
    subCategoryList: [],
    selectedCategory: [],
    categoryTitle: '',
    subCategoryTitle: '',
    categoryDetailTitle: '',
    gridViewData: [],
    moreInfoData: [],
    countryListData: [],
    selectedCountry: '',

    mainList: [],

    categoryItem: {
        uniqueId: '0',
    },
    categoryList: [],
    subCategoryItem: {
        uniqueId: '0',
    },
    moreInfoScreenData: [],
    userModelData: [],
    selectedCategoryData: [],
};

// basic example slice done based on the docs
const categorySlice = createSlice({
    name: 'catagory',

    initialState,

    reducers: {
        //set root items (main category list)
        setMainCategoryList: (state, action: PayloadAction<DriveItemModel[]>) => {
            state.mainList = action.payload;
        },

        //set Category data
        setCategoryList: (state, action: PayloadAction<DriveItemModel[]>) => {
            state.categoryList = action.payload;
        },

        //set Sub Category data
        setSubCategoryList: (state, action: PayloadAction<DriveItemModel[]>) => {
            state.subCategoryList = action.payload;
        },

        //set selected sub Category (on click of category screen)
        setSubCategoryItem: (state, action: PayloadAction<DriveItemModel>) => {
            state.subCategoryItem = action.payload;
        },

        //grid view on category detail screen
        setGridViewData: (state, action: PayloadAction<GridViewModel[]>) => {
            state.gridViewData = action.payload;
        },
        setMoreInfoData: (state, action: PayloadAction<MoreInfoListModel[]>) => {
            state.moreInfoData = action.payload;
        },
        setMoreInfoScreenData: (state, action: PayloadAction<MoreInfoListModel[]>) => {
            console.log('setMoreInfoScreenData =>', action.payload);
            state.moreInfoScreenData = action.payload;
        },
        setCountryListData: (state, action: PayloadAction<any>) => {
            state.countryListData = action.payload;
        },
        setSelectedCountry: (state, action: PayloadAction<any>) => {
            state.selectedCountry = action.payload;
        },
        setUserModelData: (state, action: PayloadAction<UserModel[]>) => {
            console.log('setUserModelData payload =>', action.payload);
            state.userModelData = action.payload;
        },
        //selected category data push all (main, category, sub)
        setSelectedCategoryData: (state, action: PayloadAction<DriveItemModel[]>) => {
            console.log('selectedCategoryData payload =>', action.payload);
            state.selectedCategoryData = action.payload;
        },
    },
});

// export individual action creator functions
export const {
    setMainCategoryList,
    setCategoryList,
    setSubCategoryList,
    setSubCategoryItem,
    setGridViewData,
    setMoreInfoData,
    setMoreInfoScreenData,
    setCountryListData,
    setSelectedCountry,
    setSelectedCategoryData,
    setUserModelData,
} = categorySlice.actions;

// often the reducer is a default export, but that doesn't matter
export default categorySlice.reducer;
