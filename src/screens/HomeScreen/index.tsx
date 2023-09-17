import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { ThemeProps } from 'types/Props';
import ImageBackground from 'screens/HomeScreen/components/ImageBackground';
import Marquee from 'screens/HomeScreen/components/Marquee';
import PageScrollingButton from 'components/buttons/PageScrollingButton';
import HomeTitle from './components/HomeTitle';
import PageSection from 'components/layout/PageSection';
import useVisibles from 'hooks/useVisibles';
import BreakpointService from 'services/breakpointService';
import { PaletteModel } from 'models/ProjectModel';
import { useSelector } from 'react-redux';
import projectSelectors from 'store/project/selectors';
import useNavigation from 'hooks/useNavigation';

interface Props extends ThemeProps {
  name: string;
  title: string;
  palette?: PaletteModel;
  scrollingValue: number;
  visible?: boolean;
  breakpoint?: string;
  isResponsive?: boolean;
  shouldShowScrollBtn?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRef?: React.RefObject<any>;
  imgSrc: Array<{ url: string; palette: PaletteModel }>;
  selectedHomeImage: number;
  isHidden?: boolean;
  onToggleTheme?: () => void;
}

const HomeScreen: React.FC<Props> = (props) => {
  const visibles = useVisibles([0, 200], props.visible);
  const [imageUrl, setImageUrl] = useState('');
  const { goToProjectSection } = useNavigation(props.isResponsive ?? false);

  useEffect(() => {
    setImageUrl(props.imgSrc[props.selectedHomeImage].url ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedHomeImage]);

  const project = {
    list: useSelector(projectSelectors.list),
    categories: useSelector(projectSelectors.selectCategories),
  };

  const nextItems = useMemo(() => {
    let items: any[] = [];

    if (props.isResponsive) {
      items.push({ text: `> Projects/`, onClick: () => goToProjectSection(0) });
      items.push({
        text: '> Chat/',
        onClick: async () => {
          window.open(import.meta.env.VITE_CHAT_URL!);
        },
      });
    } else {
      items = items.concat(
        project.categories.map((item) => ({
          text: `> ${item}/`,
          onClick: () =>
            goToProjectSection(
              project.list.findIndex((project) => project.category === item)
            ),
        }))
      );
    }

    return items;
  }, [
    goToProjectSection,
    project.categories,
    project.list,
    props.isResponsive,
  ]);

  return (
    <PageSection setRef={props.setRef}>
      <div className={styles.marquee}>
        <Marquee
          theme={props.theme}
          visible={visibles[0]}
          isLg={BreakpointService.isLg(props.breakpoint!)}
          isResponsive={props.isResponsive}
          paused={props.isResponsive || props.isHidden}
          name={props.name}
          title={props.title}
          color={props.palette ? props.palette[props.theme] : ''}
          gradientColor={props.palette?.gradient}
        />
      </div>
      <div>
        <HomeTitle
          theme={props.theme}
          visible={visibles[0]}
          scrollingValue={props.scrollingValue}
          isResponsive={props.isResponsive}
          title={props.title}
          name={props.name}
          color={props.palette ? props.palette[props.theme] : ''}
          gradientColor={props.palette?.gradient}
          backgroundImageUrl={imageUrl}
        />
        <ImageBackground
          theme={props.theme}
          visible={visibles[1]}
          isResponsive={props.isResponsive}
          isLooping={!props.isHidden}
          urls={[imageUrl]}
        />
      </div>
      <PageScrollingButton
        theme={props.theme}
        visible={visibles[0]}
        textVisible={visibles[0]}
        color={props.palette ? props.palette[props.theme] : ''}
        gradientColor={props.palette?.gradient}
        isResponsive={props.isResponsive}
        items={nextItems}
      />
    </PageSection>
  );
};

export default HomeScreen;
