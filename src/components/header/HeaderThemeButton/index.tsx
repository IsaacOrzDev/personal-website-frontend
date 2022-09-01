import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useSpring } from 'react-spring';
import Words from 'components/text/Words';

interface Props extends ThemeProps {
  visible?: boolean;
  onClick?: () => void;
}

const HeaderThemeButton: React.FC<Props> = props => {
  const [isInitialized, setIsInitialized] = useState(false);

  const { dark, visible } = useSpring({
    dark: props.theme === 'dark' ? 1 : 0,
    visible: props.visible ? 1 : 0,
  });

  useEffect(() => {
    if (props.visible && !isInitialized) {
      setTimeout(() => setIsInitialized(true), 800);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  return (
    <animated.div
      className={styles.container}
      style={{
        opacity: visible,
        transform: visible.interpolate(v => `scale(${v})`),
      }}
    >
      <button
        className={`${styles.btn} ${styles[props.theme]}`}
        onClick={props.onClick}
      >
        <div className={styles.content}>
          <animated.div
            className={`${styles.toggle} ${styles[props.theme]}`}
            style={{
              // backgroundColor: color,
              transform: dark
                .interpolate({ range: [0, 1], output: [88, 4] })
                .interpolate(v => `translateX(${v}px)`),
            }}
          />
          <p className={styles.dark_text}>
            <Words
              text="Dark"
              mode="words"
              visible={isInitialized && props.theme === 'dark'}
            />
            {/* Dark */}
          </p>
          <p className={styles.light_text}>
            {/* Light */}
            <Words
              text="Light"
              mode="words"
              visible={isInitialized && props.theme === 'light'}
            />
          </p>
        </div>
      </button>
    </animated.div>
  );
};

export default HeaderThemeButton;
