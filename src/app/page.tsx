import { client } from "@/sanity/client";
import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  slug: string;
}

async function getArticles() {
  // The 'excerpt' field was removed as it doesn't seem to exist.
  // Consider adding an 'excerpt' text field to your 'post' schema in Sanity for a better summary.
  const query = `*[_type == "post"]{
    _id,
    title,
    "slug": slug.current
  }`;
  const articles = await client.fetch<Article[]>(query);
  return articles;
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <div>
      <header className="bg-dark text-white text-center p-3 mb-4">
        <h1>OUCHI-CINEMA</h1>
      </header>
      <main className="container">
        <h2 className="mb-4">記事一覧</h2>
        <div className="row">
          {articles.map((article) => (
            <div className="col-md-4 mb-4" key={article._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  {/* <p className="card-text">{article.excerpt}</p> */}
                  <Link href={`/posts/${article.slug}`} className="btn btn-primary">
                    続きを読む
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}