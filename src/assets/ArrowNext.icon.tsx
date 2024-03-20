import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ArrowNextIcon = (props: SvgProps) => {
  return (
    <Svg width={9} height={16} viewBox="0 0 9 16" fill="none" {...props}>
      <Path
        d="M1 1l7 7-7 7"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
