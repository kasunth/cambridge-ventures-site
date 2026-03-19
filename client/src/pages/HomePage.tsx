import { Link } from 'react-router-dom';
import HeroBanner from '../components/layout/HeroBanner';
import ContactSection from '../components/layout/ContactSection';
import { useContent } from '../hooks/useContent';
import { HomeContent, TeamContent, ContactContent } from '../types/content';

interface HomeData extends HomeContent {
  whoWeAre: HomeContent['whoWeAre'] & { image?: string };
}

export default function HomePage() {
  const { data: home } = useContent<HomeData>('home');
  const { data: team } = useContent<TeamContent>('team');
  const { data: contact } = useContent<ContactContent>('contact');

  if (!home) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <HeroBanner backgroundImage={home.hero.backgroundImage || undefined} overlayOpacity="bg-black/55">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight">
            {home.hero.title}<br />
            <span className="font-bold">{home.hero.titleBold}</span>
          </h1>
          <p className="text-white/70 mt-5 text-base font-light tracking-wide">{home.hero.subtitle}</p>
        </div>
      </HeroBanner>

      {/* Divisions Banner */}
      <section className="bg-gold-400">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          {[home.divisions.ventureCapital, home.divisions.realEstate].map((div, i) => (
            <Link
              key={div.title}
              to={div.link}
              className={`py-8 px-8 text-center hover:bg-gold-500 transition-all duration-300 ${
                i === 0 ? 'border-r border-gold-300/40' : ''
              }`}
            >
              <h3 className="text-2xl md:text-3xl text-white font-heading">{div.title}</h3>
              <p className="text-white/75 text-sm mt-1.5 font-light">{div.subtitle}</p>
              <p className="text-white/60 text-sm mt-1 font-light">Learn More...</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-gray-400 text-[11px] tracking-[0.25em] uppercase mb-3">{home.whoWeAre.sectionLabel}</p>
              <h2 className="text-4xl md:text-5xl leading-tight">{home.whoWeAre.heading}</h2>
              {home.whoWeAre.image && (
                <img
                  src={home.whoWeAre.image}
                  alt="About us"
                  className="mt-8 w-full max-w-sm rounded-lg shadow-lg object-cover aspect-[4/3]"
                />
              )}
            </div>
            <div className="space-y-5">
              <p className="text-[17px] text-gray-800 font-medium leading-relaxed">{home.whoWeAre.description}</p>
              <p className="text-[14px] text-gray-600 leading-[1.8]">{home.whoWeAre.ventureCapital}</p>
              <p className="text-[14px] text-gray-600 leading-[1.8]">{home.whoWeAre.realEstate}</p>
              <p className="text-[14px] text-gray-600 leading-[1.8]">{home.whoWeAre.closing}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative separator */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Leadership Team */}
      {team && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-gray-400 text-[11px] tracking-[0.25em] uppercase mb-3">{team.sectionLabel}</p>
            <h2 className="text-4xl md:text-5xl mb-16">{team.heading}</h2>
            <div className="grid md:grid-cols-2 gap-16 max-w-4xl">
              {team.members.map(member => (
                <div key={member.id} className="group">
                  <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg mb-6 overflow-hidden shadow-md">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300" />
                    )}
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gold-400 text-[13px] font-semibold mt-0.5">{member.title}</p>
                  <p className="text-gray-600 text-[13px]">{member.role}</p>
                  <p className="text-gray-400 text-[12px]">{member.committee}</p>
                  <p className="text-gray-500 text-[13px] mt-3 leading-relaxed">{member.bio}</p>
                  {member.readMoreLink && (
                    <a href={member.readMoreLink} className="text-gold-400 text-[13px] mt-2 inline-block hover:text-gold-500 transition-colors">
                      Read more...
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection content={contact} />
    </div>
  );
}
