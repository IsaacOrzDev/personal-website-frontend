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
import RightIcon from 'components/icons/RightIcon';

interface Props extends ThemeProps {
  visible?: boolean;
  textVisible?: boolean;
  currentVisible?: boolean;
  index: number;
  total: number;
  percentage: number;
  color?: string;
  prevVisible?: boolean;
  nextVisible?: boolean;
  disabled?: boolean;
  onClickIndex?: (position: { x: number; y: number }) => void;
  onSelectPrev?: () => void;
  onSelectNext?: () => void;
}

const ProgressInfo: React.FC<Props> = (props) => {
  const [bind, bounds] = useMeasure();
  const { visible, color } = useSpring({
    visible: props.visible ? 1 : 0,
    color: !!props.color
      ? `${props.color} transparent transparent transparent`
      : '',
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

  const _addIndex = () => {
    props.onSelectNext && props.onSelectNext();
  };

  const _minusIndex = () => {
    props.onSelectPrev && props.onSelectPrev();
  };

  return (
    <div className={styles.container}>
      <button
        className={`${buttonStyles.button} ${buttonStyles[props.theme]} ${
          styles.btn
        } ${styles.left} ${!props.prevVisible ? styles.hidden : ''}`}
        onClick={_minusIndex}
        disabled={!props.prevVisible || props.disabled}
      >
        <RightIcon theme={props.theme} />
      </button>

      <button
        className={`${buttonStyles.button} ${buttonStyles[props.theme]} ${
          styles.toggle
        } ${styles[props.theme]}`}
        onClick={onClickIndex}
        {...bind}
      >
        <div className={styles.current}>
          <div className={styles.text}>
            <DescriptionText
              theme={props.theme}
              fontSize={32}
              color={props.color}
            >
              <Words
                text={TextService.getNumberText(current)}
                visible={props.textVisible && props.currentVisible}
              />
            </DescriptionText>
          </div>
          <animated.div
            className={styles.down}
            style={{
              // transform: visible.to((v) => `scale(${v})`),
              borderColor: color,
            }}
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

      <button
        className={`${buttonStyles.button} ${buttonStyles[props.theme]} ${
          styles.btn
        } ${!props.nextVisible ? styles.hidden : ''}`}
        onClick={_addIndex}
        disabled={!props.nextVisible || props.disabled}
      >
        <RightIcon theme={props.theme} />
      </button>
    </div>
  );
};

export default ProgressInfo;
