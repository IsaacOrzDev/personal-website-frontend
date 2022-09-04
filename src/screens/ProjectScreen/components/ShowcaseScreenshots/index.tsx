import React from 'react';
import styles from './style.module.scss';
import { animated, useSpring } from 'react-spring';
import { ThemeProps } from 'types/Props';
import IPhoneXFrame from 'components/frames/IPhoneXFrame';
import AndroidFrame from 'components/frames/AndroidFrame';
import IPadFrame from 'components/frames/IPadFrame';
import BrowserFrame from 'components/frames/BrowserFrame';
import ProjectModel, { ShowcaseTypeEnum } from 'models/ProjectModel';
import BreakpointService from 'services/breakpointService';

interface Props extends ThemeProps {
  visible?: boolean;
  imgVisible?: boolean;
  breakpoint?: string;
  isLooping?: boolean;
  list: ProjectModel['preview'];
}

const ShowcaseScreenShots: React.FC<Props> = (props) => {
  const { visible } = useSpring({
    visible: props.visible ? 1 : 0,
  });

  const iPad = props.list.find((x) => x.type === ShowcaseTypeEnum.ipad);
  const iPhone = props.list.find((x) => x.type === ShowcaseTypeEnum.ios);
  const android = props.list.find((x) => x.type === ShowcaseTypeEnum.android);
  const website = props.list.find((x) => x.type === ShowcaseTypeEnum.website);
  const responsiveWebsite = props.list.find(
    (x) => x.type === ShowcaseTypeEnum.responsiveWebsite
  );

  const isSm = BreakpointService.isSm(props.breakpoint!);

  if (iPad) {
    let containerClassName = `${styles.ipad}`;
    if (isSm) {
      containerClassName += ` ${styles.responsive}`;
    }
    return (
      <div className={containerClassName}>
        <animated.div
          style={{
            opacity: visible,
            transform: visible
              .interpolate({ range: [0, 1], output: [-80, 0] })
              .interpolate((v) => `translateX(${v}px)`),
          }}
        >
          <IPadFrame
            theme={props.theme}
            src={iPad.imageUrls}
            iframe={iPad.iframe}
            imgVisible={props.imgVisible}
            breakpoint={props.breakpoint}
            isLooping={props.isLooping}
          />
        </animated.div>
      </div>
    );
  }

  if (android && !iPhone) {
    let containerClassName = `${styles.mobile_both}`;
    if (isSm) {
      containerClassName += ` ${styles.responsive}`;
    }

    return (
      <div className={containerClassName}>
        <animated.div
          className={styles.iphone}
          style={{
            opacity: visible,
            transform: visible
              .to({ range: [0, 1], output: [-80, 0] })
              .to((v) => `translateY(${v}px)`),
          }}
        >
          <AndroidFrame
            theme={props.theme}
            src={android.imageUrls}
            imgVisible={props.imgVisible}
            breakpoint={props.breakpoint}
            isLooping={props.isLooping}
            isFullScreen
            iframe={android.iframe}
          />
        </animated.div>
        <animated.div
          className={styles.android}
          style={{
            opacity: visible,
            transform: visible
              .to({ range: [0, 1], output: [80, 0] })
              .to((v) => `translateY(${v}px)`),
          }}
        >
          <AndroidFrame
            theme={props.theme}
            src={android.imageUrls}
            imgVisible={props.imgVisible}
            breakpoint={props.breakpoint}
            isLooping={props.isLooping}
            isFullScreen
            iframe={android.iframe}
          />
        </animated.div>
      </div>
    );
  }

  if (iPhone && android) {
    let containerClassName = `${styles.mobile_both}`;
    if (isSm) {
      containerClassName += ` ${styles.responsive}`;
    }
    return (
      <div className={containerClassName}>
        <animated.div
          className={styles.iphone}
          style={{
            opacity: visible,
            transform: visible
              .interpolate({ range: [0, 1], output: [-80, 0] })
              .interpolate((v) => `translateY(${v}px)`),
          }}
        >
          <IPhoneXFrame
            theme={props.theme}
            src={iPhone.imageUrls}
            imgVisible={props.imgVisible}
            breakpoint={props.breakpoint}
            isLooping={props.isLooping}
            iframe={android.iframe}
          />
        </animated.div>
        <animated.div
          className={styles.android}
          style={{
            opacity: visible,
            transform: visible
              .to({ range: [0, 1], output: [80, 0] })
              .to((v) => `translateY(${v}px)`),
          }}
        >
          <AndroidFrame
            theme={props.theme}
            src={android.imageUrls}
            imgVisible={props.imgVisible}
            breakpoint={props.breakpoint}
            isLooping={props.isLooping}
            iframe={android.iframe}
          />
        </animated.div>
      </div>
    );
  }

  if (website) {
    let containerClassName = `${styles.website_container}`;
    if (isSm) {
      containerClassName += ` ${styles.responsive}`;
    }
    return (
      <div className={containerClassName}>
        <animated.div
          style={{
            opacity: visible,
            transform: visible.interpolate((v) => `scale(${v})`),
          }}
        >
          <BrowserFrame
            theme={props.theme}
            src={website.imageUrls}
            imgVisible={props.imgVisible}
            breakpoint={props.breakpoint}
            isLooping={props.isLooping}
            iframe={website.iframe}
          />
        </animated.div>
        {!!responsiveWebsite && (
          <div className={styles.responsive}>
            <animated.div
              style={{
                opacity: visible,
                transform: visible.interpolate((v) => `scale(${v})`),
              }}
            >
              <BrowserFrame
                theme={props.theme}
                responsive
                src={responsiveWebsite.imageUrls}
                imgVisible={props.imgVisible}
                breakpoint={props.breakpoint}
                isLooping={props.isLooping}
                iframe={responsiveWebsite.iframe}
              />
            </animated.div>
          </div>
        )}
      </div>
    );
  }

  return <div />;
};

export default ShowcaseScreenShots;
