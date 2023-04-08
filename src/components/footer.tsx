import Image from 'next/image'
import NavigationMenu from './nav-menu'

export default function Footer({ menuItems }) {
  return (
    <footer id="colophon" className="site-footer bg-secondary py-8 md:p-16 text-light" role="contentinfo">
    <div className="container mx-auto max-w-content">
      <div className="flex flex-col md:flex-row gap-4 mb-8 place-content-between">
        <div className="basis-1/4">
          <div className="max-w-[160px] mb-4">
          <Image src="/favicon/dk-smarthome-logo.png" alt="DK Smarthome - Logo" width={160}  height={59} ></Image>
          </div>
        </div>
        <div className="basis-1/3">
          <p className="footer-header">Nyttige Links</p>
          <NavigationMenu hidden={false} menuItems={menuItems} textColor="white" />
        </div>
        <div className="basis-1/3">
          <p className="footer-header">Kontakt</p>
          <p>E-mail: info@dksmarthome.dk</p>
        </div>
      </div>
      <div>
        &copy; 2023 - DK Smart Home
      </div>
    </div>
  </footer>
  )
}
