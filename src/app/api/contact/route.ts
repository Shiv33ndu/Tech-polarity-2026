export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      "https://tech-polarity-backend.onrender.com/api/v1/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error("❌ Contact API error:", error);

    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}