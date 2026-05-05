"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { getTechBarometer } from "@/lib/api";

const chartConfig = {
  heat: {
    label: "Heat",
    color: "#EC1B25",
  },
};

export function BarometerSidebar() {
  const [data, setData] = useState<any[]>([]);

 useEffect(() => {
  async function load() {
    const res = await getTechBarometer();

    console.log("🔥 BAROMETER:", res);

    if (Array.isArray(res)) {
      const formatted = res.map((item: any) => ({
        topic: item.label,   // ✅ FIX
        heat: item.score,    // ✅ FIX
      }));

      setData(formatted);
    }
  }

  load();
}, []);

  return (
    <Card className="rounded-3xl border-none bg-secondary/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          <CardTitle className="text-2xl font-bold font-headline">
            Tech Barometer
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground/80">
          What's hot in tech right now
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[250px]">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 10, right: 0, top: 0, bottom: 0 }}
          >
            <YAxis
              dataKey="topic"
              type="category"
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <XAxis dataKey="heat" type="number" hide />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="heat" radius={5} fill="#EC1B25" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}