import React from 'react';
import styles from './style.module.scss';
import Skill from './components/Skill';
import { ThemeProps } from 'types/Props';

interface Props extends ThemeProps {
  visible?: boolean;
  isResponsive?: boolean;
  isLooping?: boolean;
  groups: Array<Array<string>>;
}

const SkillSets: React.FC<Props> = (props) => {
  const items = props.groups[0] ?? [];

  let containerClassName = `${styles.container}`;

  if (props.isResponsive) {
    containerClassName += ` ${styles.responsive}`;
  }

  return (
    <div className={containerClassName}>
      {items.map((item, i) => (
        <div className={styles.item}>
          <Skill
            key={i}
            theme={props.theme}
            type={item}
            isResponsive={props.isResponsive}
          />
        </div>
      ))}
    </div>
  );
};

export default SkillSets;
