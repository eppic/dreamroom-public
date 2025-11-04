import { useState, useMemo } from 'react';
import type { PlacedFurniture } from '@/types/furniture';

export function useSelectedFurniture(furniture: PlacedFurniture[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const select = (id: string | null) => setSelectedId(id); 
  const deselect = () => setSelectedId(null);

  const selectedItem = useMemo(
    () => furniture.find((f) => f.id === selectedId) || null,
    [furniture, selectedId]
  );

  return {
    selectedId,
    selectedItem,
    select,
    deselect,
  };
}
