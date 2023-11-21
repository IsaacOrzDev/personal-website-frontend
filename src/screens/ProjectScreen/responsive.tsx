import React, { useCallback, useEffect, useMemo } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import ProjectModel from 'models/ProjectModel';
import ProjectInformation from './components/ProjectInformation';
import { forceCheck } from 'react-lazyload';
import ParallaxBar from './components/ParallaxBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LinkButton from 'components/buttons/LinkButton';

interface Props extends ThemeProps {
  index: number;
  list: ProjectModel[];
  title: string;
  years: string[];
  visible?: boolean;
  isResponsive?: boolean;
  isHidden?: boolean;
  breakpoint?: string;
  shouldShowMenu?: boolean;
  windowOffsetTop: number;
  windowOffsetBottom: number;
  tags: Record<string, string>;
  onSelectIndex: (index: number) => void;
}

const ResponsiveProjectScreen: React.FC<Props> = (props) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const project = params.get('project');

  const _setCurrentIndex = useCallback((index: number) => {
    props.onSelectIndex && props.onSelectIndex(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewAllProject = () => {
    navigate('/projects', {
      replace: true,
    });
  };

  // const palette = useMemo(() => props.list[props.index].palette, []);

  useEffect(() => {
    forceCheck();
  }, []);

  let list = useMemo(() => {
    if (project) {
      return props.list.filter((x) => x.title.includes(project)) ?? props.list;
    }

    return props.list;
  }, [project]);

  return (
    <div
      className={styles.scrolling_list}
      style={!props.isResponsive ? { display: 'none' } : {}}
    >
      {list.map((x, i) => (
        <ProjectInformation
          theme={props.theme}
          key={i}
          item={x}
          index={i}
          breakpoint={props.breakpoint}
          windowOffsetTop={props.windowOffsetTop}
          windowOffsetBottom={props.windowOffsetBottom}
          // FIXME The props.index should be updated when the project component is showing up on screen
          isFocused={props.index === i}
          isLooping={false}
          onFocus={_setCurrentIndex}
          tags={props.tags}
        />
      ))}
      {!!project && (
        <div className={styles.view_all}>
          <LinkButton
            theme={props.theme}
            visible={true}
            textVisible={true}
            text="View All Projects"
            onClick={viewAllProject}
          />
        </div>
      )}
      <ParallaxBar
        theme={props.theme}
        yBottom={props.windowOffsetBottom}
        visible={props.visible && !props.shouldShowMenu}
        // color={palette[props.theme]}
      />
    </div>
  );
};

export default ResponsiveProjectScreen;
