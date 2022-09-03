import React, { useState, useCallback } from 'react';
import styles from './style.module.scss';
import { animated, useSpring } from 'react-spring';
import { ThemeProps } from 'types/Props';
import Words from 'components/text/Words';
// import AppleIcon from 'components/icons/AppleIcon';
// import AndroidIcon from 'components/icons/AndroidIcon';
import { ShowcaseTypeEnum } from 'models/ProjectModel';
import { useHover } from 'react-use-gesture';
import AppleIcon from 'components/icons/AppleIcon';

interface Props extends ThemeProps {
  type?: string;
  visible?: boolean;
  textVisible?: boolean;
  text?: string;
  fontSize?: number;
  color?: string;
  gradientColor?: string;
  onClick?: () => void;
}

const LinkButton: React.FC<Props> = (props) => {
  const [isHover, setIsHover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const bind = useHover((hover) => {
    setIsHover(hover.hovering);
  });

  const { visible, backgroundColor, backgroundImage } = useSpring({
    visible: props.visible ? 1 : 0,
    backgroundColor: props.color ?? '',
    backgroundImage: props.gradientColor ?? 'none',
  });

  const _onClick = useCallback(() => {
    if (!isClicked) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 1000);
      props.onClick && props.onClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onClick]);

  let text = '';
  if (props.type) {
    switch (props.type) {
      case ShowcaseTypeEnum.android:
        text = 'Visit In Play Store';
        break;
      case ShowcaseTypeEnum.ios:
        text = 'Visit In App Store';
        break;
      case ShowcaseTypeEnum.website:
        text = 'Visit Website';
        break;
    }
  }
  if (props.text) {
    text = props.text;
  }

  return (
    <animated.button
      {...bind()}
      style={{
        transform: visible.to((v) => `scale(${v})`),
      }}
      className={`${styles.button} ${styles[props.theme]}`}
      onClick={_onClick}
      disabled={isClicked}
    >
      <span className={styles.line} />
      <span className={styles.line} />
      <animated.span
        className={styles.line}
        style={isHover ? { backgroundColor, backgroundImage } : {}}
      />
      <span className={styles.line} />
      <p
        className={`${styles.text} ${styles[props.theme]}`}
        style={{ fontSize: props.fontSize }}
      >
        <Words text={text} visible={props.textVisible} mode="words" />
      </p>
      {/* {props.type === ShowcaseTypeEnum.ios && (
        <div className={styles.ios}>
          <AppleIcon theme={props.theme} isInvert={isHover} />
        </div>
      )}
      {props.type === ShowcaseTypeEnum.android && (
        <div className={styles.android}>
          <AndroidIcon theme={props.theme} isInvert={isHover} />
        </div>
      )} */}
    </animated.button>
  );
};

LinkButton.defaultProps = {
  fontSize: 16,
};

export default LinkButton;
