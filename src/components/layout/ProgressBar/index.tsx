import React from 'react';
import styles from './style.module.scss';
import { animated, useSpring } from 'react-spring';
import { ThemeProps } from 'types/Props';

interface Props extends ThemeProps {
  visible?: boolean;
  width?: number;
  height?: number;
  percentage: number;
}

const ProgressBar: React.FC<Props> = props => {
  const { percentage, total } = useSpring({
    percentage: props.visible ? props.percentage : 0,
    total: props.visible ? props.width! : 0,
  });

  return (
    <animated.div
      className={`${styles.container} ${styles[props.theme]}`}
      style={{
        width: total.interpolate(v => `${v}px`),
        height: `${props.height}px`,
      }}
    >
      <animated.div
        className={styles.bar}
        style={{ width: percentage.interpolate(v => `${v * 100}%`) }}
      />
    </animated.div>
  );
};

ProgressBar.defaultProps = {
  width: 100,
  height: 2,
};

export default ProgressBar;
