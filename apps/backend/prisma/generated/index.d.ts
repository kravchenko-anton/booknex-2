
/**
 * Client
**/

import * as runtime from './runtime/binary.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Genre
 * 
 */
export type Genre = $Result.DefaultSelection<Prisma.$GenrePayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model Book
 * 
 */
export type Book = $Result.DefaultSelection<Prisma.$BookPayload>
/**
 * Model BookTemplate
 * 
 */
export type BookTemplate = $Result.DefaultSelection<Prisma.$BookTemplatePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ReadingHistory
 * 
 */
export type ReadingHistory = $Result.DefaultSelection<Prisma.$ReadingHistoryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Activities: {
  startedReading: 'startedReading',
  finishedReading: 'finishedReading',
  savedBook: 'savedBook',
  removeFromSaved: 'removeFromSaved',
  checkCatalog: 'checkCatalog',
  reviewBook: 'reviewBook',
  updatePicture: 'updatePicture',
  visitBook: 'visitBook',
  createBook: 'createBook',
  updateBook: 'updateBook',
  updateEBook: 'updateEBook',
  updateGenre: 'updateGenre',
  visitGenre: 'visitGenre',
  visitCollection: 'visitCollection',
  getEbook: 'getEbook',
  updateRecommendations: 'updateRecommendations',
  registerNewUser: 'registerNewUser',
  loginUser: 'loginUser'
};

export type Activities = (typeof Activities)[keyof typeof Activities]


export const Role: {
  user: 'user',
  admin: 'admin'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Activities = $Enums.Activities

export const Activities: typeof $Enums.Activities

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Genres
 * const genres = await prisma.genre.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Genres
   * const genres = await prisma.genre.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => $Utils.JsPromise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.genre`: Exposes CRUD operations for the **Genre** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Genres
    * const genres = await prisma.genre.findMany()
    * ```
    */
  get genre(): Prisma.GenreDelegate<ExtArgs>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs>;

  /**
   * `prisma.book`: Exposes CRUD operations for the **Book** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Books
    * const books = await prisma.book.findMany()
    * ```
    */
  get book(): Prisma.BookDelegate<ExtArgs>;

  /**
   * `prisma.bookTemplate`: Exposes CRUD operations for the **BookTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookTemplates
    * const bookTemplates = await prisma.bookTemplate.findMany()
    * ```
    */
  get bookTemplate(): Prisma.BookTemplateDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.readingHistory`: Exposes CRUD operations for the **ReadingHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReadingHistories
    * const readingHistories = await prisma.readingHistory.findMany()
    * ```
    */
  get readingHistory(): Prisma.ReadingHistoryDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.13.0
   * Query Engine version: b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Genre: 'Genre',
    Activity: 'Activity',
    Review: 'Review',
    Book: 'Book',
    BookTemplate: 'BookTemplate',
    User: 'User',
    ReadingHistory: 'ReadingHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'genre' | 'activity' | 'review' | 'book' | 'bookTemplate' | 'user' | 'readingHistory'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Genre: {
        payload: Prisma.$GenrePayload<ExtArgs>
        fields: Prisma.GenreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GenreFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GenrePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GenreFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          findFirst: {
            args: Prisma.GenreFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GenrePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GenreFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          findMany: {
            args: Prisma.GenreFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>[]
          }
          create: {
            args: Prisma.GenreCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          createMany: {
            args: Prisma.GenreCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.GenreDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          update: {
            args: Prisma.GenreUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          deleteMany: {
            args: Prisma.GenreDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.GenreUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.GenreUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          aggregate: {
            args: Prisma.GenreAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateGenre>
          }
          groupBy: {
            args: Prisma.GenreGroupByArgs<ExtArgs>,
            result: $Utils.Optional<GenreGroupByOutputType>[]
          }
          count: {
            args: Prisma.GenreCountArgs<ExtArgs>,
            result: $Utils.Optional<GenreCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>,
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>,
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      Book: {
        payload: Prisma.$BookPayload<ExtArgs>
        fields: Prisma.BookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          findFirst: {
            args: Prisma.BookFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          findMany: {
            args: Prisma.BookFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookPayload>[]
          }
          create: {
            args: Prisma.BookCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          createMany: {
            args: Prisma.BookCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.BookDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          update: {
            args: Prisma.BookUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          deleteMany: {
            args: Prisma.BookDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.BookUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.BookUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          aggregate: {
            args: Prisma.BookAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateBook>
          }
          groupBy: {
            args: Prisma.BookGroupByArgs<ExtArgs>,
            result: $Utils.Optional<BookGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookCountArgs<ExtArgs>,
            result: $Utils.Optional<BookCountAggregateOutputType> | number
          }
        }
      }
      BookTemplate: {
        payload: Prisma.$BookTemplatePayload<ExtArgs>
        fields: Prisma.BookTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookTemplateFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookTemplateFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>
          }
          findFirst: {
            args: Prisma.BookTemplateFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookTemplateFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>
          }
          findMany: {
            args: Prisma.BookTemplateFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>[]
          }
          create: {
            args: Prisma.BookTemplateCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>
          }
          createMany: {
            args: Prisma.BookTemplateCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.BookTemplateDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>
          }
          update: {
            args: Prisma.BookTemplateUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>
          }
          deleteMany: {
            args: Prisma.BookTemplateDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.BookTemplateUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.BookTemplateUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>
          }
          aggregate: {
            args: Prisma.BookTemplateAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateBookTemplate>
          }
          groupBy: {
            args: Prisma.BookTemplateGroupByArgs<ExtArgs>,
            result: $Utils.Optional<BookTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookTemplateCountArgs<ExtArgs>,
            result: $Utils.Optional<BookTemplateCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ReadingHistory: {
        payload: Prisma.$ReadingHistoryPayload<ExtArgs>
        fields: Prisma.ReadingHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReadingHistoryFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReadingHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReadingHistoryFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReadingHistoryPayload>
          }
          findFirst: {
            args: Prisma.ReadingHistoryFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReadingHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReadingHistoryFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReadingHistoryPayload>
          }
          findMany: {
            args: Prisma.ReadingHistoryFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReadingHistoryPayload>[]
          }
          create: {
            args: Prisma.ReadingHistoryCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReadingHistoryPayload>
          }
          createMany: {
            args: Prisma.ReadingHistoryCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ReadingHistoryDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReadingHistoryPayload>
          }
          update: {
            args: Prisma.ReadingHistoryUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReadingHistoryPayload>
          }
          deleteMany: {
            args: Prisma.ReadingHistoryDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ReadingHistoryUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ReadingHistoryUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReadingHistoryPayload>
          }
          aggregate: {
            args: Prisma.ReadingHistoryAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateReadingHistory>
          }
          groupBy: {
            args: Prisma.ReadingHistoryGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ReadingHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReadingHistoryCountArgs<ExtArgs>,
            result: $Utils.Optional<ReadingHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type GenreCountOutputType
   */

  export type GenreCountOutputType = {
    users: number
    books: number
    mainBooks: number
    similarBy: number
    similar: number
    bookTemplates: number
    activities: number
  }

  export type GenreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | GenreCountOutputTypeCountUsersArgs
    books?: boolean | GenreCountOutputTypeCountBooksArgs
    mainBooks?: boolean | GenreCountOutputTypeCountMainBooksArgs
    similarBy?: boolean | GenreCountOutputTypeCountSimilarByArgs
    similar?: boolean | GenreCountOutputTypeCountSimilarArgs
    bookTemplates?: boolean | GenreCountOutputTypeCountBookTemplatesArgs
    activities?: boolean | GenreCountOutputTypeCountActivitiesArgs
  }

  // Custom InputTypes
  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GenreCountOutputType
     */
    select?: GenreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeCountBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
  }

  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeCountMainBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
  }

  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeCountSimilarByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GenreWhereInput
  }

  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeCountSimilarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GenreWhereInput
  }

  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeCountBookTemplatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookTemplateWhereInput
  }

  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }


  /**
   * Count Type BookCountOutputType
   */

  export type BookCountOutputType = {
    genres: number
    review: number
    finishedBy: number
    savedBy: number
    readingBy: number
    activities: number
    ReadingHistory: number
    similarBooks: number
    similarBy: number
  }

  export type BookCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    genres?: boolean | BookCountOutputTypeCountGenresArgs
    review?: boolean | BookCountOutputTypeCountReviewArgs
    finishedBy?: boolean | BookCountOutputTypeCountFinishedByArgs
    savedBy?: boolean | BookCountOutputTypeCountSavedByArgs
    readingBy?: boolean | BookCountOutputTypeCountReadingByArgs
    activities?: boolean | BookCountOutputTypeCountActivitiesArgs
    ReadingHistory?: boolean | BookCountOutputTypeCountReadingHistoryArgs
    similarBooks?: boolean | BookCountOutputTypeCountSimilarBooksArgs
    similarBy?: boolean | BookCountOutputTypeCountSimilarByArgs
  }

  // Custom InputTypes
  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookCountOutputType
     */
    select?: BookCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountGenresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GenreWhereInput
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountFinishedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountSavedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountReadingByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountReadingHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingHistoryWhereInput
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountSimilarBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountSimilarByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
  }


  /**
   * Count Type BookTemplateCountOutputType
   */

  export type BookTemplateCountOutputType = {
    genres: number
  }

  export type BookTemplateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    genres?: boolean | BookTemplateCountOutputTypeCountGenresArgs
  }

  // Custom InputTypes
  /**
   * BookTemplateCountOutputType without action
   */
  export type BookTemplateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplateCountOutputType
     */
    select?: BookTemplateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookTemplateCountOutputType without action
   */
  export type BookTemplateCountOutputTypeCountGenresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GenreWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    selectedGenres: number
    review: number
    savedBooks: number
    finishedBooks: number
    readingBooks: number
    activity: number
    ReadingHistory: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    selectedGenres?: boolean | UserCountOutputTypeCountSelectedGenresArgs
    review?: boolean | UserCountOutputTypeCountReviewArgs
    savedBooks?: boolean | UserCountOutputTypeCountSavedBooksArgs
    finishedBooks?: boolean | UserCountOutputTypeCountFinishedBooksArgs
    readingBooks?: boolean | UserCountOutputTypeCountReadingBooksArgs
    activity?: boolean | UserCountOutputTypeCountActivityArgs
    ReadingHistory?: boolean | UserCountOutputTypeCountReadingHistoryArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSelectedGenresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GenreWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSavedBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFinishedBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReadingBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReadingHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingHistoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Genre
   */

  export type AggregateGenre = {
    _count: GenreCountAggregateOutputType | null
    _avg: GenreAvgAggregateOutputType | null
    _sum: GenreSumAggregateOutputType | null
    _min: GenreMinAggregateOutputType | null
    _max: GenreMaxAggregateOutputType | null
  }

  export type GenreAvgAggregateOutputType = {
    id: number | null
  }

  export type GenreSumAggregateOutputType = {
    id: number | null
  }

  export type GenreMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    slug: string | null
    icon: string | null
  }

  export type GenreMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    slug: string | null
    icon: string | null
  }

  export type GenreCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    slug: number
    icon: number
    _all: number
  }


  export type GenreAvgAggregateInputType = {
    id?: true
  }

  export type GenreSumAggregateInputType = {
    id?: true
  }

  export type GenreMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    slug?: true
    icon?: true
  }

  export type GenreMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    slug?: true
    icon?: true
  }

  export type GenreCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    slug?: true
    icon?: true
    _all?: true
  }

  export type GenreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Genre to aggregate.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Genres
    **/
    _count?: true | GenreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GenreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GenreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GenreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GenreMaxAggregateInputType
  }

  export type GetGenreAggregateType<T extends GenreAggregateArgs> = {
        [P in keyof T & keyof AggregateGenre]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGenre[P]>
      : GetScalarType<T[P], AggregateGenre[P]>
  }




  export type GenreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GenreWhereInput
    orderBy?: GenreOrderByWithAggregationInput | GenreOrderByWithAggregationInput[]
    by: GenreScalarFieldEnum[] | GenreScalarFieldEnum
    having?: GenreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GenreCountAggregateInputType | true
    _avg?: GenreAvgAggregateInputType
    _sum?: GenreSumAggregateInputType
    _min?: GenreMinAggregateInputType
    _max?: GenreMaxAggregateInputType
  }

  export type GenreGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    name: string
    slug: string
    icon: string
    _count: GenreCountAggregateOutputType | null
    _avg: GenreAvgAggregateOutputType | null
    _sum: GenreSumAggregateOutputType | null
    _min: GenreMinAggregateOutputType | null
    _max: GenreMaxAggregateOutputType | null
  }

  type GetGenreGroupByPayload<T extends GenreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GenreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GenreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GenreGroupByOutputType[P]>
            : GetScalarType<T[P], GenreGroupByOutputType[P]>
        }
      >
    >


  export type GenreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    slug?: boolean
    icon?: boolean
    users?: boolean | Genre$usersArgs<ExtArgs>
    books?: boolean | Genre$booksArgs<ExtArgs>
    mainBooks?: boolean | Genre$mainBooksArgs<ExtArgs>
    similarBy?: boolean | Genre$similarByArgs<ExtArgs>
    similar?: boolean | Genre$similarArgs<ExtArgs>
    bookTemplates?: boolean | Genre$bookTemplatesArgs<ExtArgs>
    activities?: boolean | Genre$activitiesArgs<ExtArgs>
    _count?: boolean | GenreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["genre"]>

  export type GenreSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    slug?: boolean
    icon?: boolean
  }


  export type GenreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Genre$usersArgs<ExtArgs>
    books?: boolean | Genre$booksArgs<ExtArgs>
    mainBooks?: boolean | Genre$mainBooksArgs<ExtArgs>
    similarBy?: boolean | Genre$similarByArgs<ExtArgs>
    similar?: boolean | Genre$similarArgs<ExtArgs>
    bookTemplates?: boolean | Genre$bookTemplatesArgs<ExtArgs>
    activities?: boolean | Genre$activitiesArgs<ExtArgs>
    _count?: boolean | GenreCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $GenrePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Genre"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      books: Prisma.$BookPayload<ExtArgs>[]
      mainBooks: Prisma.$BookPayload<ExtArgs>[]
      similarBy: Prisma.$GenrePayload<ExtArgs>[]
      similar: Prisma.$GenrePayload<ExtArgs>[]
      bookTemplates: Prisma.$BookTemplatePayload<ExtArgs>[]
      activities: Prisma.$ActivityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      name: string
      slug: string
      icon: string
    }, ExtArgs["result"]["genre"]>
    composites: {}
  }


  type GenreGetPayload<S extends boolean | null | undefined | GenreDefaultArgs> = $Result.GetResult<Prisma.$GenrePayload, S>

  type GenreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GenreFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GenreCountAggregateInputType | true
    }

  export interface GenreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Genre'], meta: { name: 'Genre' } }
    /**
     * Find zero or one Genre that matches the filter.
     * @param {GenreFindUniqueArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends GenreFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, GenreFindUniqueArgs<ExtArgs>>
    ): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Genre that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {GenreFindUniqueOrThrowArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends GenreFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, GenreFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Genre that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindFirstArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends GenreFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, GenreFindFirstArgs<ExtArgs>>
    ): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Genre that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindFirstOrThrowArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends GenreFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, GenreFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Genres that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Genres
     * const genres = await prisma.genre.findMany()
     * 
     * // Get first 10 Genres
     * const genres = await prisma.genre.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const genreWithIdOnly = await prisma.genre.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends GenreFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, GenreFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Genre.
     * @param {GenreCreateArgs} args - Arguments to create a Genre.
     * @example
     * // Create one Genre
     * const Genre = await prisma.genre.create({
     *   data: {
     *     // ... data to create a Genre
     *   }
     * })
     * 
    **/
    create<T extends GenreCreateArgs<ExtArgs>>(
      args: SelectSubset<T, GenreCreateArgs<ExtArgs>>
    ): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Genres.
     *     @param {GenreCreateManyArgs} args - Arguments to create many Genres.
     *     @example
     *     // Create many Genres
     *     const genre = await prisma.genre.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends GenreCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, GenreCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Genre.
     * @param {GenreDeleteArgs} args - Arguments to delete one Genre.
     * @example
     * // Delete one Genre
     * const Genre = await prisma.genre.delete({
     *   where: {
     *     // ... filter to delete one Genre
     *   }
     * })
     * 
    **/
    delete<T extends GenreDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, GenreDeleteArgs<ExtArgs>>
    ): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Genre.
     * @param {GenreUpdateArgs} args - Arguments to update one Genre.
     * @example
     * // Update one Genre
     * const genre = await prisma.genre.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends GenreUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, GenreUpdateArgs<ExtArgs>>
    ): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Genres.
     * @param {GenreDeleteManyArgs} args - Arguments to filter Genres to delete.
     * @example
     * // Delete a few Genres
     * const { count } = await prisma.genre.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends GenreDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, GenreDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Genres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Genres
     * const genre = await prisma.genre.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends GenreUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, GenreUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Genre.
     * @param {GenreUpsertArgs} args - Arguments to update or create a Genre.
     * @example
     * // Update or create a Genre
     * const genre = await prisma.genre.upsert({
     *   create: {
     *     // ... data to create a Genre
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Genre we want to update
     *   }
     * })
    **/
    upsert<T extends GenreUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, GenreUpsertArgs<ExtArgs>>
    ): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Genres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreCountArgs} args - Arguments to filter Genres to count.
     * @example
     * // Count the number of Genres
     * const count = await prisma.genre.count({
     *   where: {
     *     // ... the filter for the Genres we want to count
     *   }
     * })
    **/
    count<T extends GenreCountArgs>(
      args?: Subset<T, GenreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GenreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Genre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GenreAggregateArgs>(args: Subset<T, GenreAggregateArgs>): Prisma.PrismaPromise<GetGenreAggregateType<T>>

    /**
     * Group by Genre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GenreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GenreGroupByArgs['orderBy'] }
        : { orderBy?: GenreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GenreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGenreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Genre model
   */
  readonly fields: GenreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Genre.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GenreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    users<T extends Genre$usersArgs<ExtArgs> = {}>(args?: Subset<T, Genre$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'> | Null>;

    books<T extends Genre$booksArgs<ExtArgs> = {}>(args?: Subset<T, Genre$booksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findMany'> | Null>;

    mainBooks<T extends Genre$mainBooksArgs<ExtArgs> = {}>(args?: Subset<T, Genre$mainBooksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findMany'> | Null>;

    similarBy<T extends Genre$similarByArgs<ExtArgs> = {}>(args?: Subset<T, Genre$similarByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'findMany'> | Null>;

    similar<T extends Genre$similarArgs<ExtArgs> = {}>(args?: Subset<T, Genre$similarArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'findMany'> | Null>;

    bookTemplates<T extends Genre$bookTemplatesArgs<ExtArgs> = {}>(args?: Subset<T, Genre$bookTemplatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, 'findMany'> | Null>;

    activities<T extends Genre$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Genre$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Genre model
   */ 
  interface GenreFieldRefs {
    readonly id: FieldRef<"Genre", 'Int'>
    readonly createdAt: FieldRef<"Genre", 'DateTime'>
    readonly updatedAt: FieldRef<"Genre", 'DateTime'>
    readonly name: FieldRef<"Genre", 'String'>
    readonly slug: FieldRef<"Genre", 'String'>
    readonly icon: FieldRef<"Genre", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Genre findUnique
   */
  export type GenreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre findUniqueOrThrow
   */
  export type GenreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre findFirst
   */
  export type GenreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Genres.
     */
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre findFirstOrThrow
   */
  export type GenreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Genres.
     */
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre findMany
   */
  export type GenreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genres to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre create
   */
  export type GenreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The data needed to create a Genre.
     */
    data: XOR<GenreCreateInput, GenreUncheckedCreateInput>
  }

  /**
   * Genre createMany
   */
  export type GenreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Genres.
     */
    data: GenreCreateManyInput | GenreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Genre update
   */
  export type GenreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The data needed to update a Genre.
     */
    data: XOR<GenreUpdateInput, GenreUncheckedUpdateInput>
    /**
     * Choose, which Genre to update.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre updateMany
   */
  export type GenreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Genres.
     */
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyInput>
    /**
     * Filter which Genres to update
     */
    where?: GenreWhereInput
  }

  /**
   * Genre upsert
   */
  export type GenreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The filter to search for the Genre to update in case it exists.
     */
    where: GenreWhereUniqueInput
    /**
     * In case the Genre found by the `where` argument doesn't exist, create a new Genre with this data.
     */
    create: XOR<GenreCreateInput, GenreUncheckedCreateInput>
    /**
     * In case the Genre was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GenreUpdateInput, GenreUncheckedUpdateInput>
  }

  /**
   * Genre delete
   */
  export type GenreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter which Genre to delete.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre deleteMany
   */
  export type GenreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Genres to delete
     */
    where?: GenreWhereInput
  }

  /**
   * Genre.users
   */
  export type Genre$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Genre.books
   */
  export type Genre$booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    cursor?: BookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Genre.mainBooks
   */
  export type Genre$mainBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    cursor?: BookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Genre.similarBy
   */
  export type Genre$similarByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    where?: GenreWhereInput
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    cursor?: GenreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre.similar
   */
  export type Genre$similarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    where?: GenreWhereInput
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    cursor?: GenreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre.bookTemplates
   */
  export type Genre$bookTemplatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    where?: BookTemplateWhereInput
    orderBy?: BookTemplateOrderByWithRelationInput | BookTemplateOrderByWithRelationInput[]
    cursor?: BookTemplateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookTemplateScalarFieldEnum | BookTemplateScalarFieldEnum[]
  }

  /**
   * Genre.activities
   */
  export type Genre$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Genre without action
   */
  export type GenreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityAvgAggregateOutputType = {
    id: number | null
    importance: number | null
    genreId: number | null
    bookId: number | null
    userId: number | null
  }

  export type ActivitySumAggregateOutputType = {
    id: number | null
    importance: number | null
    genreId: number | null
    bookId: number | null
    userId: number | null
  }

  export type ActivityMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    type: $Enums.Activities | null
    importance: number | null
    genreId: number | null
    bookId: number | null
    userId: number | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    type: $Enums.Activities | null
    importance: number | null
    genreId: number | null
    bookId: number | null
    userId: number | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    createdAt: number
    type: number
    importance: number
    genreId: number
    bookId: number
    userId: number
    _all: number
  }


  export type ActivityAvgAggregateInputType = {
    id?: true
    importance?: true
    genreId?: true
    bookId?: true
    userId?: true
  }

  export type ActivitySumAggregateInputType = {
    id?: true
    importance?: true
    genreId?: true
    bookId?: true
    userId?: true
  }

  export type ActivityMinAggregateInputType = {
    id?: true
    createdAt?: true
    type?: true
    importance?: true
    genreId?: true
    bookId?: true
    userId?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    createdAt?: true
    type?: true
    importance?: true
    genreId?: true
    bookId?: true
    userId?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    createdAt?: true
    type?: true
    importance?: true
    genreId?: true
    bookId?: true
    userId?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _avg?: ActivityAvgAggregateInputType
    _sum?: ActivitySumAggregateInputType
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: number
    createdAt: Date
    type: $Enums.Activities
    importance: number
    genreId: number | null
    bookId: number | null
    userId: number | null
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    type?: boolean
    importance?: boolean
    genreId?: boolean
    bookId?: boolean
    userId?: boolean
    book?: boolean | Activity$bookArgs<ExtArgs>
    genre?: boolean | Activity$genreArgs<ExtArgs>
    user?: boolean | Activity$userArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    createdAt?: boolean
    type?: boolean
    importance?: boolean
    genreId?: boolean
    bookId?: boolean
    userId?: boolean
  }


  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | Activity$bookArgs<ExtArgs>
    genre?: boolean | Activity$genreArgs<ExtArgs>
    user?: boolean | Activity$userArgs<ExtArgs>
  }


  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      book: Prisma.$BookPayload<ExtArgs> | null
      genre: Prisma.$GenrePayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      type: $Enums.Activities
      importance: number
      genreId: number | null
      bookId: number | null
      userId: number | null
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }


  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ActivityFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>
    ): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Activity that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ActivityFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>
    ): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ActivityFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
    **/
    create<T extends ActivityCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>
    ): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Activities.
     *     @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     *     @example
     *     // Create many Activities
     *     const activity = await prisma.activity.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ActivityCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
    **/
    delete<T extends ActivityDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>
    ): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ActivityUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>
    ): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ActivityDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ActivityUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
    **/
    upsert<T extends ActivityUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>
    ): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    book<T extends Activity$bookArgs<ExtArgs> = {}>(args?: Subset<T, Activity$bookArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    genre<T extends Activity$genreArgs<ExtArgs> = {}>(args?: Subset<T, Activity$genreArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    user<T extends Activity$userArgs<ExtArgs> = {}>(args?: Subset<T, Activity$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Activity model
   */ 
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'Int'>
    readonly createdAt: FieldRef<"Activity", 'DateTime'>
    readonly type: FieldRef<"Activity", 'Activities'>
    readonly importance: FieldRef<"Activity", 'Int'>
    readonly genreId: FieldRef<"Activity", 'Int'>
    readonly bookId: FieldRef<"Activity", 'Int'>
    readonly userId: FieldRef<"Activity", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
  }

  /**
   * Activity.book
   */
  export type Activity$bookArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
  }

  /**
   * Activity.genre
   */
  export type Activity$genreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    where?: GenreWhereInput
  }

  /**
   * Activity.user
   */
  export type Activity$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    id: number | null
    rating: number | null
    bookId: number | null
    userId: number | null
  }

  export type ReviewSumAggregateOutputType = {
    id: number | null
    rating: number | null
    bookId: number | null
    userId: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    rating: number | null
    text: string | null
    bookId: number | null
    userId: number | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    rating: number | null
    text: string | null
    bookId: number | null
    userId: number | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    rating: number
    tags: number
    text: number
    bookId: number
    userId: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    id?: true
    rating?: true
    bookId?: true
    userId?: true
  }

  export type ReviewSumAggregateInputType = {
    id?: true
    rating?: true
    bookId?: true
    userId?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    rating?: true
    text?: true
    bookId?: true
    userId?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    rating?: true
    text?: true
    bookId?: true
    userId?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    rating?: true
    tags?: true
    text?: true
    bookId?: true
    userId?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    rating: number
    tags: string[]
    text: string | null
    bookId: number
    userId: number
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rating?: boolean
    tags?: boolean
    text?: boolean
    bookId?: boolean
    userId?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rating?: boolean
    tags?: boolean
    text?: boolean
    bookId?: boolean
    userId?: boolean
  }


  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      book: Prisma.$BookPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      rating: number
      tags: string[]
      text: string | null
      bookId: number
      userId: number
    }, ExtArgs["result"]["review"]>
    composites: {}
  }


  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReviewFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Review that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReviewFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ReviewFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
    **/
    create<T extends ReviewCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Reviews.
     *     @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     *     @example
     *     // Create many Reviews
     *     const review = await prisma.review.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ReviewCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
    **/
    delete<T extends ReviewDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReviewUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReviewDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReviewUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
    **/
    upsert<T extends ReviewUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Review model
   */ 
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'Int'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
    readonly updatedAt: FieldRef<"Review", 'DateTime'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly tags: FieldRef<"Review", 'String[]'>
    readonly text: FieldRef<"Review", 'String'>
    readonly bookId: FieldRef<"Review", 'Int'>
    readonly userId: FieldRef<"Review", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model Book
   */

  export type AggregateBook = {
    _count: BookCountAggregateOutputType | null
    _avg: BookAvgAggregateOutputType | null
    _sum: BookSumAggregateOutputType | null
    _min: BookMinAggregateOutputType | null
    _max: BookMaxAggregateOutputType | null
  }

  export type BookAvgAggregateOutputType = {
    id: number | null
    readingTime: number | null
    chapters: number | null
    rating: number | null
    mainGenreId: number | null
  }

  export type BookSumAggregateOutputType = {
    id: number | null
    readingTime: number | null
    chapters: number | null
    rating: number | null
    mainGenreId: number | null
  }

  export type BookMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    slug: string | null
    author: string | null
    description: string | null
    recommendable: boolean | null
    picture: string | null
    ebook: string | null
    readingTime: number | null
    chapters: number | null
    rating: number | null
    isPublic: boolean | null
    mainGenreId: number | null
  }

  export type BookMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    slug: string | null
    author: string | null
    description: string | null
    recommendable: boolean | null
    picture: string | null
    ebook: string | null
    readingTime: number | null
    chapters: number | null
    rating: number | null
    isPublic: boolean | null
    mainGenreId: number | null
  }

  export type BookCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    title: number
    slug: number
    author: number
    description: number
    recommendable: number
    picture: number
    ebook: number
    readingTime: number
    chapters: number
    rating: number
    isPublic: number
    mainGenreId: number
    _all: number
  }


  export type BookAvgAggregateInputType = {
    id?: true
    readingTime?: true
    chapters?: true
    rating?: true
    mainGenreId?: true
  }

  export type BookSumAggregateInputType = {
    id?: true
    readingTime?: true
    chapters?: true
    rating?: true
    mainGenreId?: true
  }

  export type BookMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    slug?: true
    author?: true
    description?: true
    recommendable?: true
    picture?: true
    ebook?: true
    readingTime?: true
    chapters?: true
    rating?: true
    isPublic?: true
    mainGenreId?: true
  }

  export type BookMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    slug?: true
    author?: true
    description?: true
    recommendable?: true
    picture?: true
    ebook?: true
    readingTime?: true
    chapters?: true
    rating?: true
    isPublic?: true
    mainGenreId?: true
  }

  export type BookCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    slug?: true
    author?: true
    description?: true
    recommendable?: true
    picture?: true
    ebook?: true
    readingTime?: true
    chapters?: true
    rating?: true
    isPublic?: true
    mainGenreId?: true
    _all?: true
  }

  export type BookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Book to aggregate.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Books
    **/
    _count?: true | BookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookMaxAggregateInputType
  }

  export type GetBookAggregateType<T extends BookAggregateArgs> = {
        [P in keyof T & keyof AggregateBook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBook[P]>
      : GetScalarType<T[P], AggregateBook[P]>
  }




  export type BookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
    orderBy?: BookOrderByWithAggregationInput | BookOrderByWithAggregationInput[]
    by: BookScalarFieldEnum[] | BookScalarFieldEnum
    having?: BookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookCountAggregateInputType | true
    _avg?: BookAvgAggregateInputType
    _sum?: BookSumAggregateInputType
    _min?: BookMinAggregateInputType
    _max?: BookMaxAggregateInputType
  }

  export type BookGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    title: string
    slug: string
    author: string
    description: string
    recommendable: boolean
    picture: string
    ebook: string
    readingTime: number
    chapters: number
    rating: number
    isPublic: boolean
    mainGenreId: number
    _count: BookCountAggregateOutputType | null
    _avg: BookAvgAggregateOutputType | null
    _sum: BookSumAggregateOutputType | null
    _min: BookMinAggregateOutputType | null
    _max: BookMaxAggregateOutputType | null
  }

  type GetBookGroupByPayload<T extends BookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookGroupByOutputType[P]>
            : GetScalarType<T[P], BookGroupByOutputType[P]>
        }
      >
    >


  export type BookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    slug?: boolean
    author?: boolean
    description?: boolean
    recommendable?: boolean
    picture?: boolean
    ebook?: boolean
    readingTime?: boolean
    chapters?: boolean
    rating?: boolean
    isPublic?: boolean
    mainGenreId?: boolean
    mainGenre?: boolean | GenreDefaultArgs<ExtArgs>
    genres?: boolean | Book$genresArgs<ExtArgs>
    review?: boolean | Book$reviewArgs<ExtArgs>
    finishedBy?: boolean | Book$finishedByArgs<ExtArgs>
    savedBy?: boolean | Book$savedByArgs<ExtArgs>
    readingBy?: boolean | Book$readingByArgs<ExtArgs>
    activities?: boolean | Book$activitiesArgs<ExtArgs>
    ReadingHistory?: boolean | Book$ReadingHistoryArgs<ExtArgs>
    similarBooks?: boolean | Book$similarBooksArgs<ExtArgs>
    similarBy?: boolean | Book$similarByArgs<ExtArgs>
    _count?: boolean | BookCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["book"]>

  export type BookSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    slug?: boolean
    author?: boolean
    description?: boolean
    recommendable?: boolean
    picture?: boolean
    ebook?: boolean
    readingTime?: boolean
    chapters?: boolean
    rating?: boolean
    isPublic?: boolean
    mainGenreId?: boolean
  }


  export type BookInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mainGenre?: boolean | GenreDefaultArgs<ExtArgs>
    genres?: boolean | Book$genresArgs<ExtArgs>
    review?: boolean | Book$reviewArgs<ExtArgs>
    finishedBy?: boolean | Book$finishedByArgs<ExtArgs>
    savedBy?: boolean | Book$savedByArgs<ExtArgs>
    readingBy?: boolean | Book$readingByArgs<ExtArgs>
    activities?: boolean | Book$activitiesArgs<ExtArgs>
    ReadingHistory?: boolean | Book$ReadingHistoryArgs<ExtArgs>
    similarBooks?: boolean | Book$similarBooksArgs<ExtArgs>
    similarBy?: boolean | Book$similarByArgs<ExtArgs>
    _count?: boolean | BookCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $BookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Book"
    objects: {
      mainGenre: Prisma.$GenrePayload<ExtArgs>
      genres: Prisma.$GenrePayload<ExtArgs>[]
      review: Prisma.$ReviewPayload<ExtArgs>[]
      finishedBy: Prisma.$UserPayload<ExtArgs>[]
      savedBy: Prisma.$UserPayload<ExtArgs>[]
      readingBy: Prisma.$UserPayload<ExtArgs>[]
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      ReadingHistory: Prisma.$ReadingHistoryPayload<ExtArgs>[]
      similarBooks: Prisma.$BookPayload<ExtArgs>[]
      similarBy: Prisma.$BookPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      title: string
      slug: string
      author: string
      description: string
      recommendable: boolean
      picture: string
      ebook: string
      readingTime: number
      chapters: number
      rating: number
      isPublic: boolean
      mainGenreId: number
    }, ExtArgs["result"]["book"]>
    composites: {}
  }


  type BookGetPayload<S extends boolean | null | undefined | BookDefaultArgs> = $Result.GetResult<Prisma.$BookPayload, S>

  type BookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BookFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BookCountAggregateInputType | true
    }

  export interface BookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Book'], meta: { name: 'Book' } }
    /**
     * Find zero or one Book that matches the filter.
     * @param {BookFindUniqueArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BookFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, BookFindUniqueArgs<ExtArgs>>
    ): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Book that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {BookFindUniqueOrThrowArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BookFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BookFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Book that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindFirstArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BookFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, BookFindFirstArgs<ExtArgs>>
    ): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Book that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindFirstOrThrowArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BookFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BookFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Books
     * const books = await prisma.book.findMany()
     * 
     * // Get first 10 Books
     * const books = await prisma.book.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookWithIdOnly = await prisma.book.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BookFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BookFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Book.
     * @param {BookCreateArgs} args - Arguments to create a Book.
     * @example
     * // Create one Book
     * const Book = await prisma.book.create({
     *   data: {
     *     // ... data to create a Book
     *   }
     * })
     * 
    **/
    create<T extends BookCreateArgs<ExtArgs>>(
      args: SelectSubset<T, BookCreateArgs<ExtArgs>>
    ): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Books.
     *     @param {BookCreateManyArgs} args - Arguments to create many Books.
     *     @example
     *     // Create many Books
     *     const book = await prisma.book.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BookCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BookCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Book.
     * @param {BookDeleteArgs} args - Arguments to delete one Book.
     * @example
     * // Delete one Book
     * const Book = await prisma.book.delete({
     *   where: {
     *     // ... filter to delete one Book
     *   }
     * })
     * 
    **/
    delete<T extends BookDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, BookDeleteArgs<ExtArgs>>
    ): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Book.
     * @param {BookUpdateArgs} args - Arguments to update one Book.
     * @example
     * // Update one Book
     * const book = await prisma.book.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BookUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, BookUpdateArgs<ExtArgs>>
    ): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Books.
     * @param {BookDeleteManyArgs} args - Arguments to filter Books to delete.
     * @example
     * // Delete a few Books
     * const { count } = await prisma.book.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BookDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BookDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Books
     * const book = await prisma.book.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BookUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, BookUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Book.
     * @param {BookUpsertArgs} args - Arguments to update or create a Book.
     * @example
     * // Update or create a Book
     * const book = await prisma.book.upsert({
     *   create: {
     *     // ... data to create a Book
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Book we want to update
     *   }
     * })
    **/
    upsert<T extends BookUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, BookUpsertArgs<ExtArgs>>
    ): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookCountArgs} args - Arguments to filter Books to count.
     * @example
     * // Count the number of Books
     * const count = await prisma.book.count({
     *   where: {
     *     // ... the filter for the Books we want to count
     *   }
     * })
    **/
    count<T extends BookCountArgs>(
      args?: Subset<T, BookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Book.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookAggregateArgs>(args: Subset<T, BookAggregateArgs>): Prisma.PrismaPromise<GetBookAggregateType<T>>

    /**
     * Group by Book.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookGroupByArgs['orderBy'] }
        : { orderBy?: BookGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Book model
   */
  readonly fields: BookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Book.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    mainGenre<T extends GenreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GenreDefaultArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    genres<T extends Book$genresArgs<ExtArgs> = {}>(args?: Subset<T, Book$genresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'findMany'> | Null>;

    review<T extends Book$reviewArgs<ExtArgs> = {}>(args?: Subset<T, Book$reviewArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findMany'> | Null>;

    finishedBy<T extends Book$finishedByArgs<ExtArgs> = {}>(args?: Subset<T, Book$finishedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'> | Null>;

    savedBy<T extends Book$savedByArgs<ExtArgs> = {}>(args?: Subset<T, Book$savedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'> | Null>;

    readingBy<T extends Book$readingByArgs<ExtArgs> = {}>(args?: Subset<T, Book$readingByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'> | Null>;

    activities<T extends Book$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Book$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, 'findMany'> | Null>;

    ReadingHistory<T extends Book$ReadingHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Book$ReadingHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingHistoryPayload<ExtArgs>, T, 'findMany'> | Null>;

    similarBooks<T extends Book$similarBooksArgs<ExtArgs> = {}>(args?: Subset<T, Book$similarBooksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findMany'> | Null>;

    similarBy<T extends Book$similarByArgs<ExtArgs> = {}>(args?: Subset<T, Book$similarByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Book model
   */ 
  interface BookFieldRefs {
    readonly id: FieldRef<"Book", 'Int'>
    readonly createdAt: FieldRef<"Book", 'DateTime'>
    readonly updatedAt: FieldRef<"Book", 'DateTime'>
    readonly title: FieldRef<"Book", 'String'>
    readonly slug: FieldRef<"Book", 'String'>
    readonly author: FieldRef<"Book", 'String'>
    readonly description: FieldRef<"Book", 'String'>
    readonly recommendable: FieldRef<"Book", 'Boolean'>
    readonly picture: FieldRef<"Book", 'String'>
    readonly ebook: FieldRef<"Book", 'String'>
    readonly readingTime: FieldRef<"Book", 'Int'>
    readonly chapters: FieldRef<"Book", 'Int'>
    readonly rating: FieldRef<"Book", 'Float'>
    readonly isPublic: FieldRef<"Book", 'Boolean'>
    readonly mainGenreId: FieldRef<"Book", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Book findUnique
   */
  export type BookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book findUniqueOrThrow
   */
  export type BookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book findFirst
   */
  export type BookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book findFirstOrThrow
   */
  export type BookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book findMany
   */
  export type BookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Books to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book create
   */
  export type BookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The data needed to create a Book.
     */
    data: XOR<BookCreateInput, BookUncheckedCreateInput>
  }

  /**
   * Book createMany
   */
  export type BookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Books.
     */
    data: BookCreateManyInput | BookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Book update
   */
  export type BookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The data needed to update a Book.
     */
    data: XOR<BookUpdateInput, BookUncheckedUpdateInput>
    /**
     * Choose, which Book to update.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book updateMany
   */
  export type BookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Books.
     */
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyInput>
    /**
     * Filter which Books to update
     */
    where?: BookWhereInput
  }

  /**
   * Book upsert
   */
  export type BookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The filter to search for the Book to update in case it exists.
     */
    where: BookWhereUniqueInput
    /**
     * In case the Book found by the `where` argument doesn't exist, create a new Book with this data.
     */
    create: XOR<BookCreateInput, BookUncheckedCreateInput>
    /**
     * In case the Book was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookUpdateInput, BookUncheckedUpdateInput>
  }

  /**
   * Book delete
   */
  export type BookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter which Book to delete.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book deleteMany
   */
  export type BookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Books to delete
     */
    where?: BookWhereInput
  }

  /**
   * Book.genres
   */
  export type Book$genresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    where?: GenreWhereInput
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    cursor?: GenreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Book.review
   */
  export type Book$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Book.finishedBy
   */
  export type Book$finishedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Book.savedBy
   */
  export type Book$savedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Book.readingBy
   */
  export type Book$readingByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Book.activities
   */
  export type Book$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Book.ReadingHistory
   */
  export type Book$ReadingHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingHistory
     */
    select?: ReadingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingHistoryInclude<ExtArgs> | null
    where?: ReadingHistoryWhereInput
    orderBy?: ReadingHistoryOrderByWithRelationInput | ReadingHistoryOrderByWithRelationInput[]
    cursor?: ReadingHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadingHistoryScalarFieldEnum | ReadingHistoryScalarFieldEnum[]
  }

  /**
   * Book.similarBooks
   */
  export type Book$similarBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    cursor?: BookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book.similarBy
   */
  export type Book$similarByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    cursor?: BookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book without action
   */
  export type BookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
  }


  /**
   * Model BookTemplate
   */

  export type AggregateBookTemplate = {
    _count: BookTemplateCountAggregateOutputType | null
    _avg: BookTemplateAvgAggregateOutputType | null
    _sum: BookTemplateSumAggregateOutputType | null
    _min: BookTemplateMinAggregateOutputType | null
    _max: BookTemplateMaxAggregateOutputType | null
  }

  export type BookTemplateAvgAggregateOutputType = {
    id: number | null
    rating: number | null
  }

  export type BookTemplateSumAggregateOutputType = {
    id: number | null
    rating: number | null
  }

  export type BookTemplateMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    slug: string | null
    author: string | null
    description: string | null
    picture: string | null
    rating: number | null
  }

  export type BookTemplateMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    slug: string | null
    author: string | null
    description: string | null
    picture: string | null
    rating: number | null
  }

  export type BookTemplateCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    title: number
    slug: number
    author: number
    description: number
    picture: number
    rating: number
    _all: number
  }


  export type BookTemplateAvgAggregateInputType = {
    id?: true
    rating?: true
  }

  export type BookTemplateSumAggregateInputType = {
    id?: true
    rating?: true
  }

  export type BookTemplateMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    slug?: true
    author?: true
    description?: true
    picture?: true
    rating?: true
  }

  export type BookTemplateMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    slug?: true
    author?: true
    description?: true
    picture?: true
    rating?: true
  }

  export type BookTemplateCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    slug?: true
    author?: true
    description?: true
    picture?: true
    rating?: true
    _all?: true
  }

  export type BookTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookTemplate to aggregate.
     */
    where?: BookTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookTemplates to fetch.
     */
    orderBy?: BookTemplateOrderByWithRelationInput | BookTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookTemplates
    **/
    _count?: true | BookTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookTemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookTemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookTemplateMaxAggregateInputType
  }

  export type GetBookTemplateAggregateType<T extends BookTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateBookTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookTemplate[P]>
      : GetScalarType<T[P], AggregateBookTemplate[P]>
  }




  export type BookTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookTemplateWhereInput
    orderBy?: BookTemplateOrderByWithAggregationInput | BookTemplateOrderByWithAggregationInput[]
    by: BookTemplateScalarFieldEnum[] | BookTemplateScalarFieldEnum
    having?: BookTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookTemplateCountAggregateInputType | true
    _avg?: BookTemplateAvgAggregateInputType
    _sum?: BookTemplateSumAggregateInputType
    _min?: BookTemplateMinAggregateInputType
    _max?: BookTemplateMaxAggregateInputType
  }

  export type BookTemplateGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    title: string
    slug: string
    author: string
    description: string
    picture: string
    rating: number
    _count: BookTemplateCountAggregateOutputType | null
    _avg: BookTemplateAvgAggregateOutputType | null
    _sum: BookTemplateSumAggregateOutputType | null
    _min: BookTemplateMinAggregateOutputType | null
    _max: BookTemplateMaxAggregateOutputType | null
  }

  type GetBookTemplateGroupByPayload<T extends BookTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], BookTemplateGroupByOutputType[P]>
        }
      >
    >


  export type BookTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    slug?: boolean
    author?: boolean
    description?: boolean
    picture?: boolean
    rating?: boolean
    genres?: boolean | BookTemplate$genresArgs<ExtArgs>
    _count?: boolean | BookTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookTemplate"]>

  export type BookTemplateSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    slug?: boolean
    author?: boolean
    description?: boolean
    picture?: boolean
    rating?: boolean
  }


  export type BookTemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    genres?: boolean | BookTemplate$genresArgs<ExtArgs>
    _count?: boolean | BookTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $BookTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookTemplate"
    objects: {
      genres: Prisma.$GenrePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      title: string
      slug: string
      author: string
      description: string
      picture: string
      rating: number
    }, ExtArgs["result"]["bookTemplate"]>
    composites: {}
  }


  type BookTemplateGetPayload<S extends boolean | null | undefined | BookTemplateDefaultArgs> = $Result.GetResult<Prisma.$BookTemplatePayload, S>

  type BookTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BookTemplateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BookTemplateCountAggregateInputType | true
    }

  export interface BookTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookTemplate'], meta: { name: 'BookTemplate' } }
    /**
     * Find zero or one BookTemplate that matches the filter.
     * @param {BookTemplateFindUniqueArgs} args - Arguments to find a BookTemplate
     * @example
     * // Get one BookTemplate
     * const bookTemplate = await prisma.bookTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BookTemplateFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, BookTemplateFindUniqueArgs<ExtArgs>>
    ): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one BookTemplate that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {BookTemplateFindUniqueOrThrowArgs} args - Arguments to find a BookTemplate
     * @example
     * // Get one BookTemplate
     * const bookTemplate = await prisma.bookTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BookTemplateFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BookTemplateFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first BookTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateFindFirstArgs} args - Arguments to find a BookTemplate
     * @example
     * // Get one BookTemplate
     * const bookTemplate = await prisma.bookTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BookTemplateFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, BookTemplateFindFirstArgs<ExtArgs>>
    ): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first BookTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateFindFirstOrThrowArgs} args - Arguments to find a BookTemplate
     * @example
     * // Get one BookTemplate
     * const bookTemplate = await prisma.bookTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BookTemplateFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BookTemplateFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more BookTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookTemplates
     * const bookTemplates = await prisma.bookTemplate.findMany()
     * 
     * // Get first 10 BookTemplates
     * const bookTemplates = await prisma.bookTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookTemplateWithIdOnly = await prisma.bookTemplate.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BookTemplateFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BookTemplateFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a BookTemplate.
     * @param {BookTemplateCreateArgs} args - Arguments to create a BookTemplate.
     * @example
     * // Create one BookTemplate
     * const BookTemplate = await prisma.bookTemplate.create({
     *   data: {
     *     // ... data to create a BookTemplate
     *   }
     * })
     * 
    **/
    create<T extends BookTemplateCreateArgs<ExtArgs>>(
      args: SelectSubset<T, BookTemplateCreateArgs<ExtArgs>>
    ): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many BookTemplates.
     *     @param {BookTemplateCreateManyArgs} args - Arguments to create many BookTemplates.
     *     @example
     *     // Create many BookTemplates
     *     const bookTemplate = await prisma.bookTemplate.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BookTemplateCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BookTemplateCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BookTemplate.
     * @param {BookTemplateDeleteArgs} args - Arguments to delete one BookTemplate.
     * @example
     * // Delete one BookTemplate
     * const BookTemplate = await prisma.bookTemplate.delete({
     *   where: {
     *     // ... filter to delete one BookTemplate
     *   }
     * })
     * 
    **/
    delete<T extends BookTemplateDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, BookTemplateDeleteArgs<ExtArgs>>
    ): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one BookTemplate.
     * @param {BookTemplateUpdateArgs} args - Arguments to update one BookTemplate.
     * @example
     * // Update one BookTemplate
     * const bookTemplate = await prisma.bookTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BookTemplateUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, BookTemplateUpdateArgs<ExtArgs>>
    ): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more BookTemplates.
     * @param {BookTemplateDeleteManyArgs} args - Arguments to filter BookTemplates to delete.
     * @example
     * // Delete a few BookTemplates
     * const { count } = await prisma.bookTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BookTemplateDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BookTemplateDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookTemplates
     * const bookTemplate = await prisma.bookTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BookTemplateUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, BookTemplateUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BookTemplate.
     * @param {BookTemplateUpsertArgs} args - Arguments to update or create a BookTemplate.
     * @example
     * // Update or create a BookTemplate
     * const bookTemplate = await prisma.bookTemplate.upsert({
     *   create: {
     *     // ... data to create a BookTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookTemplate we want to update
     *   }
     * })
    **/
    upsert<T extends BookTemplateUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, BookTemplateUpsertArgs<ExtArgs>>
    ): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of BookTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateCountArgs} args - Arguments to filter BookTemplates to count.
     * @example
     * // Count the number of BookTemplates
     * const count = await prisma.bookTemplate.count({
     *   where: {
     *     // ... the filter for the BookTemplates we want to count
     *   }
     * })
    **/
    count<T extends BookTemplateCountArgs>(
      args?: Subset<T, BookTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookTemplateAggregateArgs>(args: Subset<T, BookTemplateAggregateArgs>): Prisma.PrismaPromise<GetBookTemplateAggregateType<T>>

    /**
     * Group by BookTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookTemplateGroupByArgs['orderBy'] }
        : { orderBy?: BookTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookTemplate model
   */
  readonly fields: BookTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    genres<T extends BookTemplate$genresArgs<ExtArgs> = {}>(args?: Subset<T, BookTemplate$genresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the BookTemplate model
   */ 
  interface BookTemplateFieldRefs {
    readonly id: FieldRef<"BookTemplate", 'Int'>
    readonly createdAt: FieldRef<"BookTemplate", 'DateTime'>
    readonly updatedAt: FieldRef<"BookTemplate", 'DateTime'>
    readonly title: FieldRef<"BookTemplate", 'String'>
    readonly slug: FieldRef<"BookTemplate", 'String'>
    readonly author: FieldRef<"BookTemplate", 'String'>
    readonly description: FieldRef<"BookTemplate", 'String'>
    readonly picture: FieldRef<"BookTemplate", 'String'>
    readonly rating: FieldRef<"BookTemplate", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * BookTemplate findUnique
   */
  export type BookTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BookTemplate to fetch.
     */
    where: BookTemplateWhereUniqueInput
  }

  /**
   * BookTemplate findUniqueOrThrow
   */
  export type BookTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BookTemplate to fetch.
     */
    where: BookTemplateWhereUniqueInput
  }

  /**
   * BookTemplate findFirst
   */
  export type BookTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BookTemplate to fetch.
     */
    where?: BookTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookTemplates to fetch.
     */
    orderBy?: BookTemplateOrderByWithRelationInput | BookTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookTemplates.
     */
    cursor?: BookTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookTemplates.
     */
    distinct?: BookTemplateScalarFieldEnum | BookTemplateScalarFieldEnum[]
  }

  /**
   * BookTemplate findFirstOrThrow
   */
  export type BookTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BookTemplate to fetch.
     */
    where?: BookTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookTemplates to fetch.
     */
    orderBy?: BookTemplateOrderByWithRelationInput | BookTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookTemplates.
     */
    cursor?: BookTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookTemplates.
     */
    distinct?: BookTemplateScalarFieldEnum | BookTemplateScalarFieldEnum[]
  }

  /**
   * BookTemplate findMany
   */
  export type BookTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BookTemplates to fetch.
     */
    where?: BookTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookTemplates to fetch.
     */
    orderBy?: BookTemplateOrderByWithRelationInput | BookTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookTemplates.
     */
    cursor?: BookTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookTemplates.
     */
    skip?: number
    distinct?: BookTemplateScalarFieldEnum | BookTemplateScalarFieldEnum[]
  }

  /**
   * BookTemplate create
   */
  export type BookTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a BookTemplate.
     */
    data: XOR<BookTemplateCreateInput, BookTemplateUncheckedCreateInput>
  }

  /**
   * BookTemplate createMany
   */
  export type BookTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookTemplates.
     */
    data: BookTemplateCreateManyInput | BookTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookTemplate update
   */
  export type BookTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a BookTemplate.
     */
    data: XOR<BookTemplateUpdateInput, BookTemplateUncheckedUpdateInput>
    /**
     * Choose, which BookTemplate to update.
     */
    where: BookTemplateWhereUniqueInput
  }

  /**
   * BookTemplate updateMany
   */
  export type BookTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookTemplates.
     */
    data: XOR<BookTemplateUpdateManyMutationInput, BookTemplateUncheckedUpdateManyInput>
    /**
     * Filter which BookTemplates to update
     */
    where?: BookTemplateWhereInput
  }

  /**
   * BookTemplate upsert
   */
  export type BookTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the BookTemplate to update in case it exists.
     */
    where: BookTemplateWhereUniqueInput
    /**
     * In case the BookTemplate found by the `where` argument doesn't exist, create a new BookTemplate with this data.
     */
    create: XOR<BookTemplateCreateInput, BookTemplateUncheckedCreateInput>
    /**
     * In case the BookTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookTemplateUpdateInput, BookTemplateUncheckedUpdateInput>
  }

  /**
   * BookTemplate delete
   */
  export type BookTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * Filter which BookTemplate to delete.
     */
    where: BookTemplateWhereUniqueInput
  }

  /**
   * BookTemplate deleteMany
   */
  export type BookTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookTemplates to delete
     */
    where?: BookTemplateWhereInput
  }

  /**
   * BookTemplate.genres
   */
  export type BookTemplate$genresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    where?: GenreWhereInput
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    cursor?: GenreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * BookTemplate without action
   */
  export type BookTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    email: string | null
    socialId: string | null
    password: string | null
    picture: string | null
    fullName: string | null
    location: string | null
    role: $Enums.Role | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    email: string | null
    socialId: string | null
    password: string | null
    picture: string | null
    fullName: string | null
    location: string | null
    role: $Enums.Role | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    email: number
    socialId: number
    password: number
    picture: number
    fullName: number
    location: number
    role: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    email?: true
    socialId?: true
    password?: true
    picture?: true
    fullName?: true
    location?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    email?: true
    socialId?: true
    password?: true
    picture?: true
    fullName?: true
    location?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    email?: true
    socialId?: true
    password?: true
    picture?: true
    fullName?: true
    location?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    email: string
    socialId: string | null
    password: string | null
    picture: string
    fullName: string
    location: string
    role: $Enums.Role
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean
    socialId?: boolean
    password?: boolean
    picture?: boolean
    fullName?: boolean
    location?: boolean
    role?: boolean
    selectedGenres?: boolean | User$selectedGenresArgs<ExtArgs>
    review?: boolean | User$reviewArgs<ExtArgs>
    savedBooks?: boolean | User$savedBooksArgs<ExtArgs>
    finishedBooks?: boolean | User$finishedBooksArgs<ExtArgs>
    readingBooks?: boolean | User$readingBooksArgs<ExtArgs>
    activity?: boolean | User$activityArgs<ExtArgs>
    ReadingHistory?: boolean | User$ReadingHistoryArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean
    socialId?: boolean
    password?: boolean
    picture?: boolean
    fullName?: boolean
    location?: boolean
    role?: boolean
  }


  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    selectedGenres?: boolean | User$selectedGenresArgs<ExtArgs>
    review?: boolean | User$reviewArgs<ExtArgs>
    savedBooks?: boolean | User$savedBooksArgs<ExtArgs>
    finishedBooks?: boolean | User$finishedBooksArgs<ExtArgs>
    readingBooks?: boolean | User$readingBooksArgs<ExtArgs>
    activity?: boolean | User$activityArgs<ExtArgs>
    ReadingHistory?: boolean | User$ReadingHistoryArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      selectedGenres: Prisma.$GenrePayload<ExtArgs>[]
      review: Prisma.$ReviewPayload<ExtArgs>[]
      savedBooks: Prisma.$BookPayload<ExtArgs>[]
      finishedBooks: Prisma.$BookPayload<ExtArgs>[]
      readingBooks: Prisma.$BookPayload<ExtArgs>[]
      activity: Prisma.$ActivityPayload<ExtArgs>[]
      ReadingHistory: Prisma.$ReadingHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      email: string
      socialId: string | null
      password: string | null
      picture: string
      fullName: string
      location: string
      role: $Enums.Role
    }, ExtArgs["result"]["user"]>
    composites: {}
  }


  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    selectedGenres<T extends User$selectedGenresArgs<ExtArgs> = {}>(args?: Subset<T, User$selectedGenresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, 'findMany'> | Null>;

    review<T extends User$reviewArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findMany'> | Null>;

    savedBooks<T extends User$savedBooksArgs<ExtArgs> = {}>(args?: Subset<T, User$savedBooksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findMany'> | Null>;

    finishedBooks<T extends User$finishedBooksArgs<ExtArgs> = {}>(args?: Subset<T, User$finishedBooksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findMany'> | Null>;

    readingBooks<T extends User$readingBooksArgs<ExtArgs> = {}>(args?: Subset<T, User$readingBooksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findMany'> | Null>;

    activity<T extends User$activityArgs<ExtArgs> = {}>(args?: Subset<T, User$activityArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, 'findMany'> | Null>;

    ReadingHistory<T extends User$ReadingHistoryArgs<ExtArgs> = {}>(args?: Subset<T, User$ReadingHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingHistoryPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly email: FieldRef<"User", 'String'>
    readonly socialId: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly picture: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly location: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.selectedGenres
   */
  export type User$selectedGenresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    where?: GenreWhereInput
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    cursor?: GenreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * User.review
   */
  export type User$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.savedBooks
   */
  export type User$savedBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    cursor?: BookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * User.finishedBooks
   */
  export type User$finishedBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    cursor?: BookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * User.readingBooks
   */
  export type User$readingBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    cursor?: BookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * User.activity
   */
  export type User$activityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * User.ReadingHistory
   */
  export type User$ReadingHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingHistory
     */
    select?: ReadingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingHistoryInclude<ExtArgs> | null
    where?: ReadingHistoryWhereInput
    orderBy?: ReadingHistoryOrderByWithRelationInput | ReadingHistoryOrderByWithRelationInput[]
    cursor?: ReadingHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadingHistoryScalarFieldEnum | ReadingHistoryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ReadingHistory
   */

  export type AggregateReadingHistory = {
    _count: ReadingHistoryCountAggregateOutputType | null
    _avg: ReadingHistoryAvgAggregateOutputType | null
    _sum: ReadingHistorySumAggregateOutputType | null
    _min: ReadingHistoryMinAggregateOutputType | null
    _max: ReadingHistoryMaxAggregateOutputType | null
  }

  export type ReadingHistoryAvgAggregateOutputType = {
    id: number | null
    readingTimeMs: number | null
    scrollPosition: number | null
    bookId: number | null
    userId: number | null
  }

  export type ReadingHistorySumAggregateOutputType = {
    id: number | null
    readingTimeMs: number | null
    scrollPosition: number | null
    bookId: number | null
    userId: number | null
  }

  export type ReadingHistoryMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    startDate: Date | null
    endDate: Date | null
    readingTimeMs: number | null
    scrollPosition: number | null
    bookId: number | null
    userId: number | null
  }

  export type ReadingHistoryMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    startDate: Date | null
    endDate: Date | null
    readingTimeMs: number | null
    scrollPosition: number | null
    bookId: number | null
    userId: number | null
  }

  export type ReadingHistoryCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    startDate: number
    endDate: number
    readingTimeMs: number
    scrollPosition: number
    bookId: number
    userId: number
    _all: number
  }


  export type ReadingHistoryAvgAggregateInputType = {
    id?: true
    readingTimeMs?: true
    scrollPosition?: true
    bookId?: true
    userId?: true
  }

  export type ReadingHistorySumAggregateInputType = {
    id?: true
    readingTimeMs?: true
    scrollPosition?: true
    bookId?: true
    userId?: true
  }

  export type ReadingHistoryMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    startDate?: true
    endDate?: true
    readingTimeMs?: true
    scrollPosition?: true
    bookId?: true
    userId?: true
  }

  export type ReadingHistoryMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    startDate?: true
    endDate?: true
    readingTimeMs?: true
    scrollPosition?: true
    bookId?: true
    userId?: true
  }

  export type ReadingHistoryCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    startDate?: true
    endDate?: true
    readingTimeMs?: true
    scrollPosition?: true
    bookId?: true
    userId?: true
    _all?: true
  }

  export type ReadingHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadingHistory to aggregate.
     */
    where?: ReadingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingHistories to fetch.
     */
    orderBy?: ReadingHistoryOrderByWithRelationInput | ReadingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReadingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReadingHistories
    **/
    _count?: true | ReadingHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReadingHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReadingHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReadingHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReadingHistoryMaxAggregateInputType
  }

  export type GetReadingHistoryAggregateType<T extends ReadingHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateReadingHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReadingHistory[P]>
      : GetScalarType<T[P], AggregateReadingHistory[P]>
  }




  export type ReadingHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingHistoryWhereInput
    orderBy?: ReadingHistoryOrderByWithAggregationInput | ReadingHistoryOrderByWithAggregationInput[]
    by: ReadingHistoryScalarFieldEnum[] | ReadingHistoryScalarFieldEnum
    having?: ReadingHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReadingHistoryCountAggregateInputType | true
    _avg?: ReadingHistoryAvgAggregateInputType
    _sum?: ReadingHistorySumAggregateInputType
    _min?: ReadingHistoryMinAggregateInputType
    _max?: ReadingHistoryMaxAggregateInputType
  }

  export type ReadingHistoryGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    startDate: Date
    endDate: Date
    readingTimeMs: number
    scrollPosition: number
    bookId: number
    userId: number
    _count: ReadingHistoryCountAggregateOutputType | null
    _avg: ReadingHistoryAvgAggregateOutputType | null
    _sum: ReadingHistorySumAggregateOutputType | null
    _min: ReadingHistoryMinAggregateOutputType | null
    _max: ReadingHistoryMaxAggregateOutputType | null
  }

  type GetReadingHistoryGroupByPayload<T extends ReadingHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReadingHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReadingHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReadingHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], ReadingHistoryGroupByOutputType[P]>
        }
      >
    >


  export type ReadingHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startDate?: boolean
    endDate?: boolean
    readingTimeMs?: boolean
    scrollPosition?: boolean
    bookId?: boolean
    userId?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["readingHistory"]>

  export type ReadingHistorySelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startDate?: boolean
    endDate?: boolean
    readingTimeMs?: boolean
    scrollPosition?: boolean
    bookId?: boolean
    userId?: boolean
  }


  export type ReadingHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $ReadingHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReadingHistory"
    objects: {
      book: Prisma.$BookPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      startDate: Date
      endDate: Date
      readingTimeMs: number
      scrollPosition: number
      bookId: number
      userId: number
    }, ExtArgs["result"]["readingHistory"]>
    composites: {}
  }


  type ReadingHistoryGetPayload<S extends boolean | null | undefined | ReadingHistoryDefaultArgs> = $Result.GetResult<Prisma.$ReadingHistoryPayload, S>

  type ReadingHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReadingHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReadingHistoryCountAggregateInputType | true
    }

  export interface ReadingHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReadingHistory'], meta: { name: 'ReadingHistory' } }
    /**
     * Find zero or one ReadingHistory that matches the filter.
     * @param {ReadingHistoryFindUniqueArgs} args - Arguments to find a ReadingHistory
     * @example
     * // Get one ReadingHistory
     * const readingHistory = await prisma.readingHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReadingHistoryFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ReadingHistoryFindUniqueArgs<ExtArgs>>
    ): Prisma__ReadingHistoryClient<$Result.GetResult<Prisma.$ReadingHistoryPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ReadingHistory that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ReadingHistoryFindUniqueOrThrowArgs} args - Arguments to find a ReadingHistory
     * @example
     * // Get one ReadingHistory
     * const readingHistory = await prisma.readingHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ReadingHistoryFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReadingHistoryFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ReadingHistoryClient<$Result.GetResult<Prisma.$ReadingHistoryPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ReadingHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingHistoryFindFirstArgs} args - Arguments to find a ReadingHistory
     * @example
     * // Get one ReadingHistory
     * const readingHistory = await prisma.readingHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReadingHistoryFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ReadingHistoryFindFirstArgs<ExtArgs>>
    ): Prisma__ReadingHistoryClient<$Result.GetResult<Prisma.$ReadingHistoryPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ReadingHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingHistoryFindFirstOrThrowArgs} args - Arguments to find a ReadingHistory
     * @example
     * // Get one ReadingHistory
     * const readingHistory = await prisma.readingHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ReadingHistoryFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReadingHistoryFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ReadingHistoryClient<$Result.GetResult<Prisma.$ReadingHistoryPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ReadingHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingHistoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReadingHistories
     * const readingHistories = await prisma.readingHistory.findMany()
     * 
     * // Get first 10 ReadingHistories
     * const readingHistories = await prisma.readingHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const readingHistoryWithIdOnly = await prisma.readingHistory.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ReadingHistoryFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReadingHistoryFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingHistoryPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ReadingHistory.
     * @param {ReadingHistoryCreateArgs} args - Arguments to create a ReadingHistory.
     * @example
     * // Create one ReadingHistory
     * const ReadingHistory = await prisma.readingHistory.create({
     *   data: {
     *     // ... data to create a ReadingHistory
     *   }
     * })
     * 
    **/
    create<T extends ReadingHistoryCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ReadingHistoryCreateArgs<ExtArgs>>
    ): Prisma__ReadingHistoryClient<$Result.GetResult<Prisma.$ReadingHistoryPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ReadingHistories.
     *     @param {ReadingHistoryCreateManyArgs} args - Arguments to create many ReadingHistories.
     *     @example
     *     // Create many ReadingHistories
     *     const readingHistory = await prisma.readingHistory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ReadingHistoryCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReadingHistoryCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ReadingHistory.
     * @param {ReadingHistoryDeleteArgs} args - Arguments to delete one ReadingHistory.
     * @example
     * // Delete one ReadingHistory
     * const ReadingHistory = await prisma.readingHistory.delete({
     *   where: {
     *     // ... filter to delete one ReadingHistory
     *   }
     * })
     * 
    **/
    delete<T extends ReadingHistoryDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ReadingHistoryDeleteArgs<ExtArgs>>
    ): Prisma__ReadingHistoryClient<$Result.GetResult<Prisma.$ReadingHistoryPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ReadingHistory.
     * @param {ReadingHistoryUpdateArgs} args - Arguments to update one ReadingHistory.
     * @example
     * // Update one ReadingHistory
     * const readingHistory = await prisma.readingHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReadingHistoryUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ReadingHistoryUpdateArgs<ExtArgs>>
    ): Prisma__ReadingHistoryClient<$Result.GetResult<Prisma.$ReadingHistoryPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ReadingHistories.
     * @param {ReadingHistoryDeleteManyArgs} args - Arguments to filter ReadingHistories to delete.
     * @example
     * // Delete a few ReadingHistories
     * const { count } = await prisma.readingHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReadingHistoryDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReadingHistoryDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReadingHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReadingHistories
     * const readingHistory = await prisma.readingHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReadingHistoryUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ReadingHistoryUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReadingHistory.
     * @param {ReadingHistoryUpsertArgs} args - Arguments to update or create a ReadingHistory.
     * @example
     * // Update or create a ReadingHistory
     * const readingHistory = await prisma.readingHistory.upsert({
     *   create: {
     *     // ... data to create a ReadingHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReadingHistory we want to update
     *   }
     * })
    **/
    upsert<T extends ReadingHistoryUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ReadingHistoryUpsertArgs<ExtArgs>>
    ): Prisma__ReadingHistoryClient<$Result.GetResult<Prisma.$ReadingHistoryPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ReadingHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingHistoryCountArgs} args - Arguments to filter ReadingHistories to count.
     * @example
     * // Count the number of ReadingHistories
     * const count = await prisma.readingHistory.count({
     *   where: {
     *     // ... the filter for the ReadingHistories we want to count
     *   }
     * })
    **/
    count<T extends ReadingHistoryCountArgs>(
      args?: Subset<T, ReadingHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReadingHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReadingHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReadingHistoryAggregateArgs>(args: Subset<T, ReadingHistoryAggregateArgs>): Prisma.PrismaPromise<GetReadingHistoryAggregateType<T>>

    /**
     * Group by ReadingHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReadingHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReadingHistoryGroupByArgs['orderBy'] }
        : { orderBy?: ReadingHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReadingHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReadingHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReadingHistory model
   */
  readonly fields: ReadingHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReadingHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReadingHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ReadingHistory model
   */ 
  interface ReadingHistoryFieldRefs {
    readonly id: FieldRef<"ReadingHistory", 'Int'>
    readonly createdAt: FieldRef<"ReadingHistory", 'DateTime'>
    readonly updatedAt: FieldRef<"ReadingHistory", 'DateTime'>
    readonly startDate: FieldRef<"ReadingHistory", 'DateTime'>
    readonly endDate: FieldRef<"ReadingHistory", 'DateTime'>
    readonly readingTimeMs: FieldRef<"ReadingHistory", 'Int'>
    readonly scrollPosition: FieldRef<"ReadingHistory", 'Int'>
    readonly bookId: FieldRef<"ReadingHistory", 'Int'>
    readonly userId: FieldRef<"ReadingHistory", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ReadingHistory findUnique
   */
  export type ReadingHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingHistory
     */
    select?: ReadingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReadingHistory to fetch.
     */
    where: ReadingHistoryWhereUniqueInput
  }

  /**
   * ReadingHistory findUniqueOrThrow
   */
  export type ReadingHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingHistory
     */
    select?: ReadingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReadingHistory to fetch.
     */
    where: ReadingHistoryWhereUniqueInput
  }

  /**
   * ReadingHistory findFirst
   */
  export type ReadingHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingHistory
     */
    select?: ReadingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReadingHistory to fetch.
     */
    where?: ReadingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingHistories to fetch.
     */
    orderBy?: ReadingHistoryOrderByWithRelationInput | ReadingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadingHistories.
     */
    cursor?: ReadingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadingHistories.
     */
    distinct?: ReadingHistoryScalarFieldEnum | ReadingHistoryScalarFieldEnum[]
  }

  /**
   * ReadingHistory findFirstOrThrow
   */
  export type ReadingHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingHistory
     */
    select?: ReadingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReadingHistory to fetch.
     */
    where?: ReadingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingHistories to fetch.
     */
    orderBy?: ReadingHistoryOrderByWithRelationInput | ReadingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadingHistories.
     */
    cursor?: ReadingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadingHistories.
     */
    distinct?: ReadingHistoryScalarFieldEnum | ReadingHistoryScalarFieldEnum[]
  }

  /**
   * ReadingHistory findMany
   */
  export type ReadingHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingHistory
     */
    select?: ReadingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReadingHistories to fetch.
     */
    where?: ReadingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingHistories to fetch.
     */
    orderBy?: ReadingHistoryOrderByWithRelationInput | ReadingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReadingHistories.
     */
    cursor?: ReadingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingHistories.
     */
    skip?: number
    distinct?: ReadingHistoryScalarFieldEnum | ReadingHistoryScalarFieldEnum[]
  }

  /**
   * ReadingHistory create
   */
  export type ReadingHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingHistory
     */
    select?: ReadingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ReadingHistory.
     */
    data: XOR<ReadingHistoryCreateInput, ReadingHistoryUncheckedCreateInput>
  }

  /**
   * ReadingHistory createMany
   */
  export type ReadingHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReadingHistories.
     */
    data: ReadingHistoryCreateManyInput | ReadingHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReadingHistory update
   */
  export type ReadingHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingHistory
     */
    select?: ReadingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ReadingHistory.
     */
    data: XOR<ReadingHistoryUpdateInput, ReadingHistoryUncheckedUpdateInput>
    /**
     * Choose, which ReadingHistory to update.
     */
    where: ReadingHistoryWhereUniqueInput
  }

  /**
   * ReadingHistory updateMany
   */
  export type ReadingHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReadingHistories.
     */
    data: XOR<ReadingHistoryUpdateManyMutationInput, ReadingHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ReadingHistories to update
     */
    where?: ReadingHistoryWhereInput
  }

  /**
   * ReadingHistory upsert
   */
  export type ReadingHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingHistory
     */
    select?: ReadingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ReadingHistory to update in case it exists.
     */
    where: ReadingHistoryWhereUniqueInput
    /**
     * In case the ReadingHistory found by the `where` argument doesn't exist, create a new ReadingHistory with this data.
     */
    create: XOR<ReadingHistoryCreateInput, ReadingHistoryUncheckedCreateInput>
    /**
     * In case the ReadingHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReadingHistoryUpdateInput, ReadingHistoryUncheckedUpdateInput>
  }

  /**
   * ReadingHistory delete
   */
  export type ReadingHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingHistory
     */
    select?: ReadingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingHistoryInclude<ExtArgs> | null
    /**
     * Filter which ReadingHistory to delete.
     */
    where: ReadingHistoryWhereUniqueInput
  }

  /**
   * ReadingHistory deleteMany
   */
  export type ReadingHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadingHistories to delete
     */
    where?: ReadingHistoryWhereInput
  }

  /**
   * ReadingHistory without action
   */
  export type ReadingHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingHistory
     */
    select?: ReadingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingHistoryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const GenreScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    slug: 'slug',
    icon: 'icon'
  };

  export type GenreScalarFieldEnum = (typeof GenreScalarFieldEnum)[keyof typeof GenreScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    type: 'type',
    importance: 'importance',
    genreId: 'genreId',
    bookId: 'bookId',
    userId: 'userId'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    rating: 'rating',
    tags: 'tags',
    text: 'text',
    bookId: 'bookId',
    userId: 'userId'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const BookScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    title: 'title',
    slug: 'slug',
    author: 'author',
    description: 'description',
    recommendable: 'recommendable',
    picture: 'picture',
    ebook: 'ebook',
    readingTime: 'readingTime',
    chapters: 'chapters',
    rating: 'rating',
    isPublic: 'isPublic',
    mainGenreId: 'mainGenreId'
  };

  export type BookScalarFieldEnum = (typeof BookScalarFieldEnum)[keyof typeof BookScalarFieldEnum]


  export const BookTemplateScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    title: 'title',
    slug: 'slug',
    author: 'author',
    description: 'description',
    picture: 'picture',
    rating: 'rating'
  };

  export type BookTemplateScalarFieldEnum = (typeof BookTemplateScalarFieldEnum)[keyof typeof BookTemplateScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    email: 'email',
    socialId: 'socialId',
    password: 'password',
    picture: 'picture',
    fullName: 'fullName',
    location: 'location',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ReadingHistoryScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    startDate: 'startDate',
    endDate: 'endDate',
    readingTimeMs: 'readingTimeMs',
    scrollPosition: 'scrollPosition',
    bookId: 'bookId',
    userId: 'userId'
  };

  export type ReadingHistoryScalarFieldEnum = (typeof ReadingHistoryScalarFieldEnum)[keyof typeof ReadingHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Activities'
   */
  export type EnumActivitiesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Activities'>
    


  /**
   * Reference to a field of type 'Activities[]'
   */
  export type ListEnumActivitiesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Activities[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    
  /**
   * Deep Input Types
   */


  export type GenreWhereInput = {
    AND?: GenreWhereInput | GenreWhereInput[]
    OR?: GenreWhereInput[]
    NOT?: GenreWhereInput | GenreWhereInput[]
    id?: IntFilter<"Genre"> | number
    createdAt?: DateTimeFilter<"Genre"> | Date | string
    updatedAt?: DateTimeFilter<"Genre"> | Date | string
    name?: StringFilter<"Genre"> | string
    slug?: StringFilter<"Genre"> | string
    icon?: StringFilter<"Genre"> | string
    users?: UserListRelationFilter
    books?: BookListRelationFilter
    mainBooks?: BookListRelationFilter
    similarBy?: GenreListRelationFilter
    similar?: GenreListRelationFilter
    bookTemplates?: BookTemplateListRelationFilter
    activities?: ActivityListRelationFilter
  }

  export type GenreOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
    users?: UserOrderByRelationAggregateInput
    books?: BookOrderByRelationAggregateInput
    mainBooks?: BookOrderByRelationAggregateInput
    similarBy?: GenreOrderByRelationAggregateInput
    similar?: GenreOrderByRelationAggregateInput
    bookTemplates?: BookTemplateOrderByRelationAggregateInput
    activities?: ActivityOrderByRelationAggregateInput
  }

  export type GenreWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    slug?: string
    AND?: GenreWhereInput | GenreWhereInput[]
    OR?: GenreWhereInput[]
    NOT?: GenreWhereInput | GenreWhereInput[]
    createdAt?: DateTimeFilter<"Genre"> | Date | string
    updatedAt?: DateTimeFilter<"Genre"> | Date | string
    icon?: StringFilter<"Genre"> | string
    users?: UserListRelationFilter
    books?: BookListRelationFilter
    mainBooks?: BookListRelationFilter
    similarBy?: GenreListRelationFilter
    similar?: GenreListRelationFilter
    bookTemplates?: BookTemplateListRelationFilter
    activities?: ActivityListRelationFilter
  }, "id" | "name" | "slug">

  export type GenreOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
    _count?: GenreCountOrderByAggregateInput
    _avg?: GenreAvgOrderByAggregateInput
    _max?: GenreMaxOrderByAggregateInput
    _min?: GenreMinOrderByAggregateInput
    _sum?: GenreSumOrderByAggregateInput
  }

  export type GenreScalarWhereWithAggregatesInput = {
    AND?: GenreScalarWhereWithAggregatesInput | GenreScalarWhereWithAggregatesInput[]
    OR?: GenreScalarWhereWithAggregatesInput[]
    NOT?: GenreScalarWhereWithAggregatesInput | GenreScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Genre"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Genre"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Genre"> | Date | string
    name?: StringWithAggregatesFilter<"Genre"> | string
    slug?: StringWithAggregatesFilter<"Genre"> | string
    icon?: StringWithAggregatesFilter<"Genre"> | string
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: IntFilter<"Activity"> | number
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    type?: EnumActivitiesFilter<"Activity"> | $Enums.Activities
    importance?: IntFilter<"Activity"> | number
    genreId?: IntNullableFilter<"Activity"> | number | null
    bookId?: IntNullableFilter<"Activity"> | number | null
    userId?: IntNullableFilter<"Activity"> | number | null
    book?: XOR<BookNullableRelationFilter, BookWhereInput> | null
    genre?: XOR<GenreNullableRelationFilter, GenreWhereInput> | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    importance?: SortOrder
    genreId?: SortOrderInput | SortOrder
    bookId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    book?: BookOrderByWithRelationInput
    genre?: GenreOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    type?: EnumActivitiesFilter<"Activity"> | $Enums.Activities
    importance?: IntFilter<"Activity"> | number
    genreId?: IntNullableFilter<"Activity"> | number | null
    bookId?: IntNullableFilter<"Activity"> | number | null
    userId?: IntNullableFilter<"Activity"> | number | null
    book?: XOR<BookNullableRelationFilter, BookWhereInput> | null
    genre?: XOR<GenreNullableRelationFilter, GenreWhereInput> | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    importance?: SortOrder
    genreId?: SortOrderInput | SortOrder
    bookId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _avg?: ActivityAvgOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
    _sum?: ActivitySumOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Activity"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    type?: EnumActivitiesWithAggregatesFilter<"Activity"> | $Enums.Activities
    importance?: IntWithAggregatesFilter<"Activity"> | number
    genreId?: IntNullableWithAggregatesFilter<"Activity"> | number | null
    bookId?: IntNullableWithAggregatesFilter<"Activity"> | number | null
    userId?: IntNullableWithAggregatesFilter<"Activity"> | number | null
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: IntFilter<"Review"> | number
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    rating?: IntFilter<"Review"> | number
    tags?: StringNullableListFilter<"Review">
    text?: StringNullableFilter<"Review"> | string | null
    bookId?: IntFilter<"Review"> | number
    userId?: IntFilter<"Review"> | number
    book?: XOR<BookRelationFilter, BookWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rating?: SortOrder
    tags?: SortOrder
    text?: SortOrderInput | SortOrder
    bookId?: SortOrder
    userId?: SortOrder
    book?: BookOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    rating?: IntFilter<"Review"> | number
    tags?: StringNullableListFilter<"Review">
    text?: StringNullableFilter<"Review"> | string | null
    bookId?: IntFilter<"Review"> | number
    userId?: IntFilter<"Review"> | number
    book?: XOR<BookRelationFilter, BookWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rating?: SortOrder
    tags?: SortOrder
    text?: SortOrderInput | SortOrder
    bookId?: SortOrder
    userId?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Review"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    tags?: StringNullableListFilter<"Review">
    text?: StringNullableWithAggregatesFilter<"Review"> | string | null
    bookId?: IntWithAggregatesFilter<"Review"> | number
    userId?: IntWithAggregatesFilter<"Review"> | number
  }

  export type BookWhereInput = {
    AND?: BookWhereInput | BookWhereInput[]
    OR?: BookWhereInput[]
    NOT?: BookWhereInput | BookWhereInput[]
    id?: IntFilter<"Book"> | number
    createdAt?: DateTimeFilter<"Book"> | Date | string
    updatedAt?: DateTimeFilter<"Book"> | Date | string
    title?: StringFilter<"Book"> | string
    slug?: StringFilter<"Book"> | string
    author?: StringFilter<"Book"> | string
    description?: StringFilter<"Book"> | string
    recommendable?: BoolFilter<"Book"> | boolean
    picture?: StringFilter<"Book"> | string
    ebook?: StringFilter<"Book"> | string
    readingTime?: IntFilter<"Book"> | number
    chapters?: IntFilter<"Book"> | number
    rating?: FloatFilter<"Book"> | number
    isPublic?: BoolFilter<"Book"> | boolean
    mainGenreId?: IntFilter<"Book"> | number
    mainGenre?: XOR<GenreRelationFilter, GenreWhereInput>
    genres?: GenreListRelationFilter
    review?: ReviewListRelationFilter
    finishedBy?: UserListRelationFilter
    savedBy?: UserListRelationFilter
    readingBy?: UserListRelationFilter
    activities?: ActivityListRelationFilter
    ReadingHistory?: ReadingHistoryListRelationFilter
    similarBooks?: BookListRelationFilter
    similarBy?: BookListRelationFilter
  }

  export type BookOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    author?: SortOrder
    description?: SortOrder
    recommendable?: SortOrder
    picture?: SortOrder
    ebook?: SortOrder
    readingTime?: SortOrder
    chapters?: SortOrder
    rating?: SortOrder
    isPublic?: SortOrder
    mainGenreId?: SortOrder
    mainGenre?: GenreOrderByWithRelationInput
    genres?: GenreOrderByRelationAggregateInput
    review?: ReviewOrderByRelationAggregateInput
    finishedBy?: UserOrderByRelationAggregateInput
    savedBy?: UserOrderByRelationAggregateInput
    readingBy?: UserOrderByRelationAggregateInput
    activities?: ActivityOrderByRelationAggregateInput
    ReadingHistory?: ReadingHistoryOrderByRelationAggregateInput
    similarBooks?: BookOrderByRelationAggregateInput
    similarBy?: BookOrderByRelationAggregateInput
  }

  export type BookWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    title?: string
    slug?: string
    AND?: BookWhereInput | BookWhereInput[]
    OR?: BookWhereInput[]
    NOT?: BookWhereInput | BookWhereInput[]
    createdAt?: DateTimeFilter<"Book"> | Date | string
    updatedAt?: DateTimeFilter<"Book"> | Date | string
    author?: StringFilter<"Book"> | string
    description?: StringFilter<"Book"> | string
    recommendable?: BoolFilter<"Book"> | boolean
    picture?: StringFilter<"Book"> | string
    ebook?: StringFilter<"Book"> | string
    readingTime?: IntFilter<"Book"> | number
    chapters?: IntFilter<"Book"> | number
    rating?: FloatFilter<"Book"> | number
    isPublic?: BoolFilter<"Book"> | boolean
    mainGenreId?: IntFilter<"Book"> | number
    mainGenre?: XOR<GenreRelationFilter, GenreWhereInput>
    genres?: GenreListRelationFilter
    review?: ReviewListRelationFilter
    finishedBy?: UserListRelationFilter
    savedBy?: UserListRelationFilter
    readingBy?: UserListRelationFilter
    activities?: ActivityListRelationFilter
    ReadingHistory?: ReadingHistoryListRelationFilter
    similarBooks?: BookListRelationFilter
    similarBy?: BookListRelationFilter
  }, "id" | "title" | "slug">

  export type BookOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    author?: SortOrder
    description?: SortOrder
    recommendable?: SortOrder
    picture?: SortOrder
    ebook?: SortOrder
    readingTime?: SortOrder
    chapters?: SortOrder
    rating?: SortOrder
    isPublic?: SortOrder
    mainGenreId?: SortOrder
    _count?: BookCountOrderByAggregateInput
    _avg?: BookAvgOrderByAggregateInput
    _max?: BookMaxOrderByAggregateInput
    _min?: BookMinOrderByAggregateInput
    _sum?: BookSumOrderByAggregateInput
  }

  export type BookScalarWhereWithAggregatesInput = {
    AND?: BookScalarWhereWithAggregatesInput | BookScalarWhereWithAggregatesInput[]
    OR?: BookScalarWhereWithAggregatesInput[]
    NOT?: BookScalarWhereWithAggregatesInput | BookScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Book"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Book"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Book"> | Date | string
    title?: StringWithAggregatesFilter<"Book"> | string
    slug?: StringWithAggregatesFilter<"Book"> | string
    author?: StringWithAggregatesFilter<"Book"> | string
    description?: StringWithAggregatesFilter<"Book"> | string
    recommendable?: BoolWithAggregatesFilter<"Book"> | boolean
    picture?: StringWithAggregatesFilter<"Book"> | string
    ebook?: StringWithAggregatesFilter<"Book"> | string
    readingTime?: IntWithAggregatesFilter<"Book"> | number
    chapters?: IntWithAggregatesFilter<"Book"> | number
    rating?: FloatWithAggregatesFilter<"Book"> | number
    isPublic?: BoolWithAggregatesFilter<"Book"> | boolean
    mainGenreId?: IntWithAggregatesFilter<"Book"> | number
  }

  export type BookTemplateWhereInput = {
    AND?: BookTemplateWhereInput | BookTemplateWhereInput[]
    OR?: BookTemplateWhereInput[]
    NOT?: BookTemplateWhereInput | BookTemplateWhereInput[]
    id?: IntFilter<"BookTemplate"> | number
    createdAt?: DateTimeFilter<"BookTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"BookTemplate"> | Date | string
    title?: StringFilter<"BookTemplate"> | string
    slug?: StringFilter<"BookTemplate"> | string
    author?: StringFilter<"BookTemplate"> | string
    description?: StringFilter<"BookTemplate"> | string
    picture?: StringFilter<"BookTemplate"> | string
    rating?: FloatFilter<"BookTemplate"> | number
    genres?: GenreListRelationFilter
  }

  export type BookTemplateOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    author?: SortOrder
    description?: SortOrder
    picture?: SortOrder
    rating?: SortOrder
    genres?: GenreOrderByRelationAggregateInput
  }

  export type BookTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    title?: string
    slug?: string
    AND?: BookTemplateWhereInput | BookTemplateWhereInput[]
    OR?: BookTemplateWhereInput[]
    NOT?: BookTemplateWhereInput | BookTemplateWhereInput[]
    createdAt?: DateTimeFilter<"BookTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"BookTemplate"> | Date | string
    author?: StringFilter<"BookTemplate"> | string
    description?: StringFilter<"BookTemplate"> | string
    picture?: StringFilter<"BookTemplate"> | string
    rating?: FloatFilter<"BookTemplate"> | number
    genres?: GenreListRelationFilter
  }, "id" | "title" | "slug">

  export type BookTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    author?: SortOrder
    description?: SortOrder
    picture?: SortOrder
    rating?: SortOrder
    _count?: BookTemplateCountOrderByAggregateInput
    _avg?: BookTemplateAvgOrderByAggregateInput
    _max?: BookTemplateMaxOrderByAggregateInput
    _min?: BookTemplateMinOrderByAggregateInput
    _sum?: BookTemplateSumOrderByAggregateInput
  }

  export type BookTemplateScalarWhereWithAggregatesInput = {
    AND?: BookTemplateScalarWhereWithAggregatesInput | BookTemplateScalarWhereWithAggregatesInput[]
    OR?: BookTemplateScalarWhereWithAggregatesInput[]
    NOT?: BookTemplateScalarWhereWithAggregatesInput | BookTemplateScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BookTemplate"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BookTemplate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BookTemplate"> | Date | string
    title?: StringWithAggregatesFilter<"BookTemplate"> | string
    slug?: StringWithAggregatesFilter<"BookTemplate"> | string
    author?: StringWithAggregatesFilter<"BookTemplate"> | string
    description?: StringWithAggregatesFilter<"BookTemplate"> | string
    picture?: StringWithAggregatesFilter<"BookTemplate"> | string
    rating?: FloatWithAggregatesFilter<"BookTemplate"> | number
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    email?: StringFilter<"User"> | string
    socialId?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    picture?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    location?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    selectedGenres?: GenreListRelationFilter
    review?: ReviewListRelationFilter
    savedBooks?: BookListRelationFilter
    finishedBooks?: BookListRelationFilter
    readingBooks?: BookListRelationFilter
    activity?: ActivityListRelationFilter
    ReadingHistory?: ReadingHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    socialId?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    picture?: SortOrder
    fullName?: SortOrder
    location?: SortOrder
    role?: SortOrder
    selectedGenres?: GenreOrderByRelationAggregateInput
    review?: ReviewOrderByRelationAggregateInput
    savedBooks?: BookOrderByRelationAggregateInput
    finishedBooks?: BookOrderByRelationAggregateInput
    readingBooks?: BookOrderByRelationAggregateInput
    activity?: ActivityOrderByRelationAggregateInput
    ReadingHistory?: ReadingHistoryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    socialId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    password?: StringNullableFilter<"User"> | string | null
    picture?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    location?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    selectedGenres?: GenreListRelationFilter
    review?: ReviewListRelationFilter
    savedBooks?: BookListRelationFilter
    finishedBooks?: BookListRelationFilter
    readingBooks?: BookListRelationFilter
    activity?: ActivityListRelationFilter
    ReadingHistory?: ReadingHistoryListRelationFilter
  }, "id" | "email" | "socialId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    socialId?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    picture?: SortOrder
    fullName?: SortOrder
    location?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    email?: StringWithAggregatesFilter<"User"> | string
    socialId?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    picture?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    location?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
  }

  export type ReadingHistoryWhereInput = {
    AND?: ReadingHistoryWhereInput | ReadingHistoryWhereInput[]
    OR?: ReadingHistoryWhereInput[]
    NOT?: ReadingHistoryWhereInput | ReadingHistoryWhereInput[]
    id?: IntFilter<"ReadingHistory"> | number
    createdAt?: DateTimeFilter<"ReadingHistory"> | Date | string
    updatedAt?: DateTimeFilter<"ReadingHistory"> | Date | string
    startDate?: DateTimeFilter<"ReadingHistory"> | Date | string
    endDate?: DateTimeFilter<"ReadingHistory"> | Date | string
    readingTimeMs?: IntFilter<"ReadingHistory"> | number
    scrollPosition?: IntFilter<"ReadingHistory"> | number
    bookId?: IntFilter<"ReadingHistory"> | number
    userId?: IntFilter<"ReadingHistory"> | number
    book?: XOR<BookRelationFilter, BookWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ReadingHistoryOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    readingTimeMs?: SortOrder
    scrollPosition?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
    book?: BookOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ReadingHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ReadingHistoryWhereInput | ReadingHistoryWhereInput[]
    OR?: ReadingHistoryWhereInput[]
    NOT?: ReadingHistoryWhereInput | ReadingHistoryWhereInput[]
    createdAt?: DateTimeFilter<"ReadingHistory"> | Date | string
    updatedAt?: DateTimeFilter<"ReadingHistory"> | Date | string
    startDate?: DateTimeFilter<"ReadingHistory"> | Date | string
    endDate?: DateTimeFilter<"ReadingHistory"> | Date | string
    readingTimeMs?: IntFilter<"ReadingHistory"> | number
    scrollPosition?: IntFilter<"ReadingHistory"> | number
    bookId?: IntFilter<"ReadingHistory"> | number
    userId?: IntFilter<"ReadingHistory"> | number
    book?: XOR<BookRelationFilter, BookWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ReadingHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    readingTimeMs?: SortOrder
    scrollPosition?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
    _count?: ReadingHistoryCountOrderByAggregateInput
    _avg?: ReadingHistoryAvgOrderByAggregateInput
    _max?: ReadingHistoryMaxOrderByAggregateInput
    _min?: ReadingHistoryMinOrderByAggregateInput
    _sum?: ReadingHistorySumOrderByAggregateInput
  }

  export type ReadingHistoryScalarWhereWithAggregatesInput = {
    AND?: ReadingHistoryScalarWhereWithAggregatesInput | ReadingHistoryScalarWhereWithAggregatesInput[]
    OR?: ReadingHistoryScalarWhereWithAggregatesInput[]
    NOT?: ReadingHistoryScalarWhereWithAggregatesInput | ReadingHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ReadingHistory"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ReadingHistory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ReadingHistory"> | Date | string
    startDate?: DateTimeWithAggregatesFilter<"ReadingHistory"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"ReadingHistory"> | Date | string
    readingTimeMs?: IntWithAggregatesFilter<"ReadingHistory"> | number
    scrollPosition?: IntWithAggregatesFilter<"ReadingHistory"> | number
    bookId?: IntWithAggregatesFilter<"ReadingHistory"> | number
    userId?: IntWithAggregatesFilter<"ReadingHistory"> | number
  }

  export type GenreCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserCreateNestedManyWithoutSelectedGenresInput
    books?: BookCreateNestedManyWithoutGenresInput
    mainBooks?: BookCreateNestedManyWithoutMainGenreInput
    similarBy?: GenreCreateNestedManyWithoutSimilarInput
    similar?: GenreCreateNestedManyWithoutSimilarByInput
    bookTemplates?: BookTemplateCreateNestedManyWithoutGenresInput
    activities?: ActivityCreateNestedManyWithoutGenreInput
  }

  export type GenreUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserUncheckedCreateNestedManyWithoutSelectedGenresInput
    books?: BookUncheckedCreateNestedManyWithoutGenresInput
    mainBooks?: BookUncheckedCreateNestedManyWithoutMainGenreInput
    similarBy?: GenreUncheckedCreateNestedManyWithoutSimilarInput
    similar?: GenreUncheckedCreateNestedManyWithoutSimilarByInput
    bookTemplates?: BookTemplateUncheckedCreateNestedManyWithoutGenresInput
    activities?: ActivityUncheckedCreateNestedManyWithoutGenreInput
  }

  export type GenreUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutSelectedGenresNestedInput
    books?: BookUpdateManyWithoutGenresNestedInput
    mainBooks?: BookUpdateManyWithoutMainGenreNestedInput
    similarBy?: GenreUpdateManyWithoutSimilarNestedInput
    similar?: GenreUpdateManyWithoutSimilarByNestedInput
    bookTemplates?: BookTemplateUpdateManyWithoutGenresNestedInput
    activities?: ActivityUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutSelectedGenresNestedInput
    books?: BookUncheckedUpdateManyWithoutGenresNestedInput
    mainBooks?: BookUncheckedUpdateManyWithoutMainGenreNestedInput
    similarBy?: GenreUncheckedUpdateManyWithoutSimilarNestedInput
    similar?: GenreUncheckedUpdateManyWithoutSimilarByNestedInput
    bookTemplates?: BookTemplateUncheckedUpdateManyWithoutGenresNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutGenreNestedInput
  }

  export type GenreCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
  }

  export type GenreUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
  }

  export type GenreUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
  }

  export type ActivityCreateInput = {
    createdAt?: Date | string
    type: $Enums.Activities
    importance: number
    book?: BookCreateNestedOneWithoutActivitiesInput
    genre?: GenreCreateNestedOneWithoutActivitiesInput
    user?: UserCreateNestedOneWithoutActivityInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    type: $Enums.Activities
    importance: number
    genreId?: number | null
    bookId?: number | null
    userId?: number | null
  }

  export type ActivityUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumActivitiesFieldUpdateOperationsInput | $Enums.Activities
    importance?: IntFieldUpdateOperationsInput | number
    book?: BookUpdateOneWithoutActivitiesNestedInput
    genre?: GenreUpdateOneWithoutActivitiesNestedInput
    user?: UserUpdateOneWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumActivitiesFieldUpdateOperationsInput | $Enums.Activities
    importance?: IntFieldUpdateOperationsInput | number
    genreId?: NullableIntFieldUpdateOperationsInput | number | null
    bookId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ActivityCreateManyInput = {
    id?: number
    createdAt?: Date | string
    type: $Enums.Activities
    importance: number
    genreId?: number | null
    bookId?: number | null
    userId?: number | null
  }

  export type ActivityUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumActivitiesFieldUpdateOperationsInput | $Enums.Activities
    importance?: IntFieldUpdateOperationsInput | number
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumActivitiesFieldUpdateOperationsInput | $Enums.Activities
    importance?: IntFieldUpdateOperationsInput | number
    genreId?: NullableIntFieldUpdateOperationsInput | number | null
    bookId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ReviewCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    rating: number
    tags?: ReviewCreatetagsInput | string[]
    text?: string | null
    book: BookCreateNestedOneWithoutReviewInput
    user: UserCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rating: number
    tags?: ReviewCreatetagsInput | string[]
    text?: string | null
    bookId: number
    userId: number
  }

  export type ReviewUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    tags?: ReviewUpdatetagsInput | string[]
    text?: NullableStringFieldUpdateOperationsInput | string | null
    book?: BookUpdateOneRequiredWithoutReviewNestedInput
    user?: UserUpdateOneRequiredWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    tags?: ReviewUpdatetagsInput | string[]
    text?: NullableStringFieldUpdateOperationsInput | string | null
    bookId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rating: number
    tags?: ReviewCreatetagsInput | string[]
    text?: string | null
    bookId: number
    userId: number
  }

  export type ReviewUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    tags?: ReviewUpdatetagsInput | string[]
    text?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    tags?: ReviewUpdatetagsInput | string[]
    text?: NullableStringFieldUpdateOperationsInput | string | null
    bookId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type BookCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenre: GenreCreateNestedOneWithoutMainBooksInput
    genres?: GenreCreateNestedManyWithoutBooksInput
    review?: ReviewCreateNestedManyWithoutBookInput
    finishedBy?: UserCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutBookInput
    similarBooks?: BookCreateNestedManyWithoutSimilarByInput
    similarBy?: BookCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenreId: number
    genres?: GenreUncheckedCreateNestedManyWithoutBooksInput
    review?: ReviewUncheckedCreateNestedManyWithoutBookInput
    finishedBy?: UserUncheckedCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserUncheckedCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserUncheckedCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityUncheckedCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutBookInput
    similarBooks?: BookUncheckedCreateNestedManyWithoutSimilarByInput
    similarBy?: BookUncheckedCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenre?: GenreUpdateOneRequiredWithoutMainBooksNestedInput
    genres?: GenreUpdateManyWithoutBooksNestedInput
    review?: ReviewUpdateManyWithoutBookNestedInput
    finishedBy?: UserUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutBookNestedInput
    similarBooks?: BookUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
    genres?: GenreUncheckedUpdateManyWithoutBooksNestedInput
    review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
    finishedBy?: UserUncheckedUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUncheckedUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUncheckedUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutBookNestedInput
    similarBooks?: BookUncheckedUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUncheckedUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenreId: number
  }

  export type BookUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BookUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
  }

  export type BookTemplateCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    picture: string
    rating?: number
    genres?: GenreCreateNestedManyWithoutBookTemplatesInput
  }

  export type BookTemplateUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    picture: string
    rating?: number
    genres?: GenreUncheckedCreateNestedManyWithoutBookTemplatesInput
  }

  export type BookTemplateUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    genres?: GenreUpdateManyWithoutBookTemplatesNestedInput
  }

  export type BookTemplateUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    genres?: GenreUncheckedUpdateManyWithoutBookTemplatesNestedInput
  }

  export type BookTemplateCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    picture: string
    rating?: number
  }

  export type BookTemplateUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
  }

  export type BookTemplateUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
  }

  export type UserCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreCreateNestedManyWithoutUsersInput
    review?: ReviewCreateNestedManyWithoutUserInput
    savedBooks?: BookCreateNestedManyWithoutSavedByInput
    finishedBooks?: BookCreateNestedManyWithoutFinishedByInput
    readingBooks?: BookCreateNestedManyWithoutReadingByInput
    activity?: ActivityCreateNestedManyWithoutUserInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreUncheckedCreateNestedManyWithoutUsersInput
    review?: ReviewUncheckedCreateNestedManyWithoutUserInput
    savedBooks?: BookUncheckedCreateNestedManyWithoutSavedByInput
    finishedBooks?: BookUncheckedCreateNestedManyWithoutFinishedByInput
    readingBooks?: BookUncheckedCreateNestedManyWithoutReadingByInput
    activity?: ActivityUncheckedCreateNestedManyWithoutUserInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUpdateManyWithoutUsersNestedInput
    review?: ReviewUpdateManyWithoutUserNestedInput
    savedBooks?: BookUpdateManyWithoutSavedByNestedInput
    finishedBooks?: BookUpdateManyWithoutFinishedByNestedInput
    readingBooks?: BookUpdateManyWithoutReadingByNestedInput
    activity?: ActivityUpdateManyWithoutUserNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUncheckedUpdateManyWithoutUsersNestedInput
    review?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    savedBooks?: BookUncheckedUpdateManyWithoutSavedByNestedInput
    finishedBooks?: BookUncheckedUpdateManyWithoutFinishedByNestedInput
    readingBooks?: BookUncheckedUpdateManyWithoutReadingByNestedInput
    activity?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
  }

  export type UserUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type ReadingHistoryCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    startDate: Date | string
    endDate: Date | string
    readingTimeMs: number
    scrollPosition: number
    book: BookCreateNestedOneWithoutReadingHistoryInput
    user: UserCreateNestedOneWithoutReadingHistoryInput
  }

  export type ReadingHistoryUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startDate: Date | string
    endDate: Date | string
    readingTimeMs: number
    scrollPosition: number
    bookId: number
    userId: number
  }

  export type ReadingHistoryUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingTimeMs?: IntFieldUpdateOperationsInput | number
    scrollPosition?: IntFieldUpdateOperationsInput | number
    book?: BookUpdateOneRequiredWithoutReadingHistoryNestedInput
    user?: UserUpdateOneRequiredWithoutReadingHistoryNestedInput
  }

  export type ReadingHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingTimeMs?: IntFieldUpdateOperationsInput | number
    scrollPosition?: IntFieldUpdateOperationsInput | number
    bookId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ReadingHistoryCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startDate: Date | string
    endDate: Date | string
    readingTimeMs: number
    scrollPosition: number
    bookId: number
    userId: number
  }

  export type ReadingHistoryUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingTimeMs?: IntFieldUpdateOperationsInput | number
    scrollPosition?: IntFieldUpdateOperationsInput | number
  }

  export type ReadingHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingTimeMs?: IntFieldUpdateOperationsInput | number
    scrollPosition?: IntFieldUpdateOperationsInput | number
    bookId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type BookListRelationFilter = {
    every?: BookWhereInput
    some?: BookWhereInput
    none?: BookWhereInput
  }

  export type GenreListRelationFilter = {
    every?: GenreWhereInput
    some?: GenreWhereInput
    none?: GenreWhereInput
  }

  export type BookTemplateListRelationFilter = {
    every?: BookTemplateWhereInput
    some?: BookTemplateWhereInput
    none?: BookTemplateWhereInput
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GenreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookTemplateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GenreCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
  }

  export type GenreAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GenreMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
  }

  export type GenreMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
  }

  export type GenreSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumActivitiesFilter<$PrismaModel = never> = {
    equals?: $Enums.Activities | EnumActivitiesFieldRefInput<$PrismaModel>
    in?: $Enums.Activities[] | ListEnumActivitiesFieldRefInput<$PrismaModel>
    notIn?: $Enums.Activities[] | ListEnumActivitiesFieldRefInput<$PrismaModel>
    not?: NestedEnumActivitiesFilter<$PrismaModel> | $Enums.Activities
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BookNullableRelationFilter = {
    is?: BookWhereInput | null
    isNot?: BookWhereInput | null
  }

  export type GenreNullableRelationFilter = {
    is?: GenreWhereInput | null
    isNot?: GenreWhereInput | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    importance?: SortOrder
    genreId?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type ActivityAvgOrderByAggregateInput = {
    id?: SortOrder
    importance?: SortOrder
    genreId?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    importance?: SortOrder
    genreId?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    importance?: SortOrder
    genreId?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type ActivitySumOrderByAggregateInput = {
    id?: SortOrder
    importance?: SortOrder
    genreId?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type EnumActivitiesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Activities | EnumActivitiesFieldRefInput<$PrismaModel>
    in?: $Enums.Activities[] | ListEnumActivitiesFieldRefInput<$PrismaModel>
    notIn?: $Enums.Activities[] | ListEnumActivitiesFieldRefInput<$PrismaModel>
    not?: NestedEnumActivitiesWithAggregatesFilter<$PrismaModel> | $Enums.Activities
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActivitiesFilter<$PrismaModel>
    _max?: NestedEnumActivitiesFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BookRelationFilter = {
    is?: BookWhereInput
    isNot?: BookWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rating?: SortOrder
    tags?: SortOrder
    text?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rating?: SortOrder
    text?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rating?: SortOrder
    text?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type GenreRelationFilter = {
    is?: GenreWhereInput
    isNot?: GenreWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type ReadingHistoryListRelationFilter = {
    every?: ReadingHistoryWhereInput
    some?: ReadingHistoryWhereInput
    none?: ReadingHistoryWhereInput
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReadingHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    author?: SortOrder
    description?: SortOrder
    recommendable?: SortOrder
    picture?: SortOrder
    ebook?: SortOrder
    readingTime?: SortOrder
    chapters?: SortOrder
    rating?: SortOrder
    isPublic?: SortOrder
    mainGenreId?: SortOrder
  }

  export type BookAvgOrderByAggregateInput = {
    id?: SortOrder
    readingTime?: SortOrder
    chapters?: SortOrder
    rating?: SortOrder
    mainGenreId?: SortOrder
  }

  export type BookMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    author?: SortOrder
    description?: SortOrder
    recommendable?: SortOrder
    picture?: SortOrder
    ebook?: SortOrder
    readingTime?: SortOrder
    chapters?: SortOrder
    rating?: SortOrder
    isPublic?: SortOrder
    mainGenreId?: SortOrder
  }

  export type BookMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    author?: SortOrder
    description?: SortOrder
    recommendable?: SortOrder
    picture?: SortOrder
    ebook?: SortOrder
    readingTime?: SortOrder
    chapters?: SortOrder
    rating?: SortOrder
    isPublic?: SortOrder
    mainGenreId?: SortOrder
  }

  export type BookSumOrderByAggregateInput = {
    id?: SortOrder
    readingTime?: SortOrder
    chapters?: SortOrder
    rating?: SortOrder
    mainGenreId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BookTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    author?: SortOrder
    description?: SortOrder
    picture?: SortOrder
    rating?: SortOrder
  }

  export type BookTemplateAvgOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
  }

  export type BookTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    author?: SortOrder
    description?: SortOrder
    picture?: SortOrder
    rating?: SortOrder
  }

  export type BookTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    author?: SortOrder
    description?: SortOrder
    picture?: SortOrder
    rating?: SortOrder
  }

  export type BookTemplateSumOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    socialId?: SortOrder
    password?: SortOrder
    picture?: SortOrder
    fullName?: SortOrder
    location?: SortOrder
    role?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    socialId?: SortOrder
    password?: SortOrder
    picture?: SortOrder
    fullName?: SortOrder
    location?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    socialId?: SortOrder
    password?: SortOrder
    picture?: SortOrder
    fullName?: SortOrder
    location?: SortOrder
    role?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type ReadingHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    readingTimeMs?: SortOrder
    scrollPosition?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type ReadingHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    readingTimeMs?: SortOrder
    scrollPosition?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type ReadingHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    readingTimeMs?: SortOrder
    scrollPosition?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type ReadingHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    readingTimeMs?: SortOrder
    scrollPosition?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type ReadingHistorySumOrderByAggregateInput = {
    id?: SortOrder
    readingTimeMs?: SortOrder
    scrollPosition?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
  }

  export type UserCreateNestedManyWithoutSelectedGenresInput = {
    create?: XOR<UserCreateWithoutSelectedGenresInput, UserUncheckedCreateWithoutSelectedGenresInput> | UserCreateWithoutSelectedGenresInput[] | UserUncheckedCreateWithoutSelectedGenresInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSelectedGenresInput | UserCreateOrConnectWithoutSelectedGenresInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type BookCreateNestedManyWithoutGenresInput = {
    create?: XOR<BookCreateWithoutGenresInput, BookUncheckedCreateWithoutGenresInput> | BookCreateWithoutGenresInput[] | BookUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: BookCreateOrConnectWithoutGenresInput | BookCreateOrConnectWithoutGenresInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BookCreateNestedManyWithoutMainGenreInput = {
    create?: XOR<BookCreateWithoutMainGenreInput, BookUncheckedCreateWithoutMainGenreInput> | BookCreateWithoutMainGenreInput[] | BookUncheckedCreateWithoutMainGenreInput[]
    connectOrCreate?: BookCreateOrConnectWithoutMainGenreInput | BookCreateOrConnectWithoutMainGenreInput[]
    createMany?: BookCreateManyMainGenreInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type GenreCreateNestedManyWithoutSimilarInput = {
    create?: XOR<GenreCreateWithoutSimilarInput, GenreUncheckedCreateWithoutSimilarInput> | GenreCreateWithoutSimilarInput[] | GenreUncheckedCreateWithoutSimilarInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutSimilarInput | GenreCreateOrConnectWithoutSimilarInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
  }

  export type GenreCreateNestedManyWithoutSimilarByInput = {
    create?: XOR<GenreCreateWithoutSimilarByInput, GenreUncheckedCreateWithoutSimilarByInput> | GenreCreateWithoutSimilarByInput[] | GenreUncheckedCreateWithoutSimilarByInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutSimilarByInput | GenreCreateOrConnectWithoutSimilarByInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
  }

  export type BookTemplateCreateNestedManyWithoutGenresInput = {
    create?: XOR<BookTemplateCreateWithoutGenresInput, BookTemplateUncheckedCreateWithoutGenresInput> | BookTemplateCreateWithoutGenresInput[] | BookTemplateUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: BookTemplateCreateOrConnectWithoutGenresInput | BookTemplateCreateOrConnectWithoutGenresInput[]
    connect?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
  }

  export type ActivityCreateNestedManyWithoutGenreInput = {
    create?: XOR<ActivityCreateWithoutGenreInput, ActivityUncheckedCreateWithoutGenreInput> | ActivityCreateWithoutGenreInput[] | ActivityUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutGenreInput | ActivityCreateOrConnectWithoutGenreInput[]
    createMany?: ActivityCreateManyGenreInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutSelectedGenresInput = {
    create?: XOR<UserCreateWithoutSelectedGenresInput, UserUncheckedCreateWithoutSelectedGenresInput> | UserCreateWithoutSelectedGenresInput[] | UserUncheckedCreateWithoutSelectedGenresInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSelectedGenresInput | UserCreateOrConnectWithoutSelectedGenresInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type BookUncheckedCreateNestedManyWithoutGenresInput = {
    create?: XOR<BookCreateWithoutGenresInput, BookUncheckedCreateWithoutGenresInput> | BookCreateWithoutGenresInput[] | BookUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: BookCreateOrConnectWithoutGenresInput | BookCreateOrConnectWithoutGenresInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BookUncheckedCreateNestedManyWithoutMainGenreInput = {
    create?: XOR<BookCreateWithoutMainGenreInput, BookUncheckedCreateWithoutMainGenreInput> | BookCreateWithoutMainGenreInput[] | BookUncheckedCreateWithoutMainGenreInput[]
    connectOrCreate?: BookCreateOrConnectWithoutMainGenreInput | BookCreateOrConnectWithoutMainGenreInput[]
    createMany?: BookCreateManyMainGenreInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type GenreUncheckedCreateNestedManyWithoutSimilarInput = {
    create?: XOR<GenreCreateWithoutSimilarInput, GenreUncheckedCreateWithoutSimilarInput> | GenreCreateWithoutSimilarInput[] | GenreUncheckedCreateWithoutSimilarInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutSimilarInput | GenreCreateOrConnectWithoutSimilarInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
  }

  export type GenreUncheckedCreateNestedManyWithoutSimilarByInput = {
    create?: XOR<GenreCreateWithoutSimilarByInput, GenreUncheckedCreateWithoutSimilarByInput> | GenreCreateWithoutSimilarByInput[] | GenreUncheckedCreateWithoutSimilarByInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutSimilarByInput | GenreCreateOrConnectWithoutSimilarByInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
  }

  export type BookTemplateUncheckedCreateNestedManyWithoutGenresInput = {
    create?: XOR<BookTemplateCreateWithoutGenresInput, BookTemplateUncheckedCreateWithoutGenresInput> | BookTemplateCreateWithoutGenresInput[] | BookTemplateUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: BookTemplateCreateOrConnectWithoutGenresInput | BookTemplateCreateOrConnectWithoutGenresInput[]
    connect?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutGenreInput = {
    create?: XOR<ActivityCreateWithoutGenreInput, ActivityUncheckedCreateWithoutGenreInput> | ActivityCreateWithoutGenreInput[] | ActivityUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutGenreInput | ActivityCreateOrConnectWithoutGenreInput[]
    createMany?: ActivityCreateManyGenreInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type UserUpdateManyWithoutSelectedGenresNestedInput = {
    create?: XOR<UserCreateWithoutSelectedGenresInput, UserUncheckedCreateWithoutSelectedGenresInput> | UserCreateWithoutSelectedGenresInput[] | UserUncheckedCreateWithoutSelectedGenresInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSelectedGenresInput | UserCreateOrConnectWithoutSelectedGenresInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSelectedGenresInput | UserUpsertWithWhereUniqueWithoutSelectedGenresInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSelectedGenresInput | UserUpdateWithWhereUniqueWithoutSelectedGenresInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSelectedGenresInput | UserUpdateManyWithWhereWithoutSelectedGenresInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type BookUpdateManyWithoutGenresNestedInput = {
    create?: XOR<BookCreateWithoutGenresInput, BookUncheckedCreateWithoutGenresInput> | BookCreateWithoutGenresInput[] | BookUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: BookCreateOrConnectWithoutGenresInput | BookCreateOrConnectWithoutGenresInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutGenresInput | BookUpsertWithWhereUniqueWithoutGenresInput[]
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutGenresInput | BookUpdateWithWhereUniqueWithoutGenresInput[]
    updateMany?: BookUpdateManyWithWhereWithoutGenresInput | BookUpdateManyWithWhereWithoutGenresInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type BookUpdateManyWithoutMainGenreNestedInput = {
    create?: XOR<BookCreateWithoutMainGenreInput, BookUncheckedCreateWithoutMainGenreInput> | BookCreateWithoutMainGenreInput[] | BookUncheckedCreateWithoutMainGenreInput[]
    connectOrCreate?: BookCreateOrConnectWithoutMainGenreInput | BookCreateOrConnectWithoutMainGenreInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutMainGenreInput | BookUpsertWithWhereUniqueWithoutMainGenreInput[]
    createMany?: BookCreateManyMainGenreInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutMainGenreInput | BookUpdateWithWhereUniqueWithoutMainGenreInput[]
    updateMany?: BookUpdateManyWithWhereWithoutMainGenreInput | BookUpdateManyWithWhereWithoutMainGenreInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type GenreUpdateManyWithoutSimilarNestedInput = {
    create?: XOR<GenreCreateWithoutSimilarInput, GenreUncheckedCreateWithoutSimilarInput> | GenreCreateWithoutSimilarInput[] | GenreUncheckedCreateWithoutSimilarInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutSimilarInput | GenreCreateOrConnectWithoutSimilarInput[]
    upsert?: GenreUpsertWithWhereUniqueWithoutSimilarInput | GenreUpsertWithWhereUniqueWithoutSimilarInput[]
    set?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    disconnect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    delete?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    update?: GenreUpdateWithWhereUniqueWithoutSimilarInput | GenreUpdateWithWhereUniqueWithoutSimilarInput[]
    updateMany?: GenreUpdateManyWithWhereWithoutSimilarInput | GenreUpdateManyWithWhereWithoutSimilarInput[]
    deleteMany?: GenreScalarWhereInput | GenreScalarWhereInput[]
  }

  export type GenreUpdateManyWithoutSimilarByNestedInput = {
    create?: XOR<GenreCreateWithoutSimilarByInput, GenreUncheckedCreateWithoutSimilarByInput> | GenreCreateWithoutSimilarByInput[] | GenreUncheckedCreateWithoutSimilarByInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutSimilarByInput | GenreCreateOrConnectWithoutSimilarByInput[]
    upsert?: GenreUpsertWithWhereUniqueWithoutSimilarByInput | GenreUpsertWithWhereUniqueWithoutSimilarByInput[]
    set?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    disconnect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    delete?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    update?: GenreUpdateWithWhereUniqueWithoutSimilarByInput | GenreUpdateWithWhereUniqueWithoutSimilarByInput[]
    updateMany?: GenreUpdateManyWithWhereWithoutSimilarByInput | GenreUpdateManyWithWhereWithoutSimilarByInput[]
    deleteMany?: GenreScalarWhereInput | GenreScalarWhereInput[]
  }

  export type BookTemplateUpdateManyWithoutGenresNestedInput = {
    create?: XOR<BookTemplateCreateWithoutGenresInput, BookTemplateUncheckedCreateWithoutGenresInput> | BookTemplateCreateWithoutGenresInput[] | BookTemplateUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: BookTemplateCreateOrConnectWithoutGenresInput | BookTemplateCreateOrConnectWithoutGenresInput[]
    upsert?: BookTemplateUpsertWithWhereUniqueWithoutGenresInput | BookTemplateUpsertWithWhereUniqueWithoutGenresInput[]
    set?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    disconnect?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    delete?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    connect?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    update?: BookTemplateUpdateWithWhereUniqueWithoutGenresInput | BookTemplateUpdateWithWhereUniqueWithoutGenresInput[]
    updateMany?: BookTemplateUpdateManyWithWhereWithoutGenresInput | BookTemplateUpdateManyWithWhereWithoutGenresInput[]
    deleteMany?: BookTemplateScalarWhereInput | BookTemplateScalarWhereInput[]
  }

  export type ActivityUpdateManyWithoutGenreNestedInput = {
    create?: XOR<ActivityCreateWithoutGenreInput, ActivityUncheckedCreateWithoutGenreInput> | ActivityCreateWithoutGenreInput[] | ActivityUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutGenreInput | ActivityCreateOrConnectWithoutGenreInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutGenreInput | ActivityUpsertWithWhereUniqueWithoutGenreInput[]
    createMany?: ActivityCreateManyGenreInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutGenreInput | ActivityUpdateWithWhereUniqueWithoutGenreInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutGenreInput | ActivityUpdateManyWithWhereWithoutGenreInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUncheckedUpdateManyWithoutSelectedGenresNestedInput = {
    create?: XOR<UserCreateWithoutSelectedGenresInput, UserUncheckedCreateWithoutSelectedGenresInput> | UserCreateWithoutSelectedGenresInput[] | UserUncheckedCreateWithoutSelectedGenresInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSelectedGenresInput | UserCreateOrConnectWithoutSelectedGenresInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSelectedGenresInput | UserUpsertWithWhereUniqueWithoutSelectedGenresInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSelectedGenresInput | UserUpdateWithWhereUniqueWithoutSelectedGenresInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSelectedGenresInput | UserUpdateManyWithWhereWithoutSelectedGenresInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type BookUncheckedUpdateManyWithoutGenresNestedInput = {
    create?: XOR<BookCreateWithoutGenresInput, BookUncheckedCreateWithoutGenresInput> | BookCreateWithoutGenresInput[] | BookUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: BookCreateOrConnectWithoutGenresInput | BookCreateOrConnectWithoutGenresInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutGenresInput | BookUpsertWithWhereUniqueWithoutGenresInput[]
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutGenresInput | BookUpdateWithWhereUniqueWithoutGenresInput[]
    updateMany?: BookUpdateManyWithWhereWithoutGenresInput | BookUpdateManyWithWhereWithoutGenresInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type BookUncheckedUpdateManyWithoutMainGenreNestedInput = {
    create?: XOR<BookCreateWithoutMainGenreInput, BookUncheckedCreateWithoutMainGenreInput> | BookCreateWithoutMainGenreInput[] | BookUncheckedCreateWithoutMainGenreInput[]
    connectOrCreate?: BookCreateOrConnectWithoutMainGenreInput | BookCreateOrConnectWithoutMainGenreInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutMainGenreInput | BookUpsertWithWhereUniqueWithoutMainGenreInput[]
    createMany?: BookCreateManyMainGenreInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutMainGenreInput | BookUpdateWithWhereUniqueWithoutMainGenreInput[]
    updateMany?: BookUpdateManyWithWhereWithoutMainGenreInput | BookUpdateManyWithWhereWithoutMainGenreInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type GenreUncheckedUpdateManyWithoutSimilarNestedInput = {
    create?: XOR<GenreCreateWithoutSimilarInput, GenreUncheckedCreateWithoutSimilarInput> | GenreCreateWithoutSimilarInput[] | GenreUncheckedCreateWithoutSimilarInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutSimilarInput | GenreCreateOrConnectWithoutSimilarInput[]
    upsert?: GenreUpsertWithWhereUniqueWithoutSimilarInput | GenreUpsertWithWhereUniqueWithoutSimilarInput[]
    set?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    disconnect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    delete?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    update?: GenreUpdateWithWhereUniqueWithoutSimilarInput | GenreUpdateWithWhereUniqueWithoutSimilarInput[]
    updateMany?: GenreUpdateManyWithWhereWithoutSimilarInput | GenreUpdateManyWithWhereWithoutSimilarInput[]
    deleteMany?: GenreScalarWhereInput | GenreScalarWhereInput[]
  }

  export type GenreUncheckedUpdateManyWithoutSimilarByNestedInput = {
    create?: XOR<GenreCreateWithoutSimilarByInput, GenreUncheckedCreateWithoutSimilarByInput> | GenreCreateWithoutSimilarByInput[] | GenreUncheckedCreateWithoutSimilarByInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutSimilarByInput | GenreCreateOrConnectWithoutSimilarByInput[]
    upsert?: GenreUpsertWithWhereUniqueWithoutSimilarByInput | GenreUpsertWithWhereUniqueWithoutSimilarByInput[]
    set?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    disconnect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    delete?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    update?: GenreUpdateWithWhereUniqueWithoutSimilarByInput | GenreUpdateWithWhereUniqueWithoutSimilarByInput[]
    updateMany?: GenreUpdateManyWithWhereWithoutSimilarByInput | GenreUpdateManyWithWhereWithoutSimilarByInput[]
    deleteMany?: GenreScalarWhereInput | GenreScalarWhereInput[]
  }

  export type BookTemplateUncheckedUpdateManyWithoutGenresNestedInput = {
    create?: XOR<BookTemplateCreateWithoutGenresInput, BookTemplateUncheckedCreateWithoutGenresInput> | BookTemplateCreateWithoutGenresInput[] | BookTemplateUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: BookTemplateCreateOrConnectWithoutGenresInput | BookTemplateCreateOrConnectWithoutGenresInput[]
    upsert?: BookTemplateUpsertWithWhereUniqueWithoutGenresInput | BookTemplateUpsertWithWhereUniqueWithoutGenresInput[]
    set?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    disconnect?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    delete?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    connect?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    update?: BookTemplateUpdateWithWhereUniqueWithoutGenresInput | BookTemplateUpdateWithWhereUniqueWithoutGenresInput[]
    updateMany?: BookTemplateUpdateManyWithWhereWithoutGenresInput | BookTemplateUpdateManyWithWhereWithoutGenresInput[]
    deleteMany?: BookTemplateScalarWhereInput | BookTemplateScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutGenreNestedInput = {
    create?: XOR<ActivityCreateWithoutGenreInput, ActivityUncheckedCreateWithoutGenreInput> | ActivityCreateWithoutGenreInput[] | ActivityUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutGenreInput | ActivityCreateOrConnectWithoutGenreInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutGenreInput | ActivityUpsertWithWhereUniqueWithoutGenreInput[]
    createMany?: ActivityCreateManyGenreInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutGenreInput | ActivityUpdateWithWhereUniqueWithoutGenreInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutGenreInput | ActivityUpdateManyWithWhereWithoutGenreInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type BookCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<BookCreateWithoutActivitiesInput, BookUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: BookCreateOrConnectWithoutActivitiesInput
    connect?: BookWhereUniqueInput
  }

  export type GenreCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<GenreCreateWithoutActivitiesInput, GenreUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: GenreCreateOrConnectWithoutActivitiesInput
    connect?: GenreWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutActivityInput = {
    create?: XOR<UserCreateWithoutActivityInput, UserUncheckedCreateWithoutActivityInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityInput
    connect?: UserWhereUniqueInput
  }

  export type EnumActivitiesFieldUpdateOperationsInput = {
    set?: $Enums.Activities
  }

  export type BookUpdateOneWithoutActivitiesNestedInput = {
    create?: XOR<BookCreateWithoutActivitiesInput, BookUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: BookCreateOrConnectWithoutActivitiesInput
    upsert?: BookUpsertWithoutActivitiesInput
    disconnect?: BookWhereInput | boolean
    delete?: BookWhereInput | boolean
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutActivitiesInput, BookUpdateWithoutActivitiesInput>, BookUncheckedUpdateWithoutActivitiesInput>
  }

  export type GenreUpdateOneWithoutActivitiesNestedInput = {
    create?: XOR<GenreCreateWithoutActivitiesInput, GenreUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: GenreCreateOrConnectWithoutActivitiesInput
    upsert?: GenreUpsertWithoutActivitiesInput
    disconnect?: GenreWhereInput | boolean
    delete?: GenreWhereInput | boolean
    connect?: GenreWhereUniqueInput
    update?: XOR<XOR<GenreUpdateToOneWithWhereWithoutActivitiesInput, GenreUpdateWithoutActivitiesInput>, GenreUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserUpdateOneWithoutActivityNestedInput = {
    create?: XOR<UserCreateWithoutActivityInput, UserUncheckedCreateWithoutActivityInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityInput
    upsert?: UserUpsertWithoutActivityInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivityInput, UserUpdateWithoutActivityInput>, UserUncheckedUpdateWithoutActivityInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ReviewCreatetagsInput = {
    set: string[]
  }

  export type BookCreateNestedOneWithoutReviewInput = {
    create?: XOR<BookCreateWithoutReviewInput, BookUncheckedCreateWithoutReviewInput>
    connectOrCreate?: BookCreateOrConnectWithoutReviewInput
    connect?: BookWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewInput = {
    create?: XOR<UserCreateWithoutReviewInput, UserUncheckedCreateWithoutReviewInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewInput
    connect?: UserWhereUniqueInput
  }

  export type ReviewUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BookUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<BookCreateWithoutReviewInput, BookUncheckedCreateWithoutReviewInput>
    connectOrCreate?: BookCreateOrConnectWithoutReviewInput
    upsert?: BookUpsertWithoutReviewInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutReviewInput, BookUpdateWithoutReviewInput>, BookUncheckedUpdateWithoutReviewInput>
  }

  export type UserUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<UserCreateWithoutReviewInput, UserUncheckedCreateWithoutReviewInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewInput
    upsert?: UserUpsertWithoutReviewInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewInput, UserUpdateWithoutReviewInput>, UserUncheckedUpdateWithoutReviewInput>
  }

  export type GenreCreateNestedOneWithoutMainBooksInput = {
    create?: XOR<GenreCreateWithoutMainBooksInput, GenreUncheckedCreateWithoutMainBooksInput>
    connectOrCreate?: GenreCreateOrConnectWithoutMainBooksInput
    connect?: GenreWhereUniqueInput
  }

  export type GenreCreateNestedManyWithoutBooksInput = {
    create?: XOR<GenreCreateWithoutBooksInput, GenreUncheckedCreateWithoutBooksInput> | GenreCreateWithoutBooksInput[] | GenreUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutBooksInput | GenreCreateOrConnectWithoutBooksInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutBookInput = {
    create?: XOR<ReviewCreateWithoutBookInput, ReviewUncheckedCreateWithoutBookInput> | ReviewCreateWithoutBookInput[] | ReviewUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBookInput | ReviewCreateOrConnectWithoutBookInput[]
    createMany?: ReviewCreateManyBookInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutFinishedBooksInput = {
    create?: XOR<UserCreateWithoutFinishedBooksInput, UserUncheckedCreateWithoutFinishedBooksInput> | UserCreateWithoutFinishedBooksInput[] | UserUncheckedCreateWithoutFinishedBooksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFinishedBooksInput | UserCreateOrConnectWithoutFinishedBooksInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutSavedBooksInput = {
    create?: XOR<UserCreateWithoutSavedBooksInput, UserUncheckedCreateWithoutSavedBooksInput> | UserCreateWithoutSavedBooksInput[] | UserUncheckedCreateWithoutSavedBooksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSavedBooksInput | UserCreateOrConnectWithoutSavedBooksInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutReadingBooksInput = {
    create?: XOR<UserCreateWithoutReadingBooksInput, UserUncheckedCreateWithoutReadingBooksInput> | UserCreateWithoutReadingBooksInput[] | UserUncheckedCreateWithoutReadingBooksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutReadingBooksInput | UserCreateOrConnectWithoutReadingBooksInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ActivityCreateNestedManyWithoutBookInput = {
    create?: XOR<ActivityCreateWithoutBookInput, ActivityUncheckedCreateWithoutBookInput> | ActivityCreateWithoutBookInput[] | ActivityUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutBookInput | ActivityCreateOrConnectWithoutBookInput[]
    createMany?: ActivityCreateManyBookInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type ReadingHistoryCreateNestedManyWithoutBookInput = {
    create?: XOR<ReadingHistoryCreateWithoutBookInput, ReadingHistoryUncheckedCreateWithoutBookInput> | ReadingHistoryCreateWithoutBookInput[] | ReadingHistoryUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ReadingHistoryCreateOrConnectWithoutBookInput | ReadingHistoryCreateOrConnectWithoutBookInput[]
    createMany?: ReadingHistoryCreateManyBookInputEnvelope
    connect?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
  }

  export type BookCreateNestedManyWithoutSimilarByInput = {
    create?: XOR<BookCreateWithoutSimilarByInput, BookUncheckedCreateWithoutSimilarByInput> | BookCreateWithoutSimilarByInput[] | BookUncheckedCreateWithoutSimilarByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSimilarByInput | BookCreateOrConnectWithoutSimilarByInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BookCreateNestedManyWithoutSimilarBooksInput = {
    create?: XOR<BookCreateWithoutSimilarBooksInput, BookUncheckedCreateWithoutSimilarBooksInput> | BookCreateWithoutSimilarBooksInput[] | BookUncheckedCreateWithoutSimilarBooksInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSimilarBooksInput | BookCreateOrConnectWithoutSimilarBooksInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type GenreUncheckedCreateNestedManyWithoutBooksInput = {
    create?: XOR<GenreCreateWithoutBooksInput, GenreUncheckedCreateWithoutBooksInput> | GenreCreateWithoutBooksInput[] | GenreUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutBooksInput | GenreCreateOrConnectWithoutBooksInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<ReviewCreateWithoutBookInput, ReviewUncheckedCreateWithoutBookInput> | ReviewCreateWithoutBookInput[] | ReviewUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBookInput | ReviewCreateOrConnectWithoutBookInput[]
    createMany?: ReviewCreateManyBookInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFinishedBooksInput = {
    create?: XOR<UserCreateWithoutFinishedBooksInput, UserUncheckedCreateWithoutFinishedBooksInput> | UserCreateWithoutFinishedBooksInput[] | UserUncheckedCreateWithoutFinishedBooksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFinishedBooksInput | UserCreateOrConnectWithoutFinishedBooksInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutSavedBooksInput = {
    create?: XOR<UserCreateWithoutSavedBooksInput, UserUncheckedCreateWithoutSavedBooksInput> | UserCreateWithoutSavedBooksInput[] | UserUncheckedCreateWithoutSavedBooksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSavedBooksInput | UserCreateOrConnectWithoutSavedBooksInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutReadingBooksInput = {
    create?: XOR<UserCreateWithoutReadingBooksInput, UserUncheckedCreateWithoutReadingBooksInput> | UserCreateWithoutReadingBooksInput[] | UserUncheckedCreateWithoutReadingBooksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutReadingBooksInput | UserCreateOrConnectWithoutReadingBooksInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<ActivityCreateWithoutBookInput, ActivityUncheckedCreateWithoutBookInput> | ActivityCreateWithoutBookInput[] | ActivityUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutBookInput | ActivityCreateOrConnectWithoutBookInput[]
    createMany?: ActivityCreateManyBookInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type ReadingHistoryUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<ReadingHistoryCreateWithoutBookInput, ReadingHistoryUncheckedCreateWithoutBookInput> | ReadingHistoryCreateWithoutBookInput[] | ReadingHistoryUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ReadingHistoryCreateOrConnectWithoutBookInput | ReadingHistoryCreateOrConnectWithoutBookInput[]
    createMany?: ReadingHistoryCreateManyBookInputEnvelope
    connect?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
  }

  export type BookUncheckedCreateNestedManyWithoutSimilarByInput = {
    create?: XOR<BookCreateWithoutSimilarByInput, BookUncheckedCreateWithoutSimilarByInput> | BookCreateWithoutSimilarByInput[] | BookUncheckedCreateWithoutSimilarByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSimilarByInput | BookCreateOrConnectWithoutSimilarByInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BookUncheckedCreateNestedManyWithoutSimilarBooksInput = {
    create?: XOR<BookCreateWithoutSimilarBooksInput, BookUncheckedCreateWithoutSimilarBooksInput> | BookCreateWithoutSimilarBooksInput[] | BookUncheckedCreateWithoutSimilarBooksInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSimilarBooksInput | BookCreateOrConnectWithoutSimilarBooksInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GenreUpdateOneRequiredWithoutMainBooksNestedInput = {
    create?: XOR<GenreCreateWithoutMainBooksInput, GenreUncheckedCreateWithoutMainBooksInput>
    connectOrCreate?: GenreCreateOrConnectWithoutMainBooksInput
    upsert?: GenreUpsertWithoutMainBooksInput
    connect?: GenreWhereUniqueInput
    update?: XOR<XOR<GenreUpdateToOneWithWhereWithoutMainBooksInput, GenreUpdateWithoutMainBooksInput>, GenreUncheckedUpdateWithoutMainBooksInput>
  }

  export type GenreUpdateManyWithoutBooksNestedInput = {
    create?: XOR<GenreCreateWithoutBooksInput, GenreUncheckedCreateWithoutBooksInput> | GenreCreateWithoutBooksInput[] | GenreUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutBooksInput | GenreCreateOrConnectWithoutBooksInput[]
    upsert?: GenreUpsertWithWhereUniqueWithoutBooksInput | GenreUpsertWithWhereUniqueWithoutBooksInput[]
    set?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    disconnect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    delete?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    update?: GenreUpdateWithWhereUniqueWithoutBooksInput | GenreUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: GenreUpdateManyWithWhereWithoutBooksInput | GenreUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: GenreScalarWhereInput | GenreScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutBookNestedInput = {
    create?: XOR<ReviewCreateWithoutBookInput, ReviewUncheckedCreateWithoutBookInput> | ReviewCreateWithoutBookInput[] | ReviewUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBookInput | ReviewCreateOrConnectWithoutBookInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutBookInput | ReviewUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: ReviewCreateManyBookInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutBookInput | ReviewUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutBookInput | ReviewUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type UserUpdateManyWithoutFinishedBooksNestedInput = {
    create?: XOR<UserCreateWithoutFinishedBooksInput, UserUncheckedCreateWithoutFinishedBooksInput> | UserCreateWithoutFinishedBooksInput[] | UserUncheckedCreateWithoutFinishedBooksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFinishedBooksInput | UserCreateOrConnectWithoutFinishedBooksInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFinishedBooksInput | UserUpsertWithWhereUniqueWithoutFinishedBooksInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFinishedBooksInput | UserUpdateWithWhereUniqueWithoutFinishedBooksInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFinishedBooksInput | UserUpdateManyWithWhereWithoutFinishedBooksInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUpdateManyWithoutSavedBooksNestedInput = {
    create?: XOR<UserCreateWithoutSavedBooksInput, UserUncheckedCreateWithoutSavedBooksInput> | UserCreateWithoutSavedBooksInput[] | UserUncheckedCreateWithoutSavedBooksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSavedBooksInput | UserCreateOrConnectWithoutSavedBooksInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSavedBooksInput | UserUpsertWithWhereUniqueWithoutSavedBooksInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSavedBooksInput | UserUpdateWithWhereUniqueWithoutSavedBooksInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSavedBooksInput | UserUpdateManyWithWhereWithoutSavedBooksInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUpdateManyWithoutReadingBooksNestedInput = {
    create?: XOR<UserCreateWithoutReadingBooksInput, UserUncheckedCreateWithoutReadingBooksInput> | UserCreateWithoutReadingBooksInput[] | UserUncheckedCreateWithoutReadingBooksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutReadingBooksInput | UserCreateOrConnectWithoutReadingBooksInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutReadingBooksInput | UserUpsertWithWhereUniqueWithoutReadingBooksInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutReadingBooksInput | UserUpdateWithWhereUniqueWithoutReadingBooksInput[]
    updateMany?: UserUpdateManyWithWhereWithoutReadingBooksInput | UserUpdateManyWithWhereWithoutReadingBooksInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ActivityUpdateManyWithoutBookNestedInput = {
    create?: XOR<ActivityCreateWithoutBookInput, ActivityUncheckedCreateWithoutBookInput> | ActivityCreateWithoutBookInput[] | ActivityUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutBookInput | ActivityCreateOrConnectWithoutBookInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutBookInput | ActivityUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: ActivityCreateManyBookInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutBookInput | ActivityUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutBookInput | ActivityUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type ReadingHistoryUpdateManyWithoutBookNestedInput = {
    create?: XOR<ReadingHistoryCreateWithoutBookInput, ReadingHistoryUncheckedCreateWithoutBookInput> | ReadingHistoryCreateWithoutBookInput[] | ReadingHistoryUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ReadingHistoryCreateOrConnectWithoutBookInput | ReadingHistoryCreateOrConnectWithoutBookInput[]
    upsert?: ReadingHistoryUpsertWithWhereUniqueWithoutBookInput | ReadingHistoryUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: ReadingHistoryCreateManyBookInputEnvelope
    set?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    disconnect?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    delete?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    connect?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    update?: ReadingHistoryUpdateWithWhereUniqueWithoutBookInput | ReadingHistoryUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: ReadingHistoryUpdateManyWithWhereWithoutBookInput | ReadingHistoryUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: ReadingHistoryScalarWhereInput | ReadingHistoryScalarWhereInput[]
  }

  export type BookUpdateManyWithoutSimilarByNestedInput = {
    create?: XOR<BookCreateWithoutSimilarByInput, BookUncheckedCreateWithoutSimilarByInput> | BookCreateWithoutSimilarByInput[] | BookUncheckedCreateWithoutSimilarByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSimilarByInput | BookCreateOrConnectWithoutSimilarByInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutSimilarByInput | BookUpsertWithWhereUniqueWithoutSimilarByInput[]
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutSimilarByInput | BookUpdateWithWhereUniqueWithoutSimilarByInput[]
    updateMany?: BookUpdateManyWithWhereWithoutSimilarByInput | BookUpdateManyWithWhereWithoutSimilarByInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type BookUpdateManyWithoutSimilarBooksNestedInput = {
    create?: XOR<BookCreateWithoutSimilarBooksInput, BookUncheckedCreateWithoutSimilarBooksInput> | BookCreateWithoutSimilarBooksInput[] | BookUncheckedCreateWithoutSimilarBooksInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSimilarBooksInput | BookCreateOrConnectWithoutSimilarBooksInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutSimilarBooksInput | BookUpsertWithWhereUniqueWithoutSimilarBooksInput[]
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutSimilarBooksInput | BookUpdateWithWhereUniqueWithoutSimilarBooksInput[]
    updateMany?: BookUpdateManyWithWhereWithoutSimilarBooksInput | BookUpdateManyWithWhereWithoutSimilarBooksInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type GenreUncheckedUpdateManyWithoutBooksNestedInput = {
    create?: XOR<GenreCreateWithoutBooksInput, GenreUncheckedCreateWithoutBooksInput> | GenreCreateWithoutBooksInput[] | GenreUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutBooksInput | GenreCreateOrConnectWithoutBooksInput[]
    upsert?: GenreUpsertWithWhereUniqueWithoutBooksInput | GenreUpsertWithWhereUniqueWithoutBooksInput[]
    set?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    disconnect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    delete?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    update?: GenreUpdateWithWhereUniqueWithoutBooksInput | GenreUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: GenreUpdateManyWithWhereWithoutBooksInput | GenreUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: GenreScalarWhereInput | GenreScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<ReviewCreateWithoutBookInput, ReviewUncheckedCreateWithoutBookInput> | ReviewCreateWithoutBookInput[] | ReviewUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBookInput | ReviewCreateOrConnectWithoutBookInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutBookInput | ReviewUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: ReviewCreateManyBookInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutBookInput | ReviewUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutBookInput | ReviewUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFinishedBooksNestedInput = {
    create?: XOR<UserCreateWithoutFinishedBooksInput, UserUncheckedCreateWithoutFinishedBooksInput> | UserCreateWithoutFinishedBooksInput[] | UserUncheckedCreateWithoutFinishedBooksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFinishedBooksInput | UserCreateOrConnectWithoutFinishedBooksInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFinishedBooksInput | UserUpsertWithWhereUniqueWithoutFinishedBooksInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFinishedBooksInput | UserUpdateWithWhereUniqueWithoutFinishedBooksInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFinishedBooksInput | UserUpdateManyWithWhereWithoutFinishedBooksInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutSavedBooksNestedInput = {
    create?: XOR<UserCreateWithoutSavedBooksInput, UserUncheckedCreateWithoutSavedBooksInput> | UserCreateWithoutSavedBooksInput[] | UserUncheckedCreateWithoutSavedBooksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSavedBooksInput | UserCreateOrConnectWithoutSavedBooksInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSavedBooksInput | UserUpsertWithWhereUniqueWithoutSavedBooksInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSavedBooksInput | UserUpdateWithWhereUniqueWithoutSavedBooksInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSavedBooksInput | UserUpdateManyWithWhereWithoutSavedBooksInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutReadingBooksNestedInput = {
    create?: XOR<UserCreateWithoutReadingBooksInput, UserUncheckedCreateWithoutReadingBooksInput> | UserCreateWithoutReadingBooksInput[] | UserUncheckedCreateWithoutReadingBooksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutReadingBooksInput | UserCreateOrConnectWithoutReadingBooksInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutReadingBooksInput | UserUpsertWithWhereUniqueWithoutReadingBooksInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutReadingBooksInput | UserUpdateWithWhereUniqueWithoutReadingBooksInput[]
    updateMany?: UserUpdateManyWithWhereWithoutReadingBooksInput | UserUpdateManyWithWhereWithoutReadingBooksInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<ActivityCreateWithoutBookInput, ActivityUncheckedCreateWithoutBookInput> | ActivityCreateWithoutBookInput[] | ActivityUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutBookInput | ActivityCreateOrConnectWithoutBookInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutBookInput | ActivityUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: ActivityCreateManyBookInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutBookInput | ActivityUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutBookInput | ActivityUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type ReadingHistoryUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<ReadingHistoryCreateWithoutBookInput, ReadingHistoryUncheckedCreateWithoutBookInput> | ReadingHistoryCreateWithoutBookInput[] | ReadingHistoryUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ReadingHistoryCreateOrConnectWithoutBookInput | ReadingHistoryCreateOrConnectWithoutBookInput[]
    upsert?: ReadingHistoryUpsertWithWhereUniqueWithoutBookInput | ReadingHistoryUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: ReadingHistoryCreateManyBookInputEnvelope
    set?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    disconnect?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    delete?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    connect?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    update?: ReadingHistoryUpdateWithWhereUniqueWithoutBookInput | ReadingHistoryUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: ReadingHistoryUpdateManyWithWhereWithoutBookInput | ReadingHistoryUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: ReadingHistoryScalarWhereInput | ReadingHistoryScalarWhereInput[]
  }

  export type BookUncheckedUpdateManyWithoutSimilarByNestedInput = {
    create?: XOR<BookCreateWithoutSimilarByInput, BookUncheckedCreateWithoutSimilarByInput> | BookCreateWithoutSimilarByInput[] | BookUncheckedCreateWithoutSimilarByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSimilarByInput | BookCreateOrConnectWithoutSimilarByInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutSimilarByInput | BookUpsertWithWhereUniqueWithoutSimilarByInput[]
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutSimilarByInput | BookUpdateWithWhereUniqueWithoutSimilarByInput[]
    updateMany?: BookUpdateManyWithWhereWithoutSimilarByInput | BookUpdateManyWithWhereWithoutSimilarByInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type BookUncheckedUpdateManyWithoutSimilarBooksNestedInput = {
    create?: XOR<BookCreateWithoutSimilarBooksInput, BookUncheckedCreateWithoutSimilarBooksInput> | BookCreateWithoutSimilarBooksInput[] | BookUncheckedCreateWithoutSimilarBooksInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSimilarBooksInput | BookCreateOrConnectWithoutSimilarBooksInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutSimilarBooksInput | BookUpsertWithWhereUniqueWithoutSimilarBooksInput[]
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutSimilarBooksInput | BookUpdateWithWhereUniqueWithoutSimilarBooksInput[]
    updateMany?: BookUpdateManyWithWhereWithoutSimilarBooksInput | BookUpdateManyWithWhereWithoutSimilarBooksInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type GenreCreateNestedManyWithoutBookTemplatesInput = {
    create?: XOR<GenreCreateWithoutBookTemplatesInput, GenreUncheckedCreateWithoutBookTemplatesInput> | GenreCreateWithoutBookTemplatesInput[] | GenreUncheckedCreateWithoutBookTemplatesInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutBookTemplatesInput | GenreCreateOrConnectWithoutBookTemplatesInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
  }

  export type GenreUncheckedCreateNestedManyWithoutBookTemplatesInput = {
    create?: XOR<GenreCreateWithoutBookTemplatesInput, GenreUncheckedCreateWithoutBookTemplatesInput> | GenreCreateWithoutBookTemplatesInput[] | GenreUncheckedCreateWithoutBookTemplatesInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutBookTemplatesInput | GenreCreateOrConnectWithoutBookTemplatesInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
  }

  export type GenreUpdateManyWithoutBookTemplatesNestedInput = {
    create?: XOR<GenreCreateWithoutBookTemplatesInput, GenreUncheckedCreateWithoutBookTemplatesInput> | GenreCreateWithoutBookTemplatesInput[] | GenreUncheckedCreateWithoutBookTemplatesInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutBookTemplatesInput | GenreCreateOrConnectWithoutBookTemplatesInput[]
    upsert?: GenreUpsertWithWhereUniqueWithoutBookTemplatesInput | GenreUpsertWithWhereUniqueWithoutBookTemplatesInput[]
    set?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    disconnect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    delete?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    update?: GenreUpdateWithWhereUniqueWithoutBookTemplatesInput | GenreUpdateWithWhereUniqueWithoutBookTemplatesInput[]
    updateMany?: GenreUpdateManyWithWhereWithoutBookTemplatesInput | GenreUpdateManyWithWhereWithoutBookTemplatesInput[]
    deleteMany?: GenreScalarWhereInput | GenreScalarWhereInput[]
  }

  export type GenreUncheckedUpdateManyWithoutBookTemplatesNestedInput = {
    create?: XOR<GenreCreateWithoutBookTemplatesInput, GenreUncheckedCreateWithoutBookTemplatesInput> | GenreCreateWithoutBookTemplatesInput[] | GenreUncheckedCreateWithoutBookTemplatesInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutBookTemplatesInput | GenreCreateOrConnectWithoutBookTemplatesInput[]
    upsert?: GenreUpsertWithWhereUniqueWithoutBookTemplatesInput | GenreUpsertWithWhereUniqueWithoutBookTemplatesInput[]
    set?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    disconnect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    delete?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    update?: GenreUpdateWithWhereUniqueWithoutBookTemplatesInput | GenreUpdateWithWhereUniqueWithoutBookTemplatesInput[]
    updateMany?: GenreUpdateManyWithWhereWithoutBookTemplatesInput | GenreUpdateManyWithWhereWithoutBookTemplatesInput[]
    deleteMany?: GenreScalarWhereInput | GenreScalarWhereInput[]
  }

  export type GenreCreateNestedManyWithoutUsersInput = {
    create?: XOR<GenreCreateWithoutUsersInput, GenreUncheckedCreateWithoutUsersInput> | GenreCreateWithoutUsersInput[] | GenreUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutUsersInput | GenreCreateOrConnectWithoutUsersInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type BookCreateNestedManyWithoutSavedByInput = {
    create?: XOR<BookCreateWithoutSavedByInput, BookUncheckedCreateWithoutSavedByInput> | BookCreateWithoutSavedByInput[] | BookUncheckedCreateWithoutSavedByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSavedByInput | BookCreateOrConnectWithoutSavedByInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BookCreateNestedManyWithoutFinishedByInput = {
    create?: XOR<BookCreateWithoutFinishedByInput, BookUncheckedCreateWithoutFinishedByInput> | BookCreateWithoutFinishedByInput[] | BookUncheckedCreateWithoutFinishedByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutFinishedByInput | BookCreateOrConnectWithoutFinishedByInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BookCreateNestedManyWithoutReadingByInput = {
    create?: XOR<BookCreateWithoutReadingByInput, BookUncheckedCreateWithoutReadingByInput> | BookCreateWithoutReadingByInput[] | BookUncheckedCreateWithoutReadingByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutReadingByInput | BookCreateOrConnectWithoutReadingByInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type ActivityCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type ReadingHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<ReadingHistoryCreateWithoutUserInput, ReadingHistoryUncheckedCreateWithoutUserInput> | ReadingHistoryCreateWithoutUserInput[] | ReadingHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingHistoryCreateOrConnectWithoutUserInput | ReadingHistoryCreateOrConnectWithoutUserInput[]
    createMany?: ReadingHistoryCreateManyUserInputEnvelope
    connect?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
  }

  export type GenreUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<GenreCreateWithoutUsersInput, GenreUncheckedCreateWithoutUsersInput> | GenreCreateWithoutUsersInput[] | GenreUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutUsersInput | GenreCreateOrConnectWithoutUsersInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type BookUncheckedCreateNestedManyWithoutSavedByInput = {
    create?: XOR<BookCreateWithoutSavedByInput, BookUncheckedCreateWithoutSavedByInput> | BookCreateWithoutSavedByInput[] | BookUncheckedCreateWithoutSavedByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSavedByInput | BookCreateOrConnectWithoutSavedByInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BookUncheckedCreateNestedManyWithoutFinishedByInput = {
    create?: XOR<BookCreateWithoutFinishedByInput, BookUncheckedCreateWithoutFinishedByInput> | BookCreateWithoutFinishedByInput[] | BookUncheckedCreateWithoutFinishedByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutFinishedByInput | BookCreateOrConnectWithoutFinishedByInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BookUncheckedCreateNestedManyWithoutReadingByInput = {
    create?: XOR<BookCreateWithoutReadingByInput, BookUncheckedCreateWithoutReadingByInput> | BookCreateWithoutReadingByInput[] | BookUncheckedCreateWithoutReadingByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutReadingByInput | BookCreateOrConnectWithoutReadingByInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type ReadingHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReadingHistoryCreateWithoutUserInput, ReadingHistoryUncheckedCreateWithoutUserInput> | ReadingHistoryCreateWithoutUserInput[] | ReadingHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingHistoryCreateOrConnectWithoutUserInput | ReadingHistoryCreateOrConnectWithoutUserInput[]
    createMany?: ReadingHistoryCreateManyUserInputEnvelope
    connect?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type GenreUpdateManyWithoutUsersNestedInput = {
    create?: XOR<GenreCreateWithoutUsersInput, GenreUncheckedCreateWithoutUsersInput> | GenreCreateWithoutUsersInput[] | GenreUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutUsersInput | GenreCreateOrConnectWithoutUsersInput[]
    upsert?: GenreUpsertWithWhereUniqueWithoutUsersInput | GenreUpsertWithWhereUniqueWithoutUsersInput[]
    set?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    disconnect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    delete?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    update?: GenreUpdateWithWhereUniqueWithoutUsersInput | GenreUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: GenreUpdateManyWithWhereWithoutUsersInput | GenreUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: GenreScalarWhereInput | GenreScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type BookUpdateManyWithoutSavedByNestedInput = {
    create?: XOR<BookCreateWithoutSavedByInput, BookUncheckedCreateWithoutSavedByInput> | BookCreateWithoutSavedByInput[] | BookUncheckedCreateWithoutSavedByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSavedByInput | BookCreateOrConnectWithoutSavedByInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutSavedByInput | BookUpsertWithWhereUniqueWithoutSavedByInput[]
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutSavedByInput | BookUpdateWithWhereUniqueWithoutSavedByInput[]
    updateMany?: BookUpdateManyWithWhereWithoutSavedByInput | BookUpdateManyWithWhereWithoutSavedByInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type BookUpdateManyWithoutFinishedByNestedInput = {
    create?: XOR<BookCreateWithoutFinishedByInput, BookUncheckedCreateWithoutFinishedByInput> | BookCreateWithoutFinishedByInput[] | BookUncheckedCreateWithoutFinishedByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutFinishedByInput | BookCreateOrConnectWithoutFinishedByInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutFinishedByInput | BookUpsertWithWhereUniqueWithoutFinishedByInput[]
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutFinishedByInput | BookUpdateWithWhereUniqueWithoutFinishedByInput[]
    updateMany?: BookUpdateManyWithWhereWithoutFinishedByInput | BookUpdateManyWithWhereWithoutFinishedByInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type BookUpdateManyWithoutReadingByNestedInput = {
    create?: XOR<BookCreateWithoutReadingByInput, BookUncheckedCreateWithoutReadingByInput> | BookCreateWithoutReadingByInput[] | BookUncheckedCreateWithoutReadingByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutReadingByInput | BookCreateOrConnectWithoutReadingByInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutReadingByInput | BookUpsertWithWhereUniqueWithoutReadingByInput[]
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutReadingByInput | BookUpdateWithWhereUniqueWithoutReadingByInput[]
    updateMany?: BookUpdateManyWithWhereWithoutReadingByInput | BookUpdateManyWithWhereWithoutReadingByInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type ActivityUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type ReadingHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReadingHistoryCreateWithoutUserInput, ReadingHistoryUncheckedCreateWithoutUserInput> | ReadingHistoryCreateWithoutUserInput[] | ReadingHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingHistoryCreateOrConnectWithoutUserInput | ReadingHistoryCreateOrConnectWithoutUserInput[]
    upsert?: ReadingHistoryUpsertWithWhereUniqueWithoutUserInput | ReadingHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReadingHistoryCreateManyUserInputEnvelope
    set?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    disconnect?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    delete?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    connect?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    update?: ReadingHistoryUpdateWithWhereUniqueWithoutUserInput | ReadingHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReadingHistoryUpdateManyWithWhereWithoutUserInput | ReadingHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReadingHistoryScalarWhereInput | ReadingHistoryScalarWhereInput[]
  }

  export type GenreUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<GenreCreateWithoutUsersInput, GenreUncheckedCreateWithoutUsersInput> | GenreCreateWithoutUsersInput[] | GenreUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutUsersInput | GenreCreateOrConnectWithoutUsersInput[]
    upsert?: GenreUpsertWithWhereUniqueWithoutUsersInput | GenreUpsertWithWhereUniqueWithoutUsersInput[]
    set?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    disconnect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    delete?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    update?: GenreUpdateWithWhereUniqueWithoutUsersInput | GenreUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: GenreUpdateManyWithWhereWithoutUsersInput | GenreUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: GenreScalarWhereInput | GenreScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type BookUncheckedUpdateManyWithoutSavedByNestedInput = {
    create?: XOR<BookCreateWithoutSavedByInput, BookUncheckedCreateWithoutSavedByInput> | BookCreateWithoutSavedByInput[] | BookUncheckedCreateWithoutSavedByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSavedByInput | BookCreateOrConnectWithoutSavedByInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutSavedByInput | BookUpsertWithWhereUniqueWithoutSavedByInput[]
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutSavedByInput | BookUpdateWithWhereUniqueWithoutSavedByInput[]
    updateMany?: BookUpdateManyWithWhereWithoutSavedByInput | BookUpdateManyWithWhereWithoutSavedByInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type BookUncheckedUpdateManyWithoutFinishedByNestedInput = {
    create?: XOR<BookCreateWithoutFinishedByInput, BookUncheckedCreateWithoutFinishedByInput> | BookCreateWithoutFinishedByInput[] | BookUncheckedCreateWithoutFinishedByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutFinishedByInput | BookCreateOrConnectWithoutFinishedByInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutFinishedByInput | BookUpsertWithWhereUniqueWithoutFinishedByInput[]
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutFinishedByInput | BookUpdateWithWhereUniqueWithoutFinishedByInput[]
    updateMany?: BookUpdateManyWithWhereWithoutFinishedByInput | BookUpdateManyWithWhereWithoutFinishedByInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type BookUncheckedUpdateManyWithoutReadingByNestedInput = {
    create?: XOR<BookCreateWithoutReadingByInput, BookUncheckedCreateWithoutReadingByInput> | BookCreateWithoutReadingByInput[] | BookUncheckedCreateWithoutReadingByInput[]
    connectOrCreate?: BookCreateOrConnectWithoutReadingByInput | BookCreateOrConnectWithoutReadingByInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutReadingByInput | BookUpsertWithWhereUniqueWithoutReadingByInput[]
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutReadingByInput | BookUpdateWithWhereUniqueWithoutReadingByInput[]
    updateMany?: BookUpdateManyWithWhereWithoutReadingByInput | BookUpdateManyWithWhereWithoutReadingByInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type ReadingHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReadingHistoryCreateWithoutUserInput, ReadingHistoryUncheckedCreateWithoutUserInput> | ReadingHistoryCreateWithoutUserInput[] | ReadingHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingHistoryCreateOrConnectWithoutUserInput | ReadingHistoryCreateOrConnectWithoutUserInput[]
    upsert?: ReadingHistoryUpsertWithWhereUniqueWithoutUserInput | ReadingHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReadingHistoryCreateManyUserInputEnvelope
    set?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    disconnect?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    delete?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    connect?: ReadingHistoryWhereUniqueInput | ReadingHistoryWhereUniqueInput[]
    update?: ReadingHistoryUpdateWithWhereUniqueWithoutUserInput | ReadingHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReadingHistoryUpdateManyWithWhereWithoutUserInput | ReadingHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReadingHistoryScalarWhereInput | ReadingHistoryScalarWhereInput[]
  }

  export type BookCreateNestedOneWithoutReadingHistoryInput = {
    create?: XOR<BookCreateWithoutReadingHistoryInput, BookUncheckedCreateWithoutReadingHistoryInput>
    connectOrCreate?: BookCreateOrConnectWithoutReadingHistoryInput
    connect?: BookWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReadingHistoryInput = {
    create?: XOR<UserCreateWithoutReadingHistoryInput, UserUncheckedCreateWithoutReadingHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutReadingHistoryInput
    connect?: UserWhereUniqueInput
  }

  export type BookUpdateOneRequiredWithoutReadingHistoryNestedInput = {
    create?: XOR<BookCreateWithoutReadingHistoryInput, BookUncheckedCreateWithoutReadingHistoryInput>
    connectOrCreate?: BookCreateOrConnectWithoutReadingHistoryInput
    upsert?: BookUpsertWithoutReadingHistoryInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutReadingHistoryInput, BookUpdateWithoutReadingHistoryInput>, BookUncheckedUpdateWithoutReadingHistoryInput>
  }

  export type UserUpdateOneRequiredWithoutReadingHistoryNestedInput = {
    create?: XOR<UserCreateWithoutReadingHistoryInput, UserUncheckedCreateWithoutReadingHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutReadingHistoryInput
    upsert?: UserUpsertWithoutReadingHistoryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReadingHistoryInput, UserUpdateWithoutReadingHistoryInput>, UserUncheckedUpdateWithoutReadingHistoryInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumActivitiesFilter<$PrismaModel = never> = {
    equals?: $Enums.Activities | EnumActivitiesFieldRefInput<$PrismaModel>
    in?: $Enums.Activities[] | ListEnumActivitiesFieldRefInput<$PrismaModel>
    notIn?: $Enums.Activities[] | ListEnumActivitiesFieldRefInput<$PrismaModel>
    not?: NestedEnumActivitiesFilter<$PrismaModel> | $Enums.Activities
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumActivitiesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Activities | EnumActivitiesFieldRefInput<$PrismaModel>
    in?: $Enums.Activities[] | ListEnumActivitiesFieldRefInput<$PrismaModel>
    notIn?: $Enums.Activities[] | ListEnumActivitiesFieldRefInput<$PrismaModel>
    not?: NestedEnumActivitiesWithAggregatesFilter<$PrismaModel> | $Enums.Activities
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActivitiesFilter<$PrismaModel>
    _max?: NestedEnumActivitiesFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type UserCreateWithoutSelectedGenresInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    review?: ReviewCreateNestedManyWithoutUserInput
    savedBooks?: BookCreateNestedManyWithoutSavedByInput
    finishedBooks?: BookCreateNestedManyWithoutFinishedByInput
    readingBooks?: BookCreateNestedManyWithoutReadingByInput
    activity?: ActivityCreateNestedManyWithoutUserInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSelectedGenresInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    review?: ReviewUncheckedCreateNestedManyWithoutUserInput
    savedBooks?: BookUncheckedCreateNestedManyWithoutSavedByInput
    finishedBooks?: BookUncheckedCreateNestedManyWithoutFinishedByInput
    readingBooks?: BookUncheckedCreateNestedManyWithoutReadingByInput
    activity?: ActivityUncheckedCreateNestedManyWithoutUserInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSelectedGenresInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSelectedGenresInput, UserUncheckedCreateWithoutSelectedGenresInput>
  }

  export type BookCreateWithoutGenresInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenre: GenreCreateNestedOneWithoutMainBooksInput
    review?: ReviewCreateNestedManyWithoutBookInput
    finishedBy?: UserCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutBookInput
    similarBooks?: BookCreateNestedManyWithoutSimilarByInput
    similarBy?: BookCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookUncheckedCreateWithoutGenresInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenreId: number
    review?: ReviewUncheckedCreateNestedManyWithoutBookInput
    finishedBy?: UserUncheckedCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserUncheckedCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserUncheckedCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityUncheckedCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutBookInput
    similarBooks?: BookUncheckedCreateNestedManyWithoutSimilarByInput
    similarBy?: BookUncheckedCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookCreateOrConnectWithoutGenresInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutGenresInput, BookUncheckedCreateWithoutGenresInput>
  }

  export type BookCreateWithoutMainGenreInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    genres?: GenreCreateNestedManyWithoutBooksInput
    review?: ReviewCreateNestedManyWithoutBookInput
    finishedBy?: UserCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutBookInput
    similarBooks?: BookCreateNestedManyWithoutSimilarByInput
    similarBy?: BookCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookUncheckedCreateWithoutMainGenreInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    genres?: GenreUncheckedCreateNestedManyWithoutBooksInput
    review?: ReviewUncheckedCreateNestedManyWithoutBookInput
    finishedBy?: UserUncheckedCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserUncheckedCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserUncheckedCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityUncheckedCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutBookInput
    similarBooks?: BookUncheckedCreateNestedManyWithoutSimilarByInput
    similarBy?: BookUncheckedCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookCreateOrConnectWithoutMainGenreInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutMainGenreInput, BookUncheckedCreateWithoutMainGenreInput>
  }

  export type BookCreateManyMainGenreInputEnvelope = {
    data: BookCreateManyMainGenreInput | BookCreateManyMainGenreInput[]
    skipDuplicates?: boolean
  }

  export type GenreCreateWithoutSimilarInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserCreateNestedManyWithoutSelectedGenresInput
    books?: BookCreateNestedManyWithoutGenresInput
    mainBooks?: BookCreateNestedManyWithoutMainGenreInput
    similarBy?: GenreCreateNestedManyWithoutSimilarInput
    bookTemplates?: BookTemplateCreateNestedManyWithoutGenresInput
    activities?: ActivityCreateNestedManyWithoutGenreInput
  }

  export type GenreUncheckedCreateWithoutSimilarInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserUncheckedCreateNestedManyWithoutSelectedGenresInput
    books?: BookUncheckedCreateNestedManyWithoutGenresInput
    mainBooks?: BookUncheckedCreateNestedManyWithoutMainGenreInput
    similarBy?: GenreUncheckedCreateNestedManyWithoutSimilarInput
    bookTemplates?: BookTemplateUncheckedCreateNestedManyWithoutGenresInput
    activities?: ActivityUncheckedCreateNestedManyWithoutGenreInput
  }

  export type GenreCreateOrConnectWithoutSimilarInput = {
    where: GenreWhereUniqueInput
    create: XOR<GenreCreateWithoutSimilarInput, GenreUncheckedCreateWithoutSimilarInput>
  }

  export type GenreCreateWithoutSimilarByInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserCreateNestedManyWithoutSelectedGenresInput
    books?: BookCreateNestedManyWithoutGenresInput
    mainBooks?: BookCreateNestedManyWithoutMainGenreInput
    similar?: GenreCreateNestedManyWithoutSimilarByInput
    bookTemplates?: BookTemplateCreateNestedManyWithoutGenresInput
    activities?: ActivityCreateNestedManyWithoutGenreInput
  }

  export type GenreUncheckedCreateWithoutSimilarByInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserUncheckedCreateNestedManyWithoutSelectedGenresInput
    books?: BookUncheckedCreateNestedManyWithoutGenresInput
    mainBooks?: BookUncheckedCreateNestedManyWithoutMainGenreInput
    similar?: GenreUncheckedCreateNestedManyWithoutSimilarByInput
    bookTemplates?: BookTemplateUncheckedCreateNestedManyWithoutGenresInput
    activities?: ActivityUncheckedCreateNestedManyWithoutGenreInput
  }

  export type GenreCreateOrConnectWithoutSimilarByInput = {
    where: GenreWhereUniqueInput
    create: XOR<GenreCreateWithoutSimilarByInput, GenreUncheckedCreateWithoutSimilarByInput>
  }

  export type BookTemplateCreateWithoutGenresInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    picture: string
    rating?: number
  }

  export type BookTemplateUncheckedCreateWithoutGenresInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    picture: string
    rating?: number
  }

  export type BookTemplateCreateOrConnectWithoutGenresInput = {
    where: BookTemplateWhereUniqueInput
    create: XOR<BookTemplateCreateWithoutGenresInput, BookTemplateUncheckedCreateWithoutGenresInput>
  }

  export type ActivityCreateWithoutGenreInput = {
    createdAt?: Date | string
    type: $Enums.Activities
    importance: number
    book?: BookCreateNestedOneWithoutActivitiesInput
    user?: UserCreateNestedOneWithoutActivityInput
  }

  export type ActivityUncheckedCreateWithoutGenreInput = {
    id?: number
    createdAt?: Date | string
    type: $Enums.Activities
    importance: number
    bookId?: number | null
    userId?: number | null
  }

  export type ActivityCreateOrConnectWithoutGenreInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutGenreInput, ActivityUncheckedCreateWithoutGenreInput>
  }

  export type ActivityCreateManyGenreInputEnvelope = {
    data: ActivityCreateManyGenreInput | ActivityCreateManyGenreInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutSelectedGenresInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutSelectedGenresInput, UserUncheckedUpdateWithoutSelectedGenresInput>
    create: XOR<UserCreateWithoutSelectedGenresInput, UserUncheckedCreateWithoutSelectedGenresInput>
  }

  export type UserUpdateWithWhereUniqueWithoutSelectedGenresInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutSelectedGenresInput, UserUncheckedUpdateWithoutSelectedGenresInput>
  }

  export type UserUpdateManyWithWhereWithoutSelectedGenresInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutSelectedGenresInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    email?: StringFilter<"User"> | string
    socialId?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    picture?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    location?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
  }

  export type BookUpsertWithWhereUniqueWithoutGenresInput = {
    where: BookWhereUniqueInput
    update: XOR<BookUpdateWithoutGenresInput, BookUncheckedUpdateWithoutGenresInput>
    create: XOR<BookCreateWithoutGenresInput, BookUncheckedCreateWithoutGenresInput>
  }

  export type BookUpdateWithWhereUniqueWithoutGenresInput = {
    where: BookWhereUniqueInput
    data: XOR<BookUpdateWithoutGenresInput, BookUncheckedUpdateWithoutGenresInput>
  }

  export type BookUpdateManyWithWhereWithoutGenresInput = {
    where: BookScalarWhereInput
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyWithoutGenresInput>
  }

  export type BookScalarWhereInput = {
    AND?: BookScalarWhereInput | BookScalarWhereInput[]
    OR?: BookScalarWhereInput[]
    NOT?: BookScalarWhereInput | BookScalarWhereInput[]
    id?: IntFilter<"Book"> | number
    createdAt?: DateTimeFilter<"Book"> | Date | string
    updatedAt?: DateTimeFilter<"Book"> | Date | string
    title?: StringFilter<"Book"> | string
    slug?: StringFilter<"Book"> | string
    author?: StringFilter<"Book"> | string
    description?: StringFilter<"Book"> | string
    recommendable?: BoolFilter<"Book"> | boolean
    picture?: StringFilter<"Book"> | string
    ebook?: StringFilter<"Book"> | string
    readingTime?: IntFilter<"Book"> | number
    chapters?: IntFilter<"Book"> | number
    rating?: FloatFilter<"Book"> | number
    isPublic?: BoolFilter<"Book"> | boolean
    mainGenreId?: IntFilter<"Book"> | number
  }

  export type BookUpsertWithWhereUniqueWithoutMainGenreInput = {
    where: BookWhereUniqueInput
    update: XOR<BookUpdateWithoutMainGenreInput, BookUncheckedUpdateWithoutMainGenreInput>
    create: XOR<BookCreateWithoutMainGenreInput, BookUncheckedCreateWithoutMainGenreInput>
  }

  export type BookUpdateWithWhereUniqueWithoutMainGenreInput = {
    where: BookWhereUniqueInput
    data: XOR<BookUpdateWithoutMainGenreInput, BookUncheckedUpdateWithoutMainGenreInput>
  }

  export type BookUpdateManyWithWhereWithoutMainGenreInput = {
    where: BookScalarWhereInput
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyWithoutMainGenreInput>
  }

  export type GenreUpsertWithWhereUniqueWithoutSimilarInput = {
    where: GenreWhereUniqueInput
    update: XOR<GenreUpdateWithoutSimilarInput, GenreUncheckedUpdateWithoutSimilarInput>
    create: XOR<GenreCreateWithoutSimilarInput, GenreUncheckedCreateWithoutSimilarInput>
  }

  export type GenreUpdateWithWhereUniqueWithoutSimilarInput = {
    where: GenreWhereUniqueInput
    data: XOR<GenreUpdateWithoutSimilarInput, GenreUncheckedUpdateWithoutSimilarInput>
  }

  export type GenreUpdateManyWithWhereWithoutSimilarInput = {
    where: GenreScalarWhereInput
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyWithoutSimilarInput>
  }

  export type GenreScalarWhereInput = {
    AND?: GenreScalarWhereInput | GenreScalarWhereInput[]
    OR?: GenreScalarWhereInput[]
    NOT?: GenreScalarWhereInput | GenreScalarWhereInput[]
    id?: IntFilter<"Genre"> | number
    createdAt?: DateTimeFilter<"Genre"> | Date | string
    updatedAt?: DateTimeFilter<"Genre"> | Date | string
    name?: StringFilter<"Genre"> | string
    slug?: StringFilter<"Genre"> | string
    icon?: StringFilter<"Genre"> | string
  }

  export type GenreUpsertWithWhereUniqueWithoutSimilarByInput = {
    where: GenreWhereUniqueInput
    update: XOR<GenreUpdateWithoutSimilarByInput, GenreUncheckedUpdateWithoutSimilarByInput>
    create: XOR<GenreCreateWithoutSimilarByInput, GenreUncheckedCreateWithoutSimilarByInput>
  }

  export type GenreUpdateWithWhereUniqueWithoutSimilarByInput = {
    where: GenreWhereUniqueInput
    data: XOR<GenreUpdateWithoutSimilarByInput, GenreUncheckedUpdateWithoutSimilarByInput>
  }

  export type GenreUpdateManyWithWhereWithoutSimilarByInput = {
    where: GenreScalarWhereInput
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyWithoutSimilarByInput>
  }

  export type BookTemplateUpsertWithWhereUniqueWithoutGenresInput = {
    where: BookTemplateWhereUniqueInput
    update: XOR<BookTemplateUpdateWithoutGenresInput, BookTemplateUncheckedUpdateWithoutGenresInput>
    create: XOR<BookTemplateCreateWithoutGenresInput, BookTemplateUncheckedCreateWithoutGenresInput>
  }

  export type BookTemplateUpdateWithWhereUniqueWithoutGenresInput = {
    where: BookTemplateWhereUniqueInput
    data: XOR<BookTemplateUpdateWithoutGenresInput, BookTemplateUncheckedUpdateWithoutGenresInput>
  }

  export type BookTemplateUpdateManyWithWhereWithoutGenresInput = {
    where: BookTemplateScalarWhereInput
    data: XOR<BookTemplateUpdateManyMutationInput, BookTemplateUncheckedUpdateManyWithoutGenresInput>
  }

  export type BookTemplateScalarWhereInput = {
    AND?: BookTemplateScalarWhereInput | BookTemplateScalarWhereInput[]
    OR?: BookTemplateScalarWhereInput[]
    NOT?: BookTemplateScalarWhereInput | BookTemplateScalarWhereInput[]
    id?: IntFilter<"BookTemplate"> | number
    createdAt?: DateTimeFilter<"BookTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"BookTemplate"> | Date | string
    title?: StringFilter<"BookTemplate"> | string
    slug?: StringFilter<"BookTemplate"> | string
    author?: StringFilter<"BookTemplate"> | string
    description?: StringFilter<"BookTemplate"> | string
    picture?: StringFilter<"BookTemplate"> | string
    rating?: FloatFilter<"BookTemplate"> | number
  }

  export type ActivityUpsertWithWhereUniqueWithoutGenreInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutGenreInput, ActivityUncheckedUpdateWithoutGenreInput>
    create: XOR<ActivityCreateWithoutGenreInput, ActivityUncheckedCreateWithoutGenreInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutGenreInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutGenreInput, ActivityUncheckedUpdateWithoutGenreInput>
  }

  export type ActivityUpdateManyWithWhereWithoutGenreInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutGenreInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: IntFilter<"Activity"> | number
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    type?: EnumActivitiesFilter<"Activity"> | $Enums.Activities
    importance?: IntFilter<"Activity"> | number
    genreId?: IntNullableFilter<"Activity"> | number | null
    bookId?: IntNullableFilter<"Activity"> | number | null
    userId?: IntNullableFilter<"Activity"> | number | null
  }

  export type BookCreateWithoutActivitiesInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenre: GenreCreateNestedOneWithoutMainBooksInput
    genres?: GenreCreateNestedManyWithoutBooksInput
    review?: ReviewCreateNestedManyWithoutBookInput
    finishedBy?: UserCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserCreateNestedManyWithoutReadingBooksInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutBookInput
    similarBooks?: BookCreateNestedManyWithoutSimilarByInput
    similarBy?: BookCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookUncheckedCreateWithoutActivitiesInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenreId: number
    genres?: GenreUncheckedCreateNestedManyWithoutBooksInput
    review?: ReviewUncheckedCreateNestedManyWithoutBookInput
    finishedBy?: UserUncheckedCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserUncheckedCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserUncheckedCreateNestedManyWithoutReadingBooksInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutBookInput
    similarBooks?: BookUncheckedCreateNestedManyWithoutSimilarByInput
    similarBy?: BookUncheckedCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookCreateOrConnectWithoutActivitiesInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutActivitiesInput, BookUncheckedCreateWithoutActivitiesInput>
  }

  export type GenreCreateWithoutActivitiesInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserCreateNestedManyWithoutSelectedGenresInput
    books?: BookCreateNestedManyWithoutGenresInput
    mainBooks?: BookCreateNestedManyWithoutMainGenreInput
    similarBy?: GenreCreateNestedManyWithoutSimilarInput
    similar?: GenreCreateNestedManyWithoutSimilarByInput
    bookTemplates?: BookTemplateCreateNestedManyWithoutGenresInput
  }

  export type GenreUncheckedCreateWithoutActivitiesInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserUncheckedCreateNestedManyWithoutSelectedGenresInput
    books?: BookUncheckedCreateNestedManyWithoutGenresInput
    mainBooks?: BookUncheckedCreateNestedManyWithoutMainGenreInput
    similarBy?: GenreUncheckedCreateNestedManyWithoutSimilarInput
    similar?: GenreUncheckedCreateNestedManyWithoutSimilarByInput
    bookTemplates?: BookTemplateUncheckedCreateNestedManyWithoutGenresInput
  }

  export type GenreCreateOrConnectWithoutActivitiesInput = {
    where: GenreWhereUniqueInput
    create: XOR<GenreCreateWithoutActivitiesInput, GenreUncheckedCreateWithoutActivitiesInput>
  }

  export type UserCreateWithoutActivityInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreCreateNestedManyWithoutUsersInput
    review?: ReviewCreateNestedManyWithoutUserInput
    savedBooks?: BookCreateNestedManyWithoutSavedByInput
    finishedBooks?: BookCreateNestedManyWithoutFinishedByInput
    readingBooks?: BookCreateNestedManyWithoutReadingByInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActivityInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreUncheckedCreateNestedManyWithoutUsersInput
    review?: ReviewUncheckedCreateNestedManyWithoutUserInput
    savedBooks?: BookUncheckedCreateNestedManyWithoutSavedByInput
    finishedBooks?: BookUncheckedCreateNestedManyWithoutFinishedByInput
    readingBooks?: BookUncheckedCreateNestedManyWithoutReadingByInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActivityInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivityInput, UserUncheckedCreateWithoutActivityInput>
  }

  export type BookUpsertWithoutActivitiesInput = {
    update: XOR<BookUpdateWithoutActivitiesInput, BookUncheckedUpdateWithoutActivitiesInput>
    create: XOR<BookCreateWithoutActivitiesInput, BookUncheckedCreateWithoutActivitiesInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutActivitiesInput, BookUncheckedUpdateWithoutActivitiesInput>
  }

  export type BookUpdateWithoutActivitiesInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenre?: GenreUpdateOneRequiredWithoutMainBooksNestedInput
    genres?: GenreUpdateManyWithoutBooksNestedInput
    review?: ReviewUpdateManyWithoutBookNestedInput
    finishedBy?: UserUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUpdateManyWithoutReadingBooksNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutBookNestedInput
    similarBooks?: BookUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateWithoutActivitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
    genres?: GenreUncheckedUpdateManyWithoutBooksNestedInput
    review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
    finishedBy?: UserUncheckedUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUncheckedUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUncheckedUpdateManyWithoutReadingBooksNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutBookNestedInput
    similarBooks?: BookUncheckedUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUncheckedUpdateManyWithoutSimilarBooksNestedInput
  }

  export type GenreUpsertWithoutActivitiesInput = {
    update: XOR<GenreUpdateWithoutActivitiesInput, GenreUncheckedUpdateWithoutActivitiesInput>
    create: XOR<GenreCreateWithoutActivitiesInput, GenreUncheckedCreateWithoutActivitiesInput>
    where?: GenreWhereInput
  }

  export type GenreUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: GenreWhereInput
    data: XOR<GenreUpdateWithoutActivitiesInput, GenreUncheckedUpdateWithoutActivitiesInput>
  }

  export type GenreUpdateWithoutActivitiesInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutSelectedGenresNestedInput
    books?: BookUpdateManyWithoutGenresNestedInput
    mainBooks?: BookUpdateManyWithoutMainGenreNestedInput
    similarBy?: GenreUpdateManyWithoutSimilarNestedInput
    similar?: GenreUpdateManyWithoutSimilarByNestedInput
    bookTemplates?: BookTemplateUpdateManyWithoutGenresNestedInput
  }

  export type GenreUncheckedUpdateWithoutActivitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutSelectedGenresNestedInput
    books?: BookUncheckedUpdateManyWithoutGenresNestedInput
    mainBooks?: BookUncheckedUpdateManyWithoutMainGenreNestedInput
    similarBy?: GenreUncheckedUpdateManyWithoutSimilarNestedInput
    similar?: GenreUncheckedUpdateManyWithoutSimilarByNestedInput
    bookTemplates?: BookTemplateUncheckedUpdateManyWithoutGenresNestedInput
  }

  export type UserUpsertWithoutActivityInput = {
    update: XOR<UserUpdateWithoutActivityInput, UserUncheckedUpdateWithoutActivityInput>
    create: XOR<UserCreateWithoutActivityInput, UserUncheckedCreateWithoutActivityInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivityInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivityInput, UserUncheckedUpdateWithoutActivityInput>
  }

  export type UserUpdateWithoutActivityInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUpdateManyWithoutUsersNestedInput
    review?: ReviewUpdateManyWithoutUserNestedInput
    savedBooks?: BookUpdateManyWithoutSavedByNestedInput
    finishedBooks?: BookUpdateManyWithoutFinishedByNestedInput
    readingBooks?: BookUpdateManyWithoutReadingByNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivityInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUncheckedUpdateManyWithoutUsersNestedInput
    review?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    savedBooks?: BookUncheckedUpdateManyWithoutSavedByNestedInput
    finishedBooks?: BookUncheckedUpdateManyWithoutFinishedByNestedInput
    readingBooks?: BookUncheckedUpdateManyWithoutReadingByNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BookCreateWithoutReviewInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenre: GenreCreateNestedOneWithoutMainBooksInput
    genres?: GenreCreateNestedManyWithoutBooksInput
    finishedBy?: UserCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutBookInput
    similarBooks?: BookCreateNestedManyWithoutSimilarByInput
    similarBy?: BookCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookUncheckedCreateWithoutReviewInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenreId: number
    genres?: GenreUncheckedCreateNestedManyWithoutBooksInput
    finishedBy?: UserUncheckedCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserUncheckedCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserUncheckedCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityUncheckedCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutBookInput
    similarBooks?: BookUncheckedCreateNestedManyWithoutSimilarByInput
    similarBy?: BookUncheckedCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookCreateOrConnectWithoutReviewInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutReviewInput, BookUncheckedCreateWithoutReviewInput>
  }

  export type UserCreateWithoutReviewInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreCreateNestedManyWithoutUsersInput
    savedBooks?: BookCreateNestedManyWithoutSavedByInput
    finishedBooks?: BookCreateNestedManyWithoutFinishedByInput
    readingBooks?: BookCreateNestedManyWithoutReadingByInput
    activity?: ActivityCreateNestedManyWithoutUserInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreUncheckedCreateNestedManyWithoutUsersInput
    savedBooks?: BookUncheckedCreateNestedManyWithoutSavedByInput
    finishedBooks?: BookUncheckedCreateNestedManyWithoutFinishedByInput
    readingBooks?: BookUncheckedCreateNestedManyWithoutReadingByInput
    activity?: ActivityUncheckedCreateNestedManyWithoutUserInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewInput, UserUncheckedCreateWithoutReviewInput>
  }

  export type BookUpsertWithoutReviewInput = {
    update: XOR<BookUpdateWithoutReviewInput, BookUncheckedUpdateWithoutReviewInput>
    create: XOR<BookCreateWithoutReviewInput, BookUncheckedCreateWithoutReviewInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutReviewInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutReviewInput, BookUncheckedUpdateWithoutReviewInput>
  }

  export type BookUpdateWithoutReviewInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenre?: GenreUpdateOneRequiredWithoutMainBooksNestedInput
    genres?: GenreUpdateManyWithoutBooksNestedInput
    finishedBy?: UserUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutBookNestedInput
    similarBooks?: BookUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateWithoutReviewInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
    genres?: GenreUncheckedUpdateManyWithoutBooksNestedInput
    finishedBy?: UserUncheckedUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUncheckedUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUncheckedUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutBookNestedInput
    similarBooks?: BookUncheckedUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUncheckedUpdateManyWithoutSimilarBooksNestedInput
  }

  export type UserUpsertWithoutReviewInput = {
    update: XOR<UserUpdateWithoutReviewInput, UserUncheckedUpdateWithoutReviewInput>
    create: XOR<UserCreateWithoutReviewInput, UserUncheckedCreateWithoutReviewInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewInput, UserUncheckedUpdateWithoutReviewInput>
  }

  export type UserUpdateWithoutReviewInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUpdateManyWithoutUsersNestedInput
    savedBooks?: BookUpdateManyWithoutSavedByNestedInput
    finishedBooks?: BookUpdateManyWithoutFinishedByNestedInput
    readingBooks?: BookUpdateManyWithoutReadingByNestedInput
    activity?: ActivityUpdateManyWithoutUserNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUncheckedUpdateManyWithoutUsersNestedInput
    savedBooks?: BookUncheckedUpdateManyWithoutSavedByNestedInput
    finishedBooks?: BookUncheckedUpdateManyWithoutFinishedByNestedInput
    readingBooks?: BookUncheckedUpdateManyWithoutReadingByNestedInput
    activity?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GenreCreateWithoutMainBooksInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserCreateNestedManyWithoutSelectedGenresInput
    books?: BookCreateNestedManyWithoutGenresInput
    similarBy?: GenreCreateNestedManyWithoutSimilarInput
    similar?: GenreCreateNestedManyWithoutSimilarByInput
    bookTemplates?: BookTemplateCreateNestedManyWithoutGenresInput
    activities?: ActivityCreateNestedManyWithoutGenreInput
  }

  export type GenreUncheckedCreateWithoutMainBooksInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserUncheckedCreateNestedManyWithoutSelectedGenresInput
    books?: BookUncheckedCreateNestedManyWithoutGenresInput
    similarBy?: GenreUncheckedCreateNestedManyWithoutSimilarInput
    similar?: GenreUncheckedCreateNestedManyWithoutSimilarByInput
    bookTemplates?: BookTemplateUncheckedCreateNestedManyWithoutGenresInput
    activities?: ActivityUncheckedCreateNestedManyWithoutGenreInput
  }

  export type GenreCreateOrConnectWithoutMainBooksInput = {
    where: GenreWhereUniqueInput
    create: XOR<GenreCreateWithoutMainBooksInput, GenreUncheckedCreateWithoutMainBooksInput>
  }

  export type GenreCreateWithoutBooksInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserCreateNestedManyWithoutSelectedGenresInput
    mainBooks?: BookCreateNestedManyWithoutMainGenreInput
    similarBy?: GenreCreateNestedManyWithoutSimilarInput
    similar?: GenreCreateNestedManyWithoutSimilarByInput
    bookTemplates?: BookTemplateCreateNestedManyWithoutGenresInput
    activities?: ActivityCreateNestedManyWithoutGenreInput
  }

  export type GenreUncheckedCreateWithoutBooksInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserUncheckedCreateNestedManyWithoutSelectedGenresInput
    mainBooks?: BookUncheckedCreateNestedManyWithoutMainGenreInput
    similarBy?: GenreUncheckedCreateNestedManyWithoutSimilarInput
    similar?: GenreUncheckedCreateNestedManyWithoutSimilarByInput
    bookTemplates?: BookTemplateUncheckedCreateNestedManyWithoutGenresInput
    activities?: ActivityUncheckedCreateNestedManyWithoutGenreInput
  }

  export type GenreCreateOrConnectWithoutBooksInput = {
    where: GenreWhereUniqueInput
    create: XOR<GenreCreateWithoutBooksInput, GenreUncheckedCreateWithoutBooksInput>
  }

  export type ReviewCreateWithoutBookInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    rating: number
    tags?: ReviewCreatetagsInput | string[]
    text?: string | null
    user: UserCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutBookInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rating: number
    tags?: ReviewCreatetagsInput | string[]
    text?: string | null
    userId: number
  }

  export type ReviewCreateOrConnectWithoutBookInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutBookInput, ReviewUncheckedCreateWithoutBookInput>
  }

  export type ReviewCreateManyBookInputEnvelope = {
    data: ReviewCreateManyBookInput | ReviewCreateManyBookInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutFinishedBooksInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreCreateNestedManyWithoutUsersInput
    review?: ReviewCreateNestedManyWithoutUserInput
    savedBooks?: BookCreateNestedManyWithoutSavedByInput
    readingBooks?: BookCreateNestedManyWithoutReadingByInput
    activity?: ActivityCreateNestedManyWithoutUserInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFinishedBooksInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreUncheckedCreateNestedManyWithoutUsersInput
    review?: ReviewUncheckedCreateNestedManyWithoutUserInput
    savedBooks?: BookUncheckedCreateNestedManyWithoutSavedByInput
    readingBooks?: BookUncheckedCreateNestedManyWithoutReadingByInput
    activity?: ActivityUncheckedCreateNestedManyWithoutUserInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFinishedBooksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFinishedBooksInput, UserUncheckedCreateWithoutFinishedBooksInput>
  }

  export type UserCreateWithoutSavedBooksInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreCreateNestedManyWithoutUsersInput
    review?: ReviewCreateNestedManyWithoutUserInput
    finishedBooks?: BookCreateNestedManyWithoutFinishedByInput
    readingBooks?: BookCreateNestedManyWithoutReadingByInput
    activity?: ActivityCreateNestedManyWithoutUserInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSavedBooksInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreUncheckedCreateNestedManyWithoutUsersInput
    review?: ReviewUncheckedCreateNestedManyWithoutUserInput
    finishedBooks?: BookUncheckedCreateNestedManyWithoutFinishedByInput
    readingBooks?: BookUncheckedCreateNestedManyWithoutReadingByInput
    activity?: ActivityUncheckedCreateNestedManyWithoutUserInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSavedBooksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedBooksInput, UserUncheckedCreateWithoutSavedBooksInput>
  }

  export type UserCreateWithoutReadingBooksInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreCreateNestedManyWithoutUsersInput
    review?: ReviewCreateNestedManyWithoutUserInput
    savedBooks?: BookCreateNestedManyWithoutSavedByInput
    finishedBooks?: BookCreateNestedManyWithoutFinishedByInput
    activity?: ActivityCreateNestedManyWithoutUserInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReadingBooksInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreUncheckedCreateNestedManyWithoutUsersInput
    review?: ReviewUncheckedCreateNestedManyWithoutUserInput
    savedBooks?: BookUncheckedCreateNestedManyWithoutSavedByInput
    finishedBooks?: BookUncheckedCreateNestedManyWithoutFinishedByInput
    activity?: ActivityUncheckedCreateNestedManyWithoutUserInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReadingBooksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReadingBooksInput, UserUncheckedCreateWithoutReadingBooksInput>
  }

  export type ActivityCreateWithoutBookInput = {
    createdAt?: Date | string
    type: $Enums.Activities
    importance: number
    genre?: GenreCreateNestedOneWithoutActivitiesInput
    user?: UserCreateNestedOneWithoutActivityInput
  }

  export type ActivityUncheckedCreateWithoutBookInput = {
    id?: number
    createdAt?: Date | string
    type: $Enums.Activities
    importance: number
    genreId?: number | null
    userId?: number | null
  }

  export type ActivityCreateOrConnectWithoutBookInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutBookInput, ActivityUncheckedCreateWithoutBookInput>
  }

  export type ActivityCreateManyBookInputEnvelope = {
    data: ActivityCreateManyBookInput | ActivityCreateManyBookInput[]
    skipDuplicates?: boolean
  }

  export type ReadingHistoryCreateWithoutBookInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    startDate: Date | string
    endDate: Date | string
    readingTimeMs: number
    scrollPosition: number
    user: UserCreateNestedOneWithoutReadingHistoryInput
  }

  export type ReadingHistoryUncheckedCreateWithoutBookInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startDate: Date | string
    endDate: Date | string
    readingTimeMs: number
    scrollPosition: number
    userId: number
  }

  export type ReadingHistoryCreateOrConnectWithoutBookInput = {
    where: ReadingHistoryWhereUniqueInput
    create: XOR<ReadingHistoryCreateWithoutBookInput, ReadingHistoryUncheckedCreateWithoutBookInput>
  }

  export type ReadingHistoryCreateManyBookInputEnvelope = {
    data: ReadingHistoryCreateManyBookInput | ReadingHistoryCreateManyBookInput[]
    skipDuplicates?: boolean
  }

  export type BookCreateWithoutSimilarByInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenre: GenreCreateNestedOneWithoutMainBooksInput
    genres?: GenreCreateNestedManyWithoutBooksInput
    review?: ReviewCreateNestedManyWithoutBookInput
    finishedBy?: UserCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutBookInput
    similarBooks?: BookCreateNestedManyWithoutSimilarByInput
  }

  export type BookUncheckedCreateWithoutSimilarByInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenreId: number
    genres?: GenreUncheckedCreateNestedManyWithoutBooksInput
    review?: ReviewUncheckedCreateNestedManyWithoutBookInput
    finishedBy?: UserUncheckedCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserUncheckedCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserUncheckedCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityUncheckedCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutBookInput
    similarBooks?: BookUncheckedCreateNestedManyWithoutSimilarByInput
  }

  export type BookCreateOrConnectWithoutSimilarByInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutSimilarByInput, BookUncheckedCreateWithoutSimilarByInput>
  }

  export type BookCreateWithoutSimilarBooksInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenre: GenreCreateNestedOneWithoutMainBooksInput
    genres?: GenreCreateNestedManyWithoutBooksInput
    review?: ReviewCreateNestedManyWithoutBookInput
    finishedBy?: UserCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutBookInput
    similarBy?: BookCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookUncheckedCreateWithoutSimilarBooksInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenreId: number
    genres?: GenreUncheckedCreateNestedManyWithoutBooksInput
    review?: ReviewUncheckedCreateNestedManyWithoutBookInput
    finishedBy?: UserUncheckedCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserUncheckedCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserUncheckedCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityUncheckedCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutBookInput
    similarBy?: BookUncheckedCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookCreateOrConnectWithoutSimilarBooksInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutSimilarBooksInput, BookUncheckedCreateWithoutSimilarBooksInput>
  }

  export type GenreUpsertWithoutMainBooksInput = {
    update: XOR<GenreUpdateWithoutMainBooksInput, GenreUncheckedUpdateWithoutMainBooksInput>
    create: XOR<GenreCreateWithoutMainBooksInput, GenreUncheckedCreateWithoutMainBooksInput>
    where?: GenreWhereInput
  }

  export type GenreUpdateToOneWithWhereWithoutMainBooksInput = {
    where?: GenreWhereInput
    data: XOR<GenreUpdateWithoutMainBooksInput, GenreUncheckedUpdateWithoutMainBooksInput>
  }

  export type GenreUpdateWithoutMainBooksInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutSelectedGenresNestedInput
    books?: BookUpdateManyWithoutGenresNestedInput
    similarBy?: GenreUpdateManyWithoutSimilarNestedInput
    similar?: GenreUpdateManyWithoutSimilarByNestedInput
    bookTemplates?: BookTemplateUpdateManyWithoutGenresNestedInput
    activities?: ActivityUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateWithoutMainBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutSelectedGenresNestedInput
    books?: BookUncheckedUpdateManyWithoutGenresNestedInput
    similarBy?: GenreUncheckedUpdateManyWithoutSimilarNestedInput
    similar?: GenreUncheckedUpdateManyWithoutSimilarByNestedInput
    bookTemplates?: BookTemplateUncheckedUpdateManyWithoutGenresNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutGenreNestedInput
  }

  export type GenreUpsertWithWhereUniqueWithoutBooksInput = {
    where: GenreWhereUniqueInput
    update: XOR<GenreUpdateWithoutBooksInput, GenreUncheckedUpdateWithoutBooksInput>
    create: XOR<GenreCreateWithoutBooksInput, GenreUncheckedCreateWithoutBooksInput>
  }

  export type GenreUpdateWithWhereUniqueWithoutBooksInput = {
    where: GenreWhereUniqueInput
    data: XOR<GenreUpdateWithoutBooksInput, GenreUncheckedUpdateWithoutBooksInput>
  }

  export type GenreUpdateManyWithWhereWithoutBooksInput = {
    where: GenreScalarWhereInput
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyWithoutBooksInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutBookInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutBookInput, ReviewUncheckedUpdateWithoutBookInput>
    create: XOR<ReviewCreateWithoutBookInput, ReviewUncheckedCreateWithoutBookInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutBookInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutBookInput, ReviewUncheckedUpdateWithoutBookInput>
  }

  export type ReviewUpdateManyWithWhereWithoutBookInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutBookInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: IntFilter<"Review"> | number
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    rating?: IntFilter<"Review"> | number
    tags?: StringNullableListFilter<"Review">
    text?: StringNullableFilter<"Review"> | string | null
    bookId?: IntFilter<"Review"> | number
    userId?: IntFilter<"Review"> | number
  }

  export type UserUpsertWithWhereUniqueWithoutFinishedBooksInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFinishedBooksInput, UserUncheckedUpdateWithoutFinishedBooksInput>
    create: XOR<UserCreateWithoutFinishedBooksInput, UserUncheckedCreateWithoutFinishedBooksInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFinishedBooksInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFinishedBooksInput, UserUncheckedUpdateWithoutFinishedBooksInput>
  }

  export type UserUpdateManyWithWhereWithoutFinishedBooksInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFinishedBooksInput>
  }

  export type UserUpsertWithWhereUniqueWithoutSavedBooksInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutSavedBooksInput, UserUncheckedUpdateWithoutSavedBooksInput>
    create: XOR<UserCreateWithoutSavedBooksInput, UserUncheckedCreateWithoutSavedBooksInput>
  }

  export type UserUpdateWithWhereUniqueWithoutSavedBooksInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutSavedBooksInput, UserUncheckedUpdateWithoutSavedBooksInput>
  }

  export type UserUpdateManyWithWhereWithoutSavedBooksInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutSavedBooksInput>
  }

  export type UserUpsertWithWhereUniqueWithoutReadingBooksInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutReadingBooksInput, UserUncheckedUpdateWithoutReadingBooksInput>
    create: XOR<UserCreateWithoutReadingBooksInput, UserUncheckedCreateWithoutReadingBooksInput>
  }

  export type UserUpdateWithWhereUniqueWithoutReadingBooksInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutReadingBooksInput, UserUncheckedUpdateWithoutReadingBooksInput>
  }

  export type UserUpdateManyWithWhereWithoutReadingBooksInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutReadingBooksInput>
  }

  export type ActivityUpsertWithWhereUniqueWithoutBookInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutBookInput, ActivityUncheckedUpdateWithoutBookInput>
    create: XOR<ActivityCreateWithoutBookInput, ActivityUncheckedCreateWithoutBookInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutBookInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutBookInput, ActivityUncheckedUpdateWithoutBookInput>
  }

  export type ActivityUpdateManyWithWhereWithoutBookInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutBookInput>
  }

  export type ReadingHistoryUpsertWithWhereUniqueWithoutBookInput = {
    where: ReadingHistoryWhereUniqueInput
    update: XOR<ReadingHistoryUpdateWithoutBookInput, ReadingHistoryUncheckedUpdateWithoutBookInput>
    create: XOR<ReadingHistoryCreateWithoutBookInput, ReadingHistoryUncheckedCreateWithoutBookInput>
  }

  export type ReadingHistoryUpdateWithWhereUniqueWithoutBookInput = {
    where: ReadingHistoryWhereUniqueInput
    data: XOR<ReadingHistoryUpdateWithoutBookInput, ReadingHistoryUncheckedUpdateWithoutBookInput>
  }

  export type ReadingHistoryUpdateManyWithWhereWithoutBookInput = {
    where: ReadingHistoryScalarWhereInput
    data: XOR<ReadingHistoryUpdateManyMutationInput, ReadingHistoryUncheckedUpdateManyWithoutBookInput>
  }

  export type ReadingHistoryScalarWhereInput = {
    AND?: ReadingHistoryScalarWhereInput | ReadingHistoryScalarWhereInput[]
    OR?: ReadingHistoryScalarWhereInput[]
    NOT?: ReadingHistoryScalarWhereInput | ReadingHistoryScalarWhereInput[]
    id?: IntFilter<"ReadingHistory"> | number
    createdAt?: DateTimeFilter<"ReadingHistory"> | Date | string
    updatedAt?: DateTimeFilter<"ReadingHistory"> | Date | string
    startDate?: DateTimeFilter<"ReadingHistory"> | Date | string
    endDate?: DateTimeFilter<"ReadingHistory"> | Date | string
    readingTimeMs?: IntFilter<"ReadingHistory"> | number
    scrollPosition?: IntFilter<"ReadingHistory"> | number
    bookId?: IntFilter<"ReadingHistory"> | number
    userId?: IntFilter<"ReadingHistory"> | number
  }

  export type BookUpsertWithWhereUniqueWithoutSimilarByInput = {
    where: BookWhereUniqueInput
    update: XOR<BookUpdateWithoutSimilarByInput, BookUncheckedUpdateWithoutSimilarByInput>
    create: XOR<BookCreateWithoutSimilarByInput, BookUncheckedCreateWithoutSimilarByInput>
  }

  export type BookUpdateWithWhereUniqueWithoutSimilarByInput = {
    where: BookWhereUniqueInput
    data: XOR<BookUpdateWithoutSimilarByInput, BookUncheckedUpdateWithoutSimilarByInput>
  }

  export type BookUpdateManyWithWhereWithoutSimilarByInput = {
    where: BookScalarWhereInput
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyWithoutSimilarByInput>
  }

  export type BookUpsertWithWhereUniqueWithoutSimilarBooksInput = {
    where: BookWhereUniqueInput
    update: XOR<BookUpdateWithoutSimilarBooksInput, BookUncheckedUpdateWithoutSimilarBooksInput>
    create: XOR<BookCreateWithoutSimilarBooksInput, BookUncheckedCreateWithoutSimilarBooksInput>
  }

  export type BookUpdateWithWhereUniqueWithoutSimilarBooksInput = {
    where: BookWhereUniqueInput
    data: XOR<BookUpdateWithoutSimilarBooksInput, BookUncheckedUpdateWithoutSimilarBooksInput>
  }

  export type BookUpdateManyWithWhereWithoutSimilarBooksInput = {
    where: BookScalarWhereInput
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyWithoutSimilarBooksInput>
  }

  export type GenreCreateWithoutBookTemplatesInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserCreateNestedManyWithoutSelectedGenresInput
    books?: BookCreateNestedManyWithoutGenresInput
    mainBooks?: BookCreateNestedManyWithoutMainGenreInput
    similarBy?: GenreCreateNestedManyWithoutSimilarInput
    similar?: GenreCreateNestedManyWithoutSimilarByInput
    activities?: ActivityCreateNestedManyWithoutGenreInput
  }

  export type GenreUncheckedCreateWithoutBookTemplatesInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    users?: UserUncheckedCreateNestedManyWithoutSelectedGenresInput
    books?: BookUncheckedCreateNestedManyWithoutGenresInput
    mainBooks?: BookUncheckedCreateNestedManyWithoutMainGenreInput
    similarBy?: GenreUncheckedCreateNestedManyWithoutSimilarInput
    similar?: GenreUncheckedCreateNestedManyWithoutSimilarByInput
    activities?: ActivityUncheckedCreateNestedManyWithoutGenreInput
  }

  export type GenreCreateOrConnectWithoutBookTemplatesInput = {
    where: GenreWhereUniqueInput
    create: XOR<GenreCreateWithoutBookTemplatesInput, GenreUncheckedCreateWithoutBookTemplatesInput>
  }

  export type GenreUpsertWithWhereUniqueWithoutBookTemplatesInput = {
    where: GenreWhereUniqueInput
    update: XOR<GenreUpdateWithoutBookTemplatesInput, GenreUncheckedUpdateWithoutBookTemplatesInput>
    create: XOR<GenreCreateWithoutBookTemplatesInput, GenreUncheckedCreateWithoutBookTemplatesInput>
  }

  export type GenreUpdateWithWhereUniqueWithoutBookTemplatesInput = {
    where: GenreWhereUniqueInput
    data: XOR<GenreUpdateWithoutBookTemplatesInput, GenreUncheckedUpdateWithoutBookTemplatesInput>
  }

  export type GenreUpdateManyWithWhereWithoutBookTemplatesInput = {
    where: GenreScalarWhereInput
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyWithoutBookTemplatesInput>
  }

  export type GenreCreateWithoutUsersInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    books?: BookCreateNestedManyWithoutGenresInput
    mainBooks?: BookCreateNestedManyWithoutMainGenreInput
    similarBy?: GenreCreateNestedManyWithoutSimilarInput
    similar?: GenreCreateNestedManyWithoutSimilarByInput
    bookTemplates?: BookTemplateCreateNestedManyWithoutGenresInput
    activities?: ActivityCreateNestedManyWithoutGenreInput
  }

  export type GenreUncheckedCreateWithoutUsersInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    slug: string
    icon?: string
    books?: BookUncheckedCreateNestedManyWithoutGenresInput
    mainBooks?: BookUncheckedCreateNestedManyWithoutMainGenreInput
    similarBy?: GenreUncheckedCreateNestedManyWithoutSimilarInput
    similar?: GenreUncheckedCreateNestedManyWithoutSimilarByInput
    bookTemplates?: BookTemplateUncheckedCreateNestedManyWithoutGenresInput
    activities?: ActivityUncheckedCreateNestedManyWithoutGenreInput
  }

  export type GenreCreateOrConnectWithoutUsersInput = {
    where: GenreWhereUniqueInput
    create: XOR<GenreCreateWithoutUsersInput, GenreUncheckedCreateWithoutUsersInput>
  }

  export type ReviewCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    rating: number
    tags?: ReviewCreatetagsInput | string[]
    text?: string | null
    book: BookCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rating: number
    tags?: ReviewCreatetagsInput | string[]
    text?: string | null
    bookId: number
  }

  export type ReviewCreateOrConnectWithoutUserInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewCreateManyUserInputEnvelope = {
    data: ReviewCreateManyUserInput | ReviewCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BookCreateWithoutSavedByInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenre: GenreCreateNestedOneWithoutMainBooksInput
    genres?: GenreCreateNestedManyWithoutBooksInput
    review?: ReviewCreateNestedManyWithoutBookInput
    finishedBy?: UserCreateNestedManyWithoutFinishedBooksInput
    readingBy?: UserCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutBookInput
    similarBooks?: BookCreateNestedManyWithoutSimilarByInput
    similarBy?: BookCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookUncheckedCreateWithoutSavedByInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenreId: number
    genres?: GenreUncheckedCreateNestedManyWithoutBooksInput
    review?: ReviewUncheckedCreateNestedManyWithoutBookInput
    finishedBy?: UserUncheckedCreateNestedManyWithoutFinishedBooksInput
    readingBy?: UserUncheckedCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityUncheckedCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutBookInput
    similarBooks?: BookUncheckedCreateNestedManyWithoutSimilarByInput
    similarBy?: BookUncheckedCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookCreateOrConnectWithoutSavedByInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutSavedByInput, BookUncheckedCreateWithoutSavedByInput>
  }

  export type BookCreateWithoutFinishedByInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenre: GenreCreateNestedOneWithoutMainBooksInput
    genres?: GenreCreateNestedManyWithoutBooksInput
    review?: ReviewCreateNestedManyWithoutBookInput
    savedBy?: UserCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutBookInput
    similarBooks?: BookCreateNestedManyWithoutSimilarByInput
    similarBy?: BookCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookUncheckedCreateWithoutFinishedByInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenreId: number
    genres?: GenreUncheckedCreateNestedManyWithoutBooksInput
    review?: ReviewUncheckedCreateNestedManyWithoutBookInput
    savedBy?: UserUncheckedCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserUncheckedCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityUncheckedCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutBookInput
    similarBooks?: BookUncheckedCreateNestedManyWithoutSimilarByInput
    similarBy?: BookUncheckedCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookCreateOrConnectWithoutFinishedByInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutFinishedByInput, BookUncheckedCreateWithoutFinishedByInput>
  }

  export type BookCreateWithoutReadingByInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenre: GenreCreateNestedOneWithoutMainBooksInput
    genres?: GenreCreateNestedManyWithoutBooksInput
    review?: ReviewCreateNestedManyWithoutBookInput
    finishedBy?: UserCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserCreateNestedManyWithoutSavedBooksInput
    activities?: ActivityCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryCreateNestedManyWithoutBookInput
    similarBooks?: BookCreateNestedManyWithoutSimilarByInput
    similarBy?: BookCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookUncheckedCreateWithoutReadingByInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenreId: number
    genres?: GenreUncheckedCreateNestedManyWithoutBooksInput
    review?: ReviewUncheckedCreateNestedManyWithoutBookInput
    finishedBy?: UserUncheckedCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserUncheckedCreateNestedManyWithoutSavedBooksInput
    activities?: ActivityUncheckedCreateNestedManyWithoutBookInput
    ReadingHistory?: ReadingHistoryUncheckedCreateNestedManyWithoutBookInput
    similarBooks?: BookUncheckedCreateNestedManyWithoutSimilarByInput
    similarBy?: BookUncheckedCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookCreateOrConnectWithoutReadingByInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutReadingByInput, BookUncheckedCreateWithoutReadingByInput>
  }

  export type ActivityCreateWithoutUserInput = {
    createdAt?: Date | string
    type: $Enums.Activities
    importance: number
    book?: BookCreateNestedOneWithoutActivitiesInput
    genre?: GenreCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    type: $Enums.Activities
    importance: number
    genreId?: number | null
    bookId?: number | null
  }

  export type ActivityCreateOrConnectWithoutUserInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityCreateManyUserInputEnvelope = {
    data: ActivityCreateManyUserInput | ActivityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReadingHistoryCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    startDate: Date | string
    endDate: Date | string
    readingTimeMs: number
    scrollPosition: number
    book: BookCreateNestedOneWithoutReadingHistoryInput
  }

  export type ReadingHistoryUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startDate: Date | string
    endDate: Date | string
    readingTimeMs: number
    scrollPosition: number
    bookId: number
  }

  export type ReadingHistoryCreateOrConnectWithoutUserInput = {
    where: ReadingHistoryWhereUniqueInput
    create: XOR<ReadingHistoryCreateWithoutUserInput, ReadingHistoryUncheckedCreateWithoutUserInput>
  }

  export type ReadingHistoryCreateManyUserInputEnvelope = {
    data: ReadingHistoryCreateManyUserInput | ReadingHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GenreUpsertWithWhereUniqueWithoutUsersInput = {
    where: GenreWhereUniqueInput
    update: XOR<GenreUpdateWithoutUsersInput, GenreUncheckedUpdateWithoutUsersInput>
    create: XOR<GenreCreateWithoutUsersInput, GenreUncheckedCreateWithoutUsersInput>
  }

  export type GenreUpdateWithWhereUniqueWithoutUsersInput = {
    where: GenreWhereUniqueInput
    data: XOR<GenreUpdateWithoutUsersInput, GenreUncheckedUpdateWithoutUsersInput>
  }

  export type GenreUpdateManyWithWhereWithoutUsersInput = {
    where: GenreScalarWhereInput
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyWithoutUsersInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
  }

  export type ReviewUpdateManyWithWhereWithoutUserInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutUserInput>
  }

  export type BookUpsertWithWhereUniqueWithoutSavedByInput = {
    where: BookWhereUniqueInput
    update: XOR<BookUpdateWithoutSavedByInput, BookUncheckedUpdateWithoutSavedByInput>
    create: XOR<BookCreateWithoutSavedByInput, BookUncheckedCreateWithoutSavedByInput>
  }

  export type BookUpdateWithWhereUniqueWithoutSavedByInput = {
    where: BookWhereUniqueInput
    data: XOR<BookUpdateWithoutSavedByInput, BookUncheckedUpdateWithoutSavedByInput>
  }

  export type BookUpdateManyWithWhereWithoutSavedByInput = {
    where: BookScalarWhereInput
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyWithoutSavedByInput>
  }

  export type BookUpsertWithWhereUniqueWithoutFinishedByInput = {
    where: BookWhereUniqueInput
    update: XOR<BookUpdateWithoutFinishedByInput, BookUncheckedUpdateWithoutFinishedByInput>
    create: XOR<BookCreateWithoutFinishedByInput, BookUncheckedCreateWithoutFinishedByInput>
  }

  export type BookUpdateWithWhereUniqueWithoutFinishedByInput = {
    where: BookWhereUniqueInput
    data: XOR<BookUpdateWithoutFinishedByInput, BookUncheckedUpdateWithoutFinishedByInput>
  }

  export type BookUpdateManyWithWhereWithoutFinishedByInput = {
    where: BookScalarWhereInput
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyWithoutFinishedByInput>
  }

  export type BookUpsertWithWhereUniqueWithoutReadingByInput = {
    where: BookWhereUniqueInput
    update: XOR<BookUpdateWithoutReadingByInput, BookUncheckedUpdateWithoutReadingByInput>
    create: XOR<BookCreateWithoutReadingByInput, BookUncheckedCreateWithoutReadingByInput>
  }

  export type BookUpdateWithWhereUniqueWithoutReadingByInput = {
    where: BookWhereUniqueInput
    data: XOR<BookUpdateWithoutReadingByInput, BookUncheckedUpdateWithoutReadingByInput>
  }

  export type BookUpdateManyWithWhereWithoutReadingByInput = {
    where: BookScalarWhereInput
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyWithoutReadingByInput>
  }

  export type ActivityUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
  }

  export type ActivityUpdateManyWithWhereWithoutUserInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutUserInput>
  }

  export type ReadingHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: ReadingHistoryWhereUniqueInput
    update: XOR<ReadingHistoryUpdateWithoutUserInput, ReadingHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<ReadingHistoryCreateWithoutUserInput, ReadingHistoryUncheckedCreateWithoutUserInput>
  }

  export type ReadingHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: ReadingHistoryWhereUniqueInput
    data: XOR<ReadingHistoryUpdateWithoutUserInput, ReadingHistoryUncheckedUpdateWithoutUserInput>
  }

  export type ReadingHistoryUpdateManyWithWhereWithoutUserInput = {
    where: ReadingHistoryScalarWhereInput
    data: XOR<ReadingHistoryUpdateManyMutationInput, ReadingHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type BookCreateWithoutReadingHistoryInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenre: GenreCreateNestedOneWithoutMainBooksInput
    genres?: GenreCreateNestedManyWithoutBooksInput
    review?: ReviewCreateNestedManyWithoutBookInput
    finishedBy?: UserCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityCreateNestedManyWithoutBookInput
    similarBooks?: BookCreateNestedManyWithoutSimilarByInput
    similarBy?: BookCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookUncheckedCreateWithoutReadingHistoryInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
    mainGenreId: number
    genres?: GenreUncheckedCreateNestedManyWithoutBooksInput
    review?: ReviewUncheckedCreateNestedManyWithoutBookInput
    finishedBy?: UserUncheckedCreateNestedManyWithoutFinishedBooksInput
    savedBy?: UserUncheckedCreateNestedManyWithoutSavedBooksInput
    readingBy?: UserUncheckedCreateNestedManyWithoutReadingBooksInput
    activities?: ActivityUncheckedCreateNestedManyWithoutBookInput
    similarBooks?: BookUncheckedCreateNestedManyWithoutSimilarByInput
    similarBy?: BookUncheckedCreateNestedManyWithoutSimilarBooksInput
  }

  export type BookCreateOrConnectWithoutReadingHistoryInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutReadingHistoryInput, BookUncheckedCreateWithoutReadingHistoryInput>
  }

  export type UserCreateWithoutReadingHistoryInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreCreateNestedManyWithoutUsersInput
    review?: ReviewCreateNestedManyWithoutUserInput
    savedBooks?: BookCreateNestedManyWithoutSavedByInput
    finishedBooks?: BookCreateNestedManyWithoutFinishedByInput
    readingBooks?: BookCreateNestedManyWithoutReadingByInput
    activity?: ActivityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReadingHistoryInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    socialId?: string | null
    password?: string | null
    picture?: string
    fullName?: string
    location?: string
    role?: $Enums.Role
    selectedGenres?: GenreUncheckedCreateNestedManyWithoutUsersInput
    review?: ReviewUncheckedCreateNestedManyWithoutUserInput
    savedBooks?: BookUncheckedCreateNestedManyWithoutSavedByInput
    finishedBooks?: BookUncheckedCreateNestedManyWithoutFinishedByInput
    readingBooks?: BookUncheckedCreateNestedManyWithoutReadingByInput
    activity?: ActivityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReadingHistoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReadingHistoryInput, UserUncheckedCreateWithoutReadingHistoryInput>
  }

  export type BookUpsertWithoutReadingHistoryInput = {
    update: XOR<BookUpdateWithoutReadingHistoryInput, BookUncheckedUpdateWithoutReadingHistoryInput>
    create: XOR<BookCreateWithoutReadingHistoryInput, BookUncheckedCreateWithoutReadingHistoryInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutReadingHistoryInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutReadingHistoryInput, BookUncheckedUpdateWithoutReadingHistoryInput>
  }

  export type BookUpdateWithoutReadingHistoryInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenre?: GenreUpdateOneRequiredWithoutMainBooksNestedInput
    genres?: GenreUpdateManyWithoutBooksNestedInput
    review?: ReviewUpdateManyWithoutBookNestedInput
    finishedBy?: UserUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUpdateManyWithoutBookNestedInput
    similarBooks?: BookUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateWithoutReadingHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
    genres?: GenreUncheckedUpdateManyWithoutBooksNestedInput
    review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
    finishedBy?: UserUncheckedUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUncheckedUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUncheckedUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutBookNestedInput
    similarBooks?: BookUncheckedUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUncheckedUpdateManyWithoutSimilarBooksNestedInput
  }

  export type UserUpsertWithoutReadingHistoryInput = {
    update: XOR<UserUpdateWithoutReadingHistoryInput, UserUncheckedUpdateWithoutReadingHistoryInput>
    create: XOR<UserCreateWithoutReadingHistoryInput, UserUncheckedCreateWithoutReadingHistoryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReadingHistoryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReadingHistoryInput, UserUncheckedUpdateWithoutReadingHistoryInput>
  }

  export type UserUpdateWithoutReadingHistoryInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUpdateManyWithoutUsersNestedInput
    review?: ReviewUpdateManyWithoutUserNestedInput
    savedBooks?: BookUpdateManyWithoutSavedByNestedInput
    finishedBooks?: BookUpdateManyWithoutFinishedByNestedInput
    readingBooks?: BookUpdateManyWithoutReadingByNestedInput
    activity?: ActivityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReadingHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUncheckedUpdateManyWithoutUsersNestedInput
    review?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    savedBooks?: BookUncheckedUpdateManyWithoutSavedByNestedInput
    finishedBooks?: BookUncheckedUpdateManyWithoutFinishedByNestedInput
    readingBooks?: BookUncheckedUpdateManyWithoutReadingByNestedInput
    activity?: ActivityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BookCreateManyMainGenreInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    author: string
    description: string
    recommendable?: boolean
    picture: string
    ebook: string
    readingTime?: number
    chapters?: number
    rating?: number
    isPublic?: boolean
  }

  export type ActivityCreateManyGenreInput = {
    id?: number
    createdAt?: Date | string
    type: $Enums.Activities
    importance: number
    bookId?: number | null
    userId?: number | null
  }

  export type UserUpdateWithoutSelectedGenresInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    review?: ReviewUpdateManyWithoutUserNestedInput
    savedBooks?: BookUpdateManyWithoutSavedByNestedInput
    finishedBooks?: BookUpdateManyWithoutFinishedByNestedInput
    readingBooks?: BookUpdateManyWithoutReadingByNestedInput
    activity?: ActivityUpdateManyWithoutUserNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSelectedGenresInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    review?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    savedBooks?: BookUncheckedUpdateManyWithoutSavedByNestedInput
    finishedBooks?: BookUncheckedUpdateManyWithoutFinishedByNestedInput
    readingBooks?: BookUncheckedUpdateManyWithoutReadingByNestedInput
    activity?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutSelectedGenresInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type BookUpdateWithoutGenresInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenre?: GenreUpdateOneRequiredWithoutMainBooksNestedInput
    review?: ReviewUpdateManyWithoutBookNestedInput
    finishedBy?: UserUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutBookNestedInput
    similarBooks?: BookUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateWithoutGenresInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
    review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
    finishedBy?: UserUncheckedUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUncheckedUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUncheckedUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutBookNestedInput
    similarBooks?: BookUncheckedUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUncheckedUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateManyWithoutGenresInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
  }

  export type BookUpdateWithoutMainGenreInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    genres?: GenreUpdateManyWithoutBooksNestedInput
    review?: ReviewUpdateManyWithoutBookNestedInput
    finishedBy?: UserUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutBookNestedInput
    similarBooks?: BookUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateWithoutMainGenreInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    genres?: GenreUncheckedUpdateManyWithoutBooksNestedInput
    review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
    finishedBy?: UserUncheckedUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUncheckedUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUncheckedUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutBookNestedInput
    similarBooks?: BookUncheckedUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUncheckedUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateManyWithoutMainGenreInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GenreUpdateWithoutSimilarInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutSelectedGenresNestedInput
    books?: BookUpdateManyWithoutGenresNestedInput
    mainBooks?: BookUpdateManyWithoutMainGenreNestedInput
    similarBy?: GenreUpdateManyWithoutSimilarNestedInput
    bookTemplates?: BookTemplateUpdateManyWithoutGenresNestedInput
    activities?: ActivityUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateWithoutSimilarInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutSelectedGenresNestedInput
    books?: BookUncheckedUpdateManyWithoutGenresNestedInput
    mainBooks?: BookUncheckedUpdateManyWithoutMainGenreNestedInput
    similarBy?: GenreUncheckedUpdateManyWithoutSimilarNestedInput
    bookTemplates?: BookTemplateUncheckedUpdateManyWithoutGenresNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateManyWithoutSimilarInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
  }

  export type GenreUpdateWithoutSimilarByInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutSelectedGenresNestedInput
    books?: BookUpdateManyWithoutGenresNestedInput
    mainBooks?: BookUpdateManyWithoutMainGenreNestedInput
    similar?: GenreUpdateManyWithoutSimilarByNestedInput
    bookTemplates?: BookTemplateUpdateManyWithoutGenresNestedInput
    activities?: ActivityUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateWithoutSimilarByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutSelectedGenresNestedInput
    books?: BookUncheckedUpdateManyWithoutGenresNestedInput
    mainBooks?: BookUncheckedUpdateManyWithoutMainGenreNestedInput
    similar?: GenreUncheckedUpdateManyWithoutSimilarByNestedInput
    bookTemplates?: BookTemplateUncheckedUpdateManyWithoutGenresNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateManyWithoutSimilarByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
  }

  export type BookTemplateUpdateWithoutGenresInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
  }

  export type BookTemplateUncheckedUpdateWithoutGenresInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
  }

  export type BookTemplateUncheckedUpdateManyWithoutGenresInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
  }

  export type ActivityUpdateWithoutGenreInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumActivitiesFieldUpdateOperationsInput | $Enums.Activities
    importance?: IntFieldUpdateOperationsInput | number
    book?: BookUpdateOneWithoutActivitiesNestedInput
    user?: UserUpdateOneWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateWithoutGenreInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumActivitiesFieldUpdateOperationsInput | $Enums.Activities
    importance?: IntFieldUpdateOperationsInput | number
    bookId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ActivityUncheckedUpdateManyWithoutGenreInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumActivitiesFieldUpdateOperationsInput | $Enums.Activities
    importance?: IntFieldUpdateOperationsInput | number
    bookId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ReviewCreateManyBookInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rating: number
    tags?: ReviewCreatetagsInput | string[]
    text?: string | null
    userId: number
  }

  export type ActivityCreateManyBookInput = {
    id?: number
    createdAt?: Date | string
    type: $Enums.Activities
    importance: number
    genreId?: number | null
    userId?: number | null
  }

  export type ReadingHistoryCreateManyBookInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startDate: Date | string
    endDate: Date | string
    readingTimeMs: number
    scrollPosition: number
    userId: number
  }

  export type GenreUpdateWithoutBooksInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutSelectedGenresNestedInput
    mainBooks?: BookUpdateManyWithoutMainGenreNestedInput
    similarBy?: GenreUpdateManyWithoutSimilarNestedInput
    similar?: GenreUpdateManyWithoutSimilarByNestedInput
    bookTemplates?: BookTemplateUpdateManyWithoutGenresNestedInput
    activities?: ActivityUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateWithoutBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutSelectedGenresNestedInput
    mainBooks?: BookUncheckedUpdateManyWithoutMainGenreNestedInput
    similarBy?: GenreUncheckedUpdateManyWithoutSimilarNestedInput
    similar?: GenreUncheckedUpdateManyWithoutSimilarByNestedInput
    bookTemplates?: BookTemplateUncheckedUpdateManyWithoutGenresNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateManyWithoutBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUpdateWithoutBookInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    tags?: ReviewUpdatetagsInput | string[]
    text?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    tags?: ReviewUpdatetagsInput | string[]
    text?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewUncheckedUpdateManyWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    tags?: ReviewUpdatetagsInput | string[]
    text?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type UserUpdateWithoutFinishedBooksInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUpdateManyWithoutUsersNestedInput
    review?: ReviewUpdateManyWithoutUserNestedInput
    savedBooks?: BookUpdateManyWithoutSavedByNestedInput
    readingBooks?: BookUpdateManyWithoutReadingByNestedInput
    activity?: ActivityUpdateManyWithoutUserNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFinishedBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUncheckedUpdateManyWithoutUsersNestedInput
    review?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    savedBooks?: BookUncheckedUpdateManyWithoutSavedByNestedInput
    readingBooks?: BookUncheckedUpdateManyWithoutReadingByNestedInput
    activity?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutFinishedBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UserUpdateWithoutSavedBooksInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUpdateManyWithoutUsersNestedInput
    review?: ReviewUpdateManyWithoutUserNestedInput
    finishedBooks?: BookUpdateManyWithoutFinishedByNestedInput
    readingBooks?: BookUpdateManyWithoutReadingByNestedInput
    activity?: ActivityUpdateManyWithoutUserNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUncheckedUpdateManyWithoutUsersNestedInput
    review?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    finishedBooks?: BookUncheckedUpdateManyWithoutFinishedByNestedInput
    readingBooks?: BookUncheckedUpdateManyWithoutReadingByNestedInput
    activity?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutSavedBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UserUpdateWithoutReadingBooksInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUpdateManyWithoutUsersNestedInput
    review?: ReviewUpdateManyWithoutUserNestedInput
    savedBooks?: BookUpdateManyWithoutSavedByNestedInput
    finishedBooks?: BookUpdateManyWithoutFinishedByNestedInput
    activity?: ActivityUpdateManyWithoutUserNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReadingBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    selectedGenres?: GenreUncheckedUpdateManyWithoutUsersNestedInput
    review?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    savedBooks?: BookUncheckedUpdateManyWithoutSavedByNestedInput
    finishedBooks?: BookUncheckedUpdateManyWithoutFinishedByNestedInput
    activity?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutReadingBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    socialId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type ActivityUpdateWithoutBookInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumActivitiesFieldUpdateOperationsInput | $Enums.Activities
    importance?: IntFieldUpdateOperationsInput | number
    genre?: GenreUpdateOneWithoutActivitiesNestedInput
    user?: UserUpdateOneWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumActivitiesFieldUpdateOperationsInput | $Enums.Activities
    importance?: IntFieldUpdateOperationsInput | number
    genreId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ActivityUncheckedUpdateManyWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumActivitiesFieldUpdateOperationsInput | $Enums.Activities
    importance?: IntFieldUpdateOperationsInput | number
    genreId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ReadingHistoryUpdateWithoutBookInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingTimeMs?: IntFieldUpdateOperationsInput | number
    scrollPosition?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutReadingHistoryNestedInput
  }

  export type ReadingHistoryUncheckedUpdateWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingTimeMs?: IntFieldUpdateOperationsInput | number
    scrollPosition?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ReadingHistoryUncheckedUpdateManyWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingTimeMs?: IntFieldUpdateOperationsInput | number
    scrollPosition?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type BookUpdateWithoutSimilarByInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenre?: GenreUpdateOneRequiredWithoutMainBooksNestedInput
    genres?: GenreUpdateManyWithoutBooksNestedInput
    review?: ReviewUpdateManyWithoutBookNestedInput
    finishedBy?: UserUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutBookNestedInput
    similarBooks?: BookUpdateManyWithoutSimilarByNestedInput
  }

  export type BookUncheckedUpdateWithoutSimilarByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
    genres?: GenreUncheckedUpdateManyWithoutBooksNestedInput
    review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
    finishedBy?: UserUncheckedUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUncheckedUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUncheckedUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutBookNestedInput
    similarBooks?: BookUncheckedUpdateManyWithoutSimilarByNestedInput
  }

  export type BookUncheckedUpdateManyWithoutSimilarByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
  }

  export type BookUpdateWithoutSimilarBooksInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenre?: GenreUpdateOneRequiredWithoutMainBooksNestedInput
    genres?: GenreUpdateManyWithoutBooksNestedInput
    review?: ReviewUpdateManyWithoutBookNestedInput
    finishedBy?: UserUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutBookNestedInput
    similarBy?: BookUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateWithoutSimilarBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
    genres?: GenreUncheckedUpdateManyWithoutBooksNestedInput
    review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
    finishedBy?: UserUncheckedUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUncheckedUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUncheckedUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutBookNestedInput
    similarBy?: BookUncheckedUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateManyWithoutSimilarBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
  }

  export type GenreUpdateWithoutBookTemplatesInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutSelectedGenresNestedInput
    books?: BookUpdateManyWithoutGenresNestedInput
    mainBooks?: BookUpdateManyWithoutMainGenreNestedInput
    similarBy?: GenreUpdateManyWithoutSimilarNestedInput
    similar?: GenreUpdateManyWithoutSimilarByNestedInput
    activities?: ActivityUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateWithoutBookTemplatesInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutSelectedGenresNestedInput
    books?: BookUncheckedUpdateManyWithoutGenresNestedInput
    mainBooks?: BookUncheckedUpdateManyWithoutMainGenreNestedInput
    similarBy?: GenreUncheckedUpdateManyWithoutSimilarNestedInput
    similar?: GenreUncheckedUpdateManyWithoutSimilarByNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateManyWithoutBookTemplatesInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rating: number
    tags?: ReviewCreatetagsInput | string[]
    text?: string | null
    bookId: number
  }

  export type ActivityCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    type: $Enums.Activities
    importance: number
    genreId?: number | null
    bookId?: number | null
  }

  export type ReadingHistoryCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startDate: Date | string
    endDate: Date | string
    readingTimeMs: number
    scrollPosition: number
    bookId: number
  }

  export type GenreUpdateWithoutUsersInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    books?: BookUpdateManyWithoutGenresNestedInput
    mainBooks?: BookUpdateManyWithoutMainGenreNestedInput
    similarBy?: GenreUpdateManyWithoutSimilarNestedInput
    similar?: GenreUpdateManyWithoutSimilarByNestedInput
    bookTemplates?: BookTemplateUpdateManyWithoutGenresNestedInput
    activities?: ActivityUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    books?: BookUncheckedUpdateManyWithoutGenresNestedInput
    mainBooks?: BookUncheckedUpdateManyWithoutMainGenreNestedInput
    similarBy?: GenreUncheckedUpdateManyWithoutSimilarNestedInput
    similar?: GenreUncheckedUpdateManyWithoutSimilarByNestedInput
    bookTemplates?: BookTemplateUncheckedUpdateManyWithoutGenresNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    tags?: ReviewUpdatetagsInput | string[]
    text?: NullableStringFieldUpdateOperationsInput | string | null
    book?: BookUpdateOneRequiredWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    tags?: ReviewUpdatetagsInput | string[]
    text?: NullableStringFieldUpdateOperationsInput | string | null
    bookId?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    tags?: ReviewUpdatetagsInput | string[]
    text?: NullableStringFieldUpdateOperationsInput | string | null
    bookId?: IntFieldUpdateOperationsInput | number
  }

  export type BookUpdateWithoutSavedByInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenre?: GenreUpdateOneRequiredWithoutMainBooksNestedInput
    genres?: GenreUpdateManyWithoutBooksNestedInput
    review?: ReviewUpdateManyWithoutBookNestedInput
    finishedBy?: UserUpdateManyWithoutFinishedBooksNestedInput
    readingBy?: UserUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutBookNestedInput
    similarBooks?: BookUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateWithoutSavedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
    genres?: GenreUncheckedUpdateManyWithoutBooksNestedInput
    review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
    finishedBy?: UserUncheckedUpdateManyWithoutFinishedBooksNestedInput
    readingBy?: UserUncheckedUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutBookNestedInput
    similarBooks?: BookUncheckedUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUncheckedUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateManyWithoutSavedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
  }

  export type BookUpdateWithoutFinishedByInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenre?: GenreUpdateOneRequiredWithoutMainBooksNestedInput
    genres?: GenreUpdateManyWithoutBooksNestedInput
    review?: ReviewUpdateManyWithoutBookNestedInput
    savedBy?: UserUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutBookNestedInput
    similarBooks?: BookUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateWithoutFinishedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
    genres?: GenreUncheckedUpdateManyWithoutBooksNestedInput
    review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
    savedBy?: UserUncheckedUpdateManyWithoutSavedBooksNestedInput
    readingBy?: UserUncheckedUpdateManyWithoutReadingBooksNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutBookNestedInput
    similarBooks?: BookUncheckedUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUncheckedUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateManyWithoutFinishedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
  }

  export type BookUpdateWithoutReadingByInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenre?: GenreUpdateOneRequiredWithoutMainBooksNestedInput
    genres?: GenreUpdateManyWithoutBooksNestedInput
    review?: ReviewUpdateManyWithoutBookNestedInput
    finishedBy?: UserUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUpdateManyWithoutSavedBooksNestedInput
    activities?: ActivityUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUpdateManyWithoutBookNestedInput
    similarBooks?: BookUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateWithoutReadingByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
    genres?: GenreUncheckedUpdateManyWithoutBooksNestedInput
    review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
    finishedBy?: UserUncheckedUpdateManyWithoutFinishedBooksNestedInput
    savedBy?: UserUncheckedUpdateManyWithoutSavedBooksNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutBookNestedInput
    ReadingHistory?: ReadingHistoryUncheckedUpdateManyWithoutBookNestedInput
    similarBooks?: BookUncheckedUpdateManyWithoutSimilarByNestedInput
    similarBy?: BookUncheckedUpdateManyWithoutSimilarBooksNestedInput
  }

  export type BookUncheckedUpdateManyWithoutReadingByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    recommendable?: BoolFieldUpdateOperationsInput | boolean
    picture?: StringFieldUpdateOperationsInput | string
    ebook?: StringFieldUpdateOperationsInput | string
    readingTime?: IntFieldUpdateOperationsInput | number
    chapters?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    mainGenreId?: IntFieldUpdateOperationsInput | number
  }

  export type ActivityUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumActivitiesFieldUpdateOperationsInput | $Enums.Activities
    importance?: IntFieldUpdateOperationsInput | number
    book?: BookUpdateOneWithoutActivitiesNestedInput
    genre?: GenreUpdateOneWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumActivitiesFieldUpdateOperationsInput | $Enums.Activities
    importance?: IntFieldUpdateOperationsInput | number
    genreId?: NullableIntFieldUpdateOperationsInput | number | null
    bookId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ActivityUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumActivitiesFieldUpdateOperationsInput | $Enums.Activities
    importance?: IntFieldUpdateOperationsInput | number
    genreId?: NullableIntFieldUpdateOperationsInput | number | null
    bookId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ReadingHistoryUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingTimeMs?: IntFieldUpdateOperationsInput | number
    scrollPosition?: IntFieldUpdateOperationsInput | number
    book?: BookUpdateOneRequiredWithoutReadingHistoryNestedInput
  }

  export type ReadingHistoryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingTimeMs?: IntFieldUpdateOperationsInput | number
    scrollPosition?: IntFieldUpdateOperationsInput | number
    bookId?: IntFieldUpdateOperationsInput | number
  }

  export type ReadingHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingTimeMs?: IntFieldUpdateOperationsInput | number
    scrollPosition?: IntFieldUpdateOperationsInput | number
    bookId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use GenreCountOutputTypeDefaultArgs instead
     */
    export type GenreCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GenreCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BookCountOutputTypeDefaultArgs instead
     */
    export type BookCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BookCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BookTemplateCountOutputTypeDefaultArgs instead
     */
    export type BookTemplateCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BookTemplateCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GenreDefaultArgs instead
     */
    export type GenreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GenreDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ActivityDefaultArgs instead
     */
    export type ActivityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActivityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReviewDefaultArgs instead
     */
    export type ReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReviewDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BookDefaultArgs instead
     */
    export type BookArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BookDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BookTemplateDefaultArgs instead
     */
    export type BookTemplateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BookTemplateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReadingHistoryDefaultArgs instead
     */
    export type ReadingHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReadingHistoryDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}