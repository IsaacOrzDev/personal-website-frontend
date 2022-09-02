import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './style.module.scss';
import ProgressCircle from './components/ProgressCircle';
import { ThemeProps } from 'types/Props';
import TitleText from 'components/text/TitleText';
import Words from 'components/text/Words';
import ProjectModel from 'models/ProjectModel';
import ShowcaseScreenShots from './components/ShowcaseScreenshots';
import ProgressInfo from './components/ProgressInfo';
import DropdownModal from 'components/modals/DropdownModal';
import ProjectOptionItem from './components/ProjectOptionItem';
import ProjectNavigation from './components/ProjectNavigation';
import PageSection from 'components/layout/PageSection';
import BreakpointService from 'services/breakpointService';
import LinkButtonGroup from './components/LinkButtonGroup';
import ProjectDescription from './components/ProjectDescription';
import pages from 'config/pages';
import useVisibles from 'hooks/useVisibles';
import GaService from 'services/gaService';

interface Props extends ThemeProps {
  index: number;
  list: ProjectModel[];
  title: string;
  years: string[];
  selectedYear: string;
  visible?: boolean;
  dropdownVisible?: boolean;
  isResponsive?: boolean;
  isHidden?: boolean;
  breakpoint?: string;
  windowOffsetTop: number;
  setRef?: React.RefObject<any>;
  shouldListenScrollingEvent?: boolean;
  onShowDropdown?: () => void;
  onDismissDropdown?: () => void;
  onToggleTheme?: () => void;
  onSelectYear?: (year: string) => void;
  onSelectIndex: (index: number) => void;
  onSelectPrev: () => void;
  onSelectNext?: () => void;
  onGoBack: () => void;
}

const ProjectScreen: React.FC<Props> = (props) => {
  const visibles = useVisibles([800, 1400, 2200], props.visible);

  const selectedProject = useMemo(
    () => props.list.find((x, i) => i === props.index),
    [props.index, props.list]
  );

  const [contentVisible, setContentVisible] = useState(true);
  const [frameVisible, setFrameVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const _openDropdown = useCallback(() => {
    props.onShowDropdown && props.onShowDropdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _selectIndex = useCallback((index: number) => {
    props.onSelectIndex && props.onSelectIndex(index);
    props.onDismissDropdown && props.onDismissDropdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentIndex !== props.index) {
      GaService.pageView(`${pages.projects}/${props.list[props.index].title}`);
      const currentImages = props.list[currentIndex].images
        .map((x) => x.type)
        .join('');
      const nextImages = props.list[props.index].images
        .map((x) => x.type)
        .join('');
      const isDifferentShowcase = currentImages !== nextImages;
      setContentVisible(false);
      if (isDifferentShowcase) {
        setFrameVisible(false);
      }
      setTimeout(() => {
        setCurrentIndex(props.index);
        if (isDifferentShowcase) {
          setFrameVisible(true);
        }
        setContentVisible(true);
      }, 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.index]);

  useEffect(() => {
    return () => {
      if (props.list.length > 0) {
        props.onSelectIndex(0);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const item: ProjectModel = props.list[currentIndex];

  const isLg = BreakpointService.isLg(props.breakpoint!);
  const isMd = BreakpointService.isMd(props.breakpoint!);

  let circleSize = 580;
  if (isMd) {
    circleSize = 600 * 0.6;
  } else if (isLg) {
    circleSize = 600 * 0.8;
  }

  return (
    <PageSection
      setRef={props.setRef}
      className={props.isResponsive ? styles.responsive : ''}
    >
      <div className={`${styles.container} ${styles[props.breakpoint!]}`}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.left_inner}>
              <ProgressCircle
                theme={props.theme}
                width={circleSize}
                visible={visibles[0] && !props.isResponsive}
                percentage={((props.index + 1) / props.list.length) * 100}
                barColor={selectedProject?.primaryColor}
              />
              <div className={styles.frame_container}>
                <ShowcaseScreenShots
                  theme={props.theme}
                  visible={visibles[1] && frameVisible && !props.isResponsive}
                  imgVisible={visibles[2] && contentVisible}
                  list={item.images}
                  breakpoint={props.breakpoint}
                  isLooping={!props.isHidden && !props.isResponsive}
                />
              </div>
            </div>
          </div>
          <div className={styles.text_area}>
            <div className={styles.info}>
              <ProgressInfo
                barColor={selectedProject?.primaryColor ?? ''}
                theme={props.theme}
                visible={visibles[0] && !props.isResponsive}
                textVisible={visibles[2] && !props.isResponsive}
                currentVisible={
                  visibles[1] && contentVisible && !props.isResponsive
                }
                index={currentIndex}
                total={props.list.length}
                percentage={(props.index + 1) / props.list.length}
                onClickIndex={_openDropdown}
              />
              <ProjectNavigation
                theme={props.theme}
                activeColor={selectedProject?.primaryColor}
                visible={visibles[0] && !props.isResponsive}
                prevVisible={props.index !== 0}
                nextVisible={props.index !== props.list.length - 1}
                items={props.list}
                index={props.index}
                disabled={!props.shouldListenScrollingEvent}
                onSelectPrev={props.onSelectPrev}
                onSelectNext={props.onSelectNext}
              />
            </div>
            <TitleText
              theme={props.theme}
              color={selectedProject?.primaryColor ?? 'tint'}
              fontSize={isLg ? 32 : 60}
            >
              <Words
                text={item.title}
                mode="words"
                visible={visibles[2] && contentVisible && !props.isResponsive}
              />
            </TitleText>
            <div className={styles.description}>
              {item.description.map((x, i) => (
                <ProjectDescription
                  key={i}
                  theme={props.theme}
                  fontSize={isLg ? 14 : 18}
                  visible={visibles[2] && contentVisible && !props.isResponsive}
                  text={x}
                />
              ))}
            </div>
            <LinkButtonGroup
              theme={props.theme}
              items={item.links}
              project={item.title}
              visible={visibles[1] && contentVisible && !props.isResponsive}
              textVisible={visibles[2] && contentVisible && !props.isResponsive}
              isResponsive={isMd}
            />
            <DropdownModal
              theme={props.theme}
              visible={props.dropdownVisible}
              position={{ x: 0, y: 0 }}
              onExit={props.onDismissDropdown}
            >
              {props.list.map((x, i) => (
                <ProjectOptionItem
                  key={i}
                  theme={props.theme}
                  index={i}
                  title={x.title}
                  onClick={() => _selectIndex(i)}
                  visible={props.dropdownVisible}
                />
              ))}
            </DropdownModal>
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default ProjectScreen;
