# @oardi/ts-types

Small, dependency-free TypeScript utility types. The checked-in `index.d.ts` is
the public entry point. This package contains no JavaScript runtime or build step.
It is installed directly from GitHub and is not published to an npm registry.

## Installation

Pin the dependency to a release tag:

```sh
npm install --save-dev @oardi/ts-types@github:oardi/oardi-ts-types#v0.1.0
```

The tag command is an example for the `0.1.0` release; the tag must exist before
installation. Tags are created only on explicit request.

Alternatively, pin to a full commit hash (replace `<full-commit-hash>` with an
existing 40-character commit SHA):

```sh
npm install --save-dev "@oardi/ts-types@github:oardi/oardi-ts-types#<full-commit-hash>"
```

Commit the consumer's updated `package.json` and `package-lock.json`. Use a tag
or commit hash rather than a branch or an unpinned GitHub URL. No registry
configuration is required. Consumer migrations are handled separately.

If your own library exposes these types in its public declarations, install the
package with `--save` instead of `--save-dev` so downstream consumers can resolve
them.

## Usage

Always use `import type`:

```ts
import type { Dictionary, Nullable, Optional } from "@oardi/ts-types";

const selectedId: Nullable<string> = null;
const nickname: Optional<string> = undefined;
const scores: Dictionary<number> = { alice: 10, bob: 20 };
```

| Type            | Definition          | Meaning                            |
| --------------- | ------------------- | ---------------------------------- |
| `Nullable<T>`   | `T \| null`         | Adds `null`, preserving `T`.       |
| `Optional<T>`   | `T \| undefined`    | Adds `undefined`, preserving `T`.  |
| `Dictionary<T>` | `Record<string, T>` | Maps arbitrary string keys to `T`. |

Enable TypeScript's `strict` mode (including `strictNullChecks`) to distinguish
`null` and `undefined`. `Optional<T>` describes a value; it does not make an object
property optional. Use `property?: T` when the property itself may be absent.

Dictionary keys need not exist. Enable `noUncheckedIndexedAccess` so an indexed
read has type `T | undefined`. The types do not validate data at runtime and do
not create global declarations.

## Local development

With Node.js 24 and npm:

```sh
npm ci
npm run validate
```

`npm test` runs compiler tests against the public package export with strict
checking and no emitted files. Tests cover exact types, accepted values, rejected
values, dictionary lookups, and the absence of global declarations or runtime
values. `npm run format:check` checks formatting; `npm run format` applies it.
TypeScript and Prettier are development tools only.

GitHub Actions runs `npm ci` and `npm run validate` on pushes and pull requests.

## Versions and releases

Keep `package.json`, the root version fields in `package-lock.json`, and
`changelog.md` aligned. Release tags follow `v<version>`: version `0.1.0` uses
`v0.1.0`, pointing to the commit containing those release files.

Update these files together and run `npm run validate` before a release. Create
commits and tags only when explicitly requested. There is no npm publication,
registry setup, or automated release workflow.

## License

[MIT](LICENSE)
