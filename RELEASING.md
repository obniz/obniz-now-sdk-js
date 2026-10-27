# Releasing

## Prepared 0.2.0 candidate

The manifest and lockfile already contain version **0.2.0**. Do not bump the
version again for this candidate. The generated source corresponds to
obniz-machines master `ca956a11f441d447fb6646774a44ad517728a63d`.

Before publication, review and merge the SDK candidate into this repository's
`main` branch, then validate the exact commit to be tagged:

```sh
npm ci
npm run test:run
npm run typecheck
npm run build
npm pack --dry-run
```

Check that the package contains root and browser JavaScript entries and their
declarations, README, BROWSER, CHANGELOG and LICENSE. Install the actual tarball
in a separate consumer and check ESM, CommonJS and TypeScript package imports.
Do not include source tests, local credentials or `node_modules` in the tarball.

## Publication boundary

Pushing a `v*` tag triggers `.github/workflows/publish-npm.yml` and publishes to
npm using the configured GitHub Actions identity. A branch push alone does not
trigger that workflow. Create and push `v0.2.0` only after publication is approved:

```sh
git tag -a v0.2.0 -m "Release 0.2.0"
git push origin v0.2.0
```

Watch the workflow and verify `npm view @obniz/obniz-now-sdk@0.2.0 version` and the
`latest` dist-tag afterward. A failed publish must be investigated before retry;
do not move a tag or reuse a version that has already been published.

The `obniz-machines` Generate and Publish SDK workflow also bumps the SDK version
and pushes a tag. Do not run it for this already-versioned candidate: it would
create a different release. For future generated releases, review its source
changes and requested version bump before dispatching it.
