import { PlacedFurniture } from '@/types/furniture';
import { reorderFurniture } from '@/utils/reorderFurniture';

describe('reorderFurniture', () => {
  const furniture : PlacedFurniture[]= [
    { id: '1', type: 'chair', x: 0, y: 0, scale: 1, zIndex: 0 },
    { id: '2', type: 'table-square-small', x: 100, y: 100, scale: 1, zIndex: 1 },
  ];

  it('should move an item up in zIndex', () => {
    const result = reorderFurniture(furniture, '1', 'up');
    expect(result[0].id).toBe('2');
    expect(result[1].id).toBe('1');
  });

  it('should not move an item down if it is already at the bottom', () => {
    const result = reorderFurniture(furniture, '1', 'down');
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('2');
  });

});