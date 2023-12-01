"use client";
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '../button/button'

export const Navbar = () => {
  const Links = [
    { name:"Home", link:"/" },
    { name:"Legal", link:"/legal" },
    { name:"About", link:"/about" },
    { name:"Contact", link:"/contact" },
  ];
  const [open, setOpen] = useState(false);
const router = useRouter()
  return <div className='w-full fixed top-0 left-0  z-50'>
    <div className='flex items-center justify-between bg-foreground h-[70px] py-4 md:px-10 px-7'>
      <div onClick={() => router.push('/')} className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
        <span >Booker</span>
      </div>
      <div className='md:hidden' onClick={() => setOpen(!open)}>
       {
  open ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path  strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
</svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path  strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
</svg>
      }
      </div>
      <ul className={`bg-shade md:flex md:items-center md:pb-0 pb-8 absolute md:static  md:z-auto  z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-[50px]' : 'top-[-400px]'} md:bg-transparent`}>
        {
          Links.map((link) => (
            <li className='md:ml-8 md:my-0 my-7 font-semibold ' key={link.link}>
              <a href={link.link} className='text-gray uppercase hover:text-white duration-500'>{link.name}</a>
            </li>))
        }
        <Button size='md' color={'secondary'} className='md:ml-8 md:static'>7 day free</Button>
      </ul>
    </div>
  </div>
}



