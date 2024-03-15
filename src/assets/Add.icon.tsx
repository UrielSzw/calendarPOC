import * as React from "react";
import Svg, {
  Circle,
  G,
  Path,
  Defs,
  ClipPath,
  SvgProps,
} from "react-native-svg";

export const AddIcon = (props: SvgProps) => {
  return (
    <Svg width={42} height={42} viewBox="0 0 42 42" fill="none" {...props}>
      <Circle cx={21} cy={21} r={21} fill="#FF7648" fillOpacity={0.37} />
      <G clipPath="url(#clip0_5915_3141)">
        <Path
          d="M21 11c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm5 11h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z"
          fill="#FF7648"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_5915_3141">
          <Path fill="#fff" transform="translate(9 9)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
