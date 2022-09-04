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

export interface PaletteModel {
  dark: string;
  light: string;
  gradient?: string;
}

export default interface ProjectModel {
  title: string;
  description: string[];
  preview: Array<{
    imageUrls: Array<string>;
    iframe?: {
      url: string;
      title: string;
    };
    type: ShowcaseTypeEnum;
  }>;
  links: Array<{ url: string; type: ShowcaseTypeEnum; text?: string }>;
  type: ProjectTypeEnum;
  palette: PaletteModel;
  year?: string;
  category: string;
}
