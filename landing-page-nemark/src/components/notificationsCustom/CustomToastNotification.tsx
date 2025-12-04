// components/CustomToastNotification.tsx
import { ReactNode } from "react";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";

export type NotifyType = "success" | "error" | "info" | "warning";

export interface CustomToastNotificationProps {
  type?: NotifyType;
  title: string;
  description?: string;
  onClose?: () => void;
}

const COLOR_MAP: Record<NotifyType, string> = {
  success: "text-green-600 bg-green-50 border-green-200",
  error: "text-red-600 bg-red-50 border-red-200",
  warning: "text-yellow-700 bg-yellow-50 border-yellow-200",
  info: "text-blue-600 bg-blue-50 border-blue-200",
};

const ICON_MAP: Record<NotifyType, ReactNode> = {
  success: <CheckCircle2 className="text-green-600" size={22} />,
  error: <XCircle className="text-red-600" size={22} />,
  info: <Info className="text-blue-600" size={22} />,
  warning: <AlertTriangle className="text-yellow-700" size={22} />,
};

export function CustomToastNotification({
  type = "info",
  title,
  description,
  onClose,
}: CustomToastNotificationProps) {
  return (
    <div className={`relative p-4 rounded-2xl border flex min-w-[320px] max-w-[430px] shadow ${COLOR_MAP[type]} transition-all`}>
      <button
        className="absolute top-2 right-2 rounded-full hover:bg-neutral-200 transition p-1"
        onClick={onClose}
        aria-label="Close"
        tabIndex={0}
        type="button"
      >
        <X size={18} />
      </button>
      <div className="flex items-start gap-2 w-full">
        <span className="mt-1">{ICON_MAP[type]}</span>
        <div>
          <div className="font-semibold">{title}</div>
          {description && <div className="text-sm">{description}</div>}
        </div>
      </div>
    </div>
  );
}
