import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DriveItemModel, IDriveItem } from '../../Model/DriveItemModel';
import { GridViewModel } from '../../Model/GridViewModel';
import { MoreInfoListModel } from '../../Model/MoreInfoListModel';
import { UserModel } from '../../Model/UserModel';

// interface to declare all required variables
export interface PersistentState {
   isSupportEmailDownloaded: boolean,
   downloadFileItem:any[]

}

// to set initial value for all variable
const initialState: PersistentState = {  
    isSupportEmailDownloaded:false,
    downloadFileItem:[]
};

// basic example slice done based on the docs
const PersistentSlice = createSlice({
    name: 'persistent',

    initialState,

    reducers: {
        //set root items (main category list)
        setIsSupportEmailDownloaded: (state, action: PayloadAction<boolean>) => {
            state.isSupportEmailDownloaded = action.payload;
        },
        setDownloadFileItem:(state, action:PayloadAction<[]>)=>{      
            console.log("state.downloadFileItem",state.downloadFileItem.length);      
            state.downloadFileItem  =  action.payload
           
            
        }
    },
});

// export individual action creator functions
export const {
    setIsSupportEmailDownloaded,
    setDownloadFileItem
} = PersistentSlice.actions;

// often the reducer is a default export, but that doesn't matter
export default PersistentSlice.reducer;
