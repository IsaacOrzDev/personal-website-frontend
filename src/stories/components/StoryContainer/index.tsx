import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import GridBackground from 'components/layout/GridBackground';

interface Props extends ThemeProps {
  visible?: boolean;
  children: React.ReactNode;
}

const StoryContainer: React.FC<Props> = ({ theme, children }) => {
  const childrenWithProps = React.Children.map(children, (child: any) =>
    React.cloneElement(child, { theme })
  );

  return (
    <div>
      <div className={styles.container}>{childrenWithProps}</div>
      <GridBackground theme={theme} />
    </div>
  );
};

export default StoryContainer;
