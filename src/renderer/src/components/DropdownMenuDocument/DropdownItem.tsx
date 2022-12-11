import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { ToolTipAlert } from "./ToolTipAlert";

interface DropdownItemProps {
  text: string;
  icon?: React.ReactNode;
  comingSoon?: boolean;
  onClickAction: () => Promise<void>;
}

export function DropdownItem({
  text,
  icon,
  onClickAction,
  comingSoon,
}: DropdownItemProps) {
  if (comingSoon) {
    return (
      <ToolTipAlert
        trigger={
          <DropdownMenuItem
            onClick={() => onClickAction()}
            className="text-rotion-300 flex gap-2 items-center justify-between hover:text-rotion-200 cursor-pointer hover:bg-rotion-700 hover:bg-opacity-50 w-full px-4 py-2 rounded-md text-sm"
          >
            {text}
            {icon && icon}
          </DropdownMenuItem>
        }
        message="This action is in developing"
      />
    );
  }

  return (
    <DropdownMenuItem
      onClick={() => onClickAction()}
      className="outline-none text-rotion-300 flex gap-2 items-center justify-between hover:text-rotion-200 cursor-pointer hover:bg-rotion-700 hover:bg-opacity-50 w-full px-4 py-2 rounded-md text-sm"
    >
      {text}
      {icon && icon}
    </DropdownMenuItem>
  );
}
