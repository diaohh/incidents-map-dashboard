export function groupBy<T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K,
): Record<K, T[]> {
  return items.reduce((groups, item) => {
    const key = keyFn(item);
    groups[key] = groups[key] ? [...groups[key], item] : [item];
    return groups;
  }, {} as Record<K, T[]>);
}
