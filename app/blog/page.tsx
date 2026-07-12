import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogFilter from "@/components/blog-filter";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Ideas, lessons, and hard-won wisdom on sales, marketing, and leadership.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="bg-blue-wash py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-amber-dark font-semibold tracking-widest uppercase text-sm mb-4">
            Writing
          </p>
          <h1 className="font-display text-5xl font-extrabold text-navy-950 leading-tight">
            Ideas, Lessons, and Hard-Won Wisdom
          </h1>
          <p className="mt-4 text-navy-600 text-xl max-w-2xl">
            Things I&apos;ve learned — and keep learning — about sales,
            marketing, and what it takes to build businesses that last.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <BlogFilter posts={posts} />
        </div>
      </section>
    </>
  );
}
