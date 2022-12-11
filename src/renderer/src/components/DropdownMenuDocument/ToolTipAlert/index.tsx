import * as ToolTip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

import { Tooltip as Message } from "./Tooltip";

interface TooltipAlertProps {
  trigger: ReactNode;
  message: string;
}

export function ToolTipAlert({ trigger, message }: TooltipAlertProps) {
  return (
    <ToolTip.Provider>
      <ToolTip.Root>
        <ToolTip.Trigger className="outline-none w-full border-0" asChild>
          {trigger}
        </ToolTip.Trigger>
        <ToolTip.Portal>
          <Message message={message} />
        </ToolTip.Portal>
      </ToolTip.Root>
    </ToolTip.Provider>
  );
}
