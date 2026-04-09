import { ParentStore } from "@/store/ParentStore";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Plus,
  ListTodo,
  CheckCircle2,
  ClipboardList,
  Clock,
  ArrowRightCircle,
} from "lucide-react";

interface Task {
  id: number | string;
  title: string;
  description: string;
  active?: boolean;
}

interface CompletedTask {
  id: number | string;
  title: string;
  description: string;
  completed: boolean;
}

export default function StudentDashboard() {
  const {
    createTaskForStudent,
    getStudentTasks,
    studentTasks,
    getTasksCompletedByStudent,
    completedTasksByStudent,
  } = ParentStore();

  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (studentId) {
      getStudentTasks(studentId);
      getTasksCompletedByStudent(studentId);
    }
  }, [studentId, getStudentTasks, getTasksCompletedByStudent]);

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentId || !title) return;

    await createTaskForStudent(studentId, title, description);

    setTitle("");
    setDescription("");
    setIsDialogOpen(false);

    await getStudentTasks(studentId);
  };

  // Check completion by matching task id against completedTasksByStudent array
  const isTaskCompleted = (taskId: number | string): boolean => {
    return (
      completedTasksByStudent?.some((ct: CompletedTask) => ct.id === taskId) ??
      false
    );
  };

  const completedCount =
    studentTasks?.filter((t: Task) => isTaskCompleted(t.id)).length ?? 0;
  const totalCount = studentTasks?.length ?? 0;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Nav */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-5" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
                <ClipboardList className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-base tracking-tight">
                Task Manager
              </span>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />
                Assign Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Assign a Task</DialogTitle>
                <DialogDescription>
                  Create a new chore or assignment for this student.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleCreateTask}
                className="flex flex-col gap-4 mt-2"
              >
                <div className="space-y-1.5">
                  <label htmlFor="title" className="text-sm font-medium">
                    Task Title
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Clean your room"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                    <span className="text-muted-foreground font-normal ml-1">
                      (optional)
                    </span>
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add any specific instructions here..."
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full mt-1">
                  Assign Task
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Page Header + Progress */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Student Tasks
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Student ID:{" "}
                <span className="font-mono text-foreground">{studentId}</span>
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
        {!studentTasks || studentTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4 rounded-xl border border-dashed">
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
              <ListTodo className="h-6 w-6 text-muted-foreground/40" />
            </div>
            <div>
              <p className="text-base font-medium">No tasks yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Click "Assign Task" to get started.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studentTasks.map((task: Task) => {
              const isCompleted = isTaskCompleted(task.id);

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
                        <Clock className="h-5 w-5  text-yellow-500 shrink-0 mt-0.5 group-hover:text-muted-foreground transition-colors" />
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 pb-4">
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {task.description || "No description provided."}
                    </CardDescription>
                  </CardContent>

                  <CardFooter className="pt-0 pb-4">
                    <div className="w-max flex justify-between items-center">
                      <Badge
                        variant={isCompleted ? "secondary" : "outline"}
                        className={`text-xs ${
                          isCompleted
                            ? "text-green-600 bg-green-50 border-green-100 dark:bg-green-950/40 dark:border-green-900 dark:text-green-400"
                            : "text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-400"
                        }`}
                      >
                        {isCompleted ? "Completed" : "Pending"}
                      </Badge>

                      <Link to={`/taskDashboard/${task.id}`}>
                        <Button>
                          Task dashboard <ArrowRightCircle />
                        </Button>
                      </Link>
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
