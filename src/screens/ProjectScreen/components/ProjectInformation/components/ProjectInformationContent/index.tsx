import React, { useState, useEffect, useMemo } from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';
import TextService from 'services/textService';
import TitleText from 'components/text/TitleText';
import Words from 'components/text/Words';
import ProjectModel, { ShowcaseTypeEnum } from 'models/ProjectModel';
import ShowcaseScreenShots from '../../../ShowcaseScreenshots';
import LinkButtonGroup from '../../../LinkButtonGroup';
import ProjectDescription from '../../../ProjectDescription';
import TagButton from 'components/buttons/TagButton';

interface Props extends ThemeProps {
  index: number;
  visible?: boolean;
  item: ProjectModel;
  breakpoint?: string;
  isFocused?: boolean;
  isLooping?: boolean;
  tags: Record<string, string>;
}

const ProjectInformationContent: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);

  const galleryUrl = useMemo(() => {
    return `${import.meta.env.VITE_SUBPAGE_URL}/gallery?theme=${
      props.theme
    }&name=${props.item.title}${props.item.imageFolders
      .map((name: string) => `&folder=${name}`)
      .join('')}`;
  }, [props.item.imageFolders, props.item.title, props.theme]);

  const links = useMemo(() => {
    if (props.item.links.length === 2) {
      return props.item.links;
    } else if (props.item.imageFolders.length > 0) {
      const galleryLink = {
        text: 'Visit Gallery',
        url: galleryUrl,
        type: ShowcaseTypeEnum.website,
      };
      return [...props.item.links, galleryLink];
    } else {
      return props.item.links;
    }
  }, [galleryUrl, props.item.imageFolders.length, props.item.links]);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.num}>
        <TitleText theme={props.theme} fontSize={24}>
          <Words
            text={TextService.getNumberText(props.index + 1)}
            visible={visible}
          />
        </TitleText>
      </div>
      <ShowcaseScreenShots
        theme={props.theme}
        visible={visible}
        imgVisible={props.visible}
        list={props.item.preview}
        breakpoint={props.breakpoint}
        isLooping={props.isFocused && props.isLooping}
        tintColor={props.item.palette[props.theme]}
        onClickDevice={
          props.item.imageFolders.length > 0
            ? () => {
                window.open(
                  `${import.meta.env.VITE_SUBPAGE_URL}/gallery?theme=${
                    props.theme
                  }&name=${props.item.title}${props.item.imageFolders
                    .map((name: string) => `&folder=${name}`)
                    .join('')}`
                );
              }
            : undefined
        }
      />
      <div className={styles.text_area}>
        <TitleText
          className={styles.title}
          theme={props.theme}
          fontSize={32}
          color={props.item.palette[props.theme]}
          gradientColor={props.item.palette.gradient}
        >
          <Words text={props.item.title} visible={props.visible} mode="words" />
        </TitleText>
        <div className={styles.tag_group}>
          {props.item.tags.map((tag) => (
            <TagButton
              key={tag}
              visible={visible}
              theme={props.theme}
              url={props.tags && props.tags[tag.toLowerCase()]}
            >
              {tag}
            </TagButton>
          ))}
        </div>
        <div className={styles.description}>
          {props.item.description
            .split(/[.](?=\s)/)
            .filter((x) => !!x.trim())
            .map((x, i) => (
              <ProjectDescription
                key={i}
                theme={props.theme}
                fontSize={16}
                visible={props.visible}
                text={`${x.trim()}.`}
                palette={props.item.palette}
              />
            ))}
        </div>
        <LinkButtonGroup
          theme={props.theme}
          items={links}
          visible={visible}
          project={props.item.title}
          textVisible={props.visible}
          isResponsive={true}
          center={true}
        />
      </div>
    </div>
  );
};

export default ProjectInformationContent;
