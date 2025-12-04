// utils/notifyCustom.ts
import { toast } from "sonner";
import { CustomToastNotification, NotifyType } from "./CustomToastNotification";

interface NotifyProps {
  title: string;
  description?: string;
  duration?: number;
}

export function notifyCustom(
  type: NotifyType,
  { title, description, duration = 4000 }: NotifyProps
) {
  toast.custom(
    (id) => (
      <CustomToastNotification
        type={type}
        title={title}
        description={description}
        onClose={() => toast.dismiss(id)}
      />
    ),
    {
      duration,
      // showProgressBar: true,
    }
  );
}
