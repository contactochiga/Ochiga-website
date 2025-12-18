import Header from "../components/Header";
import Link from "next/link";
import { sanityClient } from "../../lib/sanity";
import { POSTS_QUERY } from "../../lib/queries";

export const revalidate = 60; // ISR (enterprise friendly)

async function getPosts() {
  return sanityClient.fetch(POSTS_QUERY);
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="pt-16 bg-white text-[#1A1A1A]">
      <Header />

      {/* HERO */}
      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Insights & Publications
          </h1>
          <p className="text-gray-300 max-w-3xl">
            Thought leadership on smart infrastructure, digital twins, estate
            operations, and connected environments.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {posts.map((post: any) => (
            <article
              key={post._id}
              className="border rounded-2xl p-6 hover:-translate-y-1 transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {post.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug.current}`}
                className="text-[#7A0026] font-semibold"
              >
                Read Article →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
