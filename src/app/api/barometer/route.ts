export async function GET() {
  try {
    const res = await fetch(
      "https://tech-polarity-backend.onrender.com/api/v1/home/tech-barometer",
      { cache: "no-store" }
    );

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("❌ Barometer API error:", error);
    return Response.json(null);
  }
}