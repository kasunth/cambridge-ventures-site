import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { ContactContent } from '../../types/content';

interface FooterProps {
  content: ContactContent | null;
}

export default function Footer({ content }: FooterProps) {
  if (!content) return null;

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center gap-3 group mb-5">
              <div className="w-10 h-10 bg-gold-400 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
                  <path d="M8 8L20 4L32 8L36 20L32 32L20 36L8 32L4 20L8 8Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M14 14L20 10L26 14V26L20 30L14 26V14Z" stroke="white" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <div className="leading-tight">
                <div className="text-[12px] font-bold tracking-[0.2em] text-gray-900">CAMBRIDGE</div>
                <div className="text-[9px] tracking-[0.35em] text-gray-400 font-medium">VENTURES</div>
              </div>
            </Link>
            <p className="text-[12px] text-gray-400 leading-relaxed">About Cambridge Ventures</p>
          </div>

          {/* VC Links */}
          <div>
            <h4 className="text-[12px] font-semibold text-gray-800 tracking-wide uppercase mb-4">Venture Capital</h4>
            {content.footer.ventureCapitalLinks.map(link => (
              <Link
                key={link.label}
                to={link.url}
                className="block text-[13px] text-gray-400 hover:text-gold-400 transition-colors mb-2.5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* RE Links */}
          <div>
            <h4 className="text-[12px] font-semibold text-gray-800 tracking-wide uppercase mb-4">Real Estate</h4>
            {content.footer.realEstateLinks.map(link => (
              <Link
                key={link.label}
                to={link.url}
                className="block text-[13px] text-gray-400 hover:text-gold-400 transition-colors mb-2.5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[12px] font-semibold text-gray-800 tracking-wide uppercase mb-4">Follow Us On</h4>
            <div className="flex gap-3">
              {content.socialLinks.linkedin && (
                <a
                  href={content.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gold-400 hover:text-white transition-all duration-300"
                >
                  <FaLinkedinIn size={14} />
                </a>
              )}
              {content.socialLinks.whatsapp && (
                <a
                  href={content.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gold-400 hover:text-white transition-all duration-300"
                >
                  <FaWhatsapp size={14} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-gray-200">
          <p className="text-[11px] text-gray-300 text-center tracking-wide">{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
