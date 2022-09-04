import { ThunkAction } from '@reduxjs/toolkit';
import { projectActions } from 'store/project';
import { globalActions } from 'store/global';
import TimeService from 'services/timeService';
import data from 'data';

const fetchAllData = (): ThunkAction<void, any, any, any> => {
  return async (dispatch) => {
    // TODO: you can fetch data from api or...
    await TimeService.timeout(1000);
    dispatch(globalActions.setName(data.home.name));
    dispatch(globalActions.setTitle(data.home.title));
    dispatch(globalActions.setHomeImages(data.home.images));
    dispatch(globalActions.setMessageContent(data.home.message));
    dispatch(projectActions.setYears([]));
    dispatch(projectActions.setList([...data.projects]));
    await TimeService.timeout(1500);
    dispatch(globalActions.setDataLoaded(true));
  };
};

const dataService = {
  fetchAllData,
};

export default dataService;
