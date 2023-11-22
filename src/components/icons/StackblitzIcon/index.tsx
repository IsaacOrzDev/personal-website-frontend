import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';

interface Props extends ThemeProps {}

const StackblitzIcon: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.container} ${styles[props.theme]}`}>
      <svg
        className={styles.path}
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
      >
        <path d="M10.797 14.182H3.635L16.728 0l-3.525 9.818h7.162L7.272 24l3.524-9.818Z" />
      </svg>
    </div>
  );
};

export default StackblitzIcon;
