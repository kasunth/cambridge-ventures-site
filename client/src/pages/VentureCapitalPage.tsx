import HeroBanner from '../components/layout/HeroBanner';
import ContactSection from '../components/layout/ContactSection';
import { useContent } from '../hooks/useContent';
import { VentureContent, ContactContent } from '../types/content';

export default function VentureCapitalPage() {
  const { data: vc } = useContent<VentureContent>('venture');
  const { data: contact } = useContent<ContactContent>('contact');

  if (!vc) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <HeroBanner backgroundImage={vc.hero.backgroundImage || undefined} overlayOpacity="bg-black/55">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight">
            {vc.hero.title} <span className="font-bold">{vc.hero.titleBold}</span><br />
            {vc.hero.title2} <span className="font-bold">{vc.hero.title2Bold}</span>
          </h1>
          <p className="text-white/70 mt-5 text-base font-light tracking-wide">{vc.hero.subtitle}</p>
          <p className="text-white font-semibold mt-8 text-[15px]">Need to fast-track your growth?</p>
          <a
            href={vc.hero.ctaLink}
            className="inline-block mt-4 bg-gold-400 text-white px-10 py-3.5 text-sm font-semibold tracking-wide hover:bg-gold-500 transition-colors duration-300"
          >
            {vc.hero.ctaText}
          </a>
        </div>
      </HeroBanner>

      {/* What We Do */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-gray-400 text-[11px] tracking-[0.25em] uppercase mb-3">{vc.whatWeDo.sectionLabel}</p>
              <h2 className="text-4xl md:text-5xl leading-tight">{vc.whatWeDo.heading}</h2>
            </div>
            <div>
              <p className="text-[14px] text-gray-600 leading-[1.8]">{vc.whatWeDo.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative separator */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Ticket Sizes */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
                alt="Investment analytics"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-heading font-semibold mb-4">{vc.ticketSizes.heading}</h3>
              <p className="text-[14px] text-gray-600 leading-[1.8] mb-8">{vc.ticketSizes.description}</p>
              <ul className="space-y-3">
                {vc.ticketSizes.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 text-[14px]">
                    <span className="w-2 h-2 bg-gold-400 rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="py-24 bg-dark-600 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-16 text-white">{vc.philosophy.heading}</h2>
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {vc.philosophy.cards.map(card => (
              <div key={card.id} className="p-10 bg-dark-600">
                <h4 className="text-lg font-heading font-semibold mb-4 text-gold-400">{card.title}</h4>
                <p className="text-gray-300 text-[14px] leading-[1.8]">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-14 bg-dark-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/70 italic text-[15px] leading-relaxed font-light">{vc.partnerCta.quote}</p>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-2 inline-block">
            {vc.partnerCta.heading}
          </h2>
          <div className="w-24 h-0.5 bg-gold-400 mx-auto mt-3 mb-8" />
          <p className="text-gray-500 text-[13px] uppercase tracking-[0.15em]">
            {vc.partnerCta.body} <strong className="text-gray-700">{vc.partnerCta.bodyBold}</strong>
          </p>
        </div>
      </section>

      <ContactSection content={contact} />
    </div>
  );
}
