import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

export const ArrowBackIcon = (props: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_5925_8050)">
        <Path
          d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"
          fill="#BCC1CD"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_5925_8050">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
