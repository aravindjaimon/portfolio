import { ARCH_PATH, KEYSTONE_PATH, MARK_VIEWBOX, RED, VOLT } from "./mark-geometry";

interface MarkProps {
  className?: string;
  title?: string;
}

/** Keystone "AJ": splayed red legs carrying a volt keystone, the right leg hooking into the J. */
export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
    >
      {title && <title>{title}</title>}
      <path d={ARCH_PATH} fill={RED} />
      <path d={KEYSTONE_PATH} fill={VOLT} />
    </svg>
  );
}
