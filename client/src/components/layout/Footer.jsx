
import { Link } from "react-router-dom";
import {
  Heart,
  ShieldCheck,
  Mail,
  ArrowUpRight,
  HeartHandshake
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#351034] text-white">

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="mb-5 inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
              <Heart className="text-[#D90083]" size={27} />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">Her Gasha</h2>
              <p className="text-xs tracking-widest text-pink-200">
                EMPOWERING WOMEN
              </p>
            </div>
          </Link>

          <p className="max-w-md text-sm leading-7 text-pink-100/80">
            A platform designed to help female university students access
            confidential reporting pathways, verified opportunities,
            and essential support services.
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm text-pink-200">
            <HeartHandshake size={18} />
            <span>Safety, dignity, and opportunity for every woman.</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-bold">Quick Links</h3>

          <ul className="space-y-3 text-sm text-pink-100/80">
            <li>
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/report" className="transition hover:text-white">
                Submit a Report
              </Link>
            </li>

            <li>
              <Link to="/opportunities" className="transition hover:text-white">
                Opportunities
              </Link>
            </li>

            <li>
              <Link to="/support" className="transition hover:text-white">
                Support Services
              </Link>
            </li>

            <li>
              <Link to="/dashboard" className="transition hover:text-white">
                My Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-5 text-lg font-bold">Our Commitment</h3>

          <ul className="space-y-4 text-sm text-pink-100/80">
            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 shrink-0 text-pink-300" size={17} />
              <span>Respect and dignity</span>
            </li>

            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 shrink-0 text-pink-300" size={17} />
              <span>Privacy-conscious reporting</span>
            </li>

            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 shrink-0 text-pink-300" size={17} />
              <span>Access to support services</span>
            </li>

            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 shrink-0 text-pink-300" size={17} />
              <span>Verified opportunities</span>
            </li>
          </ul>

          <Link
            to="/support"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pink-300 transition hover:text-white"
          >
            Explore support
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:px-6 md:flex-row lg:px-8">

          <p className="text-xs text-pink-100/70">
            © {currentYear} Her Gasha. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-xs text-pink-100/70">
            Built with
            <Heart size={13} className="fill-[#D90083] text-[#D90083]" />
            for women's safety and empowerment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
