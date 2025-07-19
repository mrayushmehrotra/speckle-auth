'use client'
import { useEffect, useState } from 'react';
import { SpeckleAuthClient, type User } from 'speckle-auth';

const client = new SpeckleAuthClient({
  clientId: process.env.NEXT_PUBLIC_SPECKLE_CLIENT_ID!,
  clientSecret: process.env.NEXT_PUBLIC_SPECKLE_CLIENT_SECRET!,
});

function App() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      console.log('checking for existing session...');
      const user = await client.user();
      if (user) {
        setUserInfo(user);
      }
      setLoading(false);
    };

    authenticate();
  }, []);

  const handleLogout = () => {
    console.log('logging out...');
    client.logout(); 
    setUserInfo(null);
    window.location.href = "/"
  };

  const handleLogin = async () => {
    console.log('manual login triggered');
    const user = await client.login();
    if (user) setUserInfo(user);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-white/90 shadow-2xl rounded-xl p-10 w-full max-w-md flex flex-col items-center">
        <h1 className="font-bold text-3xl mb-6 text-blue-900">Speckle Auth</h1>

        <div className="w-full flex flex-col items-center">
          {userInfo ? (
            <>
              <div className="mb-4 text-lg font-semibold text-blue-800">
                Hello, {userInfo.name}
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-lg shadow transition mb-2"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg shadow transition mb-2"
            >
              Login with Speckle
            </button>
          )}
          
          <p className="text-xs text-gray-500 mt-2">
            Secure authentication with your Speckle account
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

