import React from 'react';
import styles from './style.module.scss';
import TitleText from 'components/text/TitleText';
import Words from 'components/text/Words';
import { ThemeProps } from 'types/Props';
import { animated, useSpring } from 'react-spring';
import ImageItem from 'components/images/ImageItem';

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

  return (
    <animated.div
      className={styles.container}
      style={{
        display: props.isResponsive ? 'flex' : 'none',
        opacity,
        backgroundImage:
          props.theme === 'dark'
            ? `linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(${props.backgroundImageUrl})`
            : `linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${props.backgroundImageUrl})`,
      }}
    >
      <TitleText
        theme={props.theme}
        fontSize={48}
        color={'tint'}
        gradientColor={props.gradientColor}
        className={styles.title}
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
