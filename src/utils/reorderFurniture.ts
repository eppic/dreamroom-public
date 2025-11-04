import type { PlacedFurniture } from '@/types/furniture';

export function reorderFurniture(
  items: PlacedFurniture[],
  selectedId: string,
  direction: 'up' | 'down'
): PlacedFurniture[] {
  //sort by current zIndex
  const sorted = [...items].sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));

  //assign clean zIndex
  const reindexed = sorted.map((item, i) => ({
    ...item,
    zIndex: i,
  }));

  const index = reindexed.findIndex((f) => f.id === selectedId);
  if (index === -1) return reindexed;

  const targetIndex =
    direction === 'up'
      ? Math.min(index + 1, reindexed.length - 1)
      : Math.max(index - 1, 0);

  //swap
  const temp = reindexed[index];
  reindexed[index] = reindexed[targetIndex];
  reindexed[targetIndex] = temp;

  //reindex again
  return reindexed.map((item, i) => ({
    ...item,
    zIndex: i,
  }));
}
