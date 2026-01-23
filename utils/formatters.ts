interface LetterProps {
  char: string;
  isSpace: boolean;
  isHighlighted: boolean;
  className: string;
}

export function formatNameLetters(
  name: string,
  highlightIndices: number[] = [],
  highlightColor = "text-[#C41E3A]"
): LetterProps[] {
  return name.split("").map((char, index) => ({
    char: char === " " ? "\u00A0" : char,
    isSpace: char === " ",
    isHighlighted: highlightIndices.includes(index),
    className: highlightIndices.includes(index) ? highlightColor : "",
  }));
}
