export const SPECKLE_CHALLENGE_KEY = 'SpeckleDemoApp.Challenge';
export const SPECKLE_AUTH_TOKEN_KEY = 'SpeckleDemoApp.AuthToken';
export const SPECKLE_AUTH_REFRESH_TOKEN_KEY = 'SpeckleDemoApp.AuthRefreshToken';

// Redirects the user to the Speckle auth page with a generated challenge
export function redirectToSpeckleAuthPage() {
  const challenge =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  localStorage.setItem(SPECKLE_CHALLENGE_KEY, challenge);
  window.location.href = `${process.env.NEXT_PUBLIC_SPECKLE_SERVER}/authn/verify/${process.env.NEXT_PUBLIC_SPECKLE_APP_ID}/${challenge}`;
}

// Exchanges the access code for tokens and stores them in localStorage
export async function exchangeAccessCode(accessCode: string) {
  const challenge = localStorage.getItem(SPECKLE_CHALLENGE_KEY);
  const res = await fetch(`${process.env.NEXT_PUBLIC_SPECKLE_SERVER}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      appId: process.env.NEXT_PUBLIC_SPECKLE_APP_ID,
      appSecret: process.env.NEXT_PUBLIC_SPECKLE_APP_SECRET,
      accessCode: accessCode,     // from the URL params
      challenge: challenge        // the same PKCE code you sent initially
    })
  });
  const data = await res.json();
  if (data.token) {
    localStorage.removeItem(SPECKLE_CHALLENGE_KEY);
    localStorage.setItem(SPECKLE_AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(SPECKLE_AUTH_REFRESH_TOKEN_KEY, data.refreshToken);
  }
  return data;
} 