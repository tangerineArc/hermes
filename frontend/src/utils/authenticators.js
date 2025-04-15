export async function checkAuthStatus() {
  const res = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/auth/status`,
    { credentials: "include" }
  );

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return res.json();
}

export async function signIn(credentials) {
  const res = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/auth/sign-in`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    }
  );

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}

export async function signUp(credentials) {
  const res = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/auth/sign-up`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    }
  );

  if (!res.ok) {
    console.log(res);
    throw new Error("Invalid credentials");
  }

  return res.json();
}
