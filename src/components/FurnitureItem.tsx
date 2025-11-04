'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { snapToGrid } from '@/utils/snapToGrid';
import { furnitureLibrary } from '@/data/furnitureLibrary';
import type { PlacedFurniture } from '@/types/furniture';

interface Props {
  item: PlacedFurniture;
  onMove: (id: string, x: number, y: number) => void;
  gridSize: number;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export default function FurnitureItem({
  item,
  onMove,
  gridSize,
  canvasRef,
  onSelect,
  isSelected,
}: Props) {
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const config = furnitureLibrary[item.type];
  if (!config) return null;

  // Handle Rotation Logic
  const angle = (item.rotation ?? 0) % 360;
  const isRotated = angle === 90 || angle === 270;
  const itemWidth = (isRotated ? config.height : config.width) * item.scale;
  const itemHeight = (isRotated ? config.width : config.height) * item.scale;

  let xOffset = 0;
  let yOffset = 0;

  switch (angle) {
    case 90:
      yOffset = -100;
      break;
    case 180:
      xOffset = -100;
      yOffset = -100;
      break;
    case 270:
      xOffset = -100;
      break;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(item.id);

    const imageRect = (e.currentTarget as HTMLImageElement).getBoundingClientRect();

    setDragOffset({
      x: e.clientX - imageRect.left,
      y: e.clientY - imageRect.top,
    });

    isDragging.current = false;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!canvasRef.current) return;

    isDragging.current = true;

    const rect = canvasRef.current.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    const rawX = e.clientX - rect.left - dragOffset.x;
    const rawY = e.clientY - rect.top - dragOffset.y;

    const clampedX = Math.max(0, Math.min(rawX, canvasWidth - itemWidth));
    const clampedY = Math.max(0, Math.min(rawY, canvasHeight - itemHeight));

    const [x, y] = snapToGrid(clampedX, clampedY, gridSize);
    onMove(item.id, x, y);
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      onSelect(item.id);
    }

    isDragging.current = false;

    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging.current) {
      e.stopPropagation();
      onSelect(item.id);
    }
  };

  return (
    <Image
      src={config.icon}
      alt={config.label}
      className={`absolute cursor-move select-none transition ring-2 ${
        isSelected ? 'ring-blue-500' : 'ring-transparent'
      }`}
      style={{
        top: item.y,
        left: item.x,
        width: config.width,
        height: config.height,
        transform: `rotate(${angle}deg) translate(${xOffset}%, ${yOffset}%)`,
        transformOrigin: 'top left',
        pointerEvents: 'auto',
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      draggable={false}
      width={config.width * item.scale}
      height={config.height * item.scale}
    />
  );
}
