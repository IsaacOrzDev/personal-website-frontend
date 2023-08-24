import { Theme } from 'types/Types';
import pages from 'config/pages';
import { PaletteModel } from 'models/ProjectModel';

export interface GlobalState {
  theme: Theme;
  visible: boolean;
  page: string;
  name: string;
  title: string;
  homeImages: Array<{ url: string; palette: PaletteModel }>;
  messageContent: string;
  dataLoaded: boolean;
  shouldShowContent: boolean;
  shouldShowMenu: boolean;
  shouldShowCookieModal: boolean;
  shouldListenScrollingEvent: boolean;
  selectedHomeImage: number | null;
}

export const initialGlobalState: GlobalState = {
  theme: 'dark',
  visible: true,
  page: pages.home,
  name: '',
  title: '',
  homeImages: [],
  messageContent: '',
  dataLoaded: false,
  shouldShowContent: false,
  shouldShowMenu: false,
  shouldShowCookieModal: false,
  shouldListenScrollingEvent: false,
  selectedHomeImage: null,
};
