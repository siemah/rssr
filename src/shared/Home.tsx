import * as React from 'react'
import Img from './assets/images/logo.jpg';

export default function Home () {
  return <h2 className='heading-center'>Select a Language
      <li className="brand-logo">
        <img src={Img} alt="logo"/>
      </li>
  </h2>
}