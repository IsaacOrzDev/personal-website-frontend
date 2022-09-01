import React, { useState } from 'react';
import styles from './style.module.scss';
import { animated, useSpring } from 'react-spring';
import { useHover } from 'react-use-gesture';
import DescriptionText from 'components/text/DescriptionText';
import DownIcon from 'components/icons/DownIcon/Index';
import { ThemeProps } from 'types/Props';
import UpIcon from 'components/icons/UpIcon';
import Words from 'components/text/Words';

export interface ScrollingButtonProps extends ThemeProps {
  visible?: boolean;
  textVisible?: boolean;
  text: string;
  type?: 'down' | 'up';
  onClick?: () => void;
}

const ScrollingButton: React.FC<ScrollingButtonProps> = props => {
  const [isHovering, setIsHovering] = useState(false);

  const { visible, hovering } = useSpring({
    visible: props.visible ? 1 : 0,
    hovering: isHovering ? 1 : 0,
  });

  const bind = useHover(state => setIsHovering(state.hovering));

  if (props.type === 'up') {
    return (
      <animated.button
        {...bind()}
        className={`${styles.button} ${styles.up}`}
        style={{
          transform: visible.interpolate(v => `scale(${v})`),
        }}
        onClick={props.onClick}
      >
        <animated.div
          className={styles.content}
          style={{
            transform: hovering
              .interpolate({ range: [0, 1], output: [0, 8] })
              .interpolate(v => `translateY(${v}px)`),
          }}
        >
          <UpIcon theme={props.theme} />
          <div className={styles.text}>
            <DescriptionText theme={props.theme}>
              <Words
                text={props.text}
                visible={props.textVisible}
                mode="words"
              />
            </DescriptionText>
          </div>
        </animated.div>
      </animated.button>
    );
  }

  return (
    <animated.button
      {...bind()}
      className={`${styles.button} ${styles.down}`}
      style={{
        transform: visible.interpolate(v => `scale(${v})`),
      }}
      onClick={props.onClick}
    >
      <animated.div
        className={styles.content}
        style={{
          transform: hovering
            .interpolate({ range: [0, 1], output: [0, -8] })
            .interpolate(v => `translateY(${v}px)`),
        }}
      >
        <div className={styles.text}>
          <DescriptionText theme={props.theme}>
            <Words text={props.text} visible={props.textVisible} mode="words" />
          </DescriptionText>
        </div>
        <DownIcon theme={props.theme} />
      </animated.div>
    </animated.button>
  );
};

ScrollingButton.defaultProps = {
  type: 'down',
};

export default ScrollingButton;
