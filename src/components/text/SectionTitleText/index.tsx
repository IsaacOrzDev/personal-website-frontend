import React from 'react';
import { ThemeProps } from 'types/Props';
import styles from './style.module.scss';
import TitleText from '../TitleText';
import Words from '../Words';

interface Props extends ThemeProps {
  text: string;
  visible?: boolean;
}

const SectionTitleText: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <TitleText theme={props.theme} tag="h3" fontSize={24}>
        <Words text={props.text} visible={props.visible} />
      </TitleText>
    </div>
  );
};

export default SectionTitleText;
