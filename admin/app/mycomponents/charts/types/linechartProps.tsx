export interface ChartProps {
  data: { id: string; data: { x: string; y: number }[] }[];
  margin: { top: number; right: number; bottom: number; left: number };
  xScale: { type: string };
  yScale: { type: string };
  axisBottom: { tickSize: number; tickPadding: number };
  axisLeft: { tickSize: number; tickValues?: number[]; tickPadding: number };
  colors: string[];
  pointSize: number;
  useMesh: boolean;
  gridYValues: number;
  theme?: object;
  role: string;
  keys?: string[]; // Include keys if used by BarChart or LineChart
  indexBy?: string; // Include indexBy if used by BarChart or LineChart
  padding?: number; // Include padding if used by BarChart or LineChart
  ariaLabel?: string; // Include ariaLabel if used by BarChart or LineChart
}
