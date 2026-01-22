interface DifficultyBadgeProps {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const difficultyConfig = {
  beginner: {
    label: 'Beginner',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-400',
    borderColor: 'border-green-500/30',
  },
  intermediate: {
    label: 'Intermediate',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
  },
  advanced: {
    label: 'Advanced',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-400',
    borderColor: 'border-red-500/30',
  },
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];

  return (
    <span
      className={`inline-block font-mono text-xs px-2 py-0.5 border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
    >
      {config.label}
    </span>
  );
}
