"use client";

import { useState } from "react";
import { createArticle } from "@/services/article.service";
import { useRouter } from "next/navigation";

export default function CreateArticle() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    domain_slug: "",
    tags: "",
    is_trending: false,
    status: "published",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
      image: {},
    };

    try {
      await createArticle(payload);
      alert("Article created!");
      router.push("/admin/articles");
    } catch (err) {
      console.error(err);
      alert("Error creating article");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
      <h1 className="text-3xl font-bold">Create Article</h1>

      <input
        placeholder="Title"
        className="w-full p-2 border"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Slug (unique)"
        className="w-full p-2 border"
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
      />

      <input
        placeholder="Domain (e.g. tech)"
        className="w-full p-2 border"
        onChange={(e) =>
          setForm({ ...form, domain_slug: e.target.value })
        }
      />

      <input
        placeholder="Tags (comma separated)"
        className="w-full p-2 border"
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
      />

      <input
        placeholder="Description"
        className="w-full p-2 border"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <textarea
        placeholder="Content"
        className="w-full p-2 border h-40"
        onChange={(e) =>
          setForm({ ...form, content: e.target.value })
        }
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          onChange={(e) =>
            setForm({ ...form, is_trending: e.target.checked })
          }
        />
        <label>Trending</label>
      </div>

      <select
        className="w-full p-2 border"
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>

      <button className="bg-black text-white px-4 py-2">
        Create Article
      </button>
    </form>
  );
}