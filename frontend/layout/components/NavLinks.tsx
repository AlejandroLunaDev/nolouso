import Link from 'next/link';
 interface NavLinksProps {
    href: string;
    label: string;
  }
export default function NavLinks({ href, label }: NavLinksProps) {
  return (
    <Link 
      href={href} 
      className='text-white hover:text-white/80 transition-colors duration-200 text-lg lg:text-base uppercase tracking-wider'
    >
      <span>{label}</span>
    </Link>
  );
}
