'use client';

import { useState } from 'react';
import { furnitureLibrary } from '@/data/furnitureLibrary';
import Image from 'next/image';

export default function FurnitureSidebar() {
    const [search, setSearch] = useState('');

    const filteredFurniture = Object.entries(furnitureLibrary).filter(([, item]) =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <aside className="absolute top-0 right-0 w-52 h-screen bg-white dark:bg-black p-4 space-y-4 overflow-y-auto">
            <h2 className="text-lg font-bold">Furniture</h2>

            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Drag and drop any item in the list and place it in the grid.
            </p>

            <div className="relative">
                <input
                    type="text"
                    placeholder="Search ..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-2 py-1 border rounded bg-white dark:bg-neutral-900 text-sm pr-8"
                />
                {search && (
                    <button
                        onClick={() => setSearch('')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                        ✕
                    </button>
                )}
            </div>

            {filteredFurniture.map(([type, item]) => (
                <div
                    key={type}
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData('application/json', JSON.stringify({ type }));
                    }}
                    className="btn flex items-center space-x-2 cursor-grab"
                >
                    <Image
                        src={item.icon}
                        alt={item.label}
                        className="w-8 h-8"
                        width={32}
                        height={32}
                    />
                    <span>{item.label}</span>
                </div>
            ))}
        </aside>
    );
}