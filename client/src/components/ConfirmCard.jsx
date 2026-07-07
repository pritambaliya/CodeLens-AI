import { createPortal } from "react-dom";
import { AlertTriangle, LogOut, X } from "lucide-react";
import Button from "./Button";

export default function LogoutConfirmModal({
  open,
  onClose,
  onConfirm,
  loading = false,
}) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#10131a] p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-500/15 p-3">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                Confirm Logout
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                You're about to sign out of your account.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm leading-relaxed text-red-200">
            Are you sure you want to logout?
            <br />
            You will need to log in again to access your dashboard and saved
            reviews.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
            loading={loading}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}