import { client } from "@/sanity/client";
import Link from "next/link"; // ← これを追加

// Sanityから受け取る記事データの「型」を決めとく
type Post = {
  _id: string;
  title: string;
  slug: string; // ← これを追加
};

// Sanityから記事データを取得する関数
async function getPosts() {
  const query = `*[_type == "post"]{_id, title, "slug": slug.current}`;
  const data = await client.fetch<Post[]>(query);
  return data;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <header className="w-full max-w-5xl text-center mb-12">
        <h1 className="text-5xl font-bold">OUCHI-CINEMA</h1>
      </header>

      <section className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-4">記事一覧</h2>
        <ul>
          {posts.map((post) => (
            <li key={post._id} className="text-xl mb-2 hover:text-amber-400 transition-colors">
              <Link href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}