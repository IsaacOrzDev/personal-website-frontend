import React from 'react';
import StoryContainer from 'stories/components/StoryContainer';
import AboutDescription from 'screens/AboutScreen/components/AboutDescription';
import { withKnobs } from '@storybook/addon-knobs';
import globalKnobs from 'stories/globalKnobs';

export default {
  title: `Welcome`,
  decorators: [
    withKnobs,
    (storyFn) => (
      <StoryContainer theme={globalKnobs.theme()}>{storyFn()}</StoryContainer>
    ),
  ],
};

export const ToPlayground = () => {
  return (
    <AboutDescription
      textVisible={true}
      title="Welcome to playground"
      description={[
        'The personal website is built with React.js, which is a JavaScript library for building user interfaces.',
        'In the playground, you can play with and manipulate the components',
      ]}
    />
  );
};
