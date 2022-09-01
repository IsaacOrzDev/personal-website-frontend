import React, { useEffect, useState, useRef } from 'react';
import { ThemeProps } from 'types/Props';
import PageSection from 'components/layout/PageSection';
import ProjectModel from 'models/ProjectModel';
import useMeasure from 'hooks/useMeasure';
import LazyLoad from 'react-lazyload';
import ProjectInformationContent from './components/ProjectInformationContent';

interface Props extends ThemeProps {
  item: ProjectModel;
  index: number;
  breakpoint?: string;
  visible?: boolean;
  isFocused?: boolean;
  isLooping?: boolean;
  windowOffsetTop: number;
  windowOffsetBottom: number;
  onFocus?: (index: number) => void;
}

const ProjectInformation: React.FC<Props> = props => {
  const [bind, bounds] = useMeasure();
  const [visible, setVisible] = useState(false);
  const [isInitVisible, setIsInitVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const boundsRef = useRef<any>();

  useEffect(() => {
    if (!boundsRef.current && bounds) {
      boundsRef.current = bounds;
    }
    if (bounds && props.windowOffsetBottom >= bounds.y && !isInitVisible) {
      setIsInitVisible(true);
      setTimeout(() => setVisible(true), 1000);
    }
    if (boundsRef.current) {
      let distance = 0;
      if (props.windowOffsetTop < boundsRef.current.y) {
        distance = boundsRef.current.y - props.windowOffsetTop;
      } else {
        distance = props.windowOffsetTop - boundsRef.current.y;
      }
      if (distance < window.innerHeight && !isFocused) {
        // console.log(props.index);
        setIsFocused(true);
      } else if (distance > window.innerHeight && isFocused) {
        // console.log(`!${props.index}`);
        setIsFocused(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds, props.windowOffsetBottom]);

  return (
    <PageSection setRef={bind.ref}>
      <LazyLoad height={'100vh'}>
        <ProjectInformationContent
          theme={props.theme}
          index={props.index}
          item={props.item}
          visible={visible}
          breakpoint={props.breakpoint}
          isFocused={isFocused}
          isLooping={props.isLooping}
        />
      </LazyLoad>
    </PageSection>
  );
};

export default ProjectInformation;
