import * as React from "react";
import Svg, {
  Path,
  Defs,
  Pattern,
  Use,
  Image,
  SvgProps,
} from "react-native-svg";

export const BlindIcon = (props: SvgProps) => {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
      <Path
        transform="matrix(-1 0 0 1 30 0)"
        fill="url(#pattern0)"
        d="M0 0H30V30H0z"
      />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_497_833" transform="scale(.01042)" />
        </Pattern>
        <Image
          id="image0_497_833"
          width={96}
          height={96}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
