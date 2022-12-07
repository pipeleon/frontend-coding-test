import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'


function NavBar() {
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link><Link href='/'>Home</Link></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link><Link href='/profile/new'>New Profile</Link></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link><Link href='/task/new'>New Task</Link></Nav.Link>
      </Nav.Item>
    </Nav >
  )
}

export default NavBar