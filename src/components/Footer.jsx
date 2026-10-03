import {
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
} from 'lucide-react';

const companyLinks = ['About Us', 'Contact Us', 'Affiliate', 'Career', 'Latest News'];
const categoryLinks = [
  "Men’s Fashion",
  'Denim Collection',
  'Western Wear',
  'Sport Wear',
  'Fashion Jewellery',
];
const quickLinks = [
  'Privacy Policy',
  'Terms And Condition',
  'Return Policy',
  "FAQ's",
  'Become A Vendor',
];

function FooterLink({ children }) {
  return (
    <a
      href="#!"
      className="text-sm text-slate-300 transition hover:translate-x-1 hover:text-amber-400"
    >
      {children}
    </a>
  );
}

function SocialLink({ label, children }) {
  return (
    <a
      href="#!"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700/80 text-amber-400 transition hover:-translate-y-1 hover:bg-amber-400 hover:text-slate-950"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-[#071737] text-white">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 right-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-6 pt-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_1fr_0.95fr_1.55fr] lg:gap-10">
          {/* Brand */}
          <div>
            <a href="#" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-2xl font-black italic text-white shadow-lg shadow-amber-400/20">
                ///
              </span>
              <span className="text-3xl font-bold tracking-tight">Zenis</span>
            </a>

            <p className="mt-6 max-w-xs text-sm leading-6 text-slate-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
              distinctio molestiae error ullam obcaecati dolorem inventore.
            </p>

            <div className="mt-7 flex items-center gap-2">
              <span className="mr-1 text-sm font-semibold text-slate-200">Follow :</span>
              <SocialLink label="Facebook">
                <Facebook className="h-4 w-4" fill="currentColor" />
              </SocialLink>
              <SocialLink label="Twitter">
                <Twitter className="h-4 w-4" fill="currentColor" />
              </SocialLink>
              <SocialLink label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-bold">Company</h3>
            <ul className="mt-6 space-y-4">
              {companyLinks.map((link) => (
                <li key={link}>
                  <FooterLink>{link}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-base font-bold">Category</h3>
            <ul className="mt-6 space-y-4">
              {categoryLinks.map((link) => (
                <li key={link}>
                  <FooterLink>{link}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-base font-bold">Quick Links</h3>
            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link}>
                  <FooterLink>{link}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold">Contact Us</h3>
            <p className="mt-6 text-sm leading-6 text-slate-300">
              It is a long established fact that reader distracted looking
              layout. It is a long established fact.
            </p>

            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <a href="#!" className="flex items-start gap-3 transition hover:text-amber-400">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                <span>37 W 24th St, New York, NY</span>
              </a>
              <a href="tel:+123324587939" className="flex items-center gap-3 transition hover:text-amber-400">
                <Phone className="h-5 w-5 shrink-0 text-white" />
                <span>+123 324 5879 39</span>
              </a>
              <a href="mailto:info@zenis.com" className="flex items-center gap-3 transition hover:text-amber-400">
                <Mail className="h-5 w-5 shrink-0 text-white" />
                <span>info@Zenis.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-slate-500/30 pt-5 text-sm text-slate-300 lg:flex-row lg:items-center lg:justify-between">
          <p>Copyright @ <span className="font-semibold text-white">Zenis</span> 2025. All right reserved.</p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="mr-1">Payment by :</span>
            <span className="flex h-8 items-center rounded bg-white px-2 text-[10px] font-black italic text-red-600">Mastercard</span>
            <span className="flex h-8 items-center rounded bg-[#d6c5ff] px-2 text-[10px] font-black text-indigo-700">VISA</span>
            <span className="flex h-8 items-center rounded bg-[#61b8df] px-2 text-[10px] font-black text-blue-900">BANK</span>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-500 bg-white text-slate-700 shadow-lg transition hover:-translate-y-1 hover:border-amber-400 hover:bg-amber-400"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
