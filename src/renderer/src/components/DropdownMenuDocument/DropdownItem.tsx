import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import React from "react";

interface DropdownItemProps {
  text: string;
  icon?: React.ReactNode;
  onClickAction: () => Promise<void>;
}

export function DropdownItem({ text, icon, onClickAction }: DropdownItemProps) {
  return (
    <DropdownMenuItem
      onClick={() => onClickAction()}
      className="text-rotion-300 flex gap-2 items-center hover:text-rotion-200 cursor-pointer hover:bg-rotion-700 hover:bg-opacity-50 w-full px-4 py-2 rounded-md text-sm"
    >
      {text}
      {icon && icon}
    </DropdownMenuItem>
  );
}
