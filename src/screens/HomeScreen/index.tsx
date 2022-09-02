import React from 'react';
import styles from './styles.module.scss';
import { ThemeProps } from 'types/Props';
import ImageBackground from 'screens/HomeScreen/components/ImageBackground';
import Marquee from 'screens/HomeScreen/components/Marquee';
import PageScrollingButton from 'components/buttons/PageScrollingButton';
import HomeTitle from './components/HomeTitle';
import PageSection from 'components/layout/PageSection';
import useVisibles from 'hooks/useVisibles';
import BreakpointService from 'services/breakpointService';

interface Props extends ThemeProps {
  name: string;
  title: string;
  scrollingValue: number;
  visible?: boolean;
  breakpoint?: string;
  isResponsive?: boolean;
  shouldShowScrollBtn?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRef?: React.RefObject<any>;
  imgSrc: string[];
  isHidden?: boolean;
  onToggleTheme?: () => void;
  onGoToNextSection?: () => void;
}

const HomeScreen: React.FC<Props> = (props) => {
  const visibles = useVisibles([800, 1200], props.visible);

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
        />
        <ImageBackground
          theme={props.theme}
          visible={visibles[1]}
          isResponsive={props.isResponsive}
          isLooping={!props.isHidden}
          urls={props.imgSrc}
        />
      </div>
      <PageScrollingButton
        theme={props.theme}
        text={'SEE MY WORKS'}
        visible={visibles[0]}
        textVisible={visibles[0]}
        onClick={props.onGoToNextSection}
      />
    </PageSection>
  );
};

export default HomeScreen;
