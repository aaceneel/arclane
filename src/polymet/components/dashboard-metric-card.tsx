import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, HelpCircleIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LineChart, Line } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface DashboardMetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  sparklineData?: { value: number }[];
  helpText?: string;
  className?: string;
}

export default function DashboardMetricCard({
  title,
  value,
  icon,
  change,
  sparklineData,
  helpText,
  className,
}: DashboardMetricCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium flex items-center gap-1">
          {title}
          {helpText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircleIcon className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">{helpText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
        <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center text-xs mt-1">
            {change.trend === "up" ? (
              <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
            ) : change.trend === "down" ? (
              <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
            ) : null}
            <span
              className={cn({
                "text-green-500": change.trend === "up",
                "text-red-500": change.trend === "down",
                "text-muted-foreground": change.trend === "neutral",
              })}
            >
              {change.value}%
            </span>
            <span className="text-muted-foreground ml-1">vs. last month</span>
          </div>
        )}
        {sparklineData && (
          <div className="h-[50px] mt-4">
            <ChartContainer config={{}} className="aspect-[none] h-[50px]">
              <LineChart width={250} height={50} data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={
                    change?.trend === "down"
                      ? "hsl(var(--destructive))"
                      : "hsl(var(--primary))"
                  }
                  strokeWidth={1.5}
                  dot={false}
                  radius={4}
                />
              </LineChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
