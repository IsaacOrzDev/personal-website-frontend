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
    cookieMsgContent: useSelector(globalSelectors.cookieMsgContent),
    shouldShowCookieModal: useSelector(globalSelectors.shouldShowCookieModal),
  };

  const [, isResponsive] = useResize();

  const _closeCookieModal = useCallback(() => {
    dispatch(globalActions.setShouldShowCookieModal(false));
    dispatch(globalActions.setHasCookie(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MessageModal
      theme={global.theme}
      text={global.cookieMsgContent}
      visible={global.shouldShowCookieModal}
      isResponsive={isResponsive}
      onClose={_closeCookieModal}
    />
  );
};

export default MessageModalContainer;
