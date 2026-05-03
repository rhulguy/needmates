import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16 border-t-8 border-primary">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div className="col-span-2 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center transform -rotate-3 shrink-0">
              <span className="text-white font-black text-lg md:text-xl">N</span>
            </div>
            <span className="font-black text-xl md:text-2xl tracking-tight text-white">NeedMates</span>
          </Link>
          <p className="text-muted-foreground max-w-sm text-sm md:text-lg font-medium leading-relaxed">
            Turn local interest into real action. A better way to find what you need, together.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-base md:text-xl mb-4 md:mb-6 text-white">Explore</h4>
          <ul className="space-y-2.5 md:space-y-4 font-medium text-muted-foreground text-sm md:text-base">
            <li><Link href="/feed" className="hover:text-primary transition-colors">Local Needs</Link></li>
            <li><Link href="/offers" className="hover:text-primary transition-colors">Local Offers</Link></li>
            <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
            <li><Link href="/business" className="hover:text-primary transition-colors">For Businesses</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-base md:text-xl mb-4 md:mb-6 text-white">Community</h4>
          <ul className="space-y-2.5 md:space-y-4 font-medium text-muted-foreground text-sm md:text-base">
            <li><Link href="#" className="hover:text-primary transition-colors">Safety & Trust</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Guidelines</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Help Centre</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10 md:mt-16 pt-6 md:pt-8 border-t border-white/10 text-muted-foreground font-medium flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
        <p>© {new Date().getFullYear()} NeedMates. Built for local communities.</p>
        <div className="flex gap-5">
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
