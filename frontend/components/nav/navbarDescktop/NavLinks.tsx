import Link from 'next/link';
import { NavLinksProps } from '../interfaces/nav';

export default function NavLinks({ href, label }: NavLinksProps) {
  return (
    <Link href={href} className='hover:underline text-white'>
      <ul>
        <li>{label}</li>
      </ul>
    </Link>
  );
}
