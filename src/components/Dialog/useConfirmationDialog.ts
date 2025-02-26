import { useState, useCallback } from "react";

interface UseConfirmationDialogOptions<T> {
  onConfirm?: (data: T) => void;
}

export function useConfirmationDialog<T>(
  options?: UseConfirmationDialogOptions<T>
) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingData, setPendingData] = useState<T | null>(null);
  const [resetFunction, setResetFunction] = useState<(() => void) | null>(null);

  const openDialog = useCallback((data: T, reset?: () => void) => {
    setPendingData(data);
    if (reset) setResetFunction(() => reset);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const confirmAction = useCallback(() => {
    if (pendingData && options?.onConfirm) {
      options.onConfirm(pendingData);
    }
    resetFunction?.();
    closeDialog();
  }, [pendingData, options, resetFunction, closeDialog]);

  return {
    isOpen,
    pendingData,
    resetFunction,
    openDialog,
    closeDialog,
    confirmAction,
  };
}
