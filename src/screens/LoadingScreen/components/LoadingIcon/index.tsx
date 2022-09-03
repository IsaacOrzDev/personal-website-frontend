import React, { useState } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import TitleText from 'components/text/TitleText';
import useInterval from 'hooks/useInterval';
import TimeService from 'services/timeService';
import { animated, useSpring } from 'react-spring';
import { PaletteModel } from 'models/ProjectModel';

interface Props extends ThemeProps {
  palette?: PaletteModel;
  fontSize: number;
  visible?: boolean;
  duration: number;
  isDone?: boolean;
  onEnd?: () => void;
}

const LoadingIcon: React.FC<Props> = (props) => {
  const [lineVisible, setLineVisible] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const { visible } = useSpring({
    visible: props.isDone ? 0 : 1,
  });

  useInterval(
    async () => {
      if (props.isDone && !isEnd) {
        setIsEnd(true);
        setLineVisible(false);
        await TimeService.timeout(props.duration);
        props.onEnd && props.onEnd();
      } else {
        setLineVisible(!lineVisible);
      }
    },
    !isEnd ? props.duration : null
  );

  return (
    <animated.div className={styles.container} style={{ opacity: visible }}>
      <TitleText
        theme={props.theme}
        color={props.palette ? props.palette[props.theme] : 'tint'}
        gradientColor={props.palette?.gradient}
        fontSize={props.fontSize}
      >
        {'>'}
      </TitleText>
      <TitleText
        theme={props.theme}
        color={props.palette ? props.palette[props.theme] : 'tint'}
        gradientColor={props.palette?.gradient}
        fontSize={props.fontSize}
      >
        <span style={{ opacity: lineVisible ? 1 : 0 }}>_</span>
      </TitleText>
    </animated.div>
  );
};

export default LoadingIcon;
