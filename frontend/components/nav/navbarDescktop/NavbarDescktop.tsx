import Logo from "./Logo";

export default function NavbarDescktop() {
  return (
    <nav className="flex justify-between border-b-primary fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md border-b border-white/10 p-4 z-50">
      <Logo />
    </nav>
  );
}
