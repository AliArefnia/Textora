// src/app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { topic } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        // model: "llama3-70b",
        // model: "openai/gpt-4o-mini",
        model: "openai/gpt-3.5-turbo",
        // model: "anthropic/claude-3-haiku",  fastest

        messages: [
          {
            role: "user",
            content: `
You are a professional Farsi blog writer.
Write a blog post with:

- A title
- An introduction
- 3 main sections, each with a subheading
- A conclusion

Write the response in **Markdown format** (use # for title, ## for sections, and line breaks between paragraphs).

Topic: "${topic}"
`,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = res.data.choices[0]?.message?.content || "";
    return NextResponse.json({ content });
  } catch (error: any) {
    console.error("OpenRouter API error:", error?.response?.data || error);
    return NextResponse.json(
      { error: "Failed to generate content." },
      { status: 500 }
    );
  }
}
