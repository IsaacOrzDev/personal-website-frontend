export enum ProjectTypeEnum {
  website = 'W',
  mobile = 'M',
}

export enum ShowcaseTypeEnum {
  ios = 'ios',
  android = 'android',
  ipad = 'ipad',
  website = 'website',
  responsiveWebsite = 'responsiveWebsite',
}

export default interface ProjectModel {
  title: string;
  description: string[];
  images: Array<{ urls: string[]; type: ShowcaseTypeEnum; path?: string }>;
  links: Array<{ url: string; type: ShowcaseTypeEnum; text?: string }>;
  type: ProjectTypeEnum;
  year: string;
  palette: {
    dark: string;
    light: string;
    gradient?: string;
  };
  primaryColor?: string;
  titleColor?: string;
}
