"use client";
import React from "react";
import { SpeckleAuthClient, type ApplicationOptions } from "speckle-auth";

const options: ApplicationOptions = {
  clientId: process.env.NEXT_PUBLIC_SPECKLE_APP_ID!,
  clientSecret: process.env.NEXT_PUBLIC_SPECKLE_APP_SECRET!,
  serverUrl: "https://app.speckle.systems",
};

const speckle = new SpeckleAuthClient(options);
export default function Home() {


  const handleLogin = async () => {
    await speckle.login();
  };

  const handleLogout =  () => {
    window.location.href = "/";
     speckle.logout();
    localStorage.clear();
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-white/90 shadow-2xl rounded-xl p-10 w-full max-w-md flex flex-col items-center">
        <h1 className="font-bold text-3xl mb-6 text-blue-900">Speckle Auth</h1>
    
          <div className="w-full flex flex-col items-center">
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg shadow transition mb-2"
            >
              Login with Speckle
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Secure authentication with your Speckle account
            </p>
          </div>
      
      </div>
    </div>
  );
}

