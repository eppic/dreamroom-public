'use client';

import { useEffect, useRef, useState } from 'react';
import { useCanvasHandlers } from '@/hooks/useCanvasHandlers';
import { useSelectedFurniture } from '@/hooks/useSelectedFurniture';
import FurnitureItem from './FurnitureItem';
import Toolbar from './Toolbar';
import type { PlacedFurniture } from '@/types/furniture';
import { furnitureLibrary } from '@/data/furnitureLibrary';

const SNAP_GRID_SIZE = 10;
const DISPLAY_GRID_SIZE = 50;

export default function RoomCanvas() {
  const [furniture, setFurniture] = useState<PlacedFurniture[]>([]);
  const [isLayerPreviewActive, setIsLayerPreviewActive] = useState(false);
  const [roomWidth, setRoomWidth] = useState(800);
  const [roomHeight, setRoomHeight] = useState(600);
  const [isRoomSizeSet, setIsRoomSizeSet] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const {
    selectedId,
    selectedItem,
    select,
    deselect,
  } = useSelectedFurniture(furniture);

  const {
    handleDrop,
    updateFurniturePosition,
    handleRotate,
    handleDelete,
    changeZIndex,
  } = useCanvasHandlers(furniture, setFurniture, select, canvasRef);

  // Keyboard Binds
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
  
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
  
      if (key === 'l') {
        setIsLayerPreviewActive(prev => !prev);
        return;
      }
  
      if (!selectedId) return;
  
      if (key === 'arrowleft' || key === 'q' || key === 'a'|| key === ',') {
        handleRotate(selectedId, 'left');
      } else if (key === 'arrowright' || key === 'e' || key === 'd'|| key === '.') {
        handleRotate(selectedId, 'right');
      } else if (key === 'arrowup' || key === 'w') {
        changeZIndex(selectedId, 'up');
      } else if (key === 'arrowdown' || key === 's') {
        changeZIndex(selectedId, 'down');
      } else if (key === 'delete' || key === 'backspace') {
        handleDelete(selectedId);
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, handleRotate, handleDelete, changeZIndex]);
    
  return (
    <>
      <div className="flex-1 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 p-6">
      {!isRoomSizeSet ? (
        <div className='p-10 bg-white dark:bg-black shadow-md rounded-md flex flex-col gap-4'>
          <p className='text-neutral-500 dark:text-neutral-400'>Measurements are in meters</p>
          <label>Room Width (m):</label>
          <input
            type="number"
            min={2.5}
            max={14.5}
            step={0.5}
            value={roomWidth / 100}
            onChange={(e) => {
              let val = Number(e.target.value);
              if (val < 2.5) val = 2.5;
              if (val > 14.5) val = 14.5;
              val = Math.round(val * 2) / 2;
              setRoomWidth(val * 100);
            }}
            className='bg-neutral-100 dark:bg-neutral-800 rounded-md p-2 pr-6 pl-6'
          />
          <label>Room Height (m):</label>
          <input
            type="number"
            min={2.5}
            max={9}
            step={0.5}
            value={roomHeight / 100}
            onChange={(e) => {
              let val = Number(e.target.value);
              if (val < 2.5) val = 2.5;
              if (val > 9) val = 9;
              val = Math.round(val * 2) / 2;
              setRoomHeight(val * 100);
            }}
            className='bg-neutral-100 dark:bg-neutral-800 rounded-md p-2 pr-6 pl-6'
          />
          <button onClick={() => setIsRoomSizeSet(true)} className='btn mt-4'>
            OK
          </button>
        </div>
      ) : (
        
          <div
            ref={canvasRef}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="relative border border-gray-400 bg-white dark:bg-neutral-900"
            onClick={deselect}
            style={{
              width: roomWidth,
              height: roomHeight,
              backgroundSize: `${DISPLAY_GRID_SIZE}px ${DISPLAY_GRID_SIZE}px`,
              backgroundImage: `
                linear-gradient(to right,rgb(99, 99, 99) 1px, transparent 1px),
                linear-gradient(to bottom,rgb(99, 99, 99) 1px, transparent 1px)
              `,
            }}
          >
            {furniture
              .slice()
              .sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0))
              .map((item) => (
                <FurnitureItem
                  key={item.id}
                  item={item}
                  onMove={updateFurniturePosition}
                  gridSize={SNAP_GRID_SIZE}
                  canvasRef={canvasRef}
                  onSelect={select}
                  isSelected={item.id === selectedId}
                />
              ))}
        
            {isLayerPreviewActive && (
              <div className="absolute top-4 right-4 bg-white/50 dark:bg-black/50 border p-2 text-sm shadow z-50 backdrop-blur-sm rounded-md">
                <div 
                  className="flex items-center justify-between gap-6"
                >
                  <h3 className="font-semibold mb-2 pt-3">Layer View</h3>
                  <button 
                  onClick={() => setIsLayerPreviewActive(false)} 
                  className='btn text-red-500'
                  >
                    ✕
                  </button>
                </div>  
                <ul>
                  {[...furniture]
                    .sort((a, b) => (b.zIndex ?? 0) - (a.zIndex ?? 0))
                    .map((item) => (
                      <li
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          select(item.id);
                        }}
                        className={`px-2 py-1 rounded transition cursor-pointer ${
                          item.id === selectedId
                            ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-medium'
                            : 'text-black dark:text-white'
                        }`}
                      >
                        {furnitureLibrary[item.type]?.label || item.type}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        
      )}
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Toolbar
          selected={selectedItem}
          selectedId={selectedId}
          furniture={furniture}
          onRotate={(dir) => handleRotate(selectedId!, dir)}
          onDelete={() => handleDelete(selectedId!)}
          onZIndexChange={(dir) => changeZIndex(selectedId!, dir)}
          onSelect={select}
        />
      </div>
    </>
  );
}