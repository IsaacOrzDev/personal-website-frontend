import React, { useCallback } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import IndexItem from './components/IndexItem';

interface Props extends ThemeProps {
  items: string[];
  visible?: boolean;
  textVisible?: boolean;
  activeIndex?: number;
  isHorizontal?: boolean;
  onSelect?: (year: string) => void;
}

const Index: React.FC<Props> = props => {
  const _selectItem = useCallback((year: string) => {
    props.onSelect && props.onSelect(year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let containerClass = `${styles.container}`;
  if (props.isHorizontal) {
    containerClass += ` ${styles.horizontal}`;
  }

  return (
    <div className={containerClass}>
      {props.items.map((x, i) => (
        <IndexItem
          theme={props.theme}
          key={x}
          text={x}
          textVisible={props.textVisible}
          visible={props.visible}
          active={props.activeIndex === i}
          isHorizontal={props.isHorizontal}
          onClick={() => _selectItem(x)}
        />
      ))}
    </div>
  );
};

export default Index;
