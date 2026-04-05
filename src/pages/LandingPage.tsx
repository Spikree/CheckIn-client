import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  ShieldCheck,
  ListTodo,
  ArrowRight,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navigation / Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">Check-In</span>
          </div>
          <nav className="flex items-center gap-4">
            {/*TODO : add links to send it to respective login and signup page*/}
            <Link to={"/login"}>
              <Button variant="ghost" className="hidden md:inline-flex">
                Log in
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 px-4 md:px-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Empower your children. <br className="hidden sm:inline" />
              <span className="text-muted-foreground">Stay connected.</span>
            </h1>
            <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              The ultimate family task-management and accountability app. Assign
              chores, track progress, and build healthy habits together in one
              seamless platform.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto flex items-center gap-2"
            >
              Start for free <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              View Demo
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto py-16 md:py-24 px-4 md:px-8 border-t">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How Check-In Works
            </h2>
            <p className="max-w-[85%] text-muted-foreground sm:text-lg">
              Designed for both parents and students to make household
              management a breeze.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <Card className="bg-card">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Seamless Linking</CardTitle>
                <CardDescription>
                  Parents can easily invite and link their children's accounts
                  via a simple email invitation.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Set up your family network in seconds. Manage multiple student
                accounts from a single parent dashboard.
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-card">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <ListTodo className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Task Assignment</CardTitle>
                <CardDescription>
                  Create, schedule, and assign chores or tasks instantly from
                  the parent portal.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Set deadlines, add descriptions, and organize daily routines.
                Students receive instant notifications for new tasks.
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-card">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Accountability</CardTitle>
                <CardDescription>
                  Students check off completed tasks, keeping parents updated in
                  real-time.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Foster responsibility. Parents can review completed work and
                track overall progress over time.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto py-16 md:py-24 px-4 md:px-8 border-t">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              Ready to organize your family?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Join Check-In today and start building better habits with your
              kids. Takes less than 2 minutes to set up.
            </p>
            <Button size="lg" className="mt-4">
              Create your family account
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/20 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="font-semibold text-sm">Check-In</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for families. &copy; {new Date().getFullYear()} Check-In. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
