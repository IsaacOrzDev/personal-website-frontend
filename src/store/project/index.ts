import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialProjectsState } from './state';
import ProjectModel from 'models/ProjectModel';
import reducerNames from 'config/reducerNames';

const slice = createSlice({
  name: reducerNames.project,
  initialState: initialProjectsState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setSelectedIndex: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
    setList: (state, action: PayloadAction<ProjectModel[]>) => {
      state.list = action.payload;
    },
    setItem: (
      state,
      action: PayloadAction<{ data: ProjectModel; index: number }>
    ) => {
      state.list[action.payload.index] = action.payload.data;
    },
    setYears: (state, action: PayloadAction<string[]>) => {
      state.years = action.payload;
    },
    setDropdownVisible: (state, action: PayloadAction<boolean>) => {
      state.dropdownVisible = action.payload;
    },
    plus: (state) => {
      state.selectedIndex += 1;
    },
    minus: (state) => {
      state.selectedIndex -= 1;
    },
    setSelectedIndexByProject: (
      state,
      action: PayloadAction<string | null>
    ) => {
      const index =
        action.payload !== null
          ? state.list.findIndex((item) => item.title.includes(action.payload!))
          : -1;
      if (index === -1) {
        state.selectedIndex = 0;
      } else {
        state.selectedIndex = index;
      }
      state.visible = true;
    },
  },
});

const { reducer: projectReducer, actions: projectActions } = slice;

export { projectReducer, projectActions };
