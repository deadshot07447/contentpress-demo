import { gql } from "@apollo/client";

// ─── Pages ───────────────────────────────────────────────────────────────────

export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      content
      slug
      seo {
        title
        metaDesc
      }
    }
  }
`;

export const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages {
      nodes {
        uri
        slug
        title
      }
    }
  }
`;

// ─── Posts (Blog) ─────────────────────────────────────────────────────────────

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 20, where: { status: PUBLISH }) {
      nodes {
        id
        slug
        title
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: URI) {
      id
      title
      date
      content
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      seo {
        title
        metaDesc
      }
    }
  }
`;

// ─── Services (Custom Post Type) ─────────────────────────────────────────────

export const GET_ALL_SERVICES = gql`
  query GetAllServices {
    services(first: 20) {
      nodes {
        id
        slug
        title
        serviceDetails {
          icon
          shortDescription
          pricingTier
        }
      }
    }
  }
`;

export const GET_SERVICE_BY_SLUG = gql`
  query GetServiceBySlug($slug: ID!) {
    service(id: $slug, idType: URI) {
      id
      title
      content
      slug
      serviceDetails {
        icon
        shortDescription
        pricingTier
      }
    }
  }
`;
