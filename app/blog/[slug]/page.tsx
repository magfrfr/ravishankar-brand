import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) notFound();

  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);
  const allPosts = getAllPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const categoryColors: Record<string, string> = {
    Sales: "bg-yellow-light text-amber-dark",
    Marketing: "bg-blue-light text-navy-800",
    Leadership: "bg-blue-wash text-navy-600",
    General: "bg-blue-wash text-navy-600",
  };
  const tagClass = categoryColors[meta.category] ?? categoryColors.General;

  return (
    <>
      {/* Post header */}
      <section className="bg-white pt-16 pb-10 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="text-navy-400 hover:text-amber-dark text-sm font-medium transition-colors mb-8 inline-block"
          >
            ← Back to Writing
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagClass}`}>
              {meta.category}
            </span>
            {meta.date && (
              <time className="text-sm text-navy-400">{formatDate(meta.date)}</time>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-navy-950 leading-tight">
            {meta.title}
          </h1>
          {meta.summary && (
            <p className="mt-4 text-navy-600 text-xl leading-relaxed">{meta.summary}</p>
          )}
        </div>
      </section>

      {/* Post content */}
      <section className="bg-white pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="h-px bg-blue-light mb-12" />
          <article className="prose prose-lg max-w-none text-[18px] leading-[1.8]">
            <Post />
          </article>
        </div>
      </section>

      {/* Author card */}
      <section className="bg-blue-wash py-10 px-6">
        <div className="max-w-3xl mx-auto flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-navy-950 flex items-center justify-center text-amber-brand font-display font-extrabold text-xl shrink-0">
            RR
          </div>
          <div>
            <p className="font-display text-lg font-extrabold text-navy-950">
              Ravishankar R
            </p>
            <p className="text-navy-600 text-sm">
              Chief Growth & Marketing Officer with 35+ years of experience in
              sales and marketing.{" "}
              <Link href="/about" className="text-amber-dark hover:underline">
                Learn more →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Read next */}
      {otherPosts.length > 0 && (
        <section className="bg-white py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-extrabold text-navy-950 mb-8">
              Keep Reading
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {otherPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block border border-blue-light rounded-2xl p-5 hover:border-navy-400 hover:shadow-md transition-all">
                  <p className="font-display text-lg font-extrabold text-navy-950 group-hover:text-navy-800 leading-snug mb-2">
                    {post.title}
                  </p>
                  <p className="text-amber-dark text-sm font-semibold group-hover:underline">
                    Read →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
