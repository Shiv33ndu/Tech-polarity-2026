export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return Response.json(null);
    }

    const res = await fetch(
      `https://tech-polarity-backend.onrender.com/api/v1/articles/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return Response.json(null);
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("❌ Article proxy error:", error);
    return Response.json(null);
  }
}