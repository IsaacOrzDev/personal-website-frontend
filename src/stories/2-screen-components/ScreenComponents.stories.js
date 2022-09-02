import React from 'react';
import storyHierarchy from 'stories/storyHierarchy';
import Marquee from 'screens/HomeScreen/components/Marquee';
import StoryContainer from 'stories/components/StoryContainer';
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
} from '@storybook/addon-knobs';
import globalKnobs from 'stories/globalKnobs';
import ImageBackground from 'screens/HomeScreen/components/ImageBackground';
import ProgressCircle from 'screens/ProjectScreen/components/ProgressCircle';
import ShowcaseScreenShots from 'screens/ProjectScreen/components/ShowcaseScreenshots';
import { ShowcaseTypeEnum } from 'models/ProjectModel';
import ProgressInfo from 'screens/ProjectScreen/components/ProgressInfo';
import ProjectNavigation from 'screens/ProjectScreen/components/ProjectNavigation';

export default {
  title: `${storyHierarchy.header.screenComponents}`,
  decorators: [
    withKnobs,
    (storyFn) => (
      <StoryContainer theme={globalKnobs.theme()}>{storyFn()}</StoryContainer>
    ),
  ],
};

export const MarqueeStory = () => {
  const name = text('Name', 'BRUCE WAYNE');
  const title = text('Title', 'THE DARK KNIGHT');
  const paused = boolean('Paused', false);
  const speed = number('Speed', 1, {
    range: true,
    min: 1,
    max: 10,
    step: 1,
  });
  return (
    <Marquee
      name={name}
      title={title}
      paused={paused}
      visible={globalKnobs.visible()}
      duration={11 - speed}
    />
  );
};

MarqueeStory.story = {
  name: 'Marquee',
};

export const ImageBackgroundStory = () => {
  const image1 = text(
    'Image 1',
    'https://images.unsplash.com/photo-1583156340160-7867f31285d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
  );
  const image2 = text(
    'Image 2',
    'https://images.unsplash.com/photo-1497124401559-3e75ec2ed794?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
  );
  const image3 = text(
    'Image 3',
    'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
  );

  return (
    <ImageBackground
      visible={globalKnobs.visible()}
      urls={[image1, image2, image3]}
    />
  );
};

ImageBackgroundStory.story = {
  name: 'Image Background',
};

export const NavigationButtons = () => {
  const items = ['', '', '', '', '', '', '', '', '', ''];
  const index = number('Index', 1, {
    range: true,
    min: 1,
    max: 10,
    step: 1,
  });
  const disabled = boolean('Disabled', false);
  return (
    <ProjectNavigation
      visible={globalKnobs.visible()}
      items={items}
      index={index - 1}
      disabled={disabled}
      nextVisible={true}
      prevVisible={true}
      onSelectNext={() => alert('Next')}
      onSelectPrev={() => alert('Previous')}
    />
  );
};

export const ProgressInfoStory = () => {
  const index = number('Index', 1, {
    range: true,
    min: 1,
    max: 10,
    step: 1,
  });
  return (
    <ProgressInfo
      visible={globalKnobs.visible('Bar Visible')}
      textVisible={globalKnobs.visible('Text Visible')}
      currentVisible={globalKnobs.visible('Index Visible')}
      index={index - 1}
      total={10}
      percentage={index / 10}
      onClickIndex={() => alert('Hello World!')}
    />
  );
};

ProgressInfoStory.story = {
  name: 'Progress Info',
};

export const ProgressCircleStory = () => {
  const width = number('Width', 400, {
    range: true,
    min: 200,
    max: 800,
    step: 10,
  });
  const strokeWidth = number('Stroke Width', 10, {
    range: true,
    min: 1,
    max: 10,
    step: 1,
  });
  const percentage = number('Percentage', 50, {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  });
  return (
    <ProgressCircle
      visible={globalKnobs.visible()}
      width={width}
      strokeWidth={strokeWidth}
      percentage={percentage}
    />
  );
};

ProgressCircleStory.story = {
  name: 'Progress Circle',
};

export const ShowcaseScreenshotsStory = () => {
  const image1 = text(
    'Image 1',
    'https://images.unsplash.com/photo-1583156340160-7867f31285d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
  );
  const image2 = text(
    'Image 2',
    'https://images.unsplash.com/photo-1497124401559-3e75ec2ed794?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
  );
  const image3 = text(
    'Image 3',
    'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
  );

  const images = [image1, image2, image3];

  const options = {
    Mobile: ShowcaseTypeEnum.ios,
    Tablet: ShowcaseTypeEnum.ipad,
    Website: ShowcaseTypeEnum.website,
  };
  const type = select('Type', options, ShowcaseTypeEnum.ios);

  const list = [];
  switch (type) {
    case ShowcaseTypeEnum.ios:
      list.push({ type: ShowcaseTypeEnum.ios, urls: images });
      list.push({ type: ShowcaseTypeEnum.android, urls: images });
      break;
    case ShowcaseTypeEnum.ipad:
      list.push({ type: ShowcaseTypeEnum.ipad, urls: images });
      break;
    case ShowcaseTypeEnum.website:
      list.push({ type: ShowcaseTypeEnum.website, urls: images });
      list.push({ type: ShowcaseTypeEnum.responsiveWebsite, urls: images });
      break;
  }
  const isLooping = boolean('Is Looping', true);

  return (
    <ShowcaseScreenShots
      visible={globalKnobs.visible()}
      imgVisible={globalKnobs.visible('Image Visible')}
      isLooping={isLooping}
      list={list}
    />
  );
};

ShowcaseScreenshotsStory.story = {
  name: 'Showcase Screenshots',
};
