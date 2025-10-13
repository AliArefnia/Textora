"use client";

import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function WritePage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState("");

  const generateBlog = async () => {
    if (!topic) return;
    setLoading(true);
    setBlog("");

    try {
      const res = await axios.post("/api/generate", { topic });
      setBlog(res.data.content);
    } catch (err) {
      console.error("Generation error:", err);
      alert("Failed to generate blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">AI Blog Writer</h1>

      <input
        className="w-full border p-3 rounded mb-4"
        type="text"
        placeholder="Enter a blog topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button
        onClick={generateBlog}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Blog"}
      </button>
      {blog && (
        <div className="prose prose-lg mt-6 max-w-none">
          <ReactMarkdown>{blog}</ReactMarkdown>
        </div>
      )}
    </main>
  );
}
