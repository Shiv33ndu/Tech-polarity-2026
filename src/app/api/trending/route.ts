export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");

    if (!domain) {
      return Response.json([]);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/home/trending?domain_slug=${domain}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("❌ Trending API failed:", res.status);
      return Response.json([]);
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("❌ Trending fetch error:", error);
    return Response.json([]);
  }
}