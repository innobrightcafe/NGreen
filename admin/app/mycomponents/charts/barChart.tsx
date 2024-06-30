import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ChartProps } from "./types/linechartProps";

export const BarChart: React.FC<ChartProps> = ({
  data,
  keys,
  indexBy,
  margin,
  padding,
  colors,
  axisBottom,
  axisLeft,
  gridYValues,
  theme,
  ariaLabel,
  role,
}) => {
  return (
    <div style={{ height: "400px" }}>
      <ResponsiveBar
        data={data}
        keys={keys || []} // Ensure keys is an array, handle undefined case
        indexBy={indexBy || ""}
        margin={margin}
        padding={padding || 0}
        colors={colors}
        axisBottom={axisBottom}
        axisLeft={axisLeft}
        gridYValues={gridYValues}
        theme={theme}
        aria-label={ariaLabel || "A bar chart showing data"}
        role={role}
      />
    </div>
  );
};
