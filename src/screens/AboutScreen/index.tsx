import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import { Lottie } from '@crello/react-lottie';
import BatAnimation from 'lotties/78925-houselloween.json';
import SkillSets from './components/SkillSets';
import { animated, useSpring } from 'react-spring';
import PageScrollingButton from 'components/buttons/PageScrollingButton';
import AboutDescription from './components/AboutDescription';
import AboutDescriptionModel from 'models/AboutDescriptionModel';
import PageSection from 'components/layout/PageSection';
import LinkText from 'components/text/LinkText';
import LinkButton from 'components/buttons/LinkButton';
import useVisibles from 'hooks/useVisibles';

interface Props extends ThemeProps {
  visible?: boolean;
  title: string;
  skillSets: Array<Array<string>>;
  description: Array<AboutDescriptionModel>;
  isResponsive?: boolean;
  isHidden?: boolean;
  setRef?: React.RefObject<any>;
  onToggleTheme?: () => void;
  onGoToNextSection?: () => void;
}

const AboutScreen: React.FC<Props> = (props) => {
  const visibles = useVisibles([400, 1000], props.visible);
  const [isLottieVisible, setIsLottieVisible] = useState(false);

  const { lottieVisible } = useSpring({
    lottieVisible: isLottieVisible ? 1 : 0,
  });

  useEffect(() => {
    if (props.visible) {
      setIsLottieVisible(true);
    } else if (!props.visible) {
      setIsLottieVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  let containerClass = `${styles.container}`;
  if (props.isResponsive) {
    containerClass += ` ${styles.responsive}`;
  }

  const lottieSize = props.isResponsive ? '240px' : '324px';

  return (
    <PageSection setRef={props.setRef}>
      <div className={containerClass}>
        <div className={styles.content}>
          <div className={styles.animation}>
            {props.skillSets.length > 0 && (
              <SkillSets
                theme={props.theme}
                groups={props.skillSets}
                visible={visibles[1] && props.visible}
                isResponsive={props.isResponsive}
                isLooping={!props.isHidden}
              />
            )}
            <div className={styles.lottie}>
              <animated.div
                style={{
                  opacity: lottieVisible,
                }}
              >
                <Lottie
                  width={lottieSize}
                  height={lottieSize}
                  speed={1.0}
                  config={{
                    animationData: BatAnimation,
                    loop: true,
                    autoplay: false,
                  }}
                  playingState={
                    visibles[1] && !props.isHidden ? 'playing' : 'stopped'
                  }
                />
              </animated.div>
              <div className={styles.link}>
                <LinkText
                  theme={props.theme}
                  href="https://lottiefiles.com/78925-houselloween"
                  text="@Tom Fabre / LottieFiles"
                  visible={visibles[1]}
                />
              </div>
            </div>
          </div>
          <div className={styles.text_area}>
            {props.description.map((x, i) => (
              <AboutDescription
                key={i}
                theme={props.theme}
                textVisible={visibles[1]}
                title={x.title}
                description={x.description}
              />
            ))}
          </div>
        </div>
        <div
          className={styles.works_btn}
          style={{ display: props.isResponsive ? 'flex' : 'none' }}
        >
          <LinkButton
            theme={props.theme}
            text="SEE MY WORKS"
            fontSize={16}
            visible={props.isResponsive && props.visible}
            textVisible={props.isResponsive && props.visible}
            onClick={props.onGoToNextSection}
          />
        </div>
      </div>
      <PageScrollingButton
        theme={props.theme}
        text={'SEE MY WORKS'}
        visible={visibles[0] && !props.isResponsive}
        textVisible={visibles[1] && !props.isResponsive}
        onClick={props.onGoToNextSection}
      />
    </PageSection>
  );
};

export default AboutScreen;
