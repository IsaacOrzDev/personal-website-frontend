import React from 'react';
import { ThemeProps } from 'types/Props';
import PageSection from '../PageSection';
import styles from './style.module.scss';

interface Props extends ThemeProps {}

const FallbackBackground: React.FC<Props> = props => {
  return (
    <div className={`${styles.container} ${styles[props.theme]}`}>
      <PageSection />
    </div>
  );
};

export default FallbackBackground;
