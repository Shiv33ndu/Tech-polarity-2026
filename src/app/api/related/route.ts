export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return Response.json([]);
    }

    const res = await fetch(
      `https://tech-polarity-backend.onrender.com/api/v1/home/related-articles?exclude_slug=${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("❌ Related API failed:", res.status);
      return Response.json([]);
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("❌ Related fetch error:", error);
    return Response.json([]);
  }
}