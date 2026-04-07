import { StudentStore } from "@/store/StudentStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, Check, X } from "lucide-react";
import { AuthStore } from "@/store/AuthStore";

interface LinkRequest {
  id: number;
  status: string;
  requester: {
    username: string;
    email: string;
    role: string;
  };
}

export default function Home() {
  // 1. Extract acceptRequest from the store
  const { getRequests, requests, acceptRequest } = StudentStore();
  const { logout } = AuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenRequests = async (open: boolean) => {
    setIsOpen(open);
    if (open) {
      await getRequests();
    }
  };

  // 2. Create a handler function
  const handleAccept = async (requestId: number) => {
    await acceptRequest(requestId);
    await getRequests(); // Refresh the list so the accepted request vanishes!
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Student Hub</h1>
        <Button onClick={logout}>logout</Button>

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
                        {/* 3. Attach the handler to the onClick event */}
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
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow p-8">
        <p className="text-muted-foreground">
          Welcome to your dashboard. Tasks assigned by your linked parents will
          appear here.
        </p>
      </div>
    </div>
  );
}
