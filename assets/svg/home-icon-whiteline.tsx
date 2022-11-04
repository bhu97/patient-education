import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';
import { BaseThemeStyle } from '../../src/Theme/BaseThemeStyle';

interface HomeIconWhitelineProps{
  color: string
}

const HomeIconWhiteline = (props:HomeIconWhitelineProps):JSX.Element => {
  return (
<svg  width="23.674" height="26.138" viewBox="0 0 23.674 26.138">
  <g id="Icon_feather-home" data-name="Icon feather-home" transform="translate(0.75 0.75)">
    <path id="Path_1307" data-name="Path 1307" d="M4.5,11.623,15.587,3l11.087,8.623V25.174a2.464,2.464,0,0,1-2.464,2.464H6.964A2.464,2.464,0,0,1,4.5,25.174Z" transform="translate(-4.5 -3)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <path id="Path_1308" data-name="Path 1308" d="M13.5,30.319V18h7.391V30.319" transform="translate(-6.109 -5.681)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>
  );
};

export default HomeIconWhiteline;
