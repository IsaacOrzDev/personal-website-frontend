import React, { useCallback } from 'react';
import styles from './style.module.scss';
import buttonStyles from 'styles/button.module.scss';
import { animated, useSpring } from 'react-spring';
import DescriptionText from 'components/text/DescriptionText';
import Words from 'components/text/Words';
import { ThemeProps } from 'types/Props';
import ProgressBar from 'components/layout/ProgressBar';
import useMeasure from 'hooks/useMeasure';
import TextService from 'services/textService';

interface Props extends ThemeProps {
  visible?: boolean;
  textVisible?: boolean;
  currentVisible?: boolean;
  index: number;
  total: number;
  percentage: number;
  color?: string;
  onClickIndex?: (position: { x: number; y: number }) => void;
}

const ProgressInfo: React.FC<Props> = (props) => {
  const [bind, bounds] = useMeasure();
  const { visible } = useSpring({
    visible: props.visible ? 1 : 0,
  });

  const current = props.index + 1;

  const onClickIndex = useCallback(() => {
    bounds &&
      props.onClickIndex &&
      props.onClickIndex({
        x: bounds.left,
        y: bounds.bottom + bounds.height / 2,
      });
  }, [bounds, props]);

  return (
    <button
      className={`${buttonStyles.button} ${buttonStyles[props.theme]} ${
        styles.container
      } ${styles[props.theme]}`}
      onClick={onClickIndex}
      {...bind}
    >
      <div className={styles.current}>
        <div className={styles.text}>
          <DescriptionText theme={props.theme} fontSize={32}>
            <Words
              text={TextService.getNumberText(current)}
              visible={props.textVisible && props.currentVisible}
            />
          </DescriptionText>
        </div>
        <animated.div
          className={styles.down}
          style={{ transform: visible.interpolate((v) => `scale(${v})`) }}
        />
      </div>
      <ProgressBar
        barColor={props.color}
        theme={props.theme}
        visible={props.visible}
        percentage={props.percentage}
      />
      <div className={styles.total}>
        <DescriptionText theme={props.theme} fontSize={32}>
          <Words
            text={TextService.getNumberText(props.total)}
            visible={props.textVisible}
          />
        </DescriptionText>
      </div>
    </button>
  );
};

export default ProgressInfo;
