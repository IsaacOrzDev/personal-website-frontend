import React from 'react';
import MenuModal from 'components/modals/MenuModeal';
import { useSelector } from 'react-redux';
import globalSelectors from 'store/global/selectors';
import useResize from 'hooks/useResize';
import useNavigation from 'hooks/useNavigation';

interface Props {}

const MenuModalContainer: React.FC<Props> = () => {
  const [, isResponsive] = useResize();
  const { goToHomeSection, goToProjectSection } = useNavigation(isResponsive);

  const global = {
    theme: useSelector(globalSelectors.theme),
    page: useSelector(globalSelectors.page),
    shouldShowMenu: useSelector(globalSelectors.shouldShowMenu),
  };

  const menu = [
    { title: 'HOME', onClick: goToHomeSection },
    { title: 'WORKS', onClick: goToProjectSection },
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
