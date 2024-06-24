
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux'; // Change this import
import { configureStore } from '@reduxjs/toolkit'; // Change this import
import AsyncStorage from '@react-native-async-storage/async-storage';
import cookiesReducer from './cookiesReducer';
import sliceReducer from './reducer'; 

const rootReducer = combineReducers({
  sliceReducer, 
  cookies: cookiesReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cookies'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export default store;
