import React, { useEffect } from 'react';
import styles from './style.module.scss';
import { useSpring, animated } from 'react-spring';
import { ThemeProps } from 'types/Props';

interface Props extends ThemeProps {
  yBottom: number;
  visible?: boolean;
  color?: string;
}

const ParallaxBar: React.FC<Props> = (props) => {
  const { visible, backgroundColor } = useSpring({
    visible: props.visible ? 1 : 0,
    backgroundColor: props.color ?? '',
  });

  const [spring, setSpring] = useSpring(() => ({ value: 0 }));

  useEffect(() => {
    const percentage = props.yBottom / document.body.offsetHeight;
    setSpring({ value: percentage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.yBottom]);

  return (
    <animated.div
      className={`${styles.container} ${styles[props.theme]}`}
      style={{
        opacity: visible,
      }}
    >
      <animated.div
        className={styles.progress}
        style={{
          height: spring.value.interpolate((v) => `${v * 100}vh`),
          // backgroundColor,
        }}
      />
    </animated.div>
  );
};

export default ParallaxBar;
