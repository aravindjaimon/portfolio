interface DifficultyBadgeProps {
  difficulty: "beginner" | "intermediate" | "advanced";
}

/** Tints are surfaces only; the label stays ink on all three. */
const difficultyConfig = {
  beginner: { label: "Beginner", className: "" },
  intermediate: {
    label: "Intermediate",
    className: "border-transparent bg-air-tint",
  },
  advanced: { label: "Advanced", className: "border-transparent bg-rose-tint" },
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];

  return <span className={`chip ${config.className}`}>{config.label}</span>;
}
