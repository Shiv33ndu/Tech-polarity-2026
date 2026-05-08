"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/auth.service";

export default function AdminLayout({ children }: any) {
  const path = usePathname();
  const router = useRouter();

  const nav = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Articles", href: "/admin/articles" },
    { name: "Create", href: "/admin/articles/create" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-black text-white p-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Admin</h2>
          <button
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="rounded bg-white/10 px-3 py-1 text-sm text-white transition hover:bg-white/20"
          >
            Logout
          </button>
        </div>

        <nav className="space-y-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block p-2 rounded ${
                path === item.href ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}