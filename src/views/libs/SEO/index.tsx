import React from 'react';
import { Helmet } from 'react-helmet';

interface SeoSite {
  siteUrl: string;
  author?: string;
  description?: string;
  title: string; // domain name
  keywords: string[];
}
interface SeoImage {
  src: string;
  height: number;
  width: number;
}
interface SeoMeta {
  name: string;
  content: string;
  property?: any | undefined;
}
export interface SeoProps {
  site: SeoSite;
  description?: string;
  lang?: string;
  meta?: SeoMeta[];
  title: string;
  image?: SeoImage;
  pathname?: string;
}

export default function SEO({ site, description, lang, meta, image: imageMeta, title, pathname }: SeoProps) {
  const metaDescription = description || site.description;
  const mainImage = imageMeta && imageMeta.src
    ? `${site.siteUrl}${imageMeta.src}`
    : null;
  const imagesList = imageMeta
    ? [
      {
        property: 'og:image',
        content: mainImage,
      },
      {
        property: 'og:image:width',
        content: imageMeta.width,
      },
      {
        property: 'og:image:height',
        content: imageMeta.height,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ]
    : [
      {
        name: 'twitter:card',
        content: 'summary',
      },
    ];
  const canonical = pathname ? `${site.siteUrl}${pathname}` : null;
  const link = canonical
    ? [{ rel: 'canonical', href: canonical, }, ]
    : [];
  let metas = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      name: 'keywords',
      content: site.keywords.join(','),
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:creator`,
      content: site.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ];
  metas = [...metas, ...(imagesList as SeoMeta[])];
  metas = meta ? [...metas, ...meta] : metas;

  return (
    <Helmet
      htmlAttributes={{ lang, }}
      title={title}
      titleTemplate={`%s | ${site.title}`}
      link={link}
      meta={metas}
    />
  );
}