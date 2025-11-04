'use client';

import { useCallback } from 'react';
import { snapToGrid } from '@/utils/snapToGrid';
import { reorderFurniture } from '@/utils/reorderFurniture';
import { furnitureLibrary } from '@/data/furnitureLibrary';
import type { FurnitureType, PlacedFurniture } from '@/types/furniture';

export function useCanvasHandlers(
  furniture: PlacedFurniture[],
  setFurniture: React.Dispatch<React.SetStateAction<PlacedFurniture[]>>,
  setSelectedFurnitureId: (id: string | null) => void,
  canvasRef: React.RefObject<HTMLDivElement | null>
) {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();

      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const rawType = data.type;

      if (!(rawType in furnitureLibrary)) return;

      const type = rawType as FurnitureType;

      if (!canvasRef.current) return;
      const canvasRect = canvasRef.current.getBoundingClientRect();

      const offsetX = e.clientX - canvasRect.left;
      const offsetY = e.clientY - canvasRect.top;

      const [x, y] = snapToGrid(offsetX, offsetY, 50);
      
      const maxZ = Math.max(0, ...furniture.map(f => f.zIndex ?? 0))

      const defaultBottomLayerTypes = ['carpet-small', 'carpet-medium', 'carpet-big'];

      const zIndex = defaultBottomLayerTypes.includes(type) ? 0 : maxZ + 1;

      const newItem: PlacedFurniture = {
        id: crypto.randomUUID(),
        type,
        x,
        y,
        scale: 1,
        rotation: 0,
        zIndex,
      };

      setFurniture((prev) => [...prev, newItem]);
      setSelectedFurnitureId(newItem.id);
    },
    [canvasRef, setFurniture, setSelectedFurnitureId, furniture]
  );

  const updateFurniturePosition = useCallback(
    (id: string, x: number, y: number) => {
      setFurniture((prev) =>
        prev.map((f) => (f.id === id ? { ...f, x, y } : f))
      );
    },
    [setFurniture]
  );

  const handleRotate = useCallback(
    (id: string, direction: 'left' | 'right') => {
      setFurniture((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          const delta = direction === 'left' ? -90 : 90;
          return {
            ...item,
            rotation: ((item.rotation ?? 0) + delta + 360) % 360,
          };
        })
      );
    },
    [setFurniture]
  );

  const handleDelete = useCallback(
    (id: string) => {
      setFurniture((prev) => prev.filter((item) => item.id !== id));
      setSelectedFurnitureId(null);
    },
    [setFurniture, setSelectedFurnitureId]
  );

  const changeZIndex = useCallback(
    (id: string, direction: 'up' | 'down') => {
      setFurniture((prev) => reorderFurniture(prev, id, direction));
    },
    [setFurniture]
  );

  return {
    handleDrop,
    updateFurniturePosition,
    handleRotate,
    handleDelete,
    changeZIndex,
  };
}
