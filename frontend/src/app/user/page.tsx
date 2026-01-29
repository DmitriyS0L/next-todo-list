'use client';

import { redirect } from 'next/navigation';
import { getProfileAction } from '../action/authAction/getProfileAction';
import { Button } from '@/components/ui/button';

export function UserPage() {
  const handleGetProfile = async () => {
    const user = await getProfileAction();
    if (!user) redirect('./login');
  };

  return (
    <div className="w-screen h-screen bg-amber-100">
      <Button onClick={handleGetProfile}></Button>
    </div>
  );
}

export default UserPage;
