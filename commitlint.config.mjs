const imperativeVerbs = [
  'add',
  'update',
  'fix',
  'remove',
  'create',
  'implement',
  'configure',
  'refactor',
  'change',
  'improve',
  'test',
  'document',
  'rename',
  'optimize',
  'replace',
];

export default {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'subject-imperative': ({ subject }) => {
          if (!subject) {
            return [true];
          }

          const firstWord = subject.trim().split(/\s+/)[0].toLowerCase();

          return [
            imperativeVerbs.includes(firstWord),
            `Commit subject must start with an imperative verb: ${imperativeVerbs.join(', ')}`,
          ];
        },
      },
    },
  ],
  rules: {
    'subject-imperative': [2, 'always'],
  },
};