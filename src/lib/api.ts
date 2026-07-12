const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tech-polarity-backend.onrender.com";

// ================= MAIN ARTICLE =================
export async function getMainArticle() {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/home/main-article`,
      {
        cache: "no-store",
      }
    );

    console.log("Status:", res.status);

    const text = await res.text();
    console.log("Response:", text);

    if (!res.ok) {
      return null;
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("❌ Main fetch error:", error);
    return null;
  }
}

// ================= RELATED ARTICLES =================
export async function getRelatedArticles(slug?: string, limit: number = 8) {
  try {
    if (!slug) return [];

    const res = await fetch(
      `${BASE_URL}/api/v1/home/related-articles?exclude_slug=${slug}&limit=${limit}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("❌ Related API failed:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Related fetch error:", error);
    return [];
  }
}

// ================= TRENDING ARTICLES =================
export async function getTrendingArticles(domainSlug?: string) {
  try {
    if (!domainSlug) return [];

    const res = await fetch(
      `${BASE_URL}/api/v1/home/trending?domain_slug=${domainSlug}&limit=5`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("❌ Trending API failed:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Trending fetch error:", error);
    return [];
  }
}

// ================= HEALTH CHECK =================
export async function healthCheck() {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/health/`
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("❌ Health check error:", error);
    return null;
  }
}

// ================= CONTACT =================
export async function submitContact(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/contact/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Contact submit error:", error);
    return {
      message: "Failed to submit contact form",
    };
  }
}

// ================= SINGLE ARTICLE =================
export async function getArticleBySlug(slug: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/articles/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("❌ Article API failed:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Article fetch error:", error);
    return null;
  }
}

// ================= ARTICLE TRENDING =================
export async function getArticleTrending(slug: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/articles/${slug}/trending`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("❌ Article Trending API failed:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Article Trending fetch error:", error);
    return [];
  }
}

// ================= RELATED ARTICLES BY SLUG =================
export async function getArticleRelated(slug: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/articles/${slug}/related`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("❌ Article Related API failed:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Article Related fetch error:", error);
    return [];
  }
}

export async function getTechBarometer() {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/home/tech-barometer`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("❌ Tech Barometer error:", error);
    return null;
  }
}

// ================= NAVIGATION CATEGORIES =================
export async function getCategories() {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/navigation/main`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    console.error("❌ Categories fetch error:", error);
    return [];
  }
}

// ================= ARTICLES BY CATEGORY =================
export async function getArticlesByCategory(
  domainSlug: string,
  page: number = 1,
  limit: number = 12
) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/articles/category/${domainSlug}?page=${page}&limit=${limit}`,
      { cache: "no-store" }
    );

    if (!res.ok) return { items: [], total: 0, page, limit };

    return await res.json();
  } catch (error) {
    console.error("❌ Articles by category fetch error:", error);
    return { items: [], total: 0, page, limit };
  }
}

// ================= SECTIONS (TOP HEADER) =================
export async function getSections() {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/sections/main`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    console.error("❌ Sections fetch error:", error);
    return [];
  }
}

// ================= ARTICLES BY SECTION =================
export async function getArticlesBySection(
  sectionSlug: string,
  page: number = 1,
  limit: number = 12
) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/articles/section/${sectionSlug}?page=${page}&limit=${limit}`,
      { cache: "no-store" }
    );

    if (!res.ok) return { items: [], total: 0, page, limit };

    return await res.json();
  } catch (error) {
    console.error("❌ Articles by section fetch error:", error);
    return { items: [], total: 0, page, limit };
  }
}

// ================= SEARCH ARTICLES =================
export async function searchArticles(
  query: string,
  page: number = 1,
  limit: number = 12
) {
  try {
    const params = new URLSearchParams({
      q: query,
      page: String(page),
      limit: String(limit),
    });
    const res = await fetch(
      `${BASE_URL}/api/v1/articles/search?${params}`,
      { cache: "no-store" }
    );
    if (!res.ok) return { items: [], total: 0, page, limit };
    return await res.json();
  } catch (error) {
    console.error("❌ Search error:", error);
    return { items: [], total: 0, page, limit };
  }
}

// ================= GLOBAL TRENDING =================
export async function getGlobalTrending(limit: number = 8) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/home/trending-global?limit=${limit}`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    console.error("❌ Global trending fetch error:", error);
    return [];
  }
}