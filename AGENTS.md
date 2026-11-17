# Repository instructions

## Scope and structure

- This repository supplies `@oardi/ts-types` directly from GitHub, pinned to a
  release tag or commit hash. Do not configure a registry or publish to npm.
- Keep the repository small: `index.d.ts`, `tests/types.test.ts`, `package.json`,
  `package-lock.json`, `tsconfig.test.json`, `readme.md`, `changelog.md`, `LICENSE`,
  `AGENTS.md`, `.gitignore`, and `.github/workflows/ci.yml`.
- Define and export `Nullable<T> = T | null`, `Optional<T> = T | undefined`, and
  `Dictionary<T> = Record<string, T>` directly in `index.d.ts`.
- Keep `index.d.ts` checked in and use it as the public entry point through
  `types` and the root export's `types` condition. Do not generate declarations.
- Expose types only: no JavaScript, runtime entry points, ambient globals,
  dependencies, or peer dependencies. Keep TypeScript and Prettier in
  `devDependencies` only.
- Do not add build, prepare, prepack, or publish scripts or release automation.
  Keep `private: true` to prevent accidental npm publication.

## Changes and validation

- Inspect the working tree before editing and preserve unrelated changes.
- Keep changes within this repository. Migrate consumers separately.
- Test through `import type` from `@oardi/ts-types`, without path aliases that
  bypass the public package export.
- Keep compiler tests strict and emit no files. Cover exact types, accepted and
  rejected assignments, missing dictionary keys, and the absence of globals and
  runtime values. Explain every `@ts-expect-error`; do not replace it with
  `@ts-ignore` or weaken compiler checks to make a test pass.
- Document exported semantics and examples, GitHub tag and commit installations,
  `import type` usage, development commands, and release conventions in
  `readme.md`. Keep documentation consistent with the implementation.
- Run `npm ci` when setting up the checkout and `npm run validate` after changes.
  Validation must combine compiler tests and Prettier's format check. CI must
  run the same installation and validation commands.

## Versions and Git

- Keep the version in `package.json`, both root version fields in
  `package-lock.json`, and the release entry in `changelog.md` consistent.
- Use dated changelog entries and release tags named `v<version>`. A release tag
  must point to the commit containing the matching version and changelog.
- Create commits or tags, push, or publish only on explicit user instruction.
  Never create a tag merely because the documentation mentions it.
