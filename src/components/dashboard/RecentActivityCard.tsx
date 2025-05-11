
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Activity {
  id: string;
  description: string;
  timestamp: string;
  type: "sales" | "accounting" | "inventory";
}

interface RecentActivityCardProps {
  activities: Activity[];
}

export function RecentActivityCard({ activities }: RecentActivityCardProps) {
  // Function to get the badge color based on activity type
  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "sales":
        return "bg-blue-100 text-blue-800";
      case "accounting":
        return "bg-green-100 text-green-800";
      case "inventory":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates across all modules</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{activity.description}</p>
              <p className="text-xs text-muted-foreground">
                {activity.timestamp}
              </p>
            </div>
            <div
              className={`text-xs font-medium px-2 py-1 rounded-full ${getActivityColor(
                activity.type
              )}`}
            >
              {activity.type}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Activity</Button>
      </CardFooter>
    </Card>
  );
}
