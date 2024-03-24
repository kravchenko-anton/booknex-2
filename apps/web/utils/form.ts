export function getDirtyValues<
  T extends Record<string, unknown>,
  V extends Record<keyof T, unknown>
>(dirtyFields: T, values: V): Partial<typeof values> {
  return Object.keys(dirtyFields).reduce((previous, key) => {
    if (!dirtyFields[key]) return previous;

    return {
      ...previous,
      [key]:
        typeof dirtyFields[key] === 'object'
          ? getDirtyValues(dirtyFields[key] as T, values[key] as V)
          : values[key]
    };
  }, {});
}
