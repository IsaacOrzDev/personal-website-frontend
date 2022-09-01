import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import ImageItem from '../ImageItem';
import { animated, useTransition, config } from 'react-spring';
import useInterval from 'hooks/useInterval';
import ImageDiv from '../ImageDiv';

interface Props {
  src: string[];
  resizeMode: 'cover' | 'contain';
  visible?: boolean;
  isColorful?: boolean;
  isLooping?: boolean;
  isCircle?: boolean;
  isDiv?: boolean;
  duration?: number;
  opacity?: number;
}

const ImageViewer: React.FC<Props> = (props) => {
  const [index, setIndex] = useState(0);

  const src = props.src.length > 0 ? props.src[index] : '';

  const transitions = useTransition(props.src[index], {
    from: {
      opacity: props.opacity!,
    },
    enter: {
      opacity: props.opacity!,
    },
    leave: {
      opacity: 0,
    },
    config: config.molasses,
  });

  useInterval(
    () => {
      setIndex((i) => {
        return (i + 1) % props.src.length;
      });
    },
    props.visible && props.isLooping && props.src.length > 1
      ? props.duration!
      : null
  );

  useEffect(() => {
    if (!props.visible) {
      setIndex(0);
    }
  }, [props.visible]);

  if (props.src.length > 1) {
    return (
      <div className={styles.container}>
        {transitions(({ opacity }, item) => (
          <animated.div className={styles.content} style={{ opacity }}>
            {props.isDiv && (
              <ImageDiv
                src={item}
                visible={props.visible}
                isCircle={props.isCircle}
              />
            )}
            {!props.isDiv && (
              <ImageItem
                resizeMode={props.resizeMode}
                src={item}
                visible={props.visible}
                isCircle={props.isCircle}
              />
            )}
          </animated.div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ImageItem
        src={src}
        visible={props.visible}
        isCircle={props.isCircle}
        resizeMode={props.resizeMode}
      />
    </div>
  );
};

ImageViewer.defaultProps = {
  duration: 6000,
  opacity: 1,
};

export default ImageViewer;
