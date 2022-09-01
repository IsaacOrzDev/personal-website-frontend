import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import classNames from 'classnames/bind';

interface Props extends ThemeProps {
  visible?: boolean;
}

const cx = classNames.bind(styles);

const GridBackground: React.FC<Props> = props => {
  return <div className={cx(['container', props.theme])} />;
};

const GridBackgroundMemo = React.memo(GridBackground);

export default GridBackgroundMemo;
