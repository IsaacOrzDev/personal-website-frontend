import React, { useState } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useSpring, config } from 'react-spring';
import { useHover } from 'react-use-gesture';

interface Props extends ThemeProps {
  visible?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

const HeaderMenuButton: React.FC<Props> = props => {
  const [isHovering, setIsHovering] = useState(false);

  const { visible } = useSpring({
    visible: props.visible ? 1 : 0,
  });

  const firstLineProps = useSpring({
    transform: props.isOpen ? 'rotate(135deg)' : 'rotate(0deg)',
    top: isHovering && !props.isOpen ? '-10px' : props.isOpen ? '0px' : '-8px',
    config: config.gentle,
  });

  const secondLineProps = useSpring({
    opacity: props.isOpen ? 0 : 1,
    top: 0,
    config: config.gentle,
  });

  const thirdLineProps = useSpring({
    transform: props.isOpen ? 'rotate(-135deg)' : 'rotate(0deg)',
    top: isHovering && !props.isOpen ? '10px' : props.isOpen ? '0px' : '8px',
    config: config.gentle,
  });

  const bind = useHover(state => setIsHovering(state.hovering));

  return (
    <animated.button
      {...bind()}
      className={`${styles.container} ${styles[props.theme]}`}
      style={{ transform: visible.interpolate(v => `scale(${v})`) }}
      onClick={props.onToggle}
    >
      <div className={styles.icon}>
        <animated.div
          className={`${styles.line} ${styles.first}`}
          style={firstLineProps}
        />
        <animated.div
          className={`${styles.line} ${styles.second}`}
          style={secondLineProps}
        />
        <animated.div
          className={`${styles.line} ${styles.second}`}
          style={thirdLineProps}
        />
      </div>
    </animated.button>
  );
};

export default HeaderMenuButton;
