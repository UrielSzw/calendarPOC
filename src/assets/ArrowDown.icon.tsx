import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ArrowDownIcon = (props: SvgProps) => {
  return (
    <Svg width={16} height={8} viewBox="0 0 16 8" fill="none" {...props}>
      <Path d="M.917.167L8 7.25 15.083.167H.917z" fill="#212525" />
    </Svg>
  );
};
