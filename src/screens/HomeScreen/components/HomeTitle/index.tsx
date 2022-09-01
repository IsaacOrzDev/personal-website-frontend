import React from 'react';
import styles from './style.module.scss';
import TitleText from 'components/text/TitleText';
import Words from 'components/text/Words';
import { ThemeProps } from 'types/Props';
import { animated, useSpring } from 'react-spring';

interface Props extends ThemeProps {
  visible?: boolean;
  isResponsive?: boolean;
  title: string;
  name: string;
  scrollingValue: number;
}

const HomeTitle: React.FC<Props> = props => {
  const { scrollingValue } = useSpring({
    scrollingValue: props.scrollingValue,
  });

  return (
    <animated.div
      className={styles.container}
      style={{
        display: props.isResponsive ? 'flex' : 'none',
        // transform: scrollingValue
        //   .interpolate({ range: [0, 1], output: [0, 300] })
        //   .interpolate(v => `translateY(${v}px)`),
        opacity: scrollingValue.interpolate({ range: [0, 1], output: [1, 0] }),
      }}
    >
      <TitleText
        theme={props.theme}
        fontSize={48}
        color="tint"
        className={styles.title}
      >
        <Words
          text={props.name}
          visible={props.isResponsive && props.visible}
          mode="words"
        />
      </TitleText>
      <TitleText theme={props.theme} fontSize={24} className={styles.name}>
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
