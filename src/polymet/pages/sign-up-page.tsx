import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AuthForm from "@/polymet/components/auth-form";
import ArclaneLogo from "@/polymet/components/arclane-logo";
import { CheckIcon } from "lucide-react";

export default function SignUpPage() {
  const [authSuccess, setAuthSuccess] = useState(false);
  const navigate = useNavigate();

  const handleAuthSubmit = (data) => {
    // In a real app, this would call an API
    console.log("Auth data:", data);

    // Simulate successful registration
    setAuthSuccess(true);

    // Redirect after a short delay
    setTimeout(() => {
      navigate("/account");
    }, 2000);
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
              Already have an account?
            </span>
            <Button asChild variant="outline">
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-screen-xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">
                Join the Arclane B2B Marketplace
              </h1>
              <p className="text-xl text-muted-foreground">
                Create your free account to access global supply chains and grow
                your business.
              </p>

              <div className="grid gap-6">
                <div className="bg-background p-6 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-2">For Buyers</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />

                      <span>Source products from verified suppliers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />

                      <span>Request quotes and negotiate prices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />

                      <span>Track orders and manage shipments</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-background p-6 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-2">For Suppliers</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />

                      <span>Showcase products to global buyers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />

                      <span>Receive and respond to RFQs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />

                      <span>Manage orders and customer relationships</span>
                    </li>
                  </ul>
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
                <h2 className="text-2xl font-bold">
                  Account created successfully!
                </h2>
                <p className="text-muted-foreground">
                  Welcome to Arclane B2B Marketplace. You are being redirected
                  to your account...
                </p>
              </Card>
            ) : (
              <AuthForm variant="signup" onSubmit={handleAuthSubmit} />
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
