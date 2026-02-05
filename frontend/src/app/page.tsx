import { RadialMenu } from '@/components/home/radial-menu';

export default async function Home() {
  return (
    <div className="font-jakarta min-w-screen min-h-screen flex flex-col items-center justify-center bg-zinc-900">
      <main>
        <RadialMenu />
      </main>
    </div>
  );
}
