import React, { useRef, useState } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import ImageViewer from 'components/images/ImageViewer';
import breakpoints from 'config/breakpoints';
import { useRect } from '@reach/rect';
import { useAtom } from 'jotai';
import { imageViewerUrlAtom, imageViewerVisible } from 'store/others';
import { useHover } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';

const maxWidth = 1080 / 2;
const maxHeight = 940 / 2;

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
  tintColor: string;
}

const DiagramFrame: React.FC<Props> = (props) => {
  const [imageViewerUrl, setImageViewerUrl] = useAtom(imageViewerUrlAtom);
  const [, setImageViewerVisible] = useAtom(imageViewerVisible);

  const isResponsive =
    props.breakpoint === breakpoints.sm || props.breakpoint === breakpoints.xs;

  let containerClassName = `${styles.container} ${styles[props.theme]}`;
  if (props.responsive) {
    containerClassName += ` ${styles.responsive}`;
  }

  let width = maxWidth;
  let height = maxHeight;

  if (props.breakpoint === breakpoints.xl) {
    width = maxWidth * 0.5;
    height = maxHeight * 0.5;
  }

  if (props.breakpoint === breakpoints.lg) {
    width = maxWidth * 0.4;
    height = maxHeight * 0.4;
  }

  if (props.breakpoint === breakpoints.md) {
    width = maxWidth * 0.3;
    height = maxHeight * 0.3;
  }

  if (
    props.breakpoint === breakpoints.sm ||
    props.breakpoint === breakpoints.xs
  ) {
    width = maxWidth * 0.4;
    height = maxHeight * 0.4;
  }

  const frameRef = useRef(null);
  const frameRect = useRect(frameRef, { observe: !!props.iframe });

  // const contentWidth = frameRect?.width ?? 0;
  // const contentHeight = frameRect?.height ?? 0;

  const [isHovering, setIsHovering] = useState(false);
  const bind = useHover((state) => setIsHovering(state.hovering));

  const openDiagram = () => {
    if (
      props.breakpoint === breakpoints.sm ||
      props.breakpoint === breakpoints.xs
    ) {
      window.open(props.src[0].replace('_thumbnail.png', '.png'), '_blank');
    } else {
      setImageViewerUrl(props.src[0].replace('_thumbnail.png', '.png'));
      setImageViewerVisible(true);
    }
  };

  const spring = useSpring({
    hover: isHovering && !isResponsive ? 1 : 0,
  });
  return (
    <animated.button
      {...bind()}
      className={containerClassName}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: spring.hover.to({
          range: [0, 1],
          output: ['translateY(0%)', 'translateY(-10%)'],
        }),
        outline: spring.hover.to({
          range: [0, 1],
          output: [
            `${props.tintColor} solid 0px`,
            `${props.tintColor} solid 2px`,
          ],
        }),
      }}
      ref={frameRef}
      onClick={openDiagram}
    >
      {props.imgVisible && !props.iframe && (
        <ImageViewer
          resizeMode="contain"
          src={props.src}
          visible={props.imgVisible}
          isLooping={props.isLooping}
          duration={props.duration}
        />
      )}
    </animated.button>
  );
};

DiagramFrame.defaultProps = {
  breakpoint: 'lg',
};

export default DiagramFrame;
