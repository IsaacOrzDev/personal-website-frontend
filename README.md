# Personal Website Frontend

An open source frontend project to build personal website.

## Preview

![Home Page](public/images/screenshots/02.png?raw=true 'React Reduction')

<!-- ![Home Page](public/images/screenshots/03.png?raw=true 'React Reduction') -->

## Featuring

- Typescript 4.8.2
- React.js 18.2
- scss for styling
- [redux toolkit](https://redux-toolkit.js.org/) for state management
- [react-spring](https://react-spring.dev/) for animation
- [yarn](https://yarnpkg.com/) for packages management

## Setup

### - Install dependencies and start the project locally

`npm install`

`npm start`

### - Modify .env and src/data.ts files and put the content you like

#### Data structure of .env file:

```
PORT=3001

REACT_APP_GA_KEY=""

REACT_APP_ENABLE_LIGHT_MODE=false
REACT_APP_GITHUB_URL="https://github.com/exmaple"
REACT_APP_LOADING_TEXT="EXAMPLE"
REACT_APP_META_TITLE="EXAMPLE"
REACT_APP_META_DESCRIPTION="EXAMPLE"
REACT_APP_META_KEYWORDS="personal website"
REACT_APP_META_COPYRIGHT="copyright@ 2020"
REACT_APP_META_TYPE="personal_website"
REACT_APP_META_URL="https://personal.example.com/"
REACT_APP_META_IMAGE="https://personal.example.com/favicon.png"
```

#### Data structure of src/data.ts file:

```
interface DataStructure {
  home: {
    name: string;
    title: string;
    images: Array<string>;
    message: string;
  };
  projects: Array<{
    title: string;
    description: string;
    preview: Array<{
      imageUrls: Array<string>;
      iframe?: {
        url: string;
        title: string;
      };
      type: 'ios' | 'android' | 'ipad' | 'website' | 'responsiveWebsite';
    }>;
    links: Array<{
      url: string;
      type: 'ios' | 'android' | 'website';
      text?: string;
    }>;
    type: 'W' | 'M';
    palette: {
      dark: string;
      light: string;
      gradient?: string;
    };
    tags: Array<string>;
    category: string;
  }>;
}
```
