
"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BAROMETER_DATA } from "@/lib/data"

const chartConfig = {
  heat: {
    label: "Heat",
    color: "hsl(var(--primary))",
  },
}

export function BarometerSidebar() {
  return (
    <Card className="rounded-3xl border-none bg-secondary/50">
      <CardHeader>
        <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            <CardTitle className="text-2xl font-bold font-headline">Tech Barometer</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground/80">What's hot in tech right now</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[250px]">
          <BarChart
            data={BAROMETER_DATA}
            layout="vertical"
            margin={{ left: 10, right: 0, top: 0, bottom: 0 }}
          >
            <YAxis
              dataKey="topic"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12, opacity: 0.8 }}
              width={100}
            />
            <XAxis dataKey="heat" type="number" hide />
            <Tooltip
              cursor={{ fill: "hsl(var(--accent))" }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="heat" radius={5} fill="hsl(var(--primary))" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
