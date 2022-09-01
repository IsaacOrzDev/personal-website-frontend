import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialAboutState } from './state';
import reducerNames from 'config/reducerNames';
import AboutDescriptionModel from 'models/AboutDescriptionModel';

const slice = createSlice({
  name: reducerNames.about,
  initialState: initialAboutState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setSkillSets: (state, action: PayloadAction<Array<Array<string>>>) => {
      state.skillSets = action.payload;
    },
    setDescription: (
      state,
      action: PayloadAction<Array<AboutDescriptionModel>>
    ) => {
      state.description = action.payload;
    },
  },
});

const { reducer: aboutReducer, actions: aboutActions } = slice;

export { aboutReducer, aboutActions };
