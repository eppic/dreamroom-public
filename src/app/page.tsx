import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { asset } from '@/lib/asset';


export default function LandingPage() {
  return (
    <div>
      <header>
        <Link
          href="/"
          className="bg-[image:var(--grid-light)] dark:bg-[image:var(--grid-dark)] flex items-center justify-center space-x-4 p-20 "
          style={{
            '--grid-light': `url(${asset('/grid-black.svg')})`,
            '--grid-dark': `url(${asset('/grid-white.svg')})`,
          } as React.CSSProperties}
        >
          <Image src={asset("/dreamroom_bg.png")} alt="DreamRoom Logo" width={200} height={200} />
          <h1 className="text-6xl font-bold">DreamRoom</h1>
        </Link>
      </header>
      <main>

        <h2 className='flex justify-center text-2xl font-bold p-6'>Design your DreamRoom with our simple editor!</h2>

        <section className="bg-neutral-100 dark:bg-neutral-800 flex justify-between space-x-10 p-10">
          <div className="w-full object-cover flex justify-center">
            <Image src={asset("/screenshots/1.png")} alt="Screenshot 1" width={960} height={465} />
          </div>
          <div className="w-full object-cover flex justify-center">
            <Image src={asset("/screenshots/2.png")} alt="Screenshot 2" width={960} height={465} />
          </div>
          <div className="w-full object-cover flex justify-center">
            <Image src={asset("/screenshots/3.png")} alt="Screenshot 3" width={960} height={465} />
          </div>
        </section>

        <p className="max-w-6xl mx-auto p-10 pb-0 leading-loose">
          With DreamRoom, you can design your dream space easily and intuitively. The application is based on cutting-edge technologies like Next.js, TypeScript, and Tailwind CSS. With just one click, you can start the editor and get going immediately. 
          DreamRoom is more than just a tool – it’s a platform that combines creativity and functionality to help you turn your vision into reality.
        </p>

        <div className='flex items-center justify-center p-10 space-x-4'>  
          <div className='text-4xl font-bold'>&gt;</div>

          <Link href="/editor" className="border-3 border-black dark:border-white rounded-lg ">
            <button className="btn rounded text-2xl">Start using the editor <strong>now</strong>!</button>
          </Link>

          <div className='text-4xl font-bold'>&lt;</div>
        </div>

      </main>

      <footer className="bg-neutral-100 dark:bg-neutral-800 p-6 mt-20 b-10" >
        <div className='max-w-6xl mx-auto p-6 leading-loose'>
          <p>
            DreamRoom is developed with ❤️ by Lukas M. and Nico W. (Team Bober) as part of the MMP2b project at FH Salzburg.
          </p>
        </div>
      </footer>
    </div>
  );
}