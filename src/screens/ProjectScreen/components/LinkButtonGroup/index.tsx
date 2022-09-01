import React, { useCallback } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import LinkButton from 'components/buttons/LinkButton';
import GaService from 'services/gaService';

interface Props extends ThemeProps {
  items: Array<{ url: string; type: string; text?: string }>;
  visible?: boolean;
  textVisible?: boolean;
  isResponsive?: boolean;
  center?: boolean;
  project?: string;
}

const LinkButtonGroup: React.FC<Props> = props => {
  let containerClassName = `${styles.container}`;
  if (props.isResponsive) {
    containerClassName += ` ${styles.responsive}`;
  }
  if (props.center) {
    containerClassName += ` ${styles.center}`;
  }

  const _openUrl = useCallback((url: string) => {
    window.open(url, '_blank');
    GaService.addClickingProjectLinkEvent(props.project!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={containerClassName}>
      {props.items.map((x, i) => (
        <div key={i} className={styles.item}>
          <LinkButton
            theme={props.theme}
            type={x.type}
            text={x.text}
            visible={props.visible}
            textVisible={props.textVisible}
            onClick={() => _openUrl(x.url)}
          />
        </div>
      ))}
    </div>
  );
};

export default LinkButtonGroup;
