import React from 'react';
import styles from './styles.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useSpring } from 'react-spring';

interface Props extends ThemeProps {
  visible?: boolean;
}

const Dash: React.FC<Props> = props => {
  const { visible } = useSpring({
    visible: props.visible ? 1 : 0,
  });

  return (
    <div className={styles.container}>
      <div className={styles.placeholder} />
      <animated.div
        className={`${styles.dash} ${styles[props.theme]}`}
        style={{
          width: visible.interpolate({
            range: [0, 1],
            output: ['0px', '100px'],
          }),
        }}
      />
    </div>
  );
};

export default Dash;
