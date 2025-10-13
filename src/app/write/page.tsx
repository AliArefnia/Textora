"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function BlogGenerator() {
  const [topic, setTopic] = useState("");
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateBlog = async () => {
    setLoading(true);
    setBlog(null);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    const data = await res.json();
    setBlog(data.result || data.error);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <input
        className="border p-2 w-full"
        placeholder="موضوع مقاله مثلا: فواید ورزش"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white mt-2 px-4 py-2 rounded"
        onClick={generateBlog}
        disabled={loading}
      >
        {loading ? "در حال تولید..." : "تولید مقاله"}
      </button>

      <div
        className={`mt-6 bg-gray-100 p-6 rounded leading-relaxed ${
          isRTL(blog) ? "rtl text-right font-vazir" : "ltr text-left"
        }`}
      >
        <ReactMarkdown>{blog}</ReactMarkdown>
      </div>
    </div>
  );
}

function isRTL(text: string) {
  const persianRegex = /[\u0600-\u06FF]/;
  return persianRegex.test(text);
}
