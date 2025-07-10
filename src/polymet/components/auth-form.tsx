"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { AppleIcon, CheckIcon, GithubIcon, LinkedinIcon } from "lucide-react";

const GoogleLogo = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.2856 13.4546V18.8764H23.974C23.6364 20.62 22.6233 22.0964 21.1038 23.0891L25.7402 26.6146C28.4415 24.1711 30 20.582 30 16.3184C30 15.3257 29.9091 14.371 29.7402 13.4547L16.2856 13.4546Z"
      fill="#4285F4"
    />

    <path
      d="M8.27956 18.6646L7.23387 19.449L3.53247 22.2744C5.88314 26.8434 10.701 29.9998 16.2855 29.9998C20.1425 29.9998 23.3763 28.7525 25.74 26.6144L21.1036 23.089C19.8309 23.9289 18.2075 24.4381 16.2855 24.4381C12.5711 24.4381 9.41536 21.9817 8.2854 18.6726L8.27956 18.6646Z"
      fill="#34A853"
    />

    <path
      d="M3.53237 9.72559C2.55839 11.6091 2 13.7346 2 16C2 18.2654 2.55839 20.3909 3.53237 22.2745C3.53237 22.2871 8.28576 18.6599 8.28576 18.6599C8.00004 17.8199 7.83116 16.9291 7.83116 15.9999C7.83116 15.0707 8.00004 14.1798 8.28576 13.3398L3.53237 9.72559Z"
      fill="#FBBC05"
    />

    <path
      d="M16.2858 7.57452C18.3897 7.57452 20.2598 8.28723 21.7533 9.66179L25.8443 5.65276C23.3637 3.38735 20.143 2 16.2858 2C10.7013 2 5.88314 5.14362 3.53247 9.72544L8.28571 13.34C9.41552 10.0309 12.5714 7.57452 16.2858 7.57452Z"
      fill="#EA4335"
    />
  </svg>
);

export default function AuthForm({ variant = "signin", onSubmit }) {
  const [activeTab, setActiveTab] = useState(variant);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (onSubmit) {
        onSubmit({
          email,
          password,
          name,
          company,
          type: activeTab,
        });
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Create Account</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <CardHeader>
            <CardTitle className="text-2xl">Sign in to your account</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <GoogleLogo />

                  <span className="ml-2">Google</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <LinkedinIcon className="h-5 w-5 mr-2" />
                  LinkedIn
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="signin-password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="signup">
          <CardHeader>
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>
              Join Arclane B2B marketplace to connect with suppliers worldwide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <GoogleLogo />

                  <span className="ml-2">Google</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <LinkedinIcon className="h-5 w-5 mr-2" />
                  LinkedIn
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      placeholder="John Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-company">Company Name</Label>
                    <Input
                      id="signup-company"
                      placeholder="Acme Inc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">
                    Confirm Password
                  </Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={setAgreeTerms}
                    required
                  />

                  <label
                    htmlFor="terms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-primary hover:underline"
                    >
                      privacy policy
                    </Link>
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !agreeTerms}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
