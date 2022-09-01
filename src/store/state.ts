import { GlobalState, initialGlobalState } from './global/state';
import { ProjectsState, initialProjectsState } from './project/state';
import { AboutState, initialAboutState } from './about/state';

export interface State {
  global: GlobalState;
  project: ProjectsState;
  about: AboutState;
}

export const initialState: State = {
  global: initialGlobalState,
  project: initialProjectsState,
  about: initialAboutState,
};
