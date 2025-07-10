import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

interface DashboardChartProps {
  title: string;
  description?: string;
  data: any[];
  type: "bar" | "line";
  dataKeys: {
    xAxis: string;
    series: Array<{
      name: string;
      key: string;
      color: string;
    }>;
  };
  timeRanges?: Array<{
    value: string;
    label: string;
  }>;
  className?: string;
}

export default function DashboardChart({
  title,
  description,
  data,
  type,
  dataKeys,
  timeRanges,
  className,
}: DashboardChartProps) {
  const [timeRange, setTimeRange] = useState(
    timeRanges ? timeRanges[0].value : "7d"
  );

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {timeRanges && (
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={{}} className="aspect-[none] h-[300px]">
          {type === "bar" ? (
            <BarChart data={data}>
              <ChartTooltip content={<ChartTooltipContent />} />

              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              <XAxis
                dataKey={dataKeys.xAxis}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />

              {dataKeys.series.map((series, index) => (
                <Bar
                  key={index}
                  dataKey={series.key}
                  name={series.name}
                  fill={series.color}
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              ))}
            </BarChart>
          ) : (
            <LineChart data={data}>
              <ChartTooltip content={<ChartTooltipContent />} />

              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              <XAxis
                dataKey={dataKeys.xAxis}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />

              {dataKeys.series.map((series, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={series.key}
                  name={series.name}
                  stroke={series.color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  radius={4}
                />
              ))}
            </LineChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
