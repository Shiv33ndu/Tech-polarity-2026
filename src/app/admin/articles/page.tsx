"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getAdminArticles,
  deleteArticle,
} from "@/services/article.service";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);

  const load = async () => {
    const res = await getAdminArticles();
    setArticles(res.data || res); // adjust based on backend
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete article?")) return;
    await deleteArticle(slug);
    load();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Articles</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {articles.map((a) => (
            <tr key={a.slug} className="border-t">
              <td className="p-3">{a.title}</td>
              <td>{a.slug}</td>
              <td>{a.status}</td>

              <td className="flex gap-3 p-3">
                <Link
                  href={`/admin/articles/edit/${a.slug}`}
                  className="text-blue-500"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(a.slug)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}