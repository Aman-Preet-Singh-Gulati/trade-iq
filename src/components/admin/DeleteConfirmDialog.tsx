"use client";

import { useState } from "react";

interface DeleteConfirmDialogProps {
  itemLabel: string;
  onConfirm: () => void | Promise<void>;
}

export default function DeleteConfirmDialog({ itemLabel, onConfirm }: DeleteConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="font-body-sm text-red-600 hover:underline">
        Delete
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={() => !pending && setOpen(false)}
        >
          <div
            className="bg-surface-container-lowest rounded-xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-body-md text-primary mb-6">
              Delete <strong>{itemLabel}</strong>? This can&apos;t be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={pending}
                className="font-body-sm text-secondary px-4 py-2 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={async () => {
                  setPending(true);
                  await onConfirm();
                  setPending(false);
                  setOpen(false);
                }}
                className="font-body-sm bg-red-600 text-white font-bold px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {pending ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
