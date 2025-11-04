import { renderHook, act } from '@testing-library/react';
import { useSelectedFurniture } from '@/hooks/useSelectedFurniture';
import { PlacedFurniture } from '@/types/furniture';

describe('useSelectedFurniture', () => {
  const furniture : PlacedFurniture [] = [
    { id: '1', type: 'chair', x: 0, y: 0, scale: 1 },
    { id: '2', type: 'table-square-small', x: 100, y: 100, scale: 1 },
  ];

  it('should select and deselect furniture items', () => {
    const { result } = renderHook(() => useSelectedFurniture(furniture));

    expect(result.current.selectedId).toBeNull();
    expect(result.current.selectedItem).toBeNull();

    act(() => {
      result.current.select('1');
    });

    expect(result.current.selectedId).toBe('1');
    expect(result.current.selectedItem).toEqual(furniture[0]);

    act(() => {
      result.current.deselect();
    });

    expect(result.current.selectedId).toBeNull();
    expect(result.current.selectedItem).toBeNull();
  });
});