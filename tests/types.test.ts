import type {
  Dictionary as ImportedDictionary,
  Nullable as ImportedNullable,
  Optional as ImportedOptional,
} from "@oardi/ts-types";

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;
type Assert<T extends true> = T;

export type TypeAssertions = [
  Assert<Equal<keyof typeof import("@oardi/ts-types"), never>>,
  Assert<Equal<ImportedNullable<string>, string | null>>,
  Assert<Equal<ImportedNullable<number | boolean>, number | boolean | null>>,
  Assert<Equal<ImportedNullable<never>, null>>,
  Assert<Equal<ImportedOptional<string>, string | undefined>>,
  Assert<
    Equal<ImportedOptional<number | boolean>, number | boolean | undefined>
  >,
  Assert<Equal<ImportedOptional<never>, undefined>>,
  Assert<
    Equal<ImportedNullable<ImportedOptional<string>>, string | null | undefined>
  >,
  Assert<Equal<ImportedDictionary<number>, Record<string, number>>>,
  Assert<Equal<ImportedDictionary<{ id: number }>[string], { id: number }>>,
];

declare function acceptsNullable(value: ImportedNullable<string>): void;
acceptsNullable("value");
acceptsNullable(null);
// @ts-expect-error Nullable does not add undefined.
acceptsNullable(undefined);
// @ts-expect-error Nullable preserves the given value type.
acceptsNullable(42);

declare function acceptsOptional(value: ImportedOptional<string>): void;
acceptsOptional("value");
acceptsOptional(undefined);
// @ts-expect-error Optional does not add null.
acceptsOptional(null);
// @ts-expect-error Optional preserves the given value type.
acceptsOptional(42);

declare function acceptsDictionary(value: ImportedDictionary<number>): void;
acceptsDictionary({});
acceptsDictionary({ first: 1, "arbitrary-key": 2 });
// @ts-expect-error Dictionary values must match T.
acceptsDictionary({ first: "one" });
// @ts-expect-error Dictionary does not add null to its values.
acceptsDictionary({ first: null });
// @ts-expect-error Dictionary does not add undefined to its values.
acceptsDictionary({ first: undefined });

declare const dictionary: ImportedDictionary<number>;
const entry = dictionary["missing"];
export type DictionaryLookup = Assert<Equal<typeof entry, number | undefined>>;
// @ts-expect-error A missing key may return undefined with noUncheckedIndexedAccess.
const requiredEntry: number = entry;

// @ts-expect-error Nullable must be imported and is not global.
type GlobalNullable = Nullable<string>;
// @ts-expect-error Optional must be imported and is not global.
type GlobalOptional = Optional<string>;
// @ts-expect-error Dictionary must be imported and is not global.
type GlobalDictionary = Dictionary<number>;
// @ts-expect-error The package exposes no runtime value named Nullable.
const runtimeValue = ImportedNullable;
