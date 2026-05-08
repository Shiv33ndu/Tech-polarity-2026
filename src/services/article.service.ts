const BASE = "https://techpolarity-api.onrender.com/api/v1/articles";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminToken");
};

const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const text = await res.text();
    console.error("API Error:", text);
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
};

/**
 * GET: Admin Articles List
 */
export const getAdminArticles = async (page = 1, limit = 10) => {
  const res = await fetch(
    `${BASE}/admin/list?page=${page}&limit=${limit}`,
    {
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(res);
};

/**
 * GET: Stats
 */
export const getStats = async () => {
  const res = await fetch(`${BASE}/admin/stats`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

/**
 * POST: Create Article
 * ⚠️ MUST include trailing slash
 */
export const createArticle = async (data: any) => {
  const res = await fetch(`${BASE}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

/**
 * PATCH: Update Article
 */
export const updateArticle = async (slug: string, data: any) => {
  const res = await fetch(`${BASE}/${slug}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

/**
 * DELETE: Delete Article
 */
export const deleteArticle = async (slug: string) => {
  const res = await fetch(`${BASE}/${slug}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Delete failed");
  return true;
};