import { createSlice } from '@reduxjs/toolkit';
import * as Config from 'utils/values/Config';

export const STORAGE_NAME_SETTINGS = Config.IS_DEBUG?"SettingsStorage":"_SET";

/**
 * Application Settings / Version Code are here
 */
export const initialState = {
    AppName: Config.APP_NAME,
    AppVersion: Config.APP_BUILD_VERSION,
    ReduxStorageVersion: Config.APP_REDUX_VERSION,
};


export const SettingSlice = createSlice({
    name: STORAGE_NAME_SETTINGS,
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setAnyObject: (state, action) =>{
            state = {
                ...state,
                ...action.payload,
            }
        },
        resetAllData: state => initialState,
    },
});


// Reducer storage
export default SettingSlice.reducer;

// Action Dispatcher
export const { setAnyObject, resetAllData } = SettingSlice.actions;


// Selector
export const getAllObject = (state) => state[STORAGE_NAME_SETTINGS];
