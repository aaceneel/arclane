import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3Icon,
  CheckCircleIcon,
  ClockIcon,
  PackageIcon,
  TrendingUpIcon,
} from "lucide-react";

interface AccountOverviewCardProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    company: string;
    memberSince: string;
    verificationLevel: "basic" | "verified" | "gold" | "platinum";
    completionPercentage: number;
  };
  stats: {
    totalOrders: number;
    pendingOrders: number;
    totalRfqs: number;
    activeRfqs: number;
    savedItems: number;
  };
}

export default function AccountOverviewCard({
  user,
  stats,
}: AccountOverviewCardProps) {
  const getVerificationBadgeColor = (level: string) => {
    switch (level) {
      case "platinum":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "gold":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "verified":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Account Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src={user.avatar} alt={user.name} />

                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="secondary"
                    className={getVerificationBadgeColor(
                      user.verificationLevel
                    )}
                  >
                    <CheckCircleIcon className="h-3 w-3 mr-1" />

                    {user.verificationLevel.charAt(0).toUpperCase() +
                      user.verificationLevel.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Member since {user.memberSince}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm font-medium">
                  {user.completionPercentage}%
                </span>
              </div>
              <Progress value={user.completionPercentage} className="h-2" />

              {user.completionPercentage < 100 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Complete your profile to improve visibility with suppliers
                </p>
              )}
            </div>

            <div className="text-sm">
              <p className="font-medium">{user.company}</p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <PackageIcon className="h-4 w-4 mr-1" />

                <span>Orders</span>
              </div>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <ClockIcon className="h-3 w-3 mr-1" />

                <span>{stats.pendingOrders} pending</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <BarChart3Icon className="h-4 w-4 mr-1" />

                <span>RFQs</span>
              </div>
              <p className="text-2xl font-bold">{stats.totalRfqs}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUpIcon className="h-3 w-3 mr-1" />

                <span>{stats.activeRfqs} active</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
