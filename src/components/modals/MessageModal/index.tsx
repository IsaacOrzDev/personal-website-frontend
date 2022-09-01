import React, { useState } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useSpring } from 'react-spring';
import DescriptionText from 'components/text/DescriptionText';
import Words from 'components/text/Words';
import CloseIcon from 'components/icons/CloseIcon';

interface Props extends ThemeProps {
  text: string;
  visible?: boolean;
  isResponsive?: boolean;
  onClose?: () => void;
}

const MessageModal: React.FC<Props> = props => {
  const [textVisible, setTextVisible] = useState(false);

  const { visible } = useSpring({
    visible: props.visible ? 1 : 0,
    onRest: () => {
      if (props.visible && !textVisible) {
        setTextVisible(true);
      }
    },
  });

  let containerClassName = `${styles.container} ${styles[props.theme]}`;
  if (props.isResponsive) {
    containerClassName += ` ${styles.responsive}`;
  }

  return (
    <animated.div
      className={containerClassName}
      style={{
        transform: visible.interpolate(v => `scale(${v})`),
      }}
    >
      <div className={`${styles.header} ${styles[props.theme]}`}>
        <button className={styles.close} onClick={props.onClose}>
          <CloseIcon theme={props.theme} />
        </button>
      </div>
      <div className={styles.content}>
        <DescriptionText fontSize={14} theme={props.theme}>
          <Words mode="words" visible={true} speed={10} text={props.text} />
        </DescriptionText>
      </div>
    </animated.div>
  );
};

export default MessageModal;
