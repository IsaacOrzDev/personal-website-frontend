import skills from 'config/skills';
import AboutDescriptionModel from 'models/AboutDescriptionModel';
import ProjectModel, {
  ProjectTypeEnum,
  ShowcaseTypeEnum,
} from 'models/ProjectModel';

type Data = {
  home: {
    name: string;
    title: string;
    images: Array<string>;
    message: string;
  };
  about: {
    descriptionList: Array<AboutDescriptionModel>;
    skillSets: Array<Array<string>>;
  };
  projects: Array<ProjectModel>;
};

const data: Data = {
  home: {
    name: 'BRUCE WAYNE',
    title: 'The Dark Knight',
    images: [
      'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    ],
    message:
      'The website uses cookies and collects your IP address to improve and deliver content with a personalized experience.',
  },
  about: {
    skillSets: [[skills.csharp, skills.csharp, skills.csharp]],
    descriptionList: [
      {
        title: 'Bruce Wayne',
        description: [
          'Criminals are a superstitious cowardly lot.',
          'So my disguise must be able to strike terror into their hearts. I must be a creature of the night, black, terrible... a . a... a bat!',
          "That's it! It's an omen. I shall become a bat!",
        ],
      },
    ],
  },
  projects: [
    {
      title: 'Early Life',
      description: [
        'As he grows up, Bruce engages in intense intellectual and physical training. After returning to Gotham, Bruce realizes that these skills alone would not be enough.',
        'He also travels abroad, training in various martial arts, fields of science, criminology and detective skills.',
      ],
      type: ProjectTypeEnum.website,
      images: [
        {
          urls: [
            'https://images.unsplash.com/photo-1624371960524-ade99abadb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3212&q=80',
          ],
          type: ShowcaseTypeEnum.website,
        },
      ],
      links: [
        {
          url: 'https://batman.fandom.com/wiki/Batman',
          type: ShowcaseTypeEnum.website,
        },
      ],
      year: '1960',
    },
    {
      title: 'Golden Age',
      description: [
        "In the early strips, Batman's career as a vigilante initially earns him the ire of the police.",
        'He initially operates alone, using only street contacts and circumstantial allies in his investigations',
        ' Batman also comes into conflict with various criminals, including mad scientist Doctor Death, a vampire called the Monk, and criminal mastermind Professor Hugo Strange.',
        'During this period Wayne was engaged to actress Julie Madison, though this is called off after several encounters with the serial killer Clayface.',
      ],
      type: ProjectTypeEnum.website,
      images: [
        {
          urls: [
            'https://images.unsplash.com/photo-1608433034711-ef6974daf968?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
          ],
          type: ShowcaseTypeEnum.ios,
        },
        {
          urls: [
            'https://images.unsplash.com/photo-1608433034711-ef6974daf968?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
          ],
          type: ShowcaseTypeEnum.android,
        },
      ],
      links: [],
      year: '1960',
    },
    {
      title: 'Silver & Bronze Ages',
      description: [
        "Batman meets and regularly works with other heroes during the Silver Age, most notably Superman, whom he began regularly working alongside in a series of team-ups in World's Finest Comics, starting in 1954 and continuing through the series' cancellation in 1986. Batman and Superman are usually depicted as close friends.",
        'Batman becomes a founding member of the Justice League of America',
      ],
      type: ProjectTypeEnum.website,
      images: [
        {
          urls: [
            'https://images.unsplash.com/photo-1636628575750-d1631948f596?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
          ],
          type: ShowcaseTypeEnum.ipad,
        },
      ],
      links: [],
      year: '1960',
    },
  ],
};

export default data;
