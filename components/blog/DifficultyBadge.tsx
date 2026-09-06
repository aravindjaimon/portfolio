interface DifficultyBadgeProps {
  difficulty: "beginner" | "intermediate" | "advanced";
}

const difficultyConfig = {
  beginner: {
    label: "Beginner",
    bgColor: "bg-transparent",
    textColor: "text-foreground/70",
    borderColor: "border-border",
  },
  intermediate: {
    label: "Intermediate",
    bgColor: "bg-volt/10",
    textColor: "text-volt",
    borderColor: "border-volt/40",
  },
  advanced: {
    label: "Advanced",
    bgColor: "bg-primary/10",
    textColor: "text-primary",
    borderColor: "border-primary/40",
  },
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];

  return (
    <span
      className={`inline-block text-xs px-2 py-0.5 border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
    >
      {config.label}
    </span>
  );
}
