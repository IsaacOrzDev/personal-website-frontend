import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import DescriptionText from 'components/text/DescriptionText';
import Words from 'components/text/Words';
import { Theme } from 'types/Types';
import { PaletteModel } from 'models/ProjectModel';

interface Props extends ThemeProps {
  visible?: boolean;
  text: string;
  fontSize?: number;
  theme: Theme;
  palette?: PaletteModel;
}

const ProjectDescription: React.FC<Props> = (props) => {
  return (
    <div
      className={`${styles.container} ${styles[props.theme]} ${
        !props.visible ? styles.hidden : ''
      } `}
      style={
        props.palette
          ? {
              borderLeft: `1px solid ${props.palette[props.theme]}`,
            }
          : {}
      }
    >
      <DescriptionText theme={props.theme} fontSize={props.fontSize}>
        <Words
          visible={props.visible}
          text={props.text}
          mode="words"
          speed={20}
        />
      </DescriptionText>
    </div>
  );
};

export default ProjectDescription;
