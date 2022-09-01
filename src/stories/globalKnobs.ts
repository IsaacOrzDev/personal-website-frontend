import { select, boolean } from '@storybook/addon-knobs';

const theme = (defaultTheme: 'dark' | 'light' = 'dark') => {
  const options = { 'Dark Theme': 'dark', 'Light Theme': 'light' };
  const defaultValue = defaultTheme;
  return select('Themes', options, defaultValue);
};

const visible = (label?: string) => {
  const visible = boolean(Boolean(label) ? label! : 'Visible', true);
  return visible;
};

const globalKnobs = {
  theme,
  visible,
};

export default globalKnobs;
