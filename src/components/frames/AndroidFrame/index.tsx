import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import ImageViewer from 'components/images/ImageViewer';
import BreakpointService from 'services/breakpointService';

const maxWidth = 240;
const maxBarHeight = 40;
const maxBtnSize = 16;
const maxBtnMargin = 48;

interface Props extends ThemeProps {
  src: string[];
  imgVisible?: boolean;
  breakpoint?: string;
  isLooping?: boolean;
  isFullScreen?: boolean;
  duration?: number;
}

const AndroidFrame: React.FC<Props> = (props) => {
  const isLg = BreakpointService.isLg(props.breakpoint!);
  const isMd = BreakpointService.isMd(props.breakpoint!);

  let width = maxWidth;
  let barHeight = props.isFullScreen ? 0 : maxBarHeight;
  let btnSize = maxBtnSize;
  let btnMargin = maxBtnMargin;

  if (isLg) {
    width = maxWidth * 0.8;
    barHeight = maxBarHeight * 0.8;
    btnSize = maxBtnSize * 0.8;
    btnMargin = maxBtnMargin * 0.8;
  }

  if (isMd) {
    width = maxWidth * 0.6;
    barHeight = maxBarHeight * 0.6;
    btnSize = maxBtnSize * 0.6;
    btnMargin = maxBtnMargin * 0.6;
  }

  const height = width * 2.165;

  return (
    <div
      className={`${styles.container} ${styles[props.theme]}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div
        className={styles.content}
        style={{ width: '100%', height: `${height - barHeight}px` }}
      >
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
      {!props.isFullScreen && (
        <>
          <div
            className={styles.placeholder}
            style={{ height: `${barHeight}px` }}
          />
          <div className={styles.bar} style={{ height: `${barHeight}px` }}>
            <div
              className={styles.back}
              style={{
                borderWidth: `${btnSize / 2}px ${btnSize}px ${btnSize / 2}px 0`,
                marginRight: `${btnMargin}px`,
              }}
            />
            <div
              className={styles.home}
              style={{
                width: `${btnSize}px`,
                height: `${btnSize}px`,
                marginRight: `${btnMargin}px`,
              }}
            />
            <div
              className={styles.menu}
              style={{
                width: `${btnSize}px`,
                height: `${btnSize}px`,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

AndroidFrame.defaultProps = {
  breakpoint: 'lg',
};

export default AndroidFrame;
