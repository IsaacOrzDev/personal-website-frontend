import AboutDescriptionModel from 'models/AboutDescriptionModel';

export interface AboutState {
  visible: boolean;
  skillSets: Array<Array<string>>;
  description: Array<AboutDescriptionModel>;
}

export const initialAboutState: AboutState = {
  visible: false,
  skillSets: [],
  description: [],
};
