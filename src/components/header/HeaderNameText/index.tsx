import React from 'react';
import styles from './style.module.scss';
import TitleText from 'components/text/TitleText';
import { ThemeProps } from 'types/Props';
import Words from 'components/text/Words';

interface Props extends ThemeProps {
  text: string;
  visible?: boolean;
  fontSize?: number;
}

const HeaderNameText: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <TitleText theme={props.theme} fontSize={props.fontSize}>
        <Words text={props.text} visible={props.visible} mode="words" />
      </TitleText>
    </div>
  );
};

export default HeaderNameText;
