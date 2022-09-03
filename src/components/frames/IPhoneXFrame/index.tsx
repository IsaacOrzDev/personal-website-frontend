import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import ImageViewer from 'components/images/ImageViewer';
import BreakpointService from 'services/breakpointService';

interface Props extends ThemeProps {
  src: string[];
  imgVisible?: boolean;
  breakpoint?: string;
  isLooping?: boolean;
  duration?: number;
}

const maxWidth = 240;
const maxBorderRadius = 32;
const maxBarHeight = 16;

const IPhoneXFrame: React.FC<Props> = (props) => {
  const isLg = BreakpointService.isLg(props.breakpoint!);
  const isMd = BreakpointService.isMd(props.breakpoint!);

  let width = maxWidth;
  let borderRadius = maxBorderRadius;
  let barHeight = maxBarHeight;

  if (isLg) {
    width = maxWidth * 0.8;
    borderRadius = maxBorderRadius * 0.8;
    barHeight = maxBarHeight * 0.8;
  }

  if (isMd) {
    width = maxWidth * 0.6;
    borderRadius = maxBorderRadius * 0.4;
    barHeight = maxBarHeight * 0.6;
  }

  // if (props.breakpoint === breakpoints.sm) {
  //   width = maxWidth * 0.4;
  //   borderRadius = maxBorderRadius * 0.4;
  //   barHeight = maxBarHeight * 0.4;
  // }

  // if (props.breakpoint === breakpoints.xs) {
  //   width = maxWidth * 0.4;
  //   borderRadius = maxBorderRadius * 0.4;
  //   barHeight = maxBarHeight * 0.4;
  // }

  const height = width * 2.165;
  const barWidth = width * 0.5;

  return (
    <div
      className={`${styles.container} ${styles[props.theme]}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
      }}
    >
      <div
        className={styles.m_bar}
        style={{ width: `${barWidth}px`, height: `${barHeight}px` }}
      >
        {/* <div className={styles.microphone} />
        <div className={styles.camera} /> */}
      </div>
      {props.imgVisible && (
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

IPhoneXFrame.defaultProps = {
  breakpoint: 'lg',
};

export default IPhoneXFrame;
