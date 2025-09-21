module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'app',
        'pages',
        'podcasts',
        'episodes',
        'player',
        'shared/ui',
        'shared/lib',
        'api',
        'styles',
        'tests',
        'build',
        'ci',
        'deps',
      ],
    ],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'body-max-line-length': [2, 'always', 120],
  },
};
