import Link from 'next/link'
// import nav menu
import NavigationMenu from './nav-menu'
// import image component
import Image from 'next/image'

export default function Header({ menuItems }) {
// return a header with a nav menu and a logo with a link to home page, using Neck.js Link and image component
  return (
    <>
      <header className="bg-white z-50 flex place-content-between items-center py-4">
        <Link href="/" className="hover:underline">
          <Image src="/favicon/dk-smarthome-logo.png" alt="DK Smarthome - Logo" width={160}  height={59} ></Image>
        </Link>
        <NavigationMenu menuItems={menuItems} textColor={"secondary"}/>
      </header>
    </>
  )
}