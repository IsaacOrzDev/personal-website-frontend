import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { animated, useTransition } from 'react-spring';
import { ThemeProps } from 'types/Props';
import Words from 'components/text/Words';
import DescriptionText from 'components/text/DescriptionText';

interface Props extends ThemeProps {
  visible?: boolean;
  isResponsive?: boolean;
  items: Array<{ title: string; onClick?: () => void }>;
}

const MenuModal: React.FC<Props> = (props) => {
  const [textVisible, setTextVisible] = useState(false);

  const transitions = useTransition(props.visible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    if (props.visible) {
      setTimeout(() => setTextVisible(true), 200);
    } else {
      setTextVisible(false);
    }
  }, [props.visible]);

  return (
    <div>
      {transitions(
        ({ opacity }, item) =>
          item && (
            <animated.div
              className={`${styles.container} ${styles[props.theme]}`}
              style={{ opacity }}
            >
              <div className={styles.list}>
                <div className={styles.content}>
                  {props.items.map((x, i) => (
                    <animated.button
                      key={i}
                      className={styles.item}
                      onClick={x.onClick}
                    >
                      <DescriptionText
                        theme={props.theme}
                        fontSize={props.isResponsive ? 24 : 40}
                      >
                        <Words
                          visible={textVisible}
                          text={x.title}
                          mode="words"
                        />
                      </DescriptionText>
                    </animated.button>
                  ))}
                </div>
              </div>
            </animated.div>
          )
      )}
    </div>
  );
};

export default MenuModal;
