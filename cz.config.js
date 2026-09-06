// @ts-check

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  prompt: {
    alias: {
      fd: "docs: fix typos",
      ur: "docs: update README",
    },
    messages: {
      type: "Select the type of change you're committing:",
      scope: "Denote the scope of this change (optional):",
      customScope: "Denote the scope of this change:",
      subject: "Write a short, imperative description of the change:\n",
      body: 'Provide a longer description of the change (optional). Use "|" to break new line:\n',
      breaking:
        'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      footerPrefixSelect: "Select the ISSUES type of change (optional):",
      customFooterPrefix: "Input ISSUES prefix:",
      footer:
        "List any ISSUES affected by this change (optional). E.g.: #31, #34:\n",
      confirmCommit: "Are you sure you want to proceed with the commit above?",
    },
    types: [
      {
        value: "feat",
        name: "feat:     ✨ A new feature",
        emoji: ":sparkles:",
      },
      { value: "fix", name: "fix:      🐛 A bug fix", emoji: ":bug:" },
      {
        value: "docs",
        name: "docs:     📝 Documentation changes",
        emoji: ":memo:",
      },
      {
        value: "style",
        name: "style:    💄 Code style changes",
        emoji: ":lipstick:",
      },
      {
        value: "refactor",
        name: "refactor: ♻️  Code refactoring",
        emoji: ":recycle:",
      },
      {
        value: "perf",
        name: "perf:     ⚡️ Performance improvements",
        emoji: ":zap:",
      },
      {
        value: "test",
        name: "test:     ✅ Adding or updating tests",
        emoji: ":white_check_mark:",
      },
      {
        value: "build",
        name: "build:    📦 Build system changes",
        emoji: ":package:",
      },
      {
        value: "ci",
        name: "ci:       🎡 CI configuration changes",
        emoji: ":ferris_wheel:",
      },
      { value: "chore", name: "chore:    🔧 Other changes", emoji: ":wrench:" },
      {
        value: "revert",
        name: "revert:   ⏪ Reverting changes",
        emoji: ":rewind:",
      },
    ],
    useEmoji: true,
    emojiAlign: "center",
    useAI: false,
    aiNumber: 1,
    themeColorCode: "",
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ["feat", "fix"],
    breaklineNumber: 100,
    breaklineChar: "|",
    skipQuestions: [],
    allowCustomIssuePrefix: false,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    minSubjectLength: 0,
    defaultBody: "",
    defaultIssues: "",
    defaultScope: "",
    defaultSubject: "",
  },
};
