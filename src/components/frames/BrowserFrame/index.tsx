import React, { useRef } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import ImageViewer from 'components/images/ImageViewer';
import breakpoints from 'config/breakpoints';
import { useRect } from '@reach/rect';

const maxWidth = 1080 / 2;
const maxHeight = 940 / 2;
const maxResponsiveWidth = 375 / 2;
const maxResponsiveHeight = 812 / 2;

const maxBarHeight = 24;
const maxPointSize = 8;

interface Props extends ThemeProps {
  responsive?: boolean;
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

const BrowserFrame: React.FC<Props> = (props) => {
  let containerClassName = `${styles.container} ${styles[props.theme]}`;
  if (props.responsive) {
    containerClassName += ` ${styles.responsive}`;
  }

  let width = maxWidth;
  let height = maxHeight;
  let responsiveWidth = maxResponsiveWidth;
  let responsiveHeight = maxResponsiveHeight;
  let barHeight = maxBarHeight;
  let pointSize = maxPointSize;

  if (props.breakpoint === breakpoints.lg) {
    width = maxWidth * 0.8;
    height = maxHeight * 0.8;
    responsiveWidth = maxResponsiveWidth * 0.8;
    responsiveHeight = maxResponsiveHeight * 0.8;
    barHeight = maxBarHeight * 0.8;
    pointSize = maxPointSize * 0.8;
  }

  if (props.breakpoint === breakpoints.md) {
    width = maxWidth * 0.6;
    height = maxHeight * 0.6;
    responsiveWidth = maxResponsiveWidth * 0.6;
    responsiveHeight = maxResponsiveHeight * 0.6;
    barHeight = maxBarHeight * 0.6;
    pointSize = maxPointSize * 0.6;
  }

  if (
    props.breakpoint === breakpoints.sm ||
    props.breakpoint === breakpoints.xs
  ) {
    width = maxWidth * 0.5;
    height = maxHeight * 0.5;
    responsiveWidth = maxResponsiveWidth * 0.5;
    responsiveHeight = maxResponsiveHeight * 0.5;
    barHeight = maxBarHeight * 0.5;
    pointSize = maxPointSize * 0.5;
  }

  const frameRef = useRef(null);
  const frameRect = useRect(frameRef, { observe: !!props.iframe });

  const contentWidth = frameRect?.width ?? 0;
  const contentHeight = (frameRect?.height ?? 0) - barHeight;

  return (
    <div
      className={containerClassName}
      style={{
        width: props.responsive ? `${responsiveWidth}px` : `${width}px`,
        height: props.responsive ? `${responsiveHeight}px` : `${height}px`,
      }}
      ref={frameRef}
    >
      <div className={styles.bar} style={{ height: `${barHeight}px` }}>
        <div
          className={styles.point}
          style={{
            width: `${pointSize}px`,
            height: `${pointSize}px`,
            marginLeft: `${pointSize}px`,
          }}
        />
        <div
          className={styles.point}
          style={{
            width: `${pointSize}px`,
            height: `${pointSize}px`,
            marginLeft: `${pointSize}px`,
          }}
        />
        <div
          className={styles.point}
          style={{
            width: `${pointSize}px`,
            height: `${pointSize}px`,
            marginLeft: `${pointSize}px`,
          }}
        />
      </div>
      {props.imgVisible && !!props.iframe && (
        <div className={styles.iframe_wrapper}>
          <iframe
            className={styles.iframe}
            title={props.iframe.title}
            src={props.iframe.url}
            width={contentWidth * 2}
            height={contentHeight * 2}
          />
        </div>
      )}

      {props.imgVisible && !props.iframe && (
        <ImageViewer
          resizeMode="cover"
          src={props.src}
          visible={props.imgVisible}
          isLooping={props.isLooping}
          duration={props.duration}
        />
      )}
    </div>
  );
};

BrowserFrame.defaultProps = {
  breakpoint: 'lg',
};

export default BrowserFrame;
