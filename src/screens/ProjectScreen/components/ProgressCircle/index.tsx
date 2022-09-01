import React, { useCallback } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useSpring, config, interpolate } from 'react-spring';

interface Props extends ThemeProps {
  percentage: number;
  strokeWidth?: number;
  width: number;
  visible?: boolean;
}

const ProgressCircle: React.FC<Props> = props => {
  const { size, barWidth, visible } = useSpring({
    size: props.width,
    // barWidth: props.strokeWidth! * (props.percentage / 100),
    barWidth: props.strokeWidth!,
    visible: props.visible ? 1 : 0,
  });

  const { percentage } = useSpring({
    percentage: props.visible ? props.percentage : 0,
    config: config.slow,
  });

  const _calculateRadius = useCallback((s: number, w: number) => {
    return (s - 2 * w) / 2;
  }, []);

  const _calculateCircumference = useCallback((r: number) => {
    return Math.PI * (r * 2);
  }, []);

  const _calculateDashoffset = useCallback((c: number, p: number) => {
    const value = isNaN(p) || p > 100 || p < 0 ? 100 : p;

    const pct = ((100 - value) / 100) * c;
    return pct;
  }, []);

  const radius = interpolate([size, barWidth], (s: number, sw: number) =>
    _calculateRadius(s, sw)
  );
  const cx = interpolate([radius, barWidth], (r, sw) => r + sw);
  const circumference = radius.interpolate((v: number) =>
    _calculateCircumference(v)
  );
  const offset = interpolate([circumference, percentage], (c, p) =>
    _calculateDashoffset(c, p)
  );

  return (
    <animated.div
      style={{ transform: visible.interpolate(v => `scale(${v})`) }}
    >
      <div className={styles.container}>
        <animated.svg
          className={styles.svg}
          id="svg"
          width={size}
          height={size}
          shapeRendering="auto"
        >
          <animated.circle
            className={`${styles.empty} ${styles[props.theme]}`}
            r={radius}
            cx={cx}
            cy={cx}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset="0"
            strokeWidth={barWidth}
            shapeRendering="auto"
          />
          <animated.circle
            className={`${styles.bar} ${styles[props.theme]}`}
            r={radius}
            cx={cx}
            cy={cx}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeWidth={barWidth}
            shapeRendering="auto"
          />
        </animated.svg>
      </div>
    </animated.div>
  );
};

ProgressCircle.defaultProps = {
  strokeWidth: 8,
};

export default ProgressCircle;
