import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import globalSelectors from 'store/global/selectors';
import pages from 'config/pages';
import { globalActions } from 'store/global';
import Header from 'components/header/Header';
import useWindow from 'hooks/useWindow';
import useResize from 'hooks/useResize';

interface Props {
  category: string;
}

const HeaderContainer: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [windowOffset, ,] = useWindow();
  const [, isResponsive] = useResize();
  const [categoryText, setCategoryText] = useState('');

  const global = {
    theme: useSelector(globalSelectors.theme),
    name: useSelector(globalSelectors.name),
    page: useSelector(globalSelectors.page),
    dataLoaded: useSelector(globalSelectors.dataLoaded),
    shouldShowContent: useSelector(globalSelectors.shouldShowContent),
    shouldShowMenu: useSelector(globalSelectors.shouldShowMenu),
    shouldShowMessageModal: useSelector(globalSelectors.shouldShowMessageModal),
    shouldListenScrollingEvent: useSelector(
      globalSelectors.shouldListenScrollingEvent
    ),
  };

  const [shouldShowTitle, setShouldShowTitle] = useState(false);
  const [currentPage, setCurrentPage] = useState(pages.home);
  const [visible, setVisible] = useState(false);

  const _toggleMenu = useCallback(() => {
    dispatch(globalActions.toggleShouldShowMenu());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _toggleTheme = useCallback(() => {
    if (global.theme === 'dark') {
      dispatch(globalActions.setTheme('light'));
    } else {
      dispatch(globalActions.setTheme('dark'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global.theme]);

  useEffect(() => {
    setShouldShowTitle(false);
    setTimeout(() => {
      setCurrentPage(global.page);
      setShouldShowTitle(true);
    }, 800);
  }, [global.page]);

  useEffect(() => {
    setShouldShowTitle(false);
    setTimeout(() => {
      setCategoryText(props.category);
      setShouldShowTitle(true);
    }, 800);
  }, [props.category]);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  const isFloating = windowOffset.yTop > 60 && !global.shouldShowMenu;

  let title = global.name;
  if (currentPage === pages.projects) {
    title = isResponsive ? 'PROJECTS' : categoryText;
  }

  return (
    <Header
      theme={global.theme}
      title={title}
      visible={global.shouldShowContent}
      buttonVisible={visible && !global.shouldShowMenu}
      menuButtonVisible={visible}
      textVisible={!global.shouldShowMenu && shouldShowTitle}
      isMenuOpened={global.shouldShowMenu}
      isResponsive={isResponsive}
      isFloating={isFloating}
      onToggleTheme={_toggleTheme}
      onToggleMenu={_toggleMenu}
    />
  );
};

export default HeaderContainer;
