import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DriveItemModel, IDriveItem } from '../../Model/DriveItemModel';
import { GridViewModel } from '../../Model/GridViewModel';
import { MoreInfoListModel } from '../../Model/MoreInfoListModel';

// interface to declare all required variables
export interface CategoryState {
    gridViewData: GridViewModel[];
    moreInfoData: MoreInfoListModel[];

    selectedCategory: Array<any>;
    categoryTitle: string;
    subCategoryTitle: string;
    categoryDetailTitle: string;

    // used for / on home screen
    mainList: Array<any>;
    mainCategoryItem: IDriveItem;
    // used for / on category screen
    categoryList: Array<any>;
    categoryItem: IDriveItem;
    // used for / on sub category screen
    subCategoryList: Array<any>;
    subCategoryItem: IDriveItem;
    countryListData: Array<any>;
    selectedCountry: string;
    //
    moreInfoScreenData: MoreInfoListModel[];
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
    selectedCountry: 'MASTER_ENG',

    mainList: [],
    mainCategoryItem: {
        uniqueId: '0',
    },
    categoryItem: {
        uniqueId: '0',
    },
    categoryList: [],
    subCategoryItem: {
        uniqueId: '0',
    },
    moreInfoScreenData: [],
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

        //set selected Category (on click of home screen)
        setMainCategoryItem: (state, action: PayloadAction<DriveItemModel>) => {
            state.mainCategoryItem = action.payload;
        },

        //set Category data
        setCategoryList: (state, action: PayloadAction<DriveItemModel[]>) => {
            state.categoryList = action.payload;
        },

        //set selected Category (on click of category screen)
        setCategoryItem: (state, action: PayloadAction<DriveItemModel>) => {
            state.categoryItem = action.payload;
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
    },
});

// export individual action creator functions
export const {
    setMainCategoryList,
    setMainCategoryItem,
    setCategoryList,
    setCategoryItem,
    setSubCategoryList,
    setSubCategoryItem,
    setGridViewData,
    setMoreInfoData,
    setMoreInfoScreenData,
    setCountryListData,
    setSelectedCountry,
} = categorySlice.actions;

// often the reducer is a default export, but that doesn't matter
export default categorySlice.reducer;