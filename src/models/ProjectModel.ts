export enum ShowcaseTypeEnum {
  ios = 'ios',
  android = 'android',
  ipad = 'ipad',
  website = 'website',
  responsiveWebsite = 'responsiveWebsite',
  diagram = 'diagram',
}

export interface PaletteModel {
  dark: string;
  light: string;
  gradient?: string;
}

export default interface ProjectModel {
  title: string;
  description: string;
  imageFolders: [];
  preview: Array<{
    imageUrls: Array<string>;
    iframe?: {
      url: string;
      title: string;
    };
    type: ShowcaseTypeEnum;
  }>;
  links: Array<{ url: string; type: ShowcaseTypeEnum; text?: string }>;
  palette: PaletteModel;
  tags: Array<string>;
  category: string;
}
