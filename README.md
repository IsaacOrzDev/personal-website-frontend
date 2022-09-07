# Personal Website Frontend

<!-- <p>
<a href="https://github.com/IsaacOrzDev/personal-website-frontend-2020/pulls"><img alt="GitHub Pull Requests" src="https://img.shields.io/github/issues-pr-raw/IsaacOrzDev/personal-website-frontend-2020.svg"></a>
</p> -->

An open source frontend project to build personal website.

## Preview

[Live Demo](https://personal-website-frontend-2020.vercel.app/)

![Home Page](public-example/images/screenshots/02.png?raw=true 'React Reduction')

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

`yarn && yarn start`

### - Modify .env and data.yml files and put the content you like

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

#### Data structure of data.yml file:

```
home:
  name: Name
  title: Title
  images:
    - https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80
    - https://images.unsplash.com/photo-1636628575750-d1631948f596?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80
  message: This is message
projects:
  -
    category: Category
    palette:
        dark: '#f3f245'
        light: '#3e334d'
    title: Title
    description: >
      This is description
    type: W
    preview:
      -
        imageUrls:
          - https://images.unsplash.com/photo-1624371960524-ade99abadb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3212&q=80
        type: website
    links:
      -
        url: https://example.com/
        type: website
        text: Visit Website
    tags:
      - Tag1
      - Tag2
```
