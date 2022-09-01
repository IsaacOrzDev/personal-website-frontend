import React from 'react';
import ReactIcon from 'components/skills/ReactIcon';
import SwiftIcon from 'components/skills/SwiftIcon';
import ReduxIcon from 'components/skills/ReduxIcon';
import WebpackIcon from 'components/skills/WebpackIcon';
import VueIcon from 'components/skills/VueIcon';
import FlutterIcon from 'components/skills/FlutterIcon';
import FirebaseIcon from 'components/skills/FirebaseIcon';
import CSharpIcon from 'components/skills/CSharpIcon';
import UnityIcon from 'components/skills/UnityIcon';
import NodeJSIcon from 'components/skills/NodeJSIcon';
import JavascriptIcon from 'components/skills/JavascriptIcon';
import TypescriptIcon from 'components/skills/TypescriptIcon';
import SassIcon from 'components/skills/SassIcon';
import CssIcon from 'components/skills/CssIcon';
import PythonIcon from 'components/skills/PythonIcon';
import KotlinIcon from 'components/skills/KotlinIcon';
import { ThemeProps } from 'types/Props';
import skills from 'config/skills';

interface Props extends ThemeProps {
  type: string;
  isResponsive?: boolean;
}

const Skill: React.FC<Props> = props => {
  const size = props.isResponsive ? 'small' : 'normal';

  switch (props.type) {
    case skills.react:
    default:
      return <ReactIcon theme={props.theme} size={size} />;
    case skills.redux:
      return <ReduxIcon size={size} />;
    case skills.webpack:
      return <WebpackIcon size={size} />;
    case skills.vuejs:
      return <VueIcon size={size} />;
    case skills.typescript:
      return <TypescriptIcon size={size} />;
    case skills.javascript:
      return <JavascriptIcon size={size} />;
    case skills.css:
      return <CssIcon size={size} />;
    case skills.sass:
      return <SassIcon size={size} />;
    case skills.nodejs:
      return <NodeJSIcon size={size} />;
    case skills.python:
      return <PythonIcon size={size} />;
    case skills.csharp:
      return <CSharpIcon size={size} />;
    case skills.unity:
      return <UnityIcon theme={props.theme} size={size} />;
    case skills.swift:
      return <SwiftIcon size={size} />;
    case skills.kotlin:
      return <KotlinIcon size={size} />;
    case skills.flutter:
      return <FlutterIcon size={size} />;
    case skills.firebase:
      return <FirebaseIcon size={size} />;
  }
};

export default React.memo(Skill);
