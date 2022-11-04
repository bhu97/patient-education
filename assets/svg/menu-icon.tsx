import React from 'react';
import Svg, { Ellipse, G, Path, Rect } from 'react-native-svg';
import { BaseThemeStyle } from '../../src/Theme/BaseThemeStyle';

interface MenuIconProps {
  color: string
}

const MenuIcon = (props: MenuIconProps): JSX.Element => {
  return (
    <Svg id="dots" width="20" height="4.795" viewBox="0 0 20 4.795">
      <Ellipse id="Ellipse_54" data-name="Ellipse 54" cx="2.424" cy="2.398" rx="2.424" ry="2.398" fill="#071b45" />
      <Ellipse id="Ellipse_55" data-name="Ellipse 55" cx="2.424" cy="2.398" rx="2.424" ry="2.398" transform="translate(7.576)" fill="#071b45" />
      <Ellipse id="Ellipse_56" data-name="Ellipse 56" cx="2.424" cy="2.398" rx="2.424" ry="2.398" transform="translate(15.153)" fill="#071b45" />
    </Svg>

  );
};

export default MenuIcon;
