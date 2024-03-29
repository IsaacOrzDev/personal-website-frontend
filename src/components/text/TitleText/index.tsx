import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useSpring } from 'react-spring';

interface Props extends ThemeProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: 'text' | 'tint' | string;
  gradientColor?: string;
  fontSize?: number;
  className?: string;
  disableColorAnimation?: boolean;
  children: React.ReactNode;
}

const TitleText: React.FC<Props> = (props) => {
  const _getFontSize = useCallback(() => {
    if (props.fontSize) {
      return props.fontSize;
    } else {
      switch (props.tag) {
        case 'h1':
        default:
          return 56;
        case 'h2':
          return 48;
        case 'h3':
          return 40;
        case 'h4':
          return 32;
        case 'h5':
          return 24;
        case 'h6':
          return 16;
      }
    }
  }, [props.fontSize, props.tag]);

  const backgroundColor: any =
    ['text', 'tint'].indexOf(props.color ?? '') === -1 ? props.color : '';
  const backgroundImage = props.gradientColor ?? 'none';

  const { fontSize } = useSpring({
    fontSize: _getFontSize(),
  });

  let className = `${styles.content} ${props.className} ${
    styles[props.theme]
  } ${styles[props.color!]}`;

  if (props.gradientColor) {
    className += ` ${styles.gradient}`;
  }

  if (props.disableColorAnimation) {
    className += ` ${styles.disableColorAnimation}`;
  }

  switch (props.tag) {
    case 'h1':
    default:
      return (
        <animated.h1
          style={{ fontSize, backgroundColor, backgroundImage }}
          className={className}
        >
          {props.children}
        </animated.h1>
      );
    case 'h2':
      return (
        <animated.h2
          style={{ fontSize, backgroundColor, backgroundImage }}
          className={className}
        >
          {props.children}
        </animated.h2>
      );
    case 'h3':
      return (
        <animated.h3
          style={{ fontSize, backgroundColor, backgroundImage }}
          className={className}
        >
          {props.children}
        </animated.h3>
      );
    case 'h4':
      return (
        <animated.h4
          style={{ fontSize, backgroundColor, backgroundImage }}
          className={className}
        >
          {props.children}
        </animated.h4>
      );
    case 'h5':
      return (
        <animated.h5
          style={{ fontSize, backgroundColor, backgroundImage }}
          className={className}
        >
          {props.children}
        </animated.h5>
      );
    case 'h6':
      return (
        <animated.h6
          style={{ fontSize, backgroundColor, backgroundImage }}
          className={className}
        >
          {props.children}
        </animated.h6>
      );
  }
};

TitleText.defaultProps = {
  tag: 'h1',
  color: 'text',
  className: '',
};

export default TitleText;
