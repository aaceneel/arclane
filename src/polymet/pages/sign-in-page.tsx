import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AuthForm from "@/polymet/components/auth-form";
import ArclaneLogo from "@/polymet/components/arclane-logo";

export default function SignInPage() {
  const [authSuccess, setAuthSuccess] = useState(false);
  const navigate = useNavigate();

  const handleAuthSubmit = (data) => {
    // In a real app, this would call an API
    console.log("Auth data:", data);

    // Simulate successful authentication
    setAuthSuccess(true);

    // Redirect after a short delay
    setTimeout(() => {
      navigate("/account");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-background py-4">
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <ArclaneLogo />

            <span>Arclane</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Don't have an account?
            </span>
            <Button asChild variant="outline">
              <Link to="/sign-up">Join Free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-screen-xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Welcome back to Arclane</h1>
              <p className="text-xl text-muted-foreground">
                Access your account to manage orders, connect with suppliers,
                and grow your business.
              </p>

              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />

                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Global Supplier Network</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with verified suppliers from around the world
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />

                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Secure Transactions</h3>
                    <p className="text-sm text-muted-foreground">
                      Trade with confidence using our secure payment systems
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />

                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Business Tools</h3>
                    <p className="text-sm text-muted-foreground">
                      Access analytics, order management, and supplier
                      communication tools
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {authSuccess ? (
              <Card className="p-8 text-center space-y-4">
                <div className="mx-auto bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center">
                  <CheckIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Sign in successful!</h2>
                <p className="text-muted-foreground">
                  You are being redirected to your account...
                </p>
              </Card>
            ) : (
              <AuthForm variant="signin" onSubmit={handleAuthSubmit} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Arclane B2B Marketplace. All rights
            reserved.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/help" className="hover:underline">
              Help Center
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
