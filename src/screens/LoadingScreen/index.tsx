import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import useResize from 'hooks/useResize';
import LoadingIcon from './components/LoadingIcon';
import { PaletteModel } from 'models/ProjectModel';

interface Props extends ThemeProps {
  palette?: PaletteModel;
  isDone: boolean;
  onEnd?: () => void;
}

const LoadingScreen: React.FC<Props> = (props) => {
  const [, isResponsive] = useResize();

  return (
    <div className={`${styles.container} ${styles[props.theme]}`}>
      <LoadingIcon
        fontSize={isResponsive ? 80 : 120}
        theme={props.theme}
        palette={props.palette}
        duration={400}
        isDone={props.isDone}
        onEnd={props.onEnd}
      />
    </div>
  );
};

export default LoadingScreen;
