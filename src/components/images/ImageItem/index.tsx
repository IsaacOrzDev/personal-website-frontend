import React, { useState, useCallback } from 'react';
import styles from './style.module.scss';
import { animated, useSpring } from 'react-spring';

interface Props {
  src: string;
  resizeMode: 'cover' | 'contain';
  visible?: boolean;
  isCircle?: boolean;
}

const ImageItem: React.FC<Props> = props => {
  const [isVisible, setIsVisible] = useState(false);
  const { visible } = useSpring({
    visible: props.visible && isVisible ? 1 : 0,
  });

  const _onLoaded = useCallback(() => {
    if (!isVisible) {
      setIsVisible(true);
    }
  }, [isVisible]);

  let containerClassName = `${styles.content} ${styles[props.resizeMode]}`;

  if (props.isCircle) {
    containerClassName += ` ${styles.circle}`;
  }

  return (
    <animated.img
      className={containerClassName}
      onLoad={_onLoaded}
      style={{
        opacity: visible,
      }}
      src={props.src}
    />
  );
};

export default ImageItem;
