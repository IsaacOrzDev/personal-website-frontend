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
}

const Part: React.FC<Props> = props => {
  return (
    <div ref={props.setRef} className={styles.container}>
      <TitleText theme={props.theme} fontSize={props.isLg ? 40 : 56}>
        <Words text={props.name} visible={props.visible} mode="words" />
      </TitleText>
      <Dash theme={props.theme} visible={props.visible} />
      <TitleText
        className={styles.title}
        theme={props.theme}
        color="tint"
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
