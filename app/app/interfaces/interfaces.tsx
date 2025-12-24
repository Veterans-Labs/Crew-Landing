export interface IHeaderProps {
  nav?: {
    label: string;
    hoverEffect: boolean;
    href?: string;
  }[];
  manifiest?: IManifiest;
}

export interface IAppContextType {
  manifiest?: IManifiest;
  social: ISocial[];
}

export interface IConditionalLayoutProps {
  children: React.ReactNode;
  manifiest: IManifiest;
  social: ISocial[];
}

export interface IContentChild {
    type: string;
    text: string;
}

export interface IContentItem {
    type: string;
    children: IContentChild[];
}

export interface IManifiest {  
  content : string;
  profileUrl: string;
  backgroundUrl: string;
}

export interface ISocial {
  name: string;
  url: string;
  viewBox: string;
  width: number;
  height: number;
  path: string;
}

export interface IPage{
  title: string;
  video: string;
  banner: string;
}