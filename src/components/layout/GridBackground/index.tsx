import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import classNames from 'classnames/bind';
import RandomService from 'services/randomService';
import useInterval from 'hooks/useInterval';
import useResize from 'hooks/useResize';
import { PaletteModel } from 'models/ProjectModel';
import { darken } from 'polished';

interface Props extends ThemeProps {
  visible?: boolean;
  children?: any;
  enableAnimation?: boolean;
  animationSpeed: 'normal' | 'slow';
  seed?: number;
  palette?: PaletteModel;
  backgroundImageUrl?: string;
}

const cx = classNames.bind(styles);

const GridBackground: React.FC<Props> = (props) => {
  const [, , width, height] = useResize();
  const [visibleList, setVisibleList] = useState(1);

  const array = useMemo(() => {
    const size = Math.max(width, height);
    const array = [];

    const total = Math.ceil(size / 40) * (props.seed ?? 1);

    for (var i = 1; i <= total; i++) {
      array.push(40);
    }
    return array;
  }, [height, props.seed, width]);

  const getRandomList = useCallback(() => {
    return array.map((item) => ({
      width: `${RandomService.getRandomNumber(0, Math.ceil(width / 40)) *
        item}px`,
      height: `${RandomService.getRandomNumber(0, Math.ceil(height / 40) - 1) *
        item}px`,
    }));
  }, [array, width, height]);

  const [list, setList] = useState<any[]>(getRandomList());
  const [list2, setList2] = useState<any[]>(getRandomList());

  useInterval(
    () => {
      if (visibleList === 1) {
        setVisibleList(2);
        setTimeout(() => {
          setList(getRandomList());
        }, 400);
      } else {
        setVisibleList(1);
        setTimeout(() => {
          setList2(getRandomList());
        }, 400);
      }
    },
    props.enableAnimation
      ? props.animationSpeed === 'slow'
        ? 8000
        : 2000
      : null
  );

  useEffect(() => {
    if (!props.enableAnimation) {
      setVisibleList(0);
    }
  }, [props.enableAnimation]);

  return (
    <div className={cx(['container', props.theme])}>
      {props.children}

      {props.backgroundImageUrl && (
        <div
          className={styles.imageBackground}
          style={{
            opacity: props.theme === 'dark' ? 0.6 : 0.2,
            backgroundImage:
              props.theme === 'dark'
                ? `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url(${props.backgroundImageUrl})`
                : `url(${props.backgroundImageUrl})`,
          }}
        />
      )}

      {list.map((item) => (
        <div
          className={`${styles.node} ${
            visibleList === 2 || !props.enableAnimation ? styles.hidden : ''
          }`}
          style={{
            width: '40px',
            height: '40px',
            top: item.height,
            left: item.width,
            position: 'fixed',
            backgroundColor: props.palette
              ? darken(0.1, props.palette[props.theme])
              : '#ffffff',
          }}
        />
      ))}
      {list2.map((item) => (
        <div
          className={`${styles.node} ${
            visibleList === 1 || !props.enableAnimation ? styles.hidden : ''
          }`}
          style={{
            width: '40px',
            height: '40px',
            top: item.height,
            left: item.width,
            position: 'fixed',
            backgroundColor: props.palette
              ? darken(0.1, props.palette[props.theme])
              : '#ffffff',
          }}
        />
      ))}
    </div>
  );
};

const GridBackgroundMemo = React.memo(GridBackground);

export default GridBackgroundMemo;
