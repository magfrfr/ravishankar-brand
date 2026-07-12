"use client";

import { useState } from "react";
import BlogCard from "@/components/blog-card";
import type { PostMeta } from "@/lib/blog";

const CATEGORIES = ["All", "Sales", "Marketing", "Leadership"];

export default function BlogFilter({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              active === cat
                ? "bg-navy-950 text-white"
                : "bg-blue-wash text-navy-800 hover:bg-blue-light"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-navy-400 text-center py-20">
          No posts in this category yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
