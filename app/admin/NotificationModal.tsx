import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AdminNotificationModalProps {
  isOpen: boolean;
  initialMessage?: string;
  onClose: () => void;
  onSubmit: (message: string) => void;
  submitLabel: string;
}

export function AdminNotificationModal({
  isOpen,
  initialMessage = "",
  onClose,
  onSubmit,
  submitLabel,
}: AdminNotificationModalProps) {
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    setMessage(initialMessage);
  }, [initialMessage]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{submitLabel}</DialogTitle>
        </DialogHeader>
        <Textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter notification message..."
          className="w-full"
        />
        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit(message)}>{submitLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
