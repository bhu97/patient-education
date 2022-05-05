import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import gridViewData from '../../Json/gridviewjson';
import { GridViewModel } from '../../Model/GridViewModel';
import moreInfoData from '../../Json/moreinfojson';
import { MoreInfoListModel } from '../../Model/MoreInfoListModel';

// interface to declare all required variables
export interface CatagoryState {
    catagoryList: [];
    categoryTitle: string;
    subCategoryTitle: string;
    categoryDetailTitle: string;
    gridViewData: GridViewModel[];
    moreInfoData: MoreInfoListModel[];
}

// to set initial value for all variable
const initialState: CatagoryState = {
    catagoryList: [],
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
        setCatagoryList: (state, action: PayloadAction<any>) => {
            state.catagoryList = action.payload;
        },
        setGridViewData: (state, action: PayloadAction<GridViewModel[]>) => {
            state.gridViewData = action.payload;
        },
    },
});

// export individual action creator functions
export const { setCatagoryList, setCategoryTitle, setSubCategoryTitle, setCategoryDetailTitle, setGridViewData } =
    catagorySlice.actions;

// often the reducer is a default export, but that doesn't matter
export default catagorySlice.reducer;
