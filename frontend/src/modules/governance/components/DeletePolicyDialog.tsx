import React from 'react';
import { ConfirmationModal } from '../../../shared/components/ConfirmationModal';

interface DeletePolicyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  policyTitle: string;
  isDeleting: boolean;
}

export function DeletePolicyDialog({
  isOpen,
  onClose,
  onConfirm,
  policyTitle,
  isDeleting,
}: DeletePolicyDialogProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Policy"
      description={`Are you sure you want to delete the policy "${policyTitle}"? This action cannot be undone.`}
      confirmText="Delete Policy"
      isDestructive={true}
      isLoading={isDeleting}
    />
  );
}
