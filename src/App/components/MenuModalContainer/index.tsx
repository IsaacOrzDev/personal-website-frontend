import React, { useCallback } from 'react';
import MenuModal from 'components/modals/MenuModeal';
import { useSelector } from 'react-redux';
import globalSelectors from 'store/global/selectors';
import useResize from 'hooks/useResize';
import useNavigation from 'hooks/useNavigation';
import pages from 'config/pages';
import GaService from 'services/gaService';

interface Props {}

const MenuModalContainer: React.FC<Props> = () => {
  const [, isResponsive] = useResize();
  const { goToHomeSection, goToProjectSection } = useNavigation(isResponsive);

  const _goToPlayground = useCallback(() => {
    GaService.pageView(pages.playground);
    window.open(`${window.location.origin}/${pages.playground}`, '_blank');
  }, []);

  const global = {
    theme: useSelector(globalSelectors.theme),
    page: useSelector(globalSelectors.page),
    shouldShowMenu: useSelector(globalSelectors.shouldShowMenu),
  };

  const menu = [
    { title: 'HOME', onClick: goToHomeSection },
    { title: 'WORKS', onClick: goToProjectSection },
    { title: 'PLAYGROUND', onClick: _goToPlayground },
  ];

  return (
    <MenuModal
      theme={global.theme}
      visible={global.shouldShowMenu}
      isResponsive={isResponsive}
      items={menu}
    />
  );
};

export default MenuModalContainer;
