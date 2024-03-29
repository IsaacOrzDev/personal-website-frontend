import React, { useState, useEffect, useCallback } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import Part from './components/Part';
import useMeasure from 'hooks/useMeasure';
import { animated, useSpring } from 'react-spring';
import { useDispatch } from 'react-redux';
import { globalActions } from 'store/global';

const baseWidth = 800;

interface Props extends ThemeProps {
  name: string;
  title: string;
  paused?: boolean;
  duration?: number;
  visible?: boolean;
  isLg?: boolean;
  isResponsive?: boolean;
  color?: string;
  gradientColor?: string;
}

const Marquee: React.FC<Props> = (props) => {
  const [clones, setClones] = useState<number[]>([]);
  const [contentWidth, setContentWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const [bind, bounds] = useMeasure();
  const [bindContainer, containerBounds] = useMeasure();

  const dispatch = useDispatch();

  const { visible } = useSpring({
    visible: props.visible && !props.isResponsive ? 1 : 0,
    onRest: () => {
      if (props.visible && !isInitialized) {
        setIsInitialized(true);
      }
    },
  });

  const _calculateDuration = useCallback(
    (width: number) => `${(width / baseWidth) * props.duration!}s`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.duration]
  );

  useEffect(() => {
    if (bounds && containerBounds) {
      const time = Math.ceil(containerBounds.width / bounds.width);
      const list = [];
      for (let i = 1; i < time; i++) {
        list.push(i);
      }
      setClones(list);
      setContentWidth(bounds.width * time);
    }
  }, [bounds, containerBounds]);

  let containerClassName = `${styles.container} ${styles[props.theme]}`;
  if (props.isLg) {
    containerClassName += ` ${styles.lg}`;
  }

  return (
    <animated.div
      {...bindContainer}
      className={containerClassName}
      style={{
        transform: visible.to({
          range: [0, 1],
          output: ['translateX(-100%)', 'translateX(0)'],
        }),
        opacity: visible,
      }}
    >
      <div
        className={`${styles.content} ${styles.first}`}
        style={{
          width: `${contentWidth}px`,
          animationDuration: _calculateDuration(contentWidth),
          animationPlayState: props.paused ? 'paused' : 'running',
        }}
      >
        <Part
          setRef={bind.ref}
          theme={props.theme}
          name={props.name}
          title={props.title}
          visible={true}
          isLg={props.isLg}
          color={props.color}
          gradientColor={props.gradientColor}
          onClick={() => dispatch(globalActions.randomSetSelectedHomeImage())}
        />
        {clones.map((x) => (
          <Part
            key={x}
            theme={props.theme}
            name={props.name}
            title={props.title}
            visible={true}
            isLg={props.isLg}
            color={props.color}
            gradientColor={props.gradientColor}
            onClick={() => dispatch(globalActions.randomSetSelectedHomeImage())}
          />
        ))}
      </div>
      <div
        className={`${styles.content} ${styles.second}`}
        style={{
          width: `${contentWidth}px`,
          animationDuration: _calculateDuration(contentWidth),
          animationPlayState: props.paused ? 'paused' : 'running',
        }}
      >
        <Part
          theme={props.theme}
          name={props.name}
          title={props.title}
          visible={true}
          isLg={props.isLg}
          color={props.color}
          gradientColor={props.gradientColor}
          onClick={() => dispatch(globalActions.randomSetSelectedHomeImage())}
        />
        {clones.map((x) => (
          <Part
            key={x}
            theme={props.theme}
            name={props.name}
            title={props.title}
            visible={true}
            isLg={props.isLg}
            color={props.color}
            gradientColor={props.gradientColor}
            onClick={() => dispatch(globalActions.randomSetSelectedHomeImage())}
          />
        ))}
      </div>
    </animated.div>
  );
};

Marquee.defaultProps = {
  duration: 10,
};

export default Marquee;
