import React, { useState, useEffect } from "react";
import { StudentNotificationList } from "./StudentNotificationList";

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState<
    { id: string; message: string }[]
  >([]);

  useEffect(() => {
    fetch("/api/notifications/me")
      .then((res) => res.json())
      .then(setNotifications);
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Remove notification?")) {
      await fetch(`/api/notifications/me/${id}`, { method: "DELETE" });
      setNotifications((ns) => ns.filter((n) => n.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Notifications</h1>
      <StudentNotificationList
        notifications={notifications}
        onDelete={handleDelete}
      />
    </div>
  );
}
