export async function POST(req: Request) {
  const { topic } = await req.json();

  const res = await fetch("https://api.gapgpt.app/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GAPGPT_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `${topic}`,
        },
      ],
    }),
  });

  const data = await res.json();

  return Response.json({
    result: data.choices?.[0]?.message?.content || "No response",
  });
}
