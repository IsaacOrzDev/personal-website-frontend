import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import LeftIcon from 'components/icons/LeftIcon';
import RightIcon from 'components/icons/RightIcon';
import { animated, useSpring } from 'react-spring';

interface Props extends ThemeProps {
  visible?: boolean;
  prevVisible?: boolean;
  nextVisible?: boolean;
  items: Array<any>;
  index: number;
  disabled?: boolean;
  onSelectPrev?: () => void;
  onSelectNext?: () => void;
}

const ProjectNavigation: React.FC<Props> = props => {
  const { paginationTranslateX, visible } = useSpring({
    paginationTranslateX:
      props.index === 0 ? 14 : props.index === 1 ? 0 : (props.index - 1) * -14,
    visible: props.visible ? 1 : 0,
  });

  const _addIndex = () => {
    props.onSelectNext && props.onSelectNext();
  };

  const _minusIndex = () => {
    props.onSelectPrev && props.onSelectPrev();
  };

  return (
    <animated.div
      className={`${styles.container} ${styles[props.theme]}`}
      style={{ transform: visible.interpolate(v => `scale(${v})`) }}
    >
      <button
        className={styles.btn}
        onClick={_minusIndex}
        disabled={!props.prevVisible || props.disabled}
      >
        <LeftIcon theme={props.theme} />
      </button>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <animated.div
            className={styles.pagination}
            style={{
              transform: paginationTranslateX.interpolate(
                v => `translateX(${v}px)`
              ),
            }}
          >
            {props.items.map((x, i) => (
              <Dot key={i} active={i === props.index} />
            ))}
          </animated.div>
          <div className={styles.placeholder} />
        </div>
      </div>
      <button
        className={styles.btn}
        onClick={_addIndex}
        disabled={!props.nextVisible || props.disabled}
      >
        <RightIcon theme={props.theme} />
      </button>
    </animated.div>
  );
};

const Dot: React.FC<{ active?: boolean; isHidden?: boolean }> = props => {
  let className = `${styles.dot}`;
  if (props.active) {
    className += ` ${styles.big}`;
  }
  if (props.isHidden) {
    className += ` ${styles.hidden}`;
  }
  return <div className={className} />;
};

export default ProjectNavigation;
