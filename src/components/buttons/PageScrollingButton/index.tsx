import React from 'react';
import styles from './style.module.scss';
import LinkButton from '../LinkButton';
import { ThemeProps } from 'types/Props';
import browserService from 'services/browserService';

interface Props extends ThemeProps {
  isResponsive?: boolean;
  visible?: boolean;
  textVisible?: boolean;
  text: string;
  type?: 'down' | 'up';
  color?: string;
  gradientColor?: string;
  onClick?: () => void;
}

const PageScrollingButton: React.FC<Props> = (props) => {
  let className = `${styles[props.type!]}`;
  if (props.isResponsive || browserService.isIos()) {
    className += ` ${styles.responsive}`;
  }
  return (
    <div className={className}>
      <LinkButton
        theme={props.theme}
        text={props.text}
        visible={props.visible}
        textVisible={props.textVisible}
        color={props.color}
        gradientColor={props.gradientColor}
        onClick={props.onClick}
      />
    </div>
  );
};

PageScrollingButton.defaultProps = {
  type: 'down',
};

export default PageScrollingButton;
