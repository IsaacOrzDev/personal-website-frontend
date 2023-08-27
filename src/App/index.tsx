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
import LoadingScreen from 'screens/LoadingScreen';
import GaService from 'services/gaService';
import GridBackground from 'components/layout/GridBackground';
import dataService from 'services/dataService';
import projectSelectors from 'store/project/selectors';
import useResize from 'hooks/useResize';
import pages from 'config/pages';
import ImageViewerModal from './components/ImageViwerModal';

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

  const palette = useMemo(() => {
    if (global.page === pages.home) {
      return global.selectedHomeImage !== null
        ? global.homeImages[global.selectedHomeImage].palette
        : undefined;
    } else {
      return project.list.find((x, i) => i === project.selectedIndex)?.palette;
    }
  }, [
    global.homeImages,
    global.page,
    global.selectedHomeImage,
    project.list,
    project.selectedIndex,
  ]);

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

  const _detectTurningSystemLightTheme = (event: any) => {
    if (event.matches) {
      dispatch(globalActions.setTheme('light'));
    }
  };

  const _detectTurningSystemDarkTheme = (event: any) => {
    if (event.matches) {
      dispatch(globalActions.setTheme('dark'));
    }
  };
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
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      dispatch(globalActions.setTheme('light'));
    }
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', _detectTurningSystemLightTheme);
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', _detectTurningSystemDarkTheme);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: light)')
        .removeEventListener('change', _detectTurningSystemLightTheme);
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', _detectTurningSystemDarkTheme);
    };
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
          <ImageViewerModal />
        </Router>
        <GridBackground
          theme={global.theme}
          palette={palette}
          enableAnimation={!(global.page !== pages.home && isResponsive)}
          // enableAnimation
          seed={global.page === pages.projects ? 0.6 : 1}
          animationSpeed={global.page === pages.projects ? 'slow' : 'normal'}
          backgroundImageUrl={
            global.selectedHomeImage !== null
              ? global.homeImages[global.selectedHomeImage].url
              : ''
          }
          backgroundImageVisible={global.page === pages.home && isResponsive}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default withProviders(App);
