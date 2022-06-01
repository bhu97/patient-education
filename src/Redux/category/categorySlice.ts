import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { object } from 'prop-types';
import gridViewData from '../../Json/gridviewjson';
import { GridViewModel } from '../../Model/GridViewModel';
import moreInfoData from '../../Json/moreinfojson';
import { MoreInfoListModel } from '../../Model/MoreInfoListModel';
import category from '../../Json/category';
import masteroptions from '../../Json/masteroptions';
import { DriveItemModel, IDriveItem } from '../../Model/DriveItemModel';

// interface to declare all required variables
export interface CategoryState {
    gridViewData: GridViewModel[];
    moreInfoData: MoreInfoListModel[];

    selectedCategory: Array<any>;
    categoryTitle: string;
    subCategoryTitle: string;
    categoryDetailTitle: string;
    masterOptionsData: Array<any>;

    // used for / on home screen
    mainList: Array<any>;
    mainCategoryItem: IDriveItem;
    // used for / on category screen
    categoryList: Array<any>;
    categoryItem: IDriveItem;
    // used for / on sub category screen
    subCategoryList: Array<any>;
    subCategoryItem: IDriveItem;
}

// to set initial value for all variable
const initialState: CategoryState = {
    subCategoryList: [],
    selectedCategory: [],
    categoryTitle: '',
    subCategoryTitle: '',
    categoryDetailTitle: '',
    gridViewData: gridViewData,
    moreInfoData: moreInfoData,
    masterOptionsData: masteroptions,
    //
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

        setCategoryDetailTitle: (state, action: PayloadAction<string>) => {
            state.categoryDetailTitle = action.payload;
        },

        setGridViewData: (state, action: PayloadAction<GridViewModel[]>) => {
            state.gridViewData = action.payload;
        },
        setMasterOptionsData: (state, action: PayloadAction<GridViewModel[]>) => {
            state.masterOptionsData = action.payload;
        },
    },
});

// export individual action creator functions
export const {
    setCategoryDetailTitle,
    setGridViewData,
    setMasterOptionsData,

    //
    setMainCategoryList,
    setMainCategoryItem,
    setCategoryList,
    setCategoryItem,
    setSubCategoryList,
    setSubCategoryItem,
} = categorySlice.actions;

// often the reducer is a default export, but that doesn't matter
export default categorySlice.reducer;
