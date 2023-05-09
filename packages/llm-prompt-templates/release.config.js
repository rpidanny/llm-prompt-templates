const { name } = require('./project.json');

const srcRoot = `packages/${name}`;

module.exports = {
  extends: 'release.config.base.js',
  pkgRoot: srcRoot,
  tagFormat: name + '-v${version}',
  commitPaths: [`${srcRoot}/*`],
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          {
            type: 'docs',
            scope: 'README',
            release: 'patch',
          },
          {
            type: 'refactor',
            release: 'patch',
          },
          {
            type: 'style',
            release: 'patch',
          },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
      },
    ],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `${srcRoot}/CHANGELOG.md`,
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        tarballDir: `dist/${srcRoot}`,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [
          `${srcRoot}/package.json`,
          `${srcRoot}/package-lock.json`,
          `${srcRoot}/CHANGELOG.md`,
        ],
        message:
          `chore(${name}): ` +
          '${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
