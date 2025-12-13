import Header from "../../components/Header";
import { sanityClient } from "../../../lib/sanity";
import { SINGLE_POST_QUERY } from "../../../lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 60;

async function getPost(slug: string) {
  return sanityClient.fetch(SINGLE_POST_QUERY, { slug });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  return (
    <main className="pt-16 bg-white text-[#1A1A1A]">
      <Header />

      {/* HERO */}
      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>

          <p className="text-gray-300">
            {post.author?.name} •{" "}
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto prose prose-lg">
          {post.body.map((block: any, i: number) => (
            <p key={i}>{block.children?.[0]?.text}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
