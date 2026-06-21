const BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`;

const getCookieToken = () => {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split("; ")
    .find((item) => item.startsWith("adminToken="));

  return value ? value.split("=")[1] : null;
};

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminToken") || getCookieToken();
};

const setToken = (token: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("adminToken", token);
  document.cookie = `adminToken=${token}; path=/; max-age=${60 * 60 * 24}`;
};

export const login = async (email: string, password: string) => {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  // ⚠️ Backend returns plain string
  const token = await res.json();
  setToken(token);

  return token;
};

export const logout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("adminToken");
  document.cookie = "adminToken=; path=/; max-age=0";
};

export const getAdminToken = () => getToken();