import { AuthStore } from "@/store/AuthStore";
import { ParentStore } from "@/store/ParentStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut, Plus, User, ArrowRight } from "lucide-react";

interface Student {
  id: number;
  username: string;
  email: string;
}

export default function Dashboard() {
  const { logout } = AuthStore();
  const [targetStudentEmail, setTargetStudentEmail] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the popup
  const { getStudents, addStudent, studentList } = ParentStore();

  const add = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!targetStudentEmail) return;

    await addStudent(targetStudentEmail);
    setTargetStudentEmail(""); // Clear the input
    setIsDialogOpen(false); // Close the pop-up immediately after submitting!
  };

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b pb-4 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Parent Dashboard</h1>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* THE POP-UP TRIGGER & CONTENT */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Link Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Link a Student</DialogTitle>
                <DialogDescription>
                  Send a request to your child using their email address.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={add} className="flex flex-col gap-4 mt-4">
                <Input
                  value={targetStudentEmail}
                  onChange={(e) => setTargetStudentEmail(e.target.value)}
                  placeholder="student@example.com"
                  type="email"
                  required
                />
                <Button type="submit" className="w-full">
                  Send Request
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Logout Button */}
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content Area (Now full width!) */}
      <Card>
        <CardHeader>
          <CardTitle>My Students</CardTitle>
          <CardDescription>
            Manage tasks and view progress for your linked children.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!studentList || studentList.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm border rounded-lg border-dashed">
                No students linked yet. Click "Link Student" above to get
                started!
              </div>
            ) : (
              studentList.map((student: Student) => (
                <div
                  key={student.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg shadow-sm bg-card hover:bg-accent/50 transition-colors gap-4"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-primary" />
                    </div>

                    {/* Student Details */}
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-semibold capitalize text-foreground truncate">
                        {student.username}
                      </span>
                      <span className="text-sm text-muted-foreground truncate">
                        {student.email}
                      </span>
                    </div>
                  </div>

                  {/* Updated Button Text */}
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    Student Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
