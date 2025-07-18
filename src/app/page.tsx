"use client";

export default function Home() {
  const Link = "https://app.speckle.systems/authn/login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-600">
      <a
        href={Link}
        className="px-8 py-4 rounded-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 text-white font-bold text-lg shadow-lg transition-all duration-200 outline-none focus:ring-4 focus:ring-blue-300"
      >
        Log in with Speckle
      </a>
    </div>
  );
}
