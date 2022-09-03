import React, { useEffect, useCallback, Suspense, useMemo } from 'react';
import withProviders from './withProviders';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import routes from 'config/routes';
import { useSelector, useDispatch } from 'react-redux';
import globalSelectors from 'store/global/selectors';
import { globalActions } from 'store/global';
import TimeService from 'services/timeService';
import MenuModalContainer from './components/MenuModalContainer';
import HeaderContainer from './components/HeaderContainer';
import MessageModalContainer from './components/MessageModalContainer';
import LoadingScreen from 'screens/LoadingScreen';
import GaService from 'services/gaService';
import GridBackground from 'components/layout/GridBackground';
import dataService from 'services/dataService';
import projectSelectors from 'store/project/selectors';

const Home = React.lazy(() => import('./routing/Home'));
const Works = React.lazy(() => import('./routing/Works'));

const App: React.FC = () => {
  const dispatch = useDispatch();

  const global = {
    theme: useSelector(globalSelectors.theme),
    dataLoaded: useSelector(globalSelectors.dataLoaded),
    shouldShowContent: useSelector(globalSelectors.shouldShowContent),
  };

  const project = {
    selectedIndex: useSelector(projectSelectors.selectedIndex),
    list: useSelector(projectSelectors.list),
  };

  const palette = useMemo(
    () => project.list.find((x, i) => i === project.selectedIndex)?.palette,
    [project.list, project.selectedIndex]
  );

  const category = useMemo(
    () =>
      project.list.find((x, i) => i === project.selectedIndex)?.category ??
      'Projects',
    [project.list, project.selectedIndex]
  );

  const _finishLoading = useCallback(async () => {
    window.scrollTo({ top: 0 });
    dispatch(globalActions.setShouldShowContent(true));
    await TimeService.timeout(2600);
    dispatch(globalActions.setShouldListenScrollingEvent(true));
    dispatch(globalActions.setShouldShowMessageModal(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (global.theme === 'dark') {
      document.body.style.backgroundColor = '#000000';
    } else {
      document.body.style.backgroundColor = '#ffffff';
    }
  }, [global.theme]);

  useEffect(() => {
    GaService.initialize();
    dispatch(dataService.fetchAllData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!global.shouldShowContent && !global.shouldShowContent) {
    return (
      <LoadingScreen
        theme={global.theme}
        palette={palette}
        isDone={global.dataLoaded}
        onEnd={_finishLoading}
      />
    );
  }

  return (
    <>
      <Router>
        <HeaderContainer category={category} />
        <Suspense fallback={null}>
          <Routes>
            <Route
              path={routes.home}
              element={<Home palette={palette} category={category} />}
            />
            <Route path={routes.projects} element={<Works />} />
          </Routes>
        </Suspense>
        <MessageModalContainer />
        <MenuModalContainer />
      </Router>
      <GridBackground theme={global.theme} />
    </>
  );
};

export default withProviders(App);
