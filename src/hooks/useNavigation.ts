import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from 'store/global';
import pages from 'config/pages';
import { useNavigate } from 'react-router-dom';
import routes from 'config/routes';
import globalSelectors from 'store/global/selectors';
import GaService from 'services/gaService';

export default function useNavigation(isResponsive: boolean) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page = useSelector(globalSelectors.page);
  const shouldShowMenu = useSelector(globalSelectors.shouldShowMenu);

  const goToHomeSection = useCallback(() => {
    dispatch(globalActions.setPage(pages.home));
    dispatch(globalActions.setShouldShowMenu(false));
    navigate(routes.home, { replace: true });
    GaService.pageView(pages.home);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isResponsive]);

  const goToProjectSection = useCallback(async () => {
    dispatch(globalActions.setPage(pages.projects));
    dispatch(globalActions.setShouldShowMenu(false));
    navigate(routes.works, { replace: true });
    GaService.pageView(pages.projects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, shouldShowMenu]);

  return {
    goToHomeSection,
    goToProjectSection,
  };
}
