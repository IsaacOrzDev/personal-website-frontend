import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useSpring } from 'react-spring';

interface Props extends ThemeProps {
  fontSize?: number;
  type?: 'normal' | 'invert' | 'tint';
  color?: string;
  children: React.ReactNode;
}

const DescriptionText: React.FC<Props> = (props) => {
  const color = props.color ?? '';

  const { fontSize } = useSpring({
    fontSize: props.fontSize!,
  });

  return (
    <div className={styles.container}>
      <animated.p
        className={`${styles.text} ${styles[props.theme]} ${
          styles[props.type!]
        }`}
        style={{
          fontSize: fontSize.interpolate((v) => `${v}px`),
          color,
        }}
      >
        {props.children}
      </animated.p>
      <p
        className={styles.placeholder}
        style={{
          fontSize: props.fontSize,
        }}
      >
        {props.children}
      </p>
    </div>
  );
};

DescriptionText.defaultProps = {
  fontSize: 18,
  type: 'normal',
};

export default DescriptionText;
