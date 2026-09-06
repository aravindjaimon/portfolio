import { Clock } from "lucide-react";

interface ReadingTimeProps {
  time: string;
}

export function ReadingTime({ time }: ReadingTimeProps) {
  return (
    <span className="inline-flex items-center gap-1 text-foreground/50 text-sm font-mono">
      <Clock size={14} />
      {time}
    </span>
  );
}
