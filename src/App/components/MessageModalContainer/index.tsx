import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import globalSelectors from 'store/global/selectors';
import { globalActions } from 'store/global';
import MessageModal from 'components/modals/MessageModal';
import useResize from 'hooks/useResize';

interface Props {}

const MessageModalContainer: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const global = {
    theme: useSelector(globalSelectors.theme),
    name: useSelector(globalSelectors.name),
    messageContent: useSelector(globalSelectors.messageContent),
    shouldShowCookieModal: useSelector(globalSelectors.shouldShowCookieModal),
  };

  const [, isResponsive] = useResize();

  const _closeMessageModal = useCallback(() => {
    dispatch(globalActions.setShouldShowMessageModal(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MessageModal
      theme={global.theme}
      name={global.name}
      text={global.messageContent}
      visible={global.shouldShowCookieModal}
      isResponsive={isResponsive}
      onClose={_closeMessageModal}
    />
  );
};

export default MessageModalContainer;
