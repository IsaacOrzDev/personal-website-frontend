import React, { useEffect, useCallback, useState, Suspense } from 'react';
import styles from './style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import globalSelectors from 'store/global/selectors';
import { globalActions } from 'store/global';
import pages from 'config/pages';
import aboutSelectors from 'store/about/selectors';
import useResize from 'hooks/useResize';
import useMeasure from 'hooks/useMeasure';
import useWindow from 'hooks/useWindow';
import { aboutActions } from 'store/about';
import useNavigation from 'hooks/useNavigation';
import LazyLoad, { forceCheck } from 'react-lazyload';
import useScrollEffect from 'hooks/useScrollEffect';
import GaService from 'services/gaService';
import useHidden from 'hooks/useHidden';

const HomeScreen = React.lazy(() => import('screens/HomeScreen'));
const AboutScreen = React.lazy(() => import('screens/AboutScreen'));

const Home: React.FC = () => {
  // #region variables
  const dispatch = useDispatch();

  const global = {
    theme: useSelector(globalSelectors.theme),
    page: useSelector(globalSelectors.page),
    name: useSelector(globalSelectors.name),
    title: useSelector(globalSelectors.title),
    homeImages: useSelector(globalSelectors.homeImages),
    shouldListenScrollingEvent: useSelector(
      globalSelectors.shouldListenScrollingEvent
    ),
  };

  const about = {
    visible: useSelector(aboutSelectors.visible),
    skillSets: useSelector(aboutSelectors.skillSets),
    description: useSelector(aboutSelectors.description),
  };

  const [breakpoint, isResponsive] = useResize();
  const isHidden = useHidden();
  const [goToHomeSection, goToAboutSection, goToProjectSection] = useNavigation(
    isResponsive
  );
  const [bindHomeScreen, homeScreenBounds] = useMeasure();
  const [windowOffset, currentWindowOffset] = useWindow();

  const [homeVisible, setHomeVisible] = useState(false);
  // #endregion

  // #region functions
  const _goToAboutSection = useCallback(() => {
    GaService.addButtonNavigationEvent('go to about section');
    goToAboutSection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResponsive, global.page]);

  const _goToProjectSection = useCallback(() => {
    GaService.addButtonNavigationEvent('go to project section');
    goToProjectSection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResponsive, global.page]);

  const _scrollDown = useCallback(() => {
    GaService.addWheelNavigationEvent('down');
    if (global.page === pages.home) {
      goToAboutSection();
    } else if (global.page === pages.about) {
      goToProjectSection();
    }
  }, [global.page, goToAboutSection, goToProjectSection]);

  const _scrollUp = useCallback(() => {
    GaService.addWheelNavigationEvent('up');
    if (global.page === pages.about) {
      goToHomeSection();
    }
  }, [global.page, goToHomeSection]);

  // #endregion

  // #region useEffect
  useScrollEffect(
    global.shouldListenScrollingEvent && !isResponsive,
    _scrollDown,
    _scrollUp
  );

  useEffect(() => {
    if (!about.visible && windowOffset.yTop > window.innerHeight - 240) {
      dispatch(aboutActions.setVisible(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowOffset.yTop]);

  useEffect(() => {
    if (isResponsive) {
      if (
        global.page !== pages.about &&
        windowOffset.yTop > window.innerHeight - 240
        // windowOffset.yTop < projectScreenBounds.y - 240
      ) {
        dispatch(globalActions.setPage(pages.about));
      } else if (
        global.page !== pages.home &&
        windowOffset.yTop < window.innerHeight - 240
      ) {
        dispatch(globalActions.setPage(pages.home));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWindowOffset.yTop]);

  useEffect(() => {
    if (isResponsive) {
      document.body.style.position = 'relative';
      forceCheck();
    } else {
      document.body.style.position = 'fixed';
    }
  }, [isResponsive]);

  useEffect(() => {
    window.scroll(0, 0);
    setHomeVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // #endregion

  const isFloating = windowOffset.yTop > 60;

  let translateY = 0;
  if (!isResponsive) {
    if (global.page === pages.home) {
      translateY = 0;
    } else if (global.page === pages.about) {
      translateY = (-1 * document.body.scrollHeight) / 2;
    }
  }

  let homeScrollingValue = 0;
  if (homeScreenBounds) {
    homeScrollingValue = windowOffset.yTop / (homeScreenBounds.height / 2);
  }

  return (
    <div
      className={styles.container}
      style={{
        transform: `translateY(${translateY}px)`,
      }}
    >
      <Suspense fallback={null}>
        <HomeScreen
          scrollingValue={homeScrollingValue}
          setRef={bindHomeScreen.ref}
          visible={homeVisible}
          breakpoint={breakpoint}
          isResponsive={isResponsive}
          theme={global.theme}
          name={global.name}
          title={global.title}
          imgSrc={global.homeImages}
          isHidden={isHidden}
          shouldShowScrollBtn={!isFloating}
          onGoToNextSection={_goToAboutSection}
        />
      </Suspense>
      <LazyLoad once height={'100vh'}>
        <Suspense fallback={null}>
          <AboutScreen
            visible={about.visible}
            theme={global.theme}
            title="ABOUT ME"
            skillSets={about.skillSets}
            description={about.description}
            isResponsive={isResponsive}
            isHidden={isHidden}
            onGoToNextSection={_goToProjectSection}
          />
        </Suspense>
      </LazyLoad>
    </div>
  );
};

export default Home;
