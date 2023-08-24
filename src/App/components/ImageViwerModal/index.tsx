import React from 'react';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import globalSelectors from 'store/global/selectors';
import useResize from 'hooks/useResize';
import { useAtom } from 'jotai';
import { imageViewerUrlAtom, imageViewerVisible } from 'store/others';
import ImageItem from 'components/images/ImageItem';
import { animated, useTransition } from 'react-spring';
import LinkButton from 'components/buttons/LinkButton';

interface Props {}

const ImageViewerModal: React.FC<Props> = () => {
  const [, isResponsive] = useResize();
  const [visible, setVisible] = useAtom(imageViewerVisible);
  const [url, setUrl] = useAtom(imageViewerUrlAtom);

  const transitions = useTransition(visible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const global = {
    theme: useSelector(globalSelectors.theme),
  };

  return (
    <div>
      {transitions(
        ({ opacity }, item) =>
          item && (
            <animated.div
              className={`${styles.container} ${styles[global.theme]}`}
              style={{ opacity }}
            >
              <div className={styles.close_button}>
                <LinkButton
                  theme={global.theme}
                  text="CLOSE"
                  visible={visible}
                  textVisible={visible}
                  onClick={() => setVisible(false)}
                />
              </div>
              <ImageItem src={url} resizeMode="contain" visible={visible} />
            </animated.div>
          )
      )}
    </div>
  );
};

export default ImageViewerModal;
