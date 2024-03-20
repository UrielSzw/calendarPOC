import * as React from "react";
import Svg, {
  Path,
  Defs,
  Pattern,
  Use,
  Image,
  SvgProps,
} from "react-native-svg";

export const EyeIcon = (props: SvgProps) => {
  return (
    <Svg
      width={props.width || 30}
      height={props.height || 30}
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      <Path fill="url(#pattern0)" d="M0 0H30V30H0z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_497_832" transform="scale(.01042)" />
        </Pattern>
        <Image
          id="image0_497_832"
          width={96}
          height={96}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
