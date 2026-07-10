import { createPortal } from "react-dom";
import { AlertTriangle, LogOut, Trash2, X } from "lucide-react";
import Button from "./Button";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  loading = false,
  title = "Confirm Action",
  description = "",
  message = "",
  confirmText = "Confirm",
  icon = "warning",
  danger = true,
}) {
  if (!open) return null;

  const Icon =
    icon === "logout"
      ? LogOut
      : icon === "delete"
        ? Trash2
        : AlertTriangle;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#10131a] p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`rounded-full p-3 ${danger ? "bg-red-500/15" : "bg-violet-500/15"
                }`}
            >
              <Icon
                className={`h-6 w-6 ${danger ? "text-red-400" : "text-violet-400"
                  }`}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="mt-1 text-sm text-gray-400">{description}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className={`mt-6 rounded-xl border p-4 ${danger
              ? "border-red-500/20 bg-red-500/10"
              : "border-violet-500/20 bg-violet-500/10"
            }`}
        >
          <p
            className={`text-sm leading-relaxed ${danger ? "text-red-200" : "text-violet-200"
              }`}
          >
            {message}
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
            variant={danger ? "danger" : "primary"}
            onClick={onConfirm}
            loading={loading}
          >
            <Icon className="mr-2 h-4 w-4" />
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}