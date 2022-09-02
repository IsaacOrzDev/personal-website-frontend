import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useSpring } from 'react-spring';

interface Props extends ThemeProps {
  children: React.ReactNode;
}

const StoryBackground: React.FC<Props> = (props) => {
  const { backgroundColor } = useSpring({
    backgroundColor: '#000000',
  });

  return (
    <animated.div className={styles.container} style={{ backgroundColor }}>
      {props.children}
    </animated.div>
  );
};

export default StoryBackground;
