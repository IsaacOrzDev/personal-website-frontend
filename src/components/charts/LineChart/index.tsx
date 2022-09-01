import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useSpring } from 'react-spring';

interface Props extends ThemeProps {
  visible?: boolean;
}

const total = 1000;

const LineChart: React.FC<Props> = props => {
  const { visible } = useSpring({
    visible: props.visible ? 0 : total,
    config: {
      duration: 800,
    },
  });

  return (
    <svg viewBox="0 0 500 100" className={styles.chart}>
      <animated.polyline
        className={styles.line}
        fill="none"
        strokeDasharray={total}
        strokeDashoffset={visible}
        shapeRendering="auto"
        strokeWidth="2"
        points="
       00,120
       20,60
       40,80
       60,20
       80,80
       100,80
       120,60
       140,100
       160,90
       180,80
       200, 110
       220, 10
       240, 70
       260, 100
       280, 100
       300, 40
       320, 0
       340, 100
       360, 100
       380, 120
       400, 60
       420, 70
       440, 80
     "
      />
    </svg>
  );
};

export default LineChart;
