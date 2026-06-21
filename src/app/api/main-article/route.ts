export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/home/main-article`,
      { cache: "no-store" }
    );

    const data = await res.json();

    return Response.json(data);
  } catch {
    return Response.json(null);
  }
}