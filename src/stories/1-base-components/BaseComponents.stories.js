import React from 'react';
import TitleText from 'components/text/TitleText';
import StoryContainer from 'stories/components/StoryContainer';
import storyHierarchy from 'stories/storyHierarchy';
import {
  withKnobs,
  text,
  select,
  number,
  boolean,
} from '@storybook/addon-knobs';
import globalKnobs from 'stories/globalKnobs';
import DescriptionText from 'components/text/DescriptionText';
import Words from 'components/text/Words';
import LinkButton from 'components/buttons/LinkButton';
import HeaderThemeButton from 'components/header/HeaderThemeButton';
import HeaderMenuButton from 'components/header/HeaderMenuButton';
import MessageModal from 'components/modals/MessageModal';
import PageScrollingButton from 'components/buttons/PageScrollingButton';
import MenuModal from 'components/modals/MenuModeal';
import LineChart from 'components/charts/LineChart';

export default {
  title: `${storyHierarchy.header.baseComponents}`,
  decorators: [
    withKnobs,
    storyFn => (
      <StoryContainer theme={globalKnobs.theme()}>{storyFn()}</StoryContainer>
    ),
  ],
};

export const TitleTextStory = () => {
  const color = select(
    'Colors',
    { 'Text Color': 'text', 'Tint Color': 'tint' },
    'text'
  );
  const tag = select(
    'Tag',
    {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
    },
    'h1'
  );
  const content = text('Content', 'BATMAN');
  return (
    <TitleText color={color} tag={tag}>
      {content}
    </TitleText>
  );
};

TitleTextStory.story = {
  name: 'Title Text',
};

export const DescriptionTextStory = () => {
  const fontSize = number('Font Size', 24, {
    range: true,
    min: 16,
    max: 40,
    step: 1,
  });

  const content = text(
    'Content',
    'Sometimes, truth is not good enough, sometimes people deserve more. Sometimes people deserve to have their faith rewarded.'
  );

  const speed = number('Speed', 3, {
    range: true,
    min: 1,
    max: 20,
    step: 1,
  });

  return (
    <DescriptionText fontSize={fontSize}>
      <Words
        text={content}
        visible={globalKnobs.visible()}
        mode="words"
        speed={speed}
      />
    </DescriptionText>
  );
};

DescriptionTextStory.story = {
  name: 'Description Text',
};

export const LinkButtonStory = () => {
  const content = text('Content', 'THE DARK KNIGHT');
  const url = text(
    'Url',
    'https://www.imdb.com/title/tt0468569/?ref_=fn_al_tt_1'
  );

  return (
    <LinkButton
      visible={globalKnobs.visible()}
      textVisible={globalKnobs.visible('Text Visible')}
      text={content}
      onClick={() => window.open(url, '_blank')}
    />
  );
};

LinkButtonStory.story = {
  name: 'Link Button',
};

export const PageScrollingButtonStory = () => {
  const content = text('Content', 'Why so serious?');

  const options = { Down: 'down', Up: 'up' };
  const defaultValue = 'down';
  const type = select('Type', options, defaultValue);

  return (
    <PageScrollingButton
      visible={globalKnobs.visible()}
      textVisible={globalKnobs.visible('Text Visible')}
      text={content}
      type={type}
    />
  );
};

PageScrollingButtonStory.story = {
  name: 'Page Scrolling Button',
};

export const HeaderThemeButtonStory = () => {
  return (
    <HeaderThemeButton
      visible={globalKnobs.visible()}
      onClick={() => {
        alert('Hello World!');
      }}
    />
  );
};

HeaderThemeButtonStory.story = {
  name: 'Header Theme Button',
};

export const HeaderMenuButtonStory = () => {
  const isOpen = boolean('Is Open', false);
  return <HeaderMenuButton visible={globalKnobs.visible()} isOpen={isOpen} />;
};

export const MessageModalStory = () => {
  const content = text(
    'Content',
    'If you are good at something, never do it for free.'
  );

  return (
    <MessageModal
      visible={globalKnobs.visible()}
      text={content}
      onClose={() => alert('I am Batman!')}
    />
  );
};

MessageModalStory.story = {
  name: 'Message Modal',
};

HeaderMenuButtonStory.story = {
  name: 'Header Menu Button',
};

export const MenuModalStory = () => {
  const item1 = text('Item 1', 'Mister Freeze');
  const item2 = text('Item 2', 'Joker');
  const item3 = text('Item 3', 'Black Mask');

  const items = [
    { title: item1, onClick: () => alert('Hello') },
    { title: item2, onClick: () => alert('Hello') },
    { title: item3, onClick: () => alert('Hello') },
  ];
  return <MenuModal items={items} visible={globalKnobs.visible()} />;
};

MenuModalStory.story = {
  name: 'Menu Modal',
};

const LineChartStory = () => {
  return <LineChart visible={globalKnobs.visible()} />;
};
