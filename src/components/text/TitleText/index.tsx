import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useSpring } from 'react-spring';

interface Props extends ThemeProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: 'text' | 'tint' | string;
  fontSize?: number;
  className?: string;
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

  const { fontSize, color } = useSpring({
    fontSize: _getFontSize(),
    color:
      ['text', 'tint'].indexOf(props.color ?? '') === -1 ? props.color : '',
  });

  const className = `${styles.content} ${props.className} ${
    styles[props.theme]
  } ${styles[props.color!]}`;

  switch (props.tag) {
    case 'h1':
    default:
      return (
        <animated.h1 style={{ fontSize, color }} className={className}>
          {props.children}
        </animated.h1>
      );
    case 'h2':
      return (
        <animated.h2 style={{ fontSize, color }} className={className}>
          {props.children}
        </animated.h2>
      );
    case 'h3':
      return (
        <animated.h3 style={{ fontSize, color }} className={className}>
          {props.children}
        </animated.h3>
      );
    case 'h4':
      return (
        <animated.h4 style={{ fontSize, color }} className={className}>
          {props.children}
        </animated.h4>
      );
    case 'h5':
      return (
        <animated.h5 style={{ fontSize, color }} className={className}>
          {props.children}
        </animated.h5>
      );
    case 'h6':
      return (
        <animated.h6 style={{ fontSize }} className={className}>
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
