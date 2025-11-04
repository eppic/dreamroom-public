'use client';

import { PlacedFurniture } from '@/types/furniture';
import { furnitureLibrary } from '@/data/furnitureLibrary';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  selected: PlacedFurniture | null;
  selectedId: string | null;
  furniture: PlacedFurniture[];
  onRotate: (direction: 'left' | 'right') => void;
  onDelete: () => void;
  onZIndexChange: (direction: 'up' | 'down') => void;
  onSelect: (id: string) => void;
}

export default function Toolbar({ selected, selectedId, furniture, onRotate, onDelete, onZIndexChange, onSelect }: Props) {
  const isDisabled = !selected;

  return (
    <div className="absolute top-0 left-0 h-full w-48 bg-white dark:bg-black shadow-md p-4 flex flex-col gap-4 z-10">
      
      <Link href="/">
        <h1 className="text-2xl btn font-bold">DreamRoom</h1>
      </Link>
      
      <h2 className="font-semibold">
        Edit furniture
      </h2>

      {selected ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {furnitureLibrary[selected.type]?.label || 'Selected item'}
        </p>
      ) : (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          No item selected
        </p>
      )}

      <p className='text-sm text-red-500 dark:text-red-400'>Rotate Item:</p>
      <div className='flex'>
        <button
          onClick={() => onRotate('left')}
          disabled={isDisabled}
          className={`btn w-full flex justify-center gap-2 ${
            isDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Image src="/rotate-left.svg" alt="Rotate Left" className="w-4 h-4" width={16} height={16} />
        </button>

        <button
          onClick={() => onRotate('right')}
          disabled={isDisabled}
          className={`btn w-full flex justify-center gap-2 ${
            isDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Image src="/rotate-right.svg" alt="Rotate Right" className="w-4 h-4" width={16} height={16} />
        </button>
      </div>
      
      <button
        onClick={() => onZIndexChange('up')}
        disabled={isDisabled}
        className={`btn px-3 ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        🔼 Bring Forward
      </button>

      <button
        onClick={() => onZIndexChange('down')}
        disabled={isDisabled}
        className={`btn px-3 ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        🔽 Bring Back
      </button>
      {furniture.length > 0 && (
        <div className="mt-4 flex flex-col max-h-96 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-1">Layer View</h3>
          <ul className="space-y-1 text-sm">
            {[...furniture]
              .sort((a, b) => (b.zIndex ?? 0) - (a.zIndex ?? 0))
              .map((item) => (
                <li
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`px-2 py-1 rounded transition ${
                    item.id === selectedId
                      ? 'bg-gray-200 dark:bg-gray-700 text-black font-medium'
                      : 'text-black dark:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={furnitureLibrary[item.type]?.icon}
                      alt={furnitureLibrary[item.type]?.label || item.type}
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    <span 
                      className={`text-xm ${
                        item.id === selectedId
                          ? 'text-black dark:text-white'
                          : 'text-neutral-500 dark:text-neutral-400'
                      }`}
                    >
                      {furnitureLibrary[item.type]?.label || item.type}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
          </div>
        )}

        <table className="text-sm mt-2 text-neutral-500 dark:text-neutral-400">
        <caption className="text-left font-semibold text-base mb-1 text-black dark:text-white">
        Keybinds:
        </caption>
          <tbody>
            <tr><td className="text-right">A / 🠈</td><td className="pl-4 pt-1">Rotate left</td></tr>
            <tr><td className="text-right">D / 🠊</td><td className="pl-4 pt-1">Rotate right</td></tr>
            <tr><td className="text-right">W / 🠉</td><td className="pl-4 pt-1">Layer up</td></tr>
            <tr><td className="text-right">S / 🠋</td><td className="pl-4 pt-1">Layer down</td></tr>
            <tr><td className="text-right">Del</td><td className="pl-4 pt-1">Delete item</td></tr>
            <tr><td className="text-right">L</td><td className="pl-4 pt-1">Toggle Layers</td></tr>
          </tbody>
        </table>

      <button
        onClick={onDelete}
        disabled={isDisabled}
        className={`btn btn--danger mt-auto ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        🗑️ Delete
      </button>
    </div>
  );
}
