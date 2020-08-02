import React from 'react'
import PageLayout from '../libs/PageLayout'

export default function About() {
  return (
    <PageLayout seoMetaData={{
      title: 'About page',
      site: {
        siteUrl: '',
        title: 'domain.com',
        keywords: []
      }
    }}>
      <p className="para">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam atque commodi exercitationem, quas laborum debitis praesentium reiciendis maxime laudantium iusto quibusdam at perspiciatis ullam facilis dolore earum error voluptate in.
      </p>
    </PageLayout>
  )
}
