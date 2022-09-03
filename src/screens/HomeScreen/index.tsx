import React, { useEffect, useState } from 'react';
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

interface Props extends ThemeProps {
  name: string;
  title: string;
  palette?: PaletteModel;
  category: string;
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
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const max = props.imgSrc.length;
    const min = 0;
    const index = Math.floor(Math.random() * (max - min) + min);
    setImageUrl(props.imgSrc[index] ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        text={`SEE MY ${props.category}`}
        visible={visibles[0]}
        textVisible={visibles[0]}
        color={props.palette ? props.palette[props.theme] : ''}
        gradientColor={props.palette?.gradient}
        onClick={props.onGoToNextSection}
      />
    </PageSection>
  );
};

export default HomeScreen;
