import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { ChartProps } from "./types/linechartProps";

export const LineChart: React.FC<ChartProps> = ({
  data,
  margin,
  xScale,
  yScale,
  axisBottom,
  axisLeft,
  colors,
  pointSize,
  useMesh,
  gridYValues,
  theme,
  role,
}) => {
  return (
    <div style={{ height: "400px" }}>
      <ResponsiveLine
        data={data}
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        axisBottom={axisBottom}
        axisLeft={axisLeft}
        colors={colors}
        pointSize={pointSize}
        useMesh={useMesh}
        gridYValues={gridYValues}
        theme={theme}
        role={role}
      />
    </div>
  );
};
