const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";

// ================= MAIN ARTICLE =================
export async function getMainArticle() {
  try {
    const res = await fetch(`${BASE_URL}/api/main-article`, {
      cache: "no-store",
    });

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
      `${BASE_URL}/api/related?slug=${slug}`,
      { cache: "no-store" }
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
      `${BASE_URL}/api/trending?domain=${domain}`,
      { cache: "no-store" }
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

// ================= OPTIONAL: HEALTH CHECK =================
export async function healthCheck() {
  try {
    const res = await fetch(`${BASE_URL}/api/health`);

    if (!res.ok) return null;

    return await res.json();
  } catch {
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
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    console.error("❌ Contact submit error:", error);
    return { message: "Failed to submit" };
  }
}

// ================= SINGLE ARTICLE =================
export async function getArticleBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002"}/api/article?slug=${slug}`,
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

// ================= BAROMETER =================
export async function getTechBarometer() {
  try {
    const res = await fetch("/api/barometer", {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  }
}

// ================= ARTICLE TRENDING =================
export async function getArticleTrending(slug: string) {
  try {
    const res = await fetch(`/api/article-trending?slug=${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    return await res.json();
  } catch {
    return [];
  }
}