import React, { useEffect, useCallback } from 'react';
import styles from './style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import globalSelectors from 'store/global/selectors';
import { globalActions } from 'store/global';
import pages from 'config/pages';
import useResize from 'hooks/useResize';
import useMeasure from 'hooks/useMeasure';
import useWindow from 'hooks/useWindow';
import useNavigation from 'hooks/useNavigation';
import { forceCheck } from 'react-lazyload';
import useScrollEffect from 'hooks/useScrollEffect';
import GaService from 'services/gaService';
import useHidden from 'hooks/useHidden';
import { PaletteModel } from 'models/ProjectModel';

const HomeScreen = React.lazy(() => import('screens/HomeScreen'));

interface Props {
  palette?: PaletteModel;
  category: string;
}

const Home: React.FC<Props> = (props) => {
  // #region variables
  const dispatch = useDispatch();

  const global = {
    theme: useSelector(globalSelectors.theme),
    visible: useSelector(globalSelectors.visible),
    page: useSelector(globalSelectors.page),
    name: useSelector(globalSelectors.name),
    title: useSelector(globalSelectors.title),
    homeImages: useSelector(globalSelectors.homeImages),
    selectedHomeImage: useSelector(globalSelectors.selectedHomeImage),
    shouldListenScrollingEvent: useSelector(
      globalSelectors.shouldListenScrollingEvent
    ),
  };

  const [breakpoint, isResponsive] = useResize();
  const isHidden = useHidden();
  const { goToHomeSection, goToProjectSection } = useNavigation(isResponsive);
  const [bindHomeScreen, homeScreenBounds] = useMeasure();
  const [windowOffset, currentWindowOffset] = useWindow();

  // #endregion

  // #region functions
  const _goToProjectSection = useCallback(() => {
    GaService.addButtonNavigationEvent('go to project section');
    goToProjectSection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResponsive, global.page]);

  const _scrollDown = useCallback(() => {
    GaService.addWheelNavigationEvent('down');
    goToProjectSection();
  }, [goToProjectSection]);

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
    if (isResponsive) {
      if (
        global.page !== pages.about &&
        windowOffset.yTop > window.innerHeight - 240
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
    dispatch(globalActions.setVisible(true));
    window.scrollTo({ top: 0 });
    // setHomeVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // #endregion

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
      <HomeScreen
        palette={props.palette}
        scrollingValue={homeScrollingValue}
        setRef={bindHomeScreen.ref}
        visible={global.visible}
        breakpoint={breakpoint}
        isResponsive={isResponsive}
        theme={global.theme}
        name={global.name}
        title={global.title}
        imgSrc={global.homeImages}
        selectedHomeImage={global.selectedHomeImage ?? 0}
        isHidden={isHidden}
      />
    </div>
  );
};

export default Home;
