import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from '@/redux/user/userSlice';
// Import additional reducers if needed
// import anotherSliceReducer from './slices/anotherSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // Use AsyncStorage for React Native
    // No whitelist or blacklist, meaning all reducers will be persisted
};

// Combine all your reducers
const rootReducer = combineReducers({
    user: userReducer, // Add the user slice
    // Add other reducers here
    // anotherSlice: anotherSliceReducer,
});

// Enhance the root reducer with persist capabilities
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable warnings for non-serializable values
        }),
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
