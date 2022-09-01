import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import Words from '../Words';

interface Props extends ThemeProps {
  href?: string;
  text: string;
  visible?: boolean;
}

const LinkText: React.FC<Props> = props => {
  const linkClassName = `${styles.link} ${styles[props.theme]}`;

  return (
    <a
      className={linkClassName}
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Words text={props.text} visible={props.visible} mode="words" />
    </a>
  );
};

export default LinkText;
