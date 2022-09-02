import { GlobalState, initialGlobalState } from './global/state';
import { ProjectsState, initialProjectsState } from './project/state';

export interface State {
  global: GlobalState;
  project: ProjectsState;
}

export const initialState: State = {
  global: initialGlobalState,
  project: initialProjectsState,
};
