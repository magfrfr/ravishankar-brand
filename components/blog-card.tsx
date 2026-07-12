import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  Sales: "bg-yellow-light text-amber-dark",
  Marketing: "bg-blue-light text-navy-800",
  Leadership: "bg-blue-wash text-navy-600",
  General: "bg-blue-wash text-navy-600",
};

export default function BlogCard({ post }: { post: PostMeta }) {
  const tagClass = categoryColors[post.category] ?? categoryColors.General;

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full border border-blue-light rounded-2xl p-6 bg-white hover:border-navy-400 hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagClass}`}>
            {post.category}
          </span>
          {post.date && (
            <time className="text-sm text-navy-400">{formatDate(post.date)}</time>
          )}
        </div>

        <h2 className="font-display text-xl font-extrabold text-navy-950 mb-3 group-hover:text-navy-800 leading-snug">
          {post.title}
        </h2>

        {post.summary && (
          <p className="text-navy-600 text-[16px] leading-relaxed line-clamp-3">
            {post.summary}
          </p>
        )}

        <p className="mt-4 text-amber-dark font-semibold text-sm group-hover:underline">
          Read more →
        </p>
      </article>
    </Link>
  );
}
