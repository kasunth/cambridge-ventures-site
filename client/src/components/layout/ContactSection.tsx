import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { ContactContent } from '../../types/content';
import { contactService } from '../../services/api';

interface ContactSectionProps {
  content: ContactContent | null;
}

export default function ContactSection({ content }: ContactSectionProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!content) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await contactService.submit(form);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch {
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-gold-400 text-[11px] tracking-[0.25em] uppercase mb-3 font-medium">{content.sectionLabel}</p>
        <h2 className="text-4xl md:text-5xl mb-14">{content.heading}</h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <p className="text-gray-400 text-[13px] tracking-wide uppercase mb-6">Message us</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                className="w-full border-b border-gray-200 px-0 py-3 text-[14px] focus:outline-none focus:border-gold-400 transition-colors bg-transparent placeholder:text-gray-300"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                className="w-full border-b border-gray-200 px-0 py-3 text-[14px] focus:outline-none focus:border-gold-400 transition-colors bg-transparent placeholder:text-gray-300"
              />
              <textarea
                placeholder="Message"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
                rows={4}
                className="w-full border-b border-gray-200 px-0 py-3 text-[14px] focus:outline-none focus:border-gold-400 transition-colors bg-transparent resize-none placeholder:text-gray-300"
              />
              <button
                type="submit"
                disabled={sending}
                className="bg-gold-400 text-white px-10 py-3.5 text-[13px] font-semibold tracking-wide hover:bg-gold-500 transition-colors duration-300 disabled:opacity-50 mt-2"
              >
                {sending ? 'Sending...' : sent ? 'Sent!' : 'Send'}
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-7 pt-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gold-50 rounded-full flex items-center justify-center shrink-0">
                <FiMapPin className="text-gold-400 text-lg" />
              </div>
              <p className="text-gray-600 text-[14px] leading-relaxed pt-2">{content.address}</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gold-50 rounded-full flex items-center justify-center shrink-0">
                <FiPhone className="text-gold-400 text-lg" />
              </div>
              <div className="pt-2">
                {content.phones.map((phone, i) => (
                  <p key={i} className="text-gray-600 text-[14px]">{phone}</p>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gold-50 rounded-full flex items-center justify-center shrink-0">
                <FiMail className="text-gold-400 text-lg" />
              </div>
              <p className="text-gray-600 text-[14px] pt-2">{content.email}</p>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${content.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-gold-400 text-white px-7 py-3 rounded-full text-[13px] font-semibold hover:bg-gold-500 transition-colors duration-300"
              >
                <FaWhatsapp className="text-lg" />
                {content.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
