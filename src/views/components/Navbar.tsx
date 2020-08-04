import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar () {
  return (
    <ul className='nav'>
      <NavLink activeStyle={{fontWeight: 'bold'}} to={`/`}>
        Home
      </NavLink>
      <NavLink activeStyle={{fontWeight: 'bold'}} to={`/about`}>
        about
      </NavLink>
    </ul>
  );
}