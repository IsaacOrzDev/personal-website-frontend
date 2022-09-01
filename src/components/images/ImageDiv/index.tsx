import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { animated, useSpring } from 'react-spring';

interface Props {
  visible?: boolean;
  isCircle?: boolean;
  src: string;
}

const ImageDiv: React.FC<Props> = props => {
  const [isVisible, setIsVisible] = useState(false);

  const { visible } = useSpring({
    visible: isVisible ? 1 : 0,
  });

  useEffect(() => {
    if (props.visible) {
      setTimeout(() => setIsVisible(true), 1000);
    } else {
      setIsVisible(false);
    }
  }, [props.visible]);

  let containerClassName = `${styles.container}`;

  if (props.isCircle) {
    containerClassName += ` ${styles.circle}`;
  }

  return (
    <animated.div
      className={containerClassName}
      style={{
        backgroundImage: `url(${props.src})`,
        opacity: visible,
      }}
    />
  );
};

export default ImageDiv;
