import { ThunkAction } from '@reduxjs/toolkit';
import { projectActions } from 'store/project';
import { globalActions } from 'store/global';
import TimeService from 'services/timeService';

const fetchAllData = (): ThunkAction<void, any, any, any> => {
  return async (dispatch) => {
    let data = null;

    if (!!import.meta.env.VITE_API_URL) {
      try {
        data = await (await fetch(import.meta.env.VITE_API_URL)).json();
      } catch (err) {
        console.log('fetching data error', err);
      }
    } else {
      await TimeService.timeout(1000);
    }

    dispatch(globalActions.setName(data.home.name));
    dispatch(globalActions.setTitle(data.home.title));
    dispatch(globalActions.setHomeImages(data.home.images));
    dispatch(globalActions.setMessageContent(data.home.message));
    dispatch(projectActions.setYears([]));
    dispatch(projectActions.setList([...data.projects]));
    await TimeService.timeout(1000);
    dispatch(globalActions.setDataLoaded(true));
  };
};

const fetchTags = async () => {
  let data = [];

  if (!!import.meta.env.VITE_API_URL) {
    try {
      data = await (await fetch(`${import.meta.env.VITE_API_URL}/tags`)).json();
    } catch (err) {
      console.log('fetching data error', err);
    }
  } else {
    await TimeService.timeout(1000);
  }

  return data;
};

const wakeUpSubpages = (): ThunkAction<void, any, any, any> => {
  return () => {
    fetch(`${import.meta.env.VITE_SUBPAGE_URL}/api/wake-up`);
  };
};

const dataService = {
  fetchAllData,
  fetchTags,
  wakeUpSubpages,
};

export default dataService;
