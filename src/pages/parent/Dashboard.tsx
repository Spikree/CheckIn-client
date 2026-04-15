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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus, User, ArrowRight, Clock, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Student {
  id: string;
  username: string;
  email: string;
}

interface PendingRequest {
  id: string;
  status: string;
  receiver: {
    username: string;
    email: string;
  };
}

export default function Dashboard() {
  const [targetStudentEmail, setTargetStudentEmail] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const {
    getStudents,
    addStudent,
    studentList,
    pendingRequests,
    getMyPendingRequests,
    cancelPendingRequest,
  } = ParentStore();

  const add = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!targetStudentEmail) return;

    await addStudent(targetStudentEmail);
    setTargetStudentEmail("");
    setIsDialogOpen(false);
  };

  // Fetch pending requests when the sheet opens
  const handleOpenRequests = async (open: boolean) => {
    setIsSheetOpen(open);
    if (open) {
      await getMyPendingRequests();
    }
  };

  const cancelRequest = (requestId: string) => {
    cancelPendingRequest(requestId);
    setIsSheetOpen(!open);
  };

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 max-w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b pb-4 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Parent Dashboard</h1>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* PENDING REQUESTS SHEET */}
          <Sheet open={isSheetOpen} onOpenChange={handleOpenRequests}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Clock className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Pending Requests</span>
                <span className="sm:hidden">Pending</span>
              </Button>
            </SheetTrigger>

            <SheetContent className="w-100 sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Sent Requests</SheetTitle>
                <SheetDescription>
                  Invitations you have sent to students that are awaiting
                  approval.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 space-y-4">
                {!pendingRequests || pendingRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No pending requests at the moment.
                  </div>
                ) : (
                  pendingRequests.map((req: PendingRequest) => (
                    <div
                      key={req.id}
                      className="flex flex-col space-y-4 rounded-lg border p-4 shadow-sm bg-muted/30"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col space-y-1">
                          <span className="font-medium text-foreground capitalize">
                            {req.receiver.username}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {req.receiver.email}
                          </span>
                        </div>

                        {/* Added a placeholder cancel button here.
                          You can wire this up later if you want parents to be able to revoke requests!
                        */}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                          title="Cancel Request"
                          onClick={() => cancelRequest(req.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* THE POP-UP TRIGGER & CONTENT */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Link Student</span>
                <span className="sm:hidden">Link</span>
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
        </div>
      </div>

      {/* Main Content Area */}
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

                  <Link to={`/studentDashboard/${student.id}`}>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      Student Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
