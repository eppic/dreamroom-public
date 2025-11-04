import { furnitureLibrary } from '@/data/furnitureLibrary';

export type FurnitureType = keyof typeof furnitureLibrary;

export interface PlacedFurniture {
  id: string;
  type: FurnitureType; 
  x: number;
  y: number;
  scale: number;
  rotation?: number;
  zIndex?: number;
}
