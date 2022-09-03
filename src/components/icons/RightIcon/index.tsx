import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';

interface Props extends ThemeProps {}

const RightIcon: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.container} ${styles[props.theme]}`}>
      {/* <svg viewBox="0 0 490.8 490.8">
        <path
          className={styles.path}
          d="M128.133,490.68c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571l227.136-227.115
	L120.581,18.232c-4.171-4.171-4.171-10.933,0-15.104c4.171-4.171,10.933-4.171,15.104,0l234.667,234.667
	c4.164,4.165,4.164,10.917,0,15.083L135.685,487.544C133.685,489.551,130.967,490.68,128.133,490.68z"
        />
      </svg> */}

      {/* <svg
        className={styles.path}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M5 3.737l12.395 8.263-12.395 8.263v-16.526zm-2-3.737v24l18-12-18-12z" />
      </svg> */}

      <svg
        className={styles.path}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M21 12l-18 12v-24z" />
      </svg>
    </div>
  );
};

export default RightIcon;
