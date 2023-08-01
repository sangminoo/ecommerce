"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return;
  }

  return (
    <Modal
      title="Are you sure delete this?"
      description="This action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <button
          disabled={loading}
          onClick={onClose}
          className="btn btn-md btn-outline"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={onConfirm}
          className="btn btn-md btn-warning"
        >
          Continue
        </button>
      </div>
    </Modal>
  );
};
