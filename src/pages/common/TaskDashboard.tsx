import { CommonStore } from "@/store/CommonStore";
import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActivityCalendar } from "react-activity-calendar";
import { Flame } from "lucide-react";
import Breadcrumb from "./PageBreadcrumbs";

export default function TaskDashboard() {
  const { taskId } = useParams<{ taskId: string }>();
  const { getTaskHistory, taskHistory } = CommonStore();

  // 1. Create a reference to the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (taskId) {
      getTaskHistory(taskId);
    }
  }, [getTaskHistory, taskId]);

  const activityData = useMemo(() => {
    const data = [];
    const today = new Date();

    // Start 6 months (approx 182 days) in the past
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 182);

    // End 6 months (approx 183 days) in the future
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 183);

    const completedDates = new Set(taskHistory || []);

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const isCompleted = completedDates.has(dateStr);

      data.push({
        date: dateStr,
        count: isCompleted ? 1 : 0,
        level: (isCompleted ? 4 : 0) as 0 | 1 | 2 | 3 | 4,
      });
    }

    return data;
  }, [taskHistory]);

  // 2. Automatically scroll to the middle when the data loads
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Calculate the exact middle pixel of the scrollable area
      container.scrollLeft =
        (container.scrollWidth - container.clientWidth) / 2;
    }
  }, [activityData]);

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 md:px-6 md:py-6 bg-background">
      {/* Main Content */}
      <Breadcrumb currentPage="Task dashboard" />
      <main className="max-w-7xl mx-auto px-6 py-4">
        {/* Stats Row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Completion History
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              A log of every day this task was completed over a one-year window.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg border">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">
              {taskHistory?.length || 0} Total Completions
            </span>
          </div>
        </div>

        {/* Heatmap Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Consistency Map</CardTitle>
            <CardDescription>
              Each square represents a day. Green squares indicate the task was
              finished.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 pt-2">
            {/* 3. Attach the ref to the scrollable container */}
            <div
              ref={scrollContainerRef}
              className="w-full overflow-x-auto pb-4 scroll-smooth"
            >
              <div className="min-w-[800px] flex justify-center px-4">
                <ActivityCalendar
                  data={activityData}
                  blockSize={14}
                  blockRadius={3}
                  blockMargin={4}
                  fontSize={12}
                  showWeekdayLabels
                  theme={{
                    light: [
                      "#ebedf0",
                      "#9be9a8",
                      "#40c463",
                      "#30a14e",
                      "#216e39",
                    ],
                    dark: [
                      "#161b22",
                      "#0e4429",
                      "#006d32",
                      "#26a641",
                      "#39d353",
                    ],
                  }}
                  labels={{
                    totalCount: "{{count}} completions logged",
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
