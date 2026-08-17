import { apolloClient } from "@/lib/apollo-client";
import { GET_ALL_POSTS } from "@/lib/queries";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "./blog.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Company News & Updates",
  description:
    "Stay up to date with the latest news, industry insights, and updates from ContentPress Co.",
};

async function getPosts() {
  try {
    const { data } = await apolloClient.query({ query: GET_ALL_POSTS });
    return (data as any)?.posts?.nodes ?? [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  if (posts.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "10rem 2rem", background: "var(--neutral-950)", minHeight: "60vh" }}>
        <h1 style={{ color: "var(--white)", marginBottom: "1rem" }}>Blog</h1>
        <p style={{ color: "var(--neutral-400)" }}>No posts have been published yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>
        <div className="container">
          <span className="badge badge-blue">Company News & Updates</span>
          <h1 className={styles.heroHeading}>
            Insights From the <span className="gradient-text">ContentPress Team</span>
          </h1>
          <p className={styles.heroSub}>
            Industry trends, product updates, and thought leadership from our team of experts.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Featured Post */}
          {featured && (
            <Link
              href={featured.slug !== "#" ? `/blog/${featured.slug}` : "#"}
              className={styles.featured}
            >
              {featured.featuredImage?.node ? (
                <img
                  src={featured.featuredImage.node.sourceUrl}
                  alt={featured.featuredImage.node.altText || featured.title}
                  className={styles.featuredImg}
                />
              ) : (
                <div className={styles.featuredImgPlaceholder}></div>
              )}
              <div className={styles.featuredContent}>
                <div className={styles.featuredMeta}>
                  {featured.categories?.nodes?.[0] && (
                    <span className="badge badge-blue">{featured.categories.nodes[0].name}</span>
                  )}
                  <span className={styles.featuredLabel}>Featured Post</span>
                </div>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <div
                  className={styles.featuredExcerpt}
                  dangerouslySetInnerHTML={{ __html: featured.excerpt || "" }}
                />
                <div className={styles.featuredFooter}>
                  <span>{featured.author?.node?.name}</span>
                  <span>·</span>
                  <span>
                    {new Date(featured.date).toLocaleDateString("en-US", {
                      month: "long", day: "numeric", year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Post Grid */}
          {rest.length > 0 && (
            <div className="grid-3" style={{ marginTop: "var(--space-xl)" }}>
              {rest.map((post: any) => (
                <Link
                  key={post.id}
                  href={post.slug !== "#" ? `/blog/${post.slug}` : "#"}
                  className={styles.postCard}
                >
                  {post.featuredImage?.node ? (
                    <img
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      className={styles.postImage}
                    />
                  ) : (
                    <div className={styles.postImagePlaceholder}></div>
                  )}
                  <div className={styles.postBody}>
                    {post.categories?.nodes?.[0] && (
                      <span className="tag">{post.categories.nodes[0].name}</span>
                    )}
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <div
                      className={styles.postExcerpt}
                      dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
                    />
                    <div className={styles.postMeta}>
                      <span>{post.author?.node?.name}</span>
                      <span>·</span>
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {posts.length === 0 && (
            <div className={styles.empty}>
              <span>📰</span>
              <h3>No posts yet</h3>
              <p>Check back soon — our team is writing!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
