import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';
import { BaseThemeStyle } from '../../src/Theme/BaseThemeStyle';

interface HomeIconProps{
  color: string
}

const HomeIcon = (props:HomeIconProps):JSX.Element => {
  return (
    <Svg width="24" height="26.462" viewBox="0 0 24 26.462">
      <G id="Group_2352" data-name="Group 2352" transform="translate(0)">
        <G id="Group_708" data-name="Group 708">
          <Path id="Path_1309" data-name="Path 1309" d="M218.555,388.2l-11.077-8.615a.922.922,0,0,0-1.134,0L195.268,388.2a.923.923,0,0,0-.357.729v13.538a3.389,3.389,0,0,0,3.385,3.385h4V392.772a1,1,0,0,1,.923-1.069H210.6a1,1,0,0,1,.923,1.069v13.084h4a3.388,3.388,0,0,0,3.385-3.385V388.933A.926.926,0,0,0,218.555,388.2Z" transform="translate(-194.911 -379.395)" fill={BaseThemeStyle.colors.blue} />
          <Rect id="Rectangle_253" data-name="Rectangle 253" width="6.287" height="13.636" transform="translate(8.857 12.825)" fill={BaseThemeStyle.colors.blue} />
        </G>
      </G>
    </Svg>
  );
};

export default HomeIcon;
