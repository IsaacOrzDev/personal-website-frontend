import ProjectModel from 'models/ProjectModel';

export interface ProjectsState {
  visible: boolean;
  selectedIndex: number;
  years: string[];
  list: ProjectModel[];
  dropdownVisible: boolean;
}

export const initialProjectsState: ProjectsState = {
  visible: false,
  selectedIndex: 0,
  years: [],
  list: [],
  dropdownVisible: false,
};
