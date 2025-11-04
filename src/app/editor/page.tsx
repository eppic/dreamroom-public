"use client"

import { useEffect } from 'react';
import RoomCanvas from '@/components/RoomCanvas';
import FurnitureSidebar from '@/components/FurnitureSidebar';

export default function HomePage() {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <main className="flex h-screen">
      <RoomCanvas />
      <FurnitureSidebar />
    </main>
  );
}
