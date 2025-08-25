"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/authStore";
import { ForbiddenPage } from "@/app/ForbiddenPage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useRouter } from "next/navigation";

export default function NewCoursePage() {
  const { initialized, loading, isAuthenticated, user, token } = useAuthStore();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(99);
  const [avatar, setAvatar] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const canAccess = isAuthenticated && (user?.role === "ADMIN" || user?.role === "TEACHER");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ title, slug, description, price: Math.round(price * 100), avatar, createdById: user?.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || "Failed to create course");
      } else {
        router.push(`/courses/${slug}`);
      }
    } catch (err: any) {
      setError(err?.message || "Request failed");
    } finally {
      setSaving(false);
    }
  };

  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!canAccess) {
    return <ForbiddenPage />;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden">
          <BorderBeam className="rounded-2xl" />
          <div className="bg-white rounded-2xl p-6 border">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Create New Course</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input value={title} onChange={(e) => { setTitle(e.target.value); if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g,'-')); }} className="w-full border rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-lg px-3 py-2" rows={4} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price (USD)</label>
                  <input type="number" min={0} value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} className="w-full border rounded-lg px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input value={avatar} onChange={(e) => setAvatar(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="https://..." />
                </div>
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <ShimmerButton type="submit" className="h-11" disabled={saving}>{saving ? "Creating..." : "Create Course"}</ShimmerButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
