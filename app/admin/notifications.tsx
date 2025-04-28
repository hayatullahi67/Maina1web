import React, { useState, useEffect } from "react";
import { AdminNotificationModal } from "./NotificationModal";
import { AdminNotificationList } from "./NotificationList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<
    { id: string; message: string }[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<{
    id: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);
  const fetchNotifications = async () => {
    const res = await fetch("/api/notifications");
    const data = await res.json();
    setNotifications(data);
  };

  const upsertNotification = async (message: string) => {
    if (editItem) {
      await fetch(`/api/notifications/${editItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
    } else {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
    }
    closeModal();
    fetchNotifications();
  };

  const openModalForEdit = (item: { id: string; message: string }) => {
    setEditItem(item);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditItem(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      await fetch(`/api/notifications/${id}`, { method: "DELETE" });
      fetchNotifications();
    }
  };

  const handleSend = (id: string) => {
    if (window.confirm("Send to all users? OK=All, Cancel=Specific")) {
      fetch(`/api/notifications/${id}/send-all`, { method: "POST" }).then(
        fetchNotifications
      );
    } else {
      fetch("/api/users")
        .then((r) => r.json())
        .then((users) => {
          const uid = window.prompt("Enter user ID:");
          if (uid)
            fetch(`/api/notifications/${id}/send/${uid}`, {
              method: "POST",
            }).then(fetchNotifications);
        });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Notifications</h1>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Create
        </Button>
      </div>
      <AdminNotificationList
        notifications={notifications}
        onEdit={openModalForEdit}
        onDelete={handleDelete}
        onSend={handleSend}
      />
      <AdminNotificationModal
        isOpen={modalOpen}
        initialMessage={editItem?.message}
        onClose={closeModal}
        onSubmit={upsertNotification}
        submitLabel={editItem ? "Update" : "Create"}
      />
    </div>
  );
}
