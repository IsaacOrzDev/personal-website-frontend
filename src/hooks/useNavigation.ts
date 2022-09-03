import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from 'store/global';
import pages from 'config/pages';
import { useNavigate } from 'react-router-dom';
import routes from 'config/routes';
import globalSelectors from 'store/global/selectors';
import GaService from 'services/gaService';
import { projectActions } from 'store/project';
import TimeService from 'services/timeService';

export default function useNavigation(isResponsive: boolean) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page = useSelector(globalSelectors.page);
  const shouldShowMenu = useSelector(globalSelectors.shouldShowMenu);

  const goToHomeSection = useCallback(async () => {
    dispatch(projectActions.setVisible(false));
    dispatch(globalActions.setPage(pages.home));
    if (shouldShowMenu) {
      dispatch(globalActions.setShouldShowMenu(false));
    } else {
      await TimeService.timeout(500);
    }
    navigate(routes.home, { replace: true });
    GaService.pageView(pages.home);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isResponsive, shouldShowMenu]);

  const goToProjectSection = useCallback(
    async (index?: number) => {
      dispatch(globalActions.setVisible(false));
      if (shouldShowMenu) {
        dispatch(globalActions.setShouldShowMenu(false));
      } else {
        await TimeService.timeout(500);
      }
      dispatch(globalActions.setPage(pages.projects));
      if (index !== undefined) {
        dispatch(projectActions.setSelectedIndex(index));
      }
      navigate(routes.projects, { replace: true });
      GaService.pageView(pages.projects);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch, navigate, shouldShowMenu]
  );

  return {
    goToHomeSection,
    goToProjectSection,
  };
}
