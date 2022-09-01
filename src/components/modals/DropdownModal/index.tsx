import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './styles.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useTransition } from 'react-spring';

interface Props extends ThemeProps {
  position: { x: number; y: number };
  visible?: boolean;
  onExit?: () => void;
}

const DropdownModal: React.FC<Props> = props => {
  const [attached, setAttached] = useState(false);

  const [visible, setVisible] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  // const { visible } = useSpring({
  //   visible: props.visible ? 1 : 0,
  // });

  const transitions = useTransition(props.visible, null, {
    from: { opacity: 0, maxHeight: 0 },
    enter: { opacity: 1, maxHeight: 420 },
    leave: { opacity: 0, maxHeight: 0 },
  });

  useEffect(() => {
    if (props.visible && !attached) {
      document.addEventListener('click', _listenOnClick);
      setAttached(true);
      setTimeout(() => setVisible(true), 400);
    } else if (!props.visible && attached) {
      setAttached(false);
      document.removeEventListener('click', _listenOnClick);
      setVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  const _listenOnClick = useCallback((e: any) => {
    if (!divRef.current?.contains(e.target)) {
      props.onExit && props.onExit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${styles.container} ${styles[props.theme]}`}
      style={{
        top: props.position.y,
        left: props.position.x,
        // display: props.visible ? 'block' : 'none',
      }}
      ref={divRef}
    >
      {transitions.map(
        t =>
          t.item && (
            <animated.div
              key={t.key}
              className={
                visible ? `${styles.content} ${styles.visible}` : styles.content
              }
              style={t.props}
            >
              {props.children}
            </animated.div>
          )
      )}
    </div>
  );
};

export default DropdownModal;
