export async function GET() {
  try {
    const res = await fetch(
      "https://tech-polarity-backend.onrender.com/api/v1/home/main-article",
      { cache: "no-store" }
    );

    const data = await res.json();

    return Response.json(data);
  } catch {
    return Response.json(null);
  }
}