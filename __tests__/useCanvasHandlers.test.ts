import { renderHook, act } from '@testing-library/react';
import { useCanvasHandlers } from '@/hooks/useCanvasHandlers';
import { PlacedFurniture } from '@/types/furniture';

describe('useCanvasHandlers', () => {
  const furniture : PlacedFurniture[] = [
    { id: '1', type: 'chair', x: 0, y: 0, scale: 1 },
    { id: '2', type: 'table-square-small', x: 100, y: 100, scale: 1 },
  ];
  let setFurniture: jest.Mock;

  beforeEach(() => {
    setFurniture = jest.fn((updater) => {
      if (typeof updater === 'function') {
        furniture.splice(0, furniture.length, ...updater(furniture));
      }
    });
  });

  it('should update furniture position', () => {
    const { result } = renderHook(() =>
      useCanvasHandlers(furniture, setFurniture, jest.fn(), { current: null })
    );

    act(() => {
      result.current.updateFurniturePosition('1', 50, 50);
    });

    expect(setFurniture).toHaveBeenCalledTimes(1);
    expect(furniture).toEqual([
      { id: '1', type: 'chair', x: 50, y: 50, scale: 1 },
      { id: '2', type: 'table-square-small', x: 100, y: 100, scale: 1 },
    ]);
  });

  it('should delete a furniture item', () => {
    const { result } = renderHook(() =>
      useCanvasHandlers(furniture, setFurniture, jest.fn(), { current: null })
    );

    act(() => {
      result.current.handleDelete('1');
    });

    expect(setFurniture).toHaveBeenCalledTimes(1);
    expect(furniture).toEqual([
      { id: '2', type: 'table-square-small', x: 100, y: 100, scale: 1 },
    ]);
  });
});