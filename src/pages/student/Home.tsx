import { StudentStore } from "@/store/StudentStore";
import { AuthStore } from "@/store/AuthStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Bell,
  Check,
  X,
  ListTodo,
  Circle,
  CheckCircle2,
  LogOut,
  RotateCcw,
} from "lucide-react";

// Types based on your JSON structures
interface LinkRequest {
  id: string;
  status: string;
  requester: {
    username: string;
    email: string;
    role: string;
  };
}

interface Task {
  id: string;
  title: string;
  description: string;
  active: boolean;
}

export default function Home() {
  const {
    getRequests,
    requests,
    acceptRequest,
    getTasks,
    tasks,
    toggleTask,
    getCompletedTasks,
    completedTasks,
  } = StudentStore();

  const { logout } = AuthStore();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Initial Data Load
  useEffect(() => {
    getTasks();
    getCompletedTasks();
  }, [getTasks, getCompletedTasks]);

  // Handle Sheet (Slide-out) logic
  const handleOpenRequests = async (open: boolean) => {
    setIsSheetOpen(open);
    if (open) {
      await getRequests();
    }
  };

  // Handle accepting parent link requests
  const handleAccept = async (requestId: string) => {
    await acceptRequest(requestId);
    await getRequests(); // Refresh the request list
  };

  // Handle toggling task status (Finish / Unfinish)
  const handleToggleTask = async (taskId: string) => {
    await toggleTask(taskId);
    // Refresh both lists immediately to update the UI "scratched" state
    await getTasks();
    await getCompletedTasks();
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 max-w-7xl mx-auto">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b pb-4 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Student Hub</h1>

        <div className="flex items-center gap-3">
          {/* Link Requests Sheet */}
          <Sheet open={isSheetOpen} onOpenChange={handleOpenRequests}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Bell className="h-4 w-4 mr-2" />
                Requests
                {requests && requests.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                )}
              </Button>
            </SheetTrigger>

            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Link Requests</SheetTitle>
                <SheetDescription>
                  Parents who want to assign you tasks and chores.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 space-y-4">
                {!requests || requests.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground text-sm border rounded-lg border-dashed">
                    No pending requests at the moment.
                  </div>
                ) : (
                  requests.map((req: LinkRequest) => (
                    <div
                      key={req.id}
                      className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-card"
                    >
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium text-foreground capitalize">
                          {req.requester.username}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {req.requester.email}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleAccept(req.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Button variant="ghost" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* --- TASK LIST SECTION --- */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">My Tasks</h2>
        <p className="text-muted-foreground text-sm">
          Stay on top of your chores and assignments.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {!tasks || tasks.length === 0 ? (
          <div className="col-span-full text-center py-20 text-muted-foreground border rounded-xl border-dashed bg-muted/20">
            <ListTodo className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">All caught up!</p>
            <p>No tasks assigned to you right now.</p>
          </div>
        ) : (
          tasks.map((task: Task) => {
            // Check if the task ID exists in the completedTasks array
            const isCompleted = completedTasks?.some(
              (ct: Task) => ct.id === task.id,
            );

            return (
              <Card
                key={task.id}
                className={`flex flex-col h-full transition-all duration-200 shadow-sm hover:shadow-md ${
                  isCompleted
                    ? "opacity-60 bg-muted/50 grayscale-[0.5]"
                    : "bg-card border-l-4 border-l-primary"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle
                      className={`text-lg leading-tight transition-all ${
                        isCompleted
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {task.title}
                    </CardTitle>

                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground/30 shrink-0" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 pb-6">
                  <CardDescription className="text-sm text-foreground/80 leading-relaxed">
                    {task.description || "No description provided."}
                  </CardDescription>
                </CardContent>

                <CardFooter className="pt-0 mt-auto">
                  {isCompleted ? (
                    <Button
                      onClick={() => handleToggleTask(task.id)}
                      variant="outline"
                      className="w-full gap-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Mark as Unfinished
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleToggleTask(task.id)}
                      className="w-full gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Mark as Finished
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
