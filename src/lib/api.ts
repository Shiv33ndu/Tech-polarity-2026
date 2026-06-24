const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
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

    if (!res.ok) {
      console.error("❌ Main API failed:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Main fetch error:", error);
    return null;
  }
}

// ================= RELATED ARTICLES =================
export async function getRelatedArticles(slug?: string) {
  try {
    if (!slug) return [];

    const res = await fetch(
      `${BASE_URL}/api/v1/home/related-articles?slug=${slug}`,
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
export async function getTrendingArticles(domain?: string) {
  try {
    if (!domain) return [];

    const res = await fetch(
      `${BASE_URL}/api/v1/home/trending?domain=${domain}`,
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
