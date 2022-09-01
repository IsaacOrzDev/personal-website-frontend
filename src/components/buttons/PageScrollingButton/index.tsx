import React from 'react';
import styles from './style.module.scss';
import ScrollingButton, { ScrollingButtonProps } from '../ScrollingButton';

interface Props extends ScrollingButtonProps {
  isResponsive?: boolean;
}

const PageScrollingButton: React.FC<Props> = props => {
  let className = `${styles[props.type!]}`;
  if (props.isResponsive) {
    className += ` ${styles.responsive}`;
  }
  return (
    <div className={className}>
      <ScrollingButton {...props} />
    </div>
  );
};

PageScrollingButton.defaultProps = {
  type: 'down',
};

export default PageScrollingButton;
