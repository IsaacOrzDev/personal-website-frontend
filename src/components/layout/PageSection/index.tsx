import React from 'react';
import styles from './style.module.scss';

interface Props {
  setRef?: React.RefObject<any>;
  isResponsive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const PageSection: React.FC<Props> = (props) => {
  let className = `${styles.container}`;
  if (props.isResponsive) {
    className += ` ${styles.responsive}`;
  }
  if (props.className) {
    className += ` ${props.className}`;
  }
  return (
    <div ref={props.setRef} className={className}>
      {props.children}
    </div>
  );
};

export default PageSection;
