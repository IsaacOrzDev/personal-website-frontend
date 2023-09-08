import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import globalSelectors from 'store/global/selectors';
import { globalActions } from 'store/global';
import MessageModal from 'components/modals/MessageModal';
import useResize from 'hooks/useResize';
import buttonStyles from 'styles/button.module.scss';
import ChatIcon from 'components/icons/ChatIcon';
import DescriptionText from 'components/text/DescriptionText';
import styles from './style.module.scss';
import { useTransition, animated } from 'react-spring';

interface Props {}

const MessageModalContainer: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const global = {
    theme: useSelector(globalSelectors.theme),
    name: useSelector(globalSelectors.name),
    messageContent: useSelector(globalSelectors.messageContent),
    shouldShowMessageModal: useSelector(globalSelectors.shouldShowMessageModal),
  };

  const [, isResponsive] = useResize();

  const _closeMessageModal = useCallback(() => {
    dispatch(globalActions.setShouldShowMessageModal(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _openMessageModal = useCallback(() => {
    dispatch(globalActions.setShouldShowMessageModal(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transitions = useTransition(!global.shouldShowMessageModal, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
    },
  });

  return (
    <>
      <MessageModal
        theme={global.theme}
        name={global.name}
        text={global.messageContent}
        visible={global.shouldShowMessageModal}
        isResponsive={isResponsive}
        onClose={_closeMessageModal}
      />
      {transitions(
        ({ opacity }, item) =>
          item && (
            <animated.div className={styles.chat} style={{ opacity }}>
              <button
                className={`${buttonStyles.button} ${
                  buttonStyles[global.theme]
                }`}
                onClick={_openMessageModal}
              >
                <ChatIcon theme={global.theme} />
                <DescriptionText fontSize={10} theme={global.theme}>
                  Chat/
                </DescriptionText>
              </button>
            </animated.div>
          )
      )}
    </>
  );
};

export default MessageModalContainer;
