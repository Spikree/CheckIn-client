import { ParentStore } from "@/store/ParentStore";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { ArrowLeft, Plus, ListTodo, Clock, CheckCircle2 } from "lucide-react";

// Assuming a basic task structure based on standard setups
interface Task {
  id: number | string;
  title: string;
  description: string;
  status?: string; // e.g., "PENDING" or "COMPLETED"
}

export default function StudentDashboard() {
  const { createTaskForStudent, getStudentTasks, studentTasks } = ParentStore();
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  // Local state for the form
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch tasks when the component mounts or studentId changes
  useEffect(() => {
    if (studentId) {
      getStudentTasks(studentId);
    }
  }, [studentId, getStudentTasks]);

  // Handle submitting the new task
  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentId || !title) return;

    await createTaskForStudent(studentId, title, description);

    // Reset form and close dialog
    setTitle("");
    setDescription("");
    setIsDialogOpen(false);

    // Refresh the task list so the new task appears immediately
    await getStudentTasks(studentId);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 max-w-6xl mx-auto">
      {/* Top Navigation / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b pb-4 gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
            <p className="text-muted-foreground text-sm">
              Managing tasks for Student ID: {studentId}
            </p>
          </div>
        </div>

        {/* Create Task Pop-up */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Assign New Task
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
              className="flex flex-col gap-4 mt-4"
            >
              <div className="space-y-2">
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

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description (Optional)
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

              <Button type="submit" className="w-full mt-2">
                Assign Task
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Task List Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {!studentTasks || studentTasks.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground text-sm border rounded-lg border-dashed bg-card">
            <ListTodo className="h-8 w-8 mx-auto mb-3 text-muted-foreground/50" />
            No tasks assigned yet. Click "Assign New Task" to get started!
          </div>
        ) : (
          studentTasks.map((task: Task) => (
            <Card
              key={task.id}
              className="flex flex-col h-full bg-card shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-lg leading-tight">
                    {task.title}
                  </CardTitle>

                  {/* Visual Status Indicator (assuming your backend tracks completion status later) */}
                  {task.status === "COMPLETED" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  ) : (
                    <Clock className="h-5 w-5 text-amber-500 shrink-0" />
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 pb-4">
                <CardDescription className="text-sm">
                  {task.description || "No description provided."}
                </CardDescription>
              </CardContent>

              <CardFooter className="pt-0 text-xs text-muted-foreground border-t p-4 mt-auto">
                {/* Future implementation: Delete/Edit buttons could go here */}
                Task ID: {task.id}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
