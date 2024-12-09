import Image from 'next/image'

export default function Logo() {
  return (
    <div className="relative w-[150px] h-[50px]">
      <Image 
        src="/images/logoWhite.webp" 
        alt="logo" 
        fill
        priority
        className="object-contain"
      />
    </div>
  )
}
