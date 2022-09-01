import React, { useState, useEffect, useCallback } from 'react';
import styles from './style.module.scss';
import { animated, useTransition } from 'react-spring';
import Skill from './components/Skill';
import { ThemeProps } from 'types/Props';
import useInterval from 'hooks/useInterval';

interface Props extends ThemeProps {
  visible?: boolean;
  isResponsive?: boolean;
  isLooping?: boolean;
  groups: Array<Array<string>>;
}

const SkillSets: React.FC<Props> = props => {
  const [index, setIndex] = useState(-1);

  const items = (index === -1 ? [] : props.groups[index]).map((x, i) => ({
    item: x,
    index: i,
  }));

  const transitions = useTransition(
    items,
    item => `${item.item}-${item.index}`,
    {
      from: { transform: 'scale(0) rotate(90deg)', display: 'none' },
      enter: {
        transform: 'scale(1), rotate(0deg)',
        display: 'flex',
      },
      leave: { transform: 'scale(0) rotate(90deg)', display: 'none' },
    }
  );

  const _runAnimation = useCallback(async () => {
    setIndex(_index => {
      if (_index >= props.groups.length - 1) {
        return 0;
      } else {
        return _index + 1;
      }
    });
  }, [props.groups.length]);

  useInterval(
    () => {
      _runAnimation();
    },
    props.visible && props.isLooping ? 6000 : null
  );

  useEffect(() => {
    if (props.visible) {
      _runAnimation();
    } else {
      setIndex(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  let containerClassName = `${styles.container}`;

  if (props.isResponsive) {
    containerClassName += ` ${styles.responsive}`;
  }

  return (
    <div className={containerClassName}>
      {transitions.map(t => (
        <animated.div key={t.key} className={styles.item} style={t.props}>
          <Skill
            theme={props.theme}
            type={t.item.item}
            isResponsive={props.isResponsive}
          />
        </animated.div>
      ))}
    </div>
  );
};

export default SkillSets;
