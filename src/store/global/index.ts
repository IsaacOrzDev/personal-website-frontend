import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { initialGlobalState } from './state';
import { Theme } from 'types/Types';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducerNames from 'config/reducerNames';
import TimeService from 'services/timeService';
import RandomService from 'services/randomService';

const slice = createSlice({
  name: reducerNames.global,
  initialState: initialGlobalState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setPage: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
    setHomeImages: (state, action: PayloadAction<any[]>) => {
      state.homeImages = action.payload;
    },
    randomSetSelectedHomeImage: (state, action: PayloadAction) => {
      const max = state.homeImages.length;
      const min = 0;
      const index = RandomService.getRandomNumber(min, max);
      state.selectedHomeImage = index;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setMessageContent: (state, action: PayloadAction<string>) => {
      state.messageContent = action.payload;
    },
    setDataLoaded: (state, action: PayloadAction<boolean>) => {
      state.dataLoaded = action.payload;
    },
    setShouldShowContent: (state, action: PayloadAction<boolean>) => {
      state.shouldShowContent = action.payload;
    },
    toggleShouldShowMenu: (state) => {
      state.shouldShowMenu = !state.shouldShowMenu;
    },
    setShouldShowMenu: (state, action: PayloadAction<boolean>) => {
      state.shouldShowMenu = action.payload;
    },
    setShouldShowMessageModal: (state, action: PayloadAction<boolean>) => {
      state.shouldShowMessageModal = action.payload;
    },
    setShouldListenScrollingEvent: (state, action: PayloadAction<boolean>) => {
      state.shouldListenScrollingEvent = action.payload;
    },
  },
});

const { reducer, actions } = slice;

function stopScrollingDuringAnimation(): ThunkAction<void, any, any, any> {
  return async (dispatch) => {
    dispatch(actions.setShouldListenScrollingEvent(false));
    await TimeService.timeout(1000);
    dispatch(actions.setShouldListenScrollingEvent(true));
  };
}

const persistConfig = {
  key: reducerNames.global,
  storage,
  whitelist: ['theme', 'hasCookie'],
};

const globalReducer = persistReducer(persistConfig, reducer);

const globalActions = { ...actions, stopScrollingDuringAnimation };

export { globalReducer, globalActions };
