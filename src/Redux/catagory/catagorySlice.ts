import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { object } from 'prop-types';
import gridViewData from '../../Json/gridviewjson';
import { GridViewModel } from '../../Model/GridViewModel';
import moreInfoData from '../../Json/moreinfojson';
import { MoreInfoListModel } from '../../Model/MoreInfoListModel';
import category from '../../Json/category';

// interface to declare all required variables
export interface CatagoryState {
    gridViewData: GridViewModel[];
    moreInfoData: MoreInfoListModel[];
    mainList: Array<any>;
    categoryList: Array<any>;
    subCategoryList: Array<any>;
    selectedCategory: Array<any>;
    categoryTitle: string;
    subCategoryTitle: string;
    categoryDetailTitle: string;
}

// to set initial value for all variable
const initialState: CatagoryState = {
    mainList: category,
    categoryList: [],
    subCategoryList: [],
    selectedCategory: [],
    categoryTitle: '',
    subCategoryTitle: '',
    categoryDetailTitle: '',
    gridViewData: gridViewData,
    moreInfoData: moreInfoData,
};

// basic example slice done based on the docs
const catagorySlice = createSlice({
    name: 'catagory',

    initialState,

    reducers: {
        setCategoryTitle: (state, action: PayloadAction<string>) => {
            state.categoryTitle = action.payload;
        },
        setSubCategoryTitle: (state, action: PayloadAction<string>) => {
            state.subCategoryTitle = action.payload;
        },
        setCategoryDetailTitle: (state, action: PayloadAction<string>) => {
            state.categoryDetailTitle = action.payload;
        },
        setMainList: (state, action: PayloadAction<any>) => {
            state.mainList = action.payload;
        },
        setCategoryList: (state, action: PayloadAction<any>) => {
            state.categoryList = action.payload;
        },
        setSubCategoryList: (state, action: PayloadAction<any>) => {
            state.subCategoryList = action.payload;
        },
        setSelectedCategory: (state, action: PayloadAction<any>) => {
            state.selectedCategory = action.payload;
        },
        setGridViewData: (state, action: PayloadAction<GridViewModel[]>) => {
            state.gridViewData = action.payload;
        },
    },
});

// export individual action creator functions
export const {
    setMainList,
    setCategoryList,
    setSubCategoryList,
    setSelectedCategory,
    setCategoryTitle,
    setSubCategoryTitle,
    setCategoryDetailTitle,
    setGridViewData,
} = catagorySlice.actions;

// often the reducer is a default export, but that doesn't matter
export default catagorySlice.reducer;
