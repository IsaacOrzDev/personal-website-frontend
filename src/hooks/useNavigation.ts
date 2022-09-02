import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from 'store/global';
import pages from 'config/pages';
import { projectActions } from 'store/project';
import { useHistory } from 'react-router-dom';
import routes from 'config/routes';
import globalSelectors from 'store/global/selectors';
import GaService from 'services/gaService';

export default function useNavigation(isResponsive: boolean) {
  const dispatch = useDispatch();
  const history = useHistory();

  const page = useSelector(globalSelectors.page);
  const shouldShowMenu = useSelector(globalSelectors.shouldShowMenu);

  const goToHomeSection = useCallback(() => {
    dispatch(globalActions.setPage(pages.home));
    dispatch(projectActions.setVisible(false));
    dispatch(globalActions.setShouldShowMenu(false));
    if (page === pages.projects) {
      history.replace(routes.home);
    } else if (page === pages.about && isResponsive) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    GaService.pageView(pages.home);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isResponsive]);

  const goToProjectSection = useCallback(async () => {
    history.replace(routes.home);
    if (shouldShowMenu) {
      dispatch(globalActions.setShouldShowMenu(false));
    }
    history.replace(routes.works);
    GaService.pageView(pages.projects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, shouldShowMenu]);

  return {
    goToHomeSection,
    goToProjectSection,
  };
}
