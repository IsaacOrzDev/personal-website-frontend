import { ThunkAction } from '@reduxjs/toolkit';
import { projectActions } from 'store/project';
import { aboutActions } from 'store/about';
import { globalActions } from 'store/global';
import TimeService from 'services/timeService';
import data from 'data';

const fetchAllData = (): ThunkAction<void, any, any, any> => {
  return async dispatch => {
    // you can fetch data from api instead of loading data from local data.ts file
    dispatch(globalActions.setName(data.home.name));
    dispatch(globalActions.setTitle(data.home.title));
    dispatch(globalActions.setHomeImages(data.home.images));
    dispatch(globalActions.setCookieMsgContent(data.home.message));
    dispatch(aboutActions.setSkillSets([...data.about.skillSets]));
    dispatch(aboutActions.setDescription([...data.about.descriptionList]));
    dispatch(projectActions.setYears([]));
    dispatch(projectActions.setList([...data.projects]));
    await TimeService.timeout(1000);
    dispatch(globalActions.setDataLoaded(true));
  };
};

const dataService = {
  fetchAllData,
};

export default dataService;
