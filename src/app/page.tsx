"use client";

export default function Home() {
  const Link = "https://app.speckle.systems/authn/login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-white/90 shadow-2xl rounded-xl p-10 w-full max-w-md flex flex-col items-center">
        <h1 className="font-bold text-3xl mb-6 text-blue-900">Speckle Auth</h1>
        <a
          href={Link}
          className="px-8 py-4 rounded-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 text-white font-bold text-lg shadow-lg transition-all duration-200 outline-none focus:ring-4 focus:ring-blue-300"
        >
          Log in with Speckle
        </a>
      </div>
    </div>
  );
}
