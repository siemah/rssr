import React from 'react'
import PageLayout from '../libs/PageLayout'

export default function About() {
  return (
    <PageLayout seoMetaData={{
      title: '404 Not Found',
      site: {
        siteUrl: '',
        title: 'domain.com',
        keywords: []
      }
    }}>
      <h1 className='heading-center'>not found</h1>
    </PageLayout>
  )
}
