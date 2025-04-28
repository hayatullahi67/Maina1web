import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Notification {
  id: string;
  message: string;
}
interface Props {
  notifications: Notification[];
  onDelete: (id: string) => void;
}

export function StudentNotificationList({ notifications, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {notifications.map((n) => (
        <Card key={n.id} className="hover:shadow-lg">
          <CardContent>{n.message}</CardContent>
          <CardFooter className="flex justify-end">
            <Button size="sm" variant="ghost" onClick={() => onDelete(n.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
