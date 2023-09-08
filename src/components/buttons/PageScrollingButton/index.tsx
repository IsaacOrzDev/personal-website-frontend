import React from 'react';
import styles from './style.module.scss';
import LinkButton from '../LinkButton';
import { ThemeProps } from 'types/Props';
import browserService from 'services/browserService';

interface Props extends ThemeProps {
  isResponsive?: boolean;
  visible?: boolean;
  textVisible?: boolean;
  type?: 'down' | 'up';
  color?: string;
  gradientColor?: string;
  items: Array<{
    text: string;
    onClick?: () => void;
  }>;
}

const PageScrollingButton: React.FC<Props> = (props) => {
  let className = `${styles.container} ${styles[props.type!]} ${
    props.isResponsive ? styles.responsive : ''
  }}`;
  if (props.isResponsive || browserService.isIos()) {
    className += ` ${styles.responsive}`;
  }
  return (
    <div className={className}>
      {props.items.map((item) => (
        <LinkButton
          key={item.text}
          theme={props.theme}
          text={item.text}
          visible={props.visible}
          textVisible={props.textVisible}
          color={props.color}
          gradientColor={props.gradientColor}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

PageScrollingButton.defaultProps = {
  type: 'down',
};

export default PageScrollingButton;
