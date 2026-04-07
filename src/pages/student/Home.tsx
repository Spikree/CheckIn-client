import { StudentStore } from "@/store/StudentStore";
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
import { Bell, Check, X, ListTodo, Circle, CheckCircle2 } from "lucide-react";
import { AuthStore } from "@/store/AuthStore";

interface LinkRequest {
  id: string;
  status: string;
  requester: {
    username: string;
    email: string;
    role: string;
  };
}

// 1. Add the Task interface based on your JSON
interface Task {
  id: number;
  title: string;
  description: string;
  active: boolean;
}

export default function Home() {
  const { getRequests, requests, acceptRequest, getTasks, tasks } =
    StudentStore();
  const { logout } = AuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenRequests = async (open: boolean) => {
    setIsOpen(open);
    if (open) {
      await getRequests();
    }
  };

  const handleAccept = async (requestId: string) => {
    await acceptRequest(requestId);
    await getRequests();
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Student Hub</h1>

        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={handleOpenRequests}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Bell className="h-4 w-4 mr-2" />
                Requests
              </Button>
            </SheetTrigger>

            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Link Requests</SheetTitle>
                <SheetDescription>
                  Parents who have requested to link with your account.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 space-y-4">
                {!requests || requests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No pending requests at the moment.
                  </div>
                ) : (
                  requests.map((req: LinkRequest) => (
                    <div
                      key={req.id}
                      className="flex flex-col space-y-4 rounded-lg border p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col space-y-1">
                          <span className="font-medium text-foreground capitalize">
                            {req.requester.username}
                          </span>
                          <span className="text-sm text-muted-foreground">
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
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      {/* 2. Task List Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">My Tasks</h2>
        <p className="text-muted-foreground">
          Here is what you need to get done.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {!tasks || tasks.length === 0 ? (
          <div className="col-span-full text-center py-16 text-muted-foreground text-sm border rounded-lg border-dashed bg-card/50">
            <ListTodo className="h-10 w-10 mx-auto mb-4 text-muted-foreground/50" />
            No tasks assigned yet. You're all caught up!
          </div>
        ) : (
          tasks.map((task: Task) => (
            <Card
              key={task.id}
              className={`flex flex-col h-full transition-shadow hover:shadow-md ${!task.active ? "opacity-60 bg-muted/50" : "bg-card"}`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle
                    className={`text-lg leading-tight ${!task.active ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title}
                  </CardTitle>

                  {/* Status Icon */}
                  {task.active ? (
                    <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 pb-4">
                <CardDescription className="text-sm text-foreground/80">
                  {task.description}
                </CardDescription>
              </CardContent>

              <CardFooter className="pt-0 mt-auto">
                {/* Placeholder button for completing tasks.
                  You can wire this up to a "completeTask" function in your store later!
                */}
                {task.active && (
                  <Button variant="outline" className="w-full gap-2">
                    <Check className="h-4 w-4" />
                    Mark as Complete
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
