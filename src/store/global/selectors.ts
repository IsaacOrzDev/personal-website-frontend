import { State } from '../state';

const theme = (state: State) => state.global.theme;
const page = (state: State) => state.global.page;
const name = (state: State) => state.global.name;
const title = (state: State) => state.global.title;
const homeImages = (state: State) => state.global.homeImages;
const cookieMsgContent = (state: State) => state.global.cookieMsgContent;
const hasCookie = (state: State) => state.global.hasCookie;
const dataLoaded = (state: State) => state.global.dataLoaded;
const shouldShowContent = (state: State) => state.global.shouldShowContent;
const shouldShowMenu = (state: State) => state.global.shouldShowMenu;
const shouldShowCookieModal = (state: State) =>
  state.global.shouldShowCookieModal;
const shouldListenScrollingEvent = (state: State) =>
  state.global.shouldListenScrollingEvent;

const globalSelectors = {
  theme,
  page,
  name,
  title,
  homeImages,
  cookieMsgContent,
  hasCookie,
  dataLoaded,
  shouldShowContent,
  shouldShowMenu,
  shouldShowCookieModal,
  shouldListenScrollingEvent,
};

export default globalSelectors;
