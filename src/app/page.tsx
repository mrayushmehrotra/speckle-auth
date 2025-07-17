'use client';
import React, { useEffect, useState } from 'react';
import { SpeckleAuthClient, type ApplicationOptions, type User } from 'speckle-auth';

const options: ApplicationOptions = {
  clientId: process.env.NEXT_PUBLIC_SPECKLE_APP_ID!,
  clientSecret: process.env.NEXT_PUBLIC_SPECKLE_APP_SECRET!,
  serverUrl: 'https://app.speckle.systems',
};

const speckle = new SpeckleAuthClient(options);
export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    speckle.user().then(u => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const handleLogin = async () => {

    await speckle.login();
  };

  const handleLogout = async () => {
    window.location.href = "/"
    await speckle.logout();
    localStorage.clear();
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-white/90 shadow-2xl rounded-xl p-10 w-full max-w-md flex flex-col items-center">
        <h1 className="font-bold text-3xl mb-6 text-blue-900">Speckle Auth</h1>
        {user ? (
          <>
            <img
              src={user.avatar || 'https://ui-avatars.com/api/?name=User'}
              alt={user.name || 'Userasd'}
              className="w-16 h-16 rounded-full mb-4 border-2 border-blue-500 shadow"
            />
            <div className="mb-2 text-lg font-semibold text-blue-800">{user.name || 'User'}</div>
            <button
              onClick={handleLogout}
              className="mt-6 w-full py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold transition"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col items-center">
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg shadow transition mb-2"
            >
              Login with Speckle
            </button>
            <p className="text-xs text-gray-500 mt-2">Secure authentication with your Speckle account</p>
          </div>
        )}
      </div>
    </div>
  );
}