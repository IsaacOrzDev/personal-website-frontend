import ReactGA from 'react-ga';
import generalConfig from 'config/generalConfig';

export default class GaService {
  public static initialize() {
    ReactGA.initialize(generalConfig.gaKey);
  }

  public static pageView(path: string) {
    ReactGA.pageview(path);
  }

  public static addWheelNavigationEvent(event: 'down' | 'up') {
    ReactGA.event({
      category: 'Navigation in Desktop',
      action: 'use wheel for navigation',
      label: event === 'down' ? 'scroll down' : 'scroll up',
    });
  }

  public static addButtonNavigationEvent(label: string) {
    ReactGA.event({
      category: 'Navigation in Desktop',
      action: 'use button for navigation',
      label,
    });
  }

  public static addClickingProjectLinkEvent(label: string) {
    ReactGA.event({
      category: 'Projects',
      action: 'click url link',
      label,
    });
  }
}
