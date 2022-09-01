import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import { animated, useSpring } from 'react-spring';
import DescriptionText from 'components/text/DescriptionText';
import Words from 'components/text/Words';

interface Props extends ThemeProps {
  text: string;
  active?: boolean;
  visible?: boolean;
  textVisible?: boolean;
  isHorizontal?: boolean;
  onClick?: () => void;
}

const IndexItem: React.FC<Props> = props => {
  const { active, visible } = useSpring({
    active: props.active ? 1 : 0.6,
    visible: props.visible && props.active ? 1 : 0,
  });

  let containerClass = `${styles.item} ${styles[props.theme]}`;
  if (props.isHorizontal) {
    containerClass += ` ${styles.horizontal}`;
  }

  return (
    <button className={containerClass} onClick={props.onClick}>
      <animated.div className={styles.text} style={{ opacity: active }}>
        <DescriptionText fontSize={32} theme={props.theme}>
          <Words text={props.text} visible={props.textVisible} />
        </DescriptionText>
      </animated.div>
      <animated.div
        className={styles.point}
        style={{ transform: visible.interpolate(v => `scale(${v})`) }}
      />
    </button>
  );
};

export default IndexItem;
