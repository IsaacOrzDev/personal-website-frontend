import React from 'react';
import styles from './style.module.scss';
import TitleText from 'components/text/TitleText';
import Dash from './components/Dash';
import { ThemeProps } from 'types/Props';
import Words from 'components/text/Words';

interface Props extends ThemeProps {
  setRef?: React.RefObject<any>;
  name: string;
  title: string;
  visible?: boolean;
  isLg?: boolean;
  color?: string;
  gradientColor?: string;
  onClick?: () => void;
}

const Part: React.FC<Props> = (props) => {
  return (
    <div
      ref={props.setRef}
      className={styles.container}
      onClick={props.onClick}
    >
      <TitleText
        className={styles.title}
        theme={props.theme}
        fontSize={props.isLg ? 40 : 56}
      >
        <Words text={props.name} visible={props.visible} mode="words" />
      </TitleText>
      <Dash theme={props.theme} visible={props.visible} />
      <TitleText
        className={styles.title}
        theme={props.theme}
        color={props.color || 'tint'}
        gradientColor={props.gradientColor}
        fontSize={props.isLg ? 40 : 56}
      >
        <Words text={props.title} visible={props.visible} mode="words" />
      </TitleText>
      <Dash theme={props.theme} visible={props.visible} />
    </div>
  );
};

Part.defaultProps = {};

export default React.memo(Part);
