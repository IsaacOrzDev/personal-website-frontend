import React from 'react';
import styles from './style.module.scss';
import { useSpring, animated, config, interpolate } from 'react-spring';

const size = 30;

interface Props {
  x: number;
  y: number;
}

const Cursor: React.FC<Props> = props => {
  const spring = useSpring({
    x: props.x,
    y: props.y,
    config: {
      tension: 300,
    },
  });
  return (
    <animated.div
      className={styles.container}
      style={{
        transform: interpolate(
          [spring.x, spring.y],
          (x, y) => `translate(${x - size / 2}px, ${y - size / 2}px)`
        ),
        // transform: `translate(${props.x - size / 2}px, ${props.y -
        //   size / 2}px)`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default Cursor;
