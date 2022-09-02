import React from 'react';
import styles from './style.module.scss';
import { animated, useSpring } from 'react-spring';
import { ThemeProps } from 'types/Props';

interface Props extends ThemeProps {
  visible?: boolean;
  width?: number;
  height?: number;
  percentage: number;
  barColor?: string;
}

const ProgressBar: React.FC<Props> = (props) => {
  const { percentage, total, backgroundColor } = useSpring({
    percentage: props.visible ? props.percentage : 0,
    total: props.visible ? props.width! : 0,
    backgroundColor: props.barColor,
  });

  return (
    <animated.div
      className={`${styles.container} ${styles[props.theme]}`}
      style={{
        width: total.to((v) => `${v}px`),
        height: `${props.height}px`,
      }}
    >
      <animated.div
        className={styles.bar}
        style={{ width: percentage.to((v) => `${v * 100}%`), backgroundColor }}
      />
    </animated.div>
  );
};

ProgressBar.defaultProps = {
  width: 100,
  height: 2,
};

export default ProgressBar;
