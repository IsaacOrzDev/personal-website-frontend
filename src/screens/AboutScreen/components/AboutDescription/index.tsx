import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import TitleText from 'components/text/TitleText';
import Words from 'components/text/Words';
import DescriptionText from 'components/text/DescriptionText';

interface Props extends ThemeProps {
  textVisible?: boolean;
  title: string;
  description: string[];
}

const AboutDescription: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TitleText theme={props.theme} tag="h2" fontSize={18} color="tint">
          <Words mode="words" visible={props.textVisible} text={props.title} />
        </TitleText>
      </div>
      {props.description.map((x, i) => (
        <div key={i} className={styles.description}>
          <DescriptionText theme={props.theme} fontSize={16}>
            <Words
              mode="words"
              speed={10}
              visible={props.textVisible}
              text={x}
            />
          </DescriptionText>
        </div>
      ))}
    </div>
  );
};

export default AboutDescription;
