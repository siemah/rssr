import React from 'react';
import SEO, { SeoProps } from '../SEO';

interface PageLayourProps {
  seoMetaData: SeoProps;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}
/**
 * page layout
 */
export default function PageLayout({ className, id, header, footer, children, seoMetaData }: PageLayourProps) {
  return (
    <main className={className} id={id}>
      <SEO {...seoMetaData} />
      {header}
      {children}
      {footer}
    </main>
  );
}