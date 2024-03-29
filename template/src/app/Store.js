import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "redux"; 
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import * as Config from 'utils/values/Config';

import SettingsReducer, { STORAGE_NAME_SETTINGS } from 'data/storage/settings/Settings.Storage';

const reducers = combineReducers({
    [STORAGE_NAME_SETTINGS]: SettingsReducer,
});

const persistConfig = {
    key: 'root',
    transforms: Config.IS_DEBUG?[]
    :[
      encryptTransform({
        secretKey: Config.REDUX_ENCRYPT_SALT,
        onError: function (error) {
          // Handle the error.
        },
      }),
    ],
    storage,
    blacklist: [] // Session Page will not be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

const persistor = persistStore(store);

export {
    store,
    persistor,
}