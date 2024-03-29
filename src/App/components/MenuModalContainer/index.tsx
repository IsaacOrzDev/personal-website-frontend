import React, { useMemo } from 'react';
import MenuModal from 'components/modals/MenuModeal';
import { useSelector } from 'react-redux';
import globalSelectors from 'store/global/selectors';
import useResize from 'hooks/useResize';
import useNavigation from 'hooks/useNavigation';
import projectSelectors from 'store/project/selectors';

interface Props {}

const MenuModalContainer: React.FC<Props> = () => {
  const [, isResponsive] = useResize();
  const { goToHomeSection, goToProjectSection } = useNavigation(isResponsive);

  const global = {
    theme: useSelector(globalSelectors.theme),
    page: useSelector(globalSelectors.page),
    shouldShowMenu: useSelector(globalSelectors.shouldShowMenu),
  };

  const project = {
    list: useSelector(projectSelectors.list),
    categories: useSelector(projectSelectors.selectCategories),
  };

  const menu = useMemo(() => {
    let items = [{ title: 'HOME', onClick: goToHomeSection }];
    if (isResponsive) {
      items.push({
        title: 'PROJECTS',
        onClick: () => goToProjectSection(0),
      });
    } else {
      items = items.concat([
        ...project.categories.map((item) => ({
          title: item,
          onClick: () =>
            goToProjectSection(
              project.list.findIndex((project) => project.category === item)
            ),
        })),
      ]);
    }
    if (!!import.meta.env.VITE_SUBPAGE_URL) {
      items.push({
        title: 'Gallery',
        onClick: async () => {
          window.open(
            `${import.meta.env.VITE_SUBPAGE_URL}/gallery?theme=${
              global.theme
            }&folder=home/&name=personal website`
          );
        },
      });
    }
    if (
      import.meta.env.VITE_ENABLE_CHAT_BOT === 'true' &&
      !!import.meta.env.VITE_CHAT_URL
    ) {
      items.push({
        title: 'Chat',
        onClick: async () => {
          window.open(import.meta.env.VITE_CHAT_URL);
        },
      });
    }
    if (!!import.meta.env.VITE_DRAWINGS_URL) {
      items.push({
        title: 'DRAWINGS',
        onClick: async () => {
          window.open(`${import.meta.env.VITE_DRAWINGS_URL}`);
        },
      });
    }

    return items;
  }, [
    goToHomeSection,
    isResponsive,
    goToProjectSection,
    project.categories,
    project.list,
    global.theme,
  ]);

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
