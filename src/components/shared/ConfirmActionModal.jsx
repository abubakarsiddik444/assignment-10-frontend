"use client";

import { Button, Modal, useOverlayState } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import { useState } from "react";

export function ConfirmActionModal({
  children,
  title,
  description,
  confirmLabel = "Delete",
  pendingLabel = "Deleting...",
  onConfirm,
}) {
  const modalState = useOverlayState();
  const [pending, setPending] = useState(false);

  async function handleConfirm() {
    setPending(true);
    try {
      const succeeded = await onConfirm();
      if (succeeded !== false) modalState.close();
    } finally {
      setPending(false);
    }
  }

  return (
    <Modal state={modalState}>
      {children}
      <Modal.Backdrop isDismissable={!pending}>
        <Modal.Container size="sm">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Icon className="text-danger">
                <TrashBin size={20} />
              </Modal.Icon>
              <Modal.Heading>{title}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>{description}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" isDisabled={pending} onPress={modalState.close}>
                Cancel
              </Button>
              <Button variant="danger" isDisabled={pending} onPress={handleConfirm}>
                {pending ? pendingLabel : confirmLabel}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
