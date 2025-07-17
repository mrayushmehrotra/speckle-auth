'use client';
import { exchangeAccessCode } from '@/utils/speckleAuth';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SpeckleAuthClient, type ApplicationOptions,  } from 'speckle-auth';


const options: ApplicationOptions = {
  clientId: process.env.NEXT_PUBLIC_SPECKLE_APP_ID!,
  clientSecret: process.env.NEXT_PUBLIC_SPECKLE_APP_SECRET!,
};

const speckle = new SpeckleAuthClient(options);
export default function Home() {
  const usepathname = usePathname()
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    speckle.user().then(u => {
      console.log(u)
      setUser(u);
      setLoading(false);
    });
  }, []);

  const handleLogin = async () => {
    await speckle.login();  };

  const handleLogout = async () => {
    await speckle.logout();
    localStorage.clear()
    setUser(null);
  };

  if(usepathname.search('access_token')){
    const accessToken = String(usepathname.search("access_token"))
    exchangeAccessCode(accessToken)
  }


  if (loading) return <div>Loading...</div>;

  return (
    <div className='flex items-center justify-center h-full '>
      <div className='bg-white h-[30vh] w-[40vw] text-black flex flex-col items-center justify-center' >

      <h1>Speckle Auth</h1>
      {user ? (
        <>
          <p>Welcome, {user.name || user.email || 'User'}!</p>
          <pre style={{ textAlign: 'left', background: '#f4f4f4', padding: 10, borderRadius: 4 }}>{JSON.stringify(user, null, 2)}</pre>
          <button onClick={handleLogout} style={{ marginTop: 16 }}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Speckle</button>
      )}
      </div>
    </div>
  );
}