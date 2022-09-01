import { State } from '../state';

const visible = (state: State) => state.about.visible;
const skillSets = (state: State) => state.about.skillSets;
const description = (state: State) => state.about.description;

const aboutSelectors = {
  visible,
  skillSets,
  description,
};

export default aboutSelectors;
