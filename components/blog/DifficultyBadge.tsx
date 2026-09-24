interface DifficultyBadgeProps {
  difficulty: "beginner" | "intermediate" | "advanced";
}

const difficultyConfig = {
  beginner: { label: "Beginner", className: "bg-card" },
  intermediate: { label: "Intermediate", className: "bg-highlight" },
  advanced: {
    label: "Advanced",
    className: "bg-primary text-primary-foreground",
  },
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];

  return <span className={`chip ${config.className}`}>{config.label}</span>;
}
