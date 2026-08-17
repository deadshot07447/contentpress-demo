import { apolloClient } from "@/lib/apollo-client";
import { GET_POST_BY_SLUG, GET_ALL_POSTS } from "@/lib/queries";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./post.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data } = await apolloClient.query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });
    const post = (data as any)?.post;
    if (!post) return { title: "Post Not Found" };
    return {
      title: post.seo?.title || post.title,
      description: post.seo?.metaDesc || "",
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export async function generateStaticParams() {
  try {
    const { data } = await apolloClient.query({ query: GET_ALL_POSTS });
    return ((data as any)?.posts?.nodes ?? []).map((post: any) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post = null;

  try {
    const { data } = await apolloClient.query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });
    post = (data as any)?.post;
  } catch {
    // pass
  }

  if (!post) notFound();

  return (
    <>
      <article className={styles.article}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerGlow}></div>
          <div className="container">
            <Link href="/blog" className={styles.backLink}>← Back to Blog</Link>
            <div className={styles.headerMeta}>
              {post.categories?.nodes?.[0] && (
                <span className="badge badge-blue">{post.categories.nodes[0].name}</span>
              )}
              <span className={styles.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long", day: "numeric", year: "numeric",
                })}
              </span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            {post.author?.node && (
              <div className={styles.authorRow}>
                <div className={styles.authorAvatar}>
                  {post.author.node.avatar?.url ? (
                    <img src={post.author.node.avatar.url} alt={post.author.node.name} />
                  ) : (
                    <span>{post.author.node.name?.[0]}</span>
                  )}
                </div>
                <div>
                  <p className={styles.authorName}>{post.author.node.name}</p>
                  <p className={styles.authorRole}>ContentPress Co. Team</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage?.node && (
          <div className={styles.featuredImageWrap}>
            <img
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              className={styles.featuredImage}
            />
          </div>
        )}

        {/* Content */}
        <div className="container">
          <div className={styles.contentWrap}>
            <div
              className={`prose ${styles.content}`}
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="section--sm">
        <div className="container">
          <div className={styles.ctaBox}>
            <h3>Ready to Work With Us?</h3>
            <p>Let's discuss how we can help your business grow.</p>
            <Link href="/contact" className="btn btn-primary">Get in Touch →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
