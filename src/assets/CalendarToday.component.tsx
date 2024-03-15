import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const CalendarTodayIcon = (props: SvgProps) => {
  return (
    <Svg width={18} height={20} viewBox="0 0 18 20" fill="none" {...props}>
      <Path
        d="M16 2h-1V0h-2v2H5V0H3v2H2a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H2V8h14v10zm0-12H2V4h14v2zM4 10h5v5H4v-5z"
        fill="#BCC1CD"
      />
    </Svg>
  );
};
