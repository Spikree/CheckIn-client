import React from "react";
import { ShieldCheck } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Testimonial/Branding Side (Hidden on Mobile) */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />

        <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
          <ShieldCheck className="h-6 w-6" />
          <span>Check-In</span>
        </div>
      </div>

      {/* Form Side */}
      <div className="p-8">
        <div className="lg:hidden flex items-center justify-center gap-2 mb-12">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight text-foreground">
            Check-In
          </span>
        </div>

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
          {children}

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
