import React from 'react';
import styles from './style.module.scss';
import { animated, useTrail, config } from 'react-spring';

interface Props {
  text: string;
  visible?: boolean;
  mode?: 'words' | 'characters';
  willCombine?: boolean;
  speed?: number;
  quick?: boolean;
}

const Words: React.FC<Props> = props => {
  let items = props.text.split(' ');
  const speed = props.speed!;
  if (props.mode === 'words' && props.speed! > 1) {
    const mergeItems = [];
    for (let i = 0; i < Math.ceil(items.length / speed); i++) {
      const text = items.slice(i * speed, i * speed + speed).join(' ');
      mergeItems.push(text);
    }
    items = mergeItems;
  }

  const trail = useTrail(
    props.mode === 'words' ? items.length : props.text.length,
    {
      visible: props.visible ? 1 : 0,
      transform: props.visible
        ? 'translate3d(0, 0px, 0px)'
        : 'translate3d(0px, 16px, 0px)',
      config: props.quick ? config.stiff : config.default,
    }
  );

  if (props.mode === 'words') {
    return (
      <React.Fragment>
        {trail.map(({ visible, transform }, index) => (
          <React.Fragment key={index}>
            {items[index].split(' ').map((word, wordIndex, wordArray) => {
              if (
                index === items.length - 1 &&
                wordIndex === wordArray.length - 1
              ) {
                return (
                  <animated.span
                    key={`${index}-${wordIndex}`}
                    className={styles.span}
                    style={{ opacity: visible, transform }}
                  >
                    {`${word}`}
                  </animated.span>
                );
              }
              return (
                <animated.span
                  key={`${index}-${wordIndex}`}
                  className={styles.span}
                  style={{ opacity: visible, transform }}
                >
                  {`${word}`}&nbsp;
                </animated.span>
              );
            })}
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {trail.map(({ visible, transform }, index) => (
        <animated.span
          key={index}
          className={props.text[index] !== ' ' ? styles.span : ''}
          style={
            props.text[index] !== ' ' ? { opacity: visible, transform } : {}
          }
        >
          {`${props.text[index] !== ' ' ? props.text[index] : ' '}`}
        </animated.span>
      ))}
    </React.Fragment>
  );
};

Words.defaultProps = {
  mode: 'characters',
  speed: 1,
};

export default Words;
