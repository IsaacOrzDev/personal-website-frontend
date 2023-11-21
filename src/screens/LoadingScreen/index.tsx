import React, { useEffect } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import useResize from 'hooks/useResize';
import LoadingIcon from './components/LoadingIcon';
import { PaletteModel } from 'models/ProjectModel';
import { useDispatch } from 'react-redux';
import { globalActions } from 'store/global';
import pages from 'config/pages';

interface Props extends ThemeProps {
  palette?: PaletteModel;
  isDone: boolean;
  onEnd?: () => void;
}

const LoadingScreen: React.FC<Props> = (props) => {
  const [, isResponsive] = useResize();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(window.location.href);
    if (!window.location.href.includes('projects')) {
      dispatch(globalActions.setPage(pages.home));
    }
  }, []);

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
