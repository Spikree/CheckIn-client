import { AuthStore } from "@/store/AuthStore";
import { StudentStore } from "@/store/StudentStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Bell,
  LogOut,
  User,
  Check,
  X,
  ClipboardList,
  UserCheck,
} from "lucide-react";
import { ParentStore } from "@/store/ParentStore";

export default function Header() {
  const { logout, authUser } = AuthStore();
  const { requests, getRequests, acceptRequest } = StudentStore();
  const { IncomingRequests, getIncomingRequests, acceptIncomingRequest } =
    ParentStore();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navigate = useNavigate();

  // --- STUDENT HANDLERS ---
  const handleOpenRequests = async (open: boolean) => {
    setIsSheetOpen(open);
    if (open) await getRequests();
  };

  const handleAccept = async (requestId: string) => {
    await acceptRequest(requestId);
    await getRequests();
  };

  // --- PARENT HANDLERS ---
  const handleOpenParentRequests = async (open: boolean) => {
    setIsSheetOpen(open);
    if (open) await getIncomingRequests();
  };

  const handleAcceptParentRequest = async (requestId: string) => {
    await acceptIncomingRequest(requestId);
    await getIncomingRequests();
  };

  // --- COMMON HANDLERS ---
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm h-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-full">
        {/* Logo Section */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
            <ClipboardList className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            Check-In
          </span>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {authUser?.role === "STUDENT" ? (
            <Sheet open={isSheetOpen} onOpenChange={handleOpenRequests}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-muted-foreground hover:text-foreground"
                >
                  <Bell className="h-5 w-5" />
                  {requests && requests.length > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute top-1 right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center rounded-full"
                    >
                      {requests.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>

              <SheetContent className="w-[380px] sm:w-[460px] flex flex-col gap-0 p-0">
                <SheetHeader className="px-6 py-5 border-b">
                  <SheetTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-muted-foreground" />
                    Link Requests
                  </SheetTitle>
                  <SheetDescription>
                    Parents requesting to assign you tasks.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
                  {!requests || requests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
                      <Bell className="h-8 w-8 text-muted-foreground/30 mb-2" />
                      <p className="text-sm font-medium">No new requests</p>
                    </div>
                  ) : (
                    requests.map((req: any) => (
                      <div
                        key={req.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium capitalize">
                            {req.requester.username}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-green-600 hover:bg-green-50"
                            onClick={() => handleAccept(req.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-500 hover:bg-red-50"
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
          ) : (
            <Sheet open={isSheetOpen} onOpenChange={handleOpenParentRequests}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-muted-foreground hover:text-foreground"
                >
                  <Bell className="h-5 w-5" />
                  {IncomingRequests && IncomingRequests.length > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute top-1 right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center rounded-full"
                    >
                      {IncomingRequests.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>

              <SheetContent className="w-[380px] sm:w-[460px] flex flex-col gap-0 p-0">
                <SheetHeader className="px-6 py-5 border-b">
                  <SheetTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-muted-foreground" />
                    Student Requests
                  </SheetTitle>
                  <SheetDescription>
                    Students requesting to link with your account.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
                  {!IncomingRequests || IncomingRequests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
                      <Bell className="h-8 w-8 text-muted-foreground/30 mb-2" />
                      <p className="text-sm font-medium">No new requests</p>
                    </div>
                  ) : (
                    IncomingRequests.map((req: any) => (
                      <div
                        key={req.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium capitalize">
                            {req.requester?.username || "Unknown Student"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-green-600 hover:bg-green-50"
                            onClick={() => handleAcceptParentRequest(req.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-500 hover:bg-red-50"
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
          )}

          {/* USER DROPDOWN PROFILE */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border shadow-sm h-9 w-9 bg-muted/50"
              >
                <User className="h-4 w-4 text-foreground/70" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-1">
              <div className="px-4 py-3 border-b border-border/50">
                <p className="text-sm font-medium capitalize truncate">
                  {authUser?.username || "My Account"}
                </p>
                {/*<p className="text-xs text-muted-foreground truncate mt-0.5">
                  {authUser?.email || "user@example.com"}
                </p>*/}
              </div>

              <div className="p-1">
                <DropdownMenuItem className="cursor-pointer py-2">
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />

              <div className="p-1">
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer py-2 text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
