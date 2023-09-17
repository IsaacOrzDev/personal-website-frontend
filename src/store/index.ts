import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import reducerNames from 'config/reducerNames';
import { globalReducer } from './global';
import { projectReducer } from './project';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  [reducerNames.global]: globalReducer,
  [reducerNames.project]: projectReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: import.meta.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export default store;
