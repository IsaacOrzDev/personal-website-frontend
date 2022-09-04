import React from 'react';
import { animated, useSpring } from 'react-spring';
import { ThemeProps } from 'types/Props';
import styles from './style.module.scss';

interface Props extends ThemeProps {
  visible?: boolean;
  children: React.ReactNode;
}

export default function TagButton(props: Props) {
  const { visible } = useSpring({
    visible: props.visible ? 1 : 0,
  });

  return (
    <animated.button
      className={`${styles.tag} ${styles[props.theme]}`}
      style={{
        opacity: visible,
      }}
      disabled
    >
      {props.children}
    </animated.button>
  );
}
