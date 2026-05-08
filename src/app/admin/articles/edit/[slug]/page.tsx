"use client";

import { useState } from "react";
import { updateArticle } from "@/services/article.service";
import { useParams, useRouter } from "next/navigation";

export default function EditArticle() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await updateArticle(slug, form);
    router.push("/admin/articles");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-3xl font-bold">Edit Article</h1>

      <input
        placeholder="Title"
        className="w-full p-2 border"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full p-2 border h-40"
        onChange={(e) =>
          setForm({ ...form, content: e.target.value })
        }
      />

      <button className="bg-black text-white px-4 py-2">
        Update
      </button>
    </form>
  );
}