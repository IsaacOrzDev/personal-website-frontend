import React from 'react';
import styles from './style.module.scss';
import TitleText from 'components/text/TitleText';
import Words from 'components/text/Words';
import { ThemeProps } from 'types/Props';
import { animated, useSpring } from 'react-spring';
import { useDispatch } from 'react-redux';
import { globalActions } from 'store/global';

interface Props extends ThemeProps {
  visible?: boolean;
  isResponsive?: boolean;
  title: string;
  name: string;
  scrollingValue: number;
  color?: string;
  gradientColor?: string;
  backgroundImageUrl?: string;
}

const HomeTitle: React.FC<Props> = (props) => {
  const { scrollingValue, opacity } = useSpring({
    scrollingValue: props.scrollingValue,
    opacity: props.visible ? 1 : 0,
  });

  const dispatch = useDispatch();

  return (
    <animated.div
      className={styles.container}
      style={{
        display: props.isResponsive ? 'flex' : 'none',
        opacity,
      }}
      onClick={() => dispatch(globalActions.randomSetSelectedHomeImage())}
    >
      <TitleText
        theme={props.theme}
        fontSize={48}
        color={'tint'}
        gradientColor={props.gradientColor}
        className={styles.title}
        disableColorAnimation
      >
        <Words
          text={props.name}
          visible={props.isResponsive && props.visible}
          mode="words"
        />
      </TitleText>
      <TitleText
        theme={props.theme}
        fontSize={24}
        className={styles.name}
        color={props.color || 'tint'}
        disableColorAnimation
      >
        <Words
          text={props.title}
          visible={props.isResponsive && props.visible}
          mode="words"
        />
      </TitleText>
    </animated.div>
  );
};

export default HomeTitle;
