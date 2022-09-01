import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from 'store/global';
import pages from 'config/pages';
import { projectActions } from 'store/project';
import { aboutActions } from 'store/about';
import { useHistory } from 'react-router-dom';
import routes from 'config/routes';
import globalSelectors from 'store/global/selectors';
import GaService from 'services/gaService';
import TimeService from 'services/timeService';

export default function useNavigation(
  isResponsive: boolean
): [() => void, () => void, () => void] {
  const dispatch = useDispatch();
  const history = useHistory();

  const page = useSelector(globalSelectors.page);
  const shouldShowMenu = useSelector(globalSelectors.shouldShowMenu);

  const goToHomeSection = useCallback(() => {
    dispatch(globalActions.setPage(pages.home));
    dispatch(aboutActions.setVisible(false));
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

  const goToAboutSection = useCallback(async () => {
    dispatch(globalActions.setPage(pages.about));
    dispatch(globalActions.setShouldShowMenu(false));
    if (page === pages.projects) {
      if (isResponsive) {
        dispatch(projectActions.setVisible(false));
        history.replace(routes.home);
        await TimeService.timeout(300);
        window.scrollTo({
          top: window.innerHeight - 60,
          behavior: 'smooth',
        });
        dispatch(aboutActions.setVisible(true));
      } else {
        dispatch(projectActions.setVisible(false));
        await TimeService.timeout(1200);
        history.replace(routes.home);
        dispatch(aboutActions.setVisible(true));
      }
    } else {
      if (isResponsive) {
        // let top = window.innerHeight - 60;
        // if (browserService.isSafari() && browserService.isMobile()) {
        //   top = window.outerHeight - 120;
        // }
        const top = window.outerHeight - 120;
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
      dispatch(aboutActions.setVisible(true));
    }
    GaService.pageView(pages.about);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isResponsive, window.innerHeight]);

  const goToProjectSection = useCallback(async () => {
    dispatch(aboutActions.setVisible(false));
    if (!shouldShowMenu) {
      await TimeService.timeout(1000);
    } else {
      dispatch(globalActions.setShouldShowMenu(false));
    }
    history.replace(routes.works);
    GaService.pageView(pages.projects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, shouldShowMenu]);

  return [goToHomeSection, goToAboutSection, goToProjectSection];
}
