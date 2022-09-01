import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { animated, useSpring } from 'react-spring';
import useMeasure from 'hooks/useMeasure';
import { ThemeProps } from 'types/Props';
import ImageItem from 'components/images/ImageItem';
import useInterval from 'hooks/useInterval';

interface Props extends ThemeProps {
  urls: string[];
  visible?: boolean;
  isResponsive?: boolean;
  isLooping?: boolean;
}

const ImageBackground: React.FC<Props> = props => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [index, setIndex] = useState(0);

  const [bind, bounds] = useMeasure();

  const { visible } = useSpring({
    visible: props.visible ? 1 : 0,
  });

  useEffect(() => {
    if (bounds) {
      const size = bounds.height > bounds.width ? bounds.width : bounds.height;
      setWidth(size * 0.8);
      setHeight(size * 0.8);
    }
  }, [bounds]);

  useInterval(
    () => {
      setIndex(i => {
        return (i + 1) % props.urls.length;
      });
    },
    props.urls.length > 1 &&
      props.visible &&
      !props.isResponsive &&
      props.isLooping
      ? 12000
      : null
  );

  return (
    <div
      {...bind}
      className={`${styles.container} ${styles[props.theme]}`}
      style={props.isResponsive ? { display: 'none' } : {}}
    >
      <animated.div
        className={styles.bg}
        style={{
          width,
          height,
          opacity: visible,
        }}
      >
        {props.urls.map((x, i) => (
          <div key={x} className={styles.img}>
            <ImageItem
              visible={index === i}
              resizeMode="cover"
              src={x}
              isCircle={true}
            />
          </div>
        ))}
        {/* <ImageViewer
          visible={props.visible}
          resizeMode="cover"
          src={props.urls}
          isCircle={true}
          isDiv={false}
          isLooping={props.visible && !props.isResponsive}
          duration={12000}
          opacity={0.8}
        /> */}
      </animated.div>
    </div>
  );
};

export default ImageBackground;
