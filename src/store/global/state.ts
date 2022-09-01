import { Theme } from 'types/Types';
import pages from 'config/pages';

export interface GlobalState {
  theme: Theme;
  page: string;
  name: string;
  title: string;
  homeImages: string[];
  cookieMsgContent: string;
  hasCookie: boolean;
  dataLoaded: boolean;
  shouldShowContent: boolean;
  shouldShowMenu: boolean;
  shouldShowCookieModal: boolean;
  shouldListenScrollingEvent: boolean;
}

export const initialGlobalState: GlobalState = {
  theme: 'dark',
  page: pages.home,
  name: '',
  title: '',
  homeImages: [],
  cookieMsgContent: '',
  hasCookie: false,
  dataLoaded: false,
  shouldShowContent: false,
  shouldShowMenu: false,
  shouldShowCookieModal: false,
  shouldListenScrollingEvent: false,
};
