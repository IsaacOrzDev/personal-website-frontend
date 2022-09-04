import React, { useRef } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import ImageViewer from 'components/images/ImageViewer';
import breakpoints from 'config/breakpoints';
import { useRect } from '@reach/rect';

interface Props extends ThemeProps {
  src: string[];
  imgVisible?: boolean;
  breakpoint?: string;
  isLooping?: boolean;
  duration?: number;
  iframe?: {
    title: string;
    url: string;
  };
}

const maxWidth = 600;
const maxHeight = 400;
const maxBarHeight = 40;
const maxBarWidth = 8;
const maxHomeSize = 24;

const IPadFrame: React.FC<Props> = (props) => {
  let width = maxWidth;
  let height = maxHeight;
  let barHeight = maxBarHeight;
  let barWidth = maxBarWidth;
  let homeSize = maxHomeSize;

  if (props.breakpoint === breakpoints.lg) {
    width = maxWidth * 0.8;
    height = maxHeight * 0.8;
    barHeight = maxBarHeight * 0.8;
    barWidth = maxBarWidth * 0.8;
    homeSize = maxHomeSize * 0.8;
  }

  if (props.breakpoint === breakpoints.md) {
    width = maxWidth * 0.6;
    height = maxHeight * 0.6;
    barHeight = maxBarHeight * 0.6;
    barWidth = maxBarWidth * 0.6;
    homeSize = maxHomeSize * 0.6;
  }

  if (
    props.breakpoint === breakpoints.sm ||
    props.breakpoint === breakpoints.xs
  ) {
    width = maxWidth * 0.55;
    height = maxHeight * 0.55;
    barHeight = maxBarHeight * 0.55;
    barWidth = maxBarWidth * 0.55;
    homeSize = maxHomeSize * 0.55;
  }

  const contentRef = useRef(null);
  const contentRect = useRect(contentRef, { observe: !!props.iframe });

  return (
    <div
      className={`${styles.container} ${styles[props.theme]}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div
        className={`${styles.bar} ${styles.left}`}
        style={{ height: `${barWidth}px` }}
      />
      <div
        className={`${styles.bar} ${styles.right}`}
        style={{ height: `${barWidth}px` }}
      />
      <div
        className={`${styles.bar} ${styles.top}`}
        style={{ width: `${barHeight}px` }}
      />
      <div
        className={`${styles.bar} ${styles.bottom}`}
        style={{ width: `${barHeight}px` }}
      >
        <div
          className={styles.home}
          style={{ width: `${homeSize}px`, height: `${homeSize}px` }}
        />
      </div>
      <div
        className={styles.img}
        style={{ padding: `${barWidth}px ${barHeight}px` }}
      >
        {props.imgVisible && !!props.iframe && (
          <div className={styles.iframe_wrapper} ref={contentRef}>
            <iframe
              className={styles.iframe}
              title={props.iframe.title}
              src={props.iframe.url}
              width={(contentRect?.width ?? 0) * 2}
              height={(contentRect?.height ?? 0) * 2}
            />
          </div>
        )}
        {!props.iframe && (
          <ImageViewer
            resizeMode="cover"
            src={props.src}
            visible={props.imgVisible}
            isLooping={props.isLooping}
            duration={props.duration}
          />
        )}
      </div>
    </div>
  );
};

IPadFrame.defaultProps = {
  breakpoint: 'lg',
};

export default IPadFrame;
