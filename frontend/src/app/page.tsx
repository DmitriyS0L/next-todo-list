import { RadialMenu } from '@/components/home/radial-menu';
import { getProfileAction } from './action/authAction/getProfileAction';

export default async function Home() {
  const user = await getProfileAction();
  return (
    <div className="font-jakarta min-w-screen min-h-screen flex flex-col items-center justify-center bg-zinc-900">
      <main>
        <RadialMenu user={user} />
      </main>
    </div>
  );
}
