import React from 'react';
import styles from './style.module.scss';
import buttonStyles from 'styles/button.module.scss';
import HeaderNameText from '../HeaderNameText';
import HeaderThemeButton from '../HeaderThemeButton';
import { ThemeProps } from 'types/Props';
import { useSpring, animated } from 'react-spring';
import HeaderMenuButton from '../HeaderMenuButton';
import GithubIcon from 'components/icons/GithubIcon';

interface Props extends ThemeProps {
  title: string;
  textVisible?: boolean;
  buttonVisible?: boolean;
  menuButtonVisible?: boolean;
  visible?: boolean;
  isMenuOpened?: boolean;
  isResponsive?: boolean;
  isFloating?: boolean;
  onToggleTheme?: () => void;
  onToggleMenu?: () => void;
}

const Header: React.FC<Props> = (props) => {
  const { opacity } = useSpring({
    opacity: props.visible ? 1 : 0,
  });

  let titleFontSize = 40;
  if (props.isResponsive) {
    titleFontSize = 20;
  }

  let headerClassName = `${styles.header} ${styles[props.theme]}`;
  if (props.isFloating) {
    headerClassName += ` ${styles.floating}`;
  }
  if (props.isResponsive) {
    headerClassName += ` ${styles.responsive}`;
  }

  const navigateToGithubPage = () => {
    window.open(process.env.REACT_APP_GITHUB_URL, '_blank');
  };

  return (
    <animated.div className={headerClassName} style={{ opacity }}>
      <div className={styles.content}>
        <HeaderNameText
          text={props.title}
          theme={props.theme}
          visible={props.textVisible}
          fontSize={titleFontSize}
        />
        <div className={styles.right}>
          {process.env.REACT_APP_ENABLE_LIGHT_MODE === 'true' && (
            <HeaderThemeButton
              theme={props.theme}
              visible={props.isMenuOpened && !props.isResponsive}
              onClick={props.onToggleTheme}
            />
          )}
          {props.buttonVisible && !props.isResponsive && (
            <button
              className={`${buttonStyles.button} ${buttonStyles[props.theme]} ${
                styles.github_button
              }`}
              onClick={navigateToGithubPage}
            >
              <GithubIcon theme={props.theme} />
            </button>
          )}

          <HeaderMenuButton
            theme={props.theme}
            visible={props.menuButtonVisible}
            isOpen={props.isMenuOpened}
            onToggle={props.onToggleMenu}
          />
        </div>
        <div className={styles.absolute}>
          {props.isMenuOpened && props.isResponsive && (
            <button
              className={`${buttonStyles.button} ${buttonStyles[props.theme]} ${
                styles.github_button
              }`}
              onClick={navigateToGithubPage}
            >
              <GithubIcon theme={props.theme} />
            </button>
          )}
          {process.env.REACT_APP_ENABLE_LIGHT_MODE === 'true' && (
            <HeaderThemeButton
              theme={props.theme}
              visible={props.isMenuOpened && props.isResponsive}
              onClick={props.onToggleTheme}
            />
          )}
        </div>
      </div>
    </animated.div>
  );
};

export default Header;
