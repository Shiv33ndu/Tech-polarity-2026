export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) return Response.json([]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/articles/${slug}/trending`,
      { cache: "no-store" }
    );

    if (!res.ok) return Response.json([]);

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("❌ Article Trending API error:", error);
    return Response.json([]);
  }
}