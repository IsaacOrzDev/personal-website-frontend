import React, { useState } from 'react';
import styles from './style.module.scss';
import buttonStyles from 'styles/button.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useSpring, config } from 'react-spring';
import DescriptionText from 'components/text/DescriptionText';
import Words from 'components/text/Words';
import CloseIcon from 'components/icons/CloseIcon';

interface Props extends ThemeProps {
  text: string;
  name?: string;
  visible?: boolean;
  isResponsive?: boolean;
  onClose?: () => void;
}

const MessageModal: React.FC<Props> = (props) => {
  const [textVisible, setTextVisible] = useState(false);

  const { visible } = useSpring({
    visible: props.visible ? 1 : 0,
    onRest: () => {
      if (props.visible && !textVisible) {
        setTextVisible(true);
      }
    },
    config: config.molasses,
  });

  let containerClassName = `${styles.container} ${styles[props.theme]}`;
  if (props.isResponsive) {
    containerClassName += ` ${styles.responsive}`;
  }

  return (
    <animated.div
      className={containerClassName}
      style={{
        transform: visible
          .interpolate({ range: [0, 1], output: ['120%', '0'] })
          .to((v) => `translateY(${v})`),
      }}
    >
      <div className={styles.content}>
        <button
          className={`${buttonStyles.button} ${buttonStyles[props.theme]} ${
            styles.close
          }`}
          onClick={props.onClose}
        >
          <CloseIcon theme="dark" />
        </button>
        {props.visible && (
          <iframe
            src={import.meta.env.VITE_CHAT_URL}
            width="100%"
            height="500px"
            frameBorder="0"
            title="Chat"
            // loading={!props.visible}
          />
        )}
        {!props.visible && <div style={{ height: '500px' }} />}
      </div>
    </animated.div>
  );
};

export default MessageModal;
