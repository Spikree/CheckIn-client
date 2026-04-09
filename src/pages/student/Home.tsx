import { StudentStore } from "@/store/StudentStore";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Check,
  ListTodo,
  Circle,
  CheckCircle2,
  RotateCcw,
  ArrowUpCircle,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  active: boolean;
}

export default function Home() {
  const { getTasks, tasks, toggleTask, getCompletedTasks, completedTasks } =
    StudentStore();

  useEffect(() => {
    getTasks();
    getCompletedTasks();
  }, [getTasks, getCompletedTasks]);

  const navigate = useNavigate();

  const taskDashboardNavigate = (taskId: string) => {
    navigate(`/taskDashboard/${taskId}`);
  };

  const handleToggleTask = async (taskId: string) => {
    await toggleTask(taskId);
    await getTasks();
    await getCompletedTasks();
  };

  const completedCount =
    tasks?.filter((task: Task) =>
      completedTasks?.some((ct: Task) => ct.id === task.id),
    ).length ?? 0;

  const totalCount = tasks?.length ?? 0;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Page Header + Progress */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Tasks</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Stay on top of your chores and assignments.
              </p>
            </div>

            {totalCount > 0 && (
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {completedCount}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-foreground">
                    {totalCount}
                  </span>{" "}
                  complete
                </span>
                <Badge
                  variant={progressPercent === 100 ? "default" : "secondary"}
                  className="text-xs"
                >
                  {progressPercent}%
                </Badge>
              </div>
            )}
          </div>

          {totalCount > 0 && (
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>

        {/* Task Grid */}
        {!tasks || tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4 rounded-xl border border-dashed">
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
              <ListTodo className="h-6 w-6 text-muted-foreground/40" />
            </div>
            <div>
              <p className="text-base font-medium">All caught up!</p>
              <p className="text-sm text-muted-foreground mt-1">
                No tasks assigned to you right now.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task: Task) => {
              const isCompleted = completedTasks?.some(
                (ct: Task) => ct.id === task.id,
              );

              return (
                <Card
                  key={task.id}
                  className={`flex flex-col h-full transition-all duration-200 group ${
                    isCompleted
                      ? "bg-muted/40 shadow-none"
                      : "shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <CardHeader className="pb-2 pt-5">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle
                        className={`text-[15px] font-semibold leading-snug transition-colors ${
                          isCompleted
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {task.title}
                      </CardTitle>
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="h-5 w-5 text-border shrink-0 mt-0.5 group-hover:text-muted-foreground transition-colors" />
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 pb-4">
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {task.description || "No description provided."}
                    </CardDescription>
                  </CardContent>

                  <CardFooter className="pt-0 pb-4">
                    <div className="flex flex-col w-full gap-2">
                      {isCompleted ? (
                        <Button
                          onClick={() => handleToggleTask(task.id)}
                          variant="outline"
                          size="sm"
                          className="w-full gap-1.5 text-muted-foreground hover:text-foreground"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Mark as Unfinished
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleToggleTask(task.id)}
                          size="sm"
                          className="w-full gap-1.5"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Mark as Finished
                        </Button>
                      )}

                      <Button onClick={() => taskDashboardNavigate(task?.id)}>
                        Task Dashboard <ArrowUpCircle />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
