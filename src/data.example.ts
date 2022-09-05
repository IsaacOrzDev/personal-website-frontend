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
  projects: Array<ProjectModel>;
};

const data: Data = {
  home: {
    name: 'BRUCE WAYNE',
    title: 'BATMAN',
    images: [
      'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      'https://images.unsplash.com/photo-1636628575750-d1631948f596?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
      'https://images.unsplash.com/photo-1596284274000-7d3eca888e3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3301&q=80',
      'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80',
      'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
      'https://images.unsplash.com/photo-1608433034711-ef6974daf968?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
    ],
    message:
      'You either die a hero or live long enough to see yourself become the villain…',
  },
  projects: [
    {
      category: 'Life',
      palette: {
        dark: '#f3f245',
        light: '#3e334d',
      },
      title: 'Early Life',
      description: `
        As he grows up, Bruce engages in intense intellectual and physical training. 
        After returning to Gotham, Bruce realizes that these skills alone would not be enough. 
        He also travels abroad, training in various martial arts, fields of science, criminology and detective skills.
      `,
      type: ProjectTypeEnum.website,
      preview: [
        {
          imageUrls: [
            'https://images.unsplash.com/photo-1624371960524-ade99abadb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3212&q=80',
            'https://images.unsplash.com/photo-1612916628677-475f676a6adf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
            'https://images.unsplash.com/photo-1610568781018-995405522539?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
          ],
          type: ShowcaseTypeEnum.website,
        },
      ],
      links: [
        {
          url: 'https://batman.fandom.com/wiki/Batman',
          type: ShowcaseTypeEnum.website,
          text: 'Visit Wiki',
        },
      ],
      tags: ['childhood'],
    },
    {
      category: 'Life',
      palette: {
        dark: '#c93424',
        light: '#c93424',
        gradient: 'linear-gradient(90deg, #c93424 0%, #cd432f 110%)',
      },
      title: 'Golden Age',
      description: `
        In the early strips, Batman's career as a vigilante initially earns him the ire of the police...
        He initially operates alone, using only street contacts and circumstantial allies in his investigations.
        Batman also comes into conflict with various criminals, including mad scientist Doctor Death, a vampire called the Monk, and criminal mastermind Professor Hugo Strange.
        During this period Wayne was engaged to actress Julie Madison, though this is called off after several encounters with the serial killer Clayface.
      `,
      type: ProjectTypeEnum.website,
      preview: [
        {
          imageUrls: [
            'https://images.unsplash.com/photo-1643677841226-d6427625f118?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
          ],
          type: ShowcaseTypeEnum.android,
        },

        {
          imageUrls: [
            'https://images.unsplash.com/photo-1643677841226-d6427625f118?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
          ],
          type: ShowcaseTypeEnum.android,
        },
      ],
      links: [],
      tags: [],
    },
    {
      category: 'Life',
      palette: {
        dark: '#e5f1f1',
        light: '#000000',
      },
      title: 'Silver & Bronze Ages',
      description: `
        Batman meets and regularly works with other heroes during the Silver Age, most notably Superman, whom he began regularly working alongside in a series of team-ups in World's Finest Comics, starting in 1954 and continuing through the series' cancellation in 1986.
        Batman and Superman are usually depicted as close friends.
        Batman becomes a founding member of the Justice League of America.
      `,
      type: ProjectTypeEnum.website,
      preview: [
        {
          imageUrls: [],
          iframe: {
            title: 'wiki',
            url: 'https://batman.fandom.com/wiki/Batman',
          },
          type: ShowcaseTypeEnum.ipad,
        },
      ],
      links: [],
      tags: ['1986', 'justice league'],
    },
  ],
};

export default data;
