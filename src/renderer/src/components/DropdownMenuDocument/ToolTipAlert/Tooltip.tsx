import { Content, Arrow } from "@radix-ui/react-tooltip";

interface TooltipProps {
  message: string;
}

export function Tooltip({ message }: TooltipProps) {
  return (
    <Content className="items-center flex outline-none bg-rotion-400 px-4 text-center text-rotion-100 rounded-md h-10 shadow-lg text-sm">
      {message}
      <Arrow
        className="fill-rotion-400"
        width={12}
        height={10}
        alignmentBaseline="before-edge"
      />
    </Content>
  );
}
