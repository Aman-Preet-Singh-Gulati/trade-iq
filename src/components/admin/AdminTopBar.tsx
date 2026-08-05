import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function AdminTopBar() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-6 border-b border-outline-variant bg-surface-container-lowest/95 backdrop-blur-sm">
      <Link href="/admin" className="font-headline-lg-mobile text-primary font-bold">
        TradeIQ Admin
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/" target="_blank" className="font-body-sm text-secondary hover:text-primary transition-colors">
          View site
        </Link>
        <SignOutButton />
      </div>
    </header>
  );
}
