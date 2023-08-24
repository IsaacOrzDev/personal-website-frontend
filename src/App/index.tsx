import React, { useEffect, useCallback, Suspense, useMemo } from 'react';
import withProviders from './withProviders';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
import useResize from 'hooks/useResize';
import pages from 'config/pages';

const Home = React.lazy(() => import('./routing/Home'));
const Works = React.lazy(() => import('./routing/Works'));

const queryClient = new QueryClient();

const App: React.FC = () => {
  const dispatch = useDispatch();

  const global = {
    theme: useSelector(globalSelectors.theme),
    dataLoaded: useSelector(globalSelectors.dataLoaded),
    shouldShowContent: useSelector(globalSelectors.shouldShowContent),
    homeImages: useSelector(globalSelectors.homeImages),
    selectedHomeImage: useSelector(globalSelectors.selectedHomeImage),
    page: useSelector(globalSelectors.page),
  };

  const project = {
    selectedIndex: useSelector(projectSelectors.selectedIndex),
    list: useSelector(projectSelectors.list),
  };

  const palette = useMemo(
    () =>
      global.selectedHomeImage !== null
        ? global.homeImages[global.selectedHomeImage].palette
        : undefined,
    [global.homeImages, global.selectedHomeImage]
  );

  const category = useMemo(
    () =>
      project.list.find((x, i) => i === project.selectedIndex)?.category ??
      'Projects',
    [project.list, project.selectedIndex]
  );

  const [, isResponsive] = useResize();

  const _finishLoading = useCallback(async () => {
    window.scrollTo({ top: 0 });
    dispatch(globalActions.setShouldShowContent(true));
    await TimeService.timeout(2600);
    dispatch(globalActions.setShouldListenScrollingEvent(true));
    if (!isResponsive) {
      dispatch(globalActions.setShouldShowMessageModal(true));
    }
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

  useEffect(() => {
    if (global.dataLoaded && global.page === pages.home) {
      dispatch(globalActions.randomSetSelectedHomeImage());
    }
  }, [dispatch, global.dataLoaded, global.page]);

  if (!global.shouldShowContent) {
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
      <QueryClientProvider client={queryClient}>
        <Router>
          <HeaderContainer category={category} />
          <Suspense fallback={null}>
            <Routes>
              <Route
                path={routes.home}
                element={<Home palette={palette} category={category} />}
              />
              <Route path={routes.projects} element={<Works />} />
              <Route path="*" element={<Navigate to={routes.home} replace />} />
            </Routes>
          </Suspense>
          {/* <MessageModalContainer /> */}
          <MenuModalContainer />
        </Router>
        <GridBackground theme={global.theme} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default withProviders(App);
