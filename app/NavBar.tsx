import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";

const NavBar = () => {
    const links = [
        {label:"Dashboard",href:"/"},
        {label:"Issues",href:"/Issues"}
    ]
  return (
    <nav className='flex gap-5 h-14 items-center border-b mb-4 pl-4'>
        <h3><Link href="/"><FaBug/></Link></h3>
        <ul className='flex gap-4'>
            {links.map((link)=><Link key={link.href} href={link.href} className='text-zinc-500 hover:text-zinc-900 transition-colors'>{link.label}</Link>)}
        </ul>
    </nav>
  )
}

export default NavBar
