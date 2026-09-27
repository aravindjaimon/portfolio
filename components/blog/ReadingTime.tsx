import { Clock } from "lucide-react";

interface ReadingTimeProps {
  time: string;
}

export function ReadingTime({ time }: ReadingTimeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider">
      <Clock size={13} aria-hidden />
      {time}
    </span>
  );
}
