import { createSelector } from '@reduxjs/toolkit';
import { State } from '../state';

const visible = (state: State) => state.project.visible;
const selectedIndex = (state: State) => state.project.selectedIndex;
const list = (state: State) => state.project.list;
const years = (state: State) => state.project.years;
const dropdownVisible = (state: State) => state.project.dropdownVisible;
const listLength = createSelector(list, (list) => list.length);
const isLastItem = createSelector(
  [selectedIndex, listLength],
  (index, length) => index === length - 1
);

const selectCategories = createSelector([list], (list) =>
  list
    .filter(
      (item, index, arr) =>
        index === arr.findIndex((item2) => item2.category === item.category)
    )
    .map((item) => item.category)
);

const projectSelectors = {
  visible,
  selectedIndex,
  list,
  years,
  dropdownVisible,
  listLength,
  isLastItem,
  selectCategories,
};

export default projectSelectors;
