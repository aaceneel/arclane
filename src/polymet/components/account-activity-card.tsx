import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
  MessageSquareIcon,
  PackageIcon,
  ShoppingCartIcon,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "order" | "rfq" | "message" | "invoice";
  title: string;
  date: string;
  status: "completed" | "pending" | "processing" | "new";
  details?: string;
}

interface AccountActivityCardProps {
  activities: ActivityItem[];
}

export default function AccountActivityCard({
  activities,
}: AccountActivityCardProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCartIcon className="h-4 w-4" />;

      case "rfq":
        return <PackageIcon className="h-4 w-4" />;

      case "message":
        return <MessageSquareIcon className="h-4 w-4" />;

      case "invoice":
        return <FileTextIcon className="h-4 w-4" />;

      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );

      case "pending":
        return (
          <Badge variant="outline" className="text-amber-600 border-amber-300">
            <ClockIcon className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );

      case "processing":
        return (
          <Badge variant="secondary" className="text-blue-600">
            Processing
          </Badge>
        );

      case "new":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            New
          </Badge>
        );

      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">
              No recent activity to display
            </p>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
              >
                <div className="mt-0.5 bg-muted rounded-full p-1.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {activity.date}
                      </span>
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                  {activity.details && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity.details}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
