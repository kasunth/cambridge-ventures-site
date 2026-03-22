import { FiCheck } from 'react-icons/fi';
import HeroBanner from '../components/layout/HeroBanner';
import ContactSection from '../components/layout/ContactSection';
import { useContent } from '../hooks/useContent';
import { RealEstateContent, ProjectsContent, ContactContent } from '../types/content';

export default function RealEstatePage() {
  const { data: re } = useContent<RealEstateContent>('realestate');
  const { data: projects } = useContent<ProjectsContent>('projects');
  const { data: contact } = useContent<ContactContent>('contact');

  if (!re) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <HeroBanner backgroundImage={re.hero.backgroundImage || undefined} overlayOpacity="bg-black/55">
        <div className="max-w-3xl">
          <p className="text-white/80 text-lg md:text-xl font-light mb-1">{re.hero.title}</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] tracking-tight">
            {re.hero.subtitle}<br />
            <span className="font-bold">{re.hero.subtitleBold}</span>
          </h1>
        </div>
      </HeroBanner>

      {/* What We Do */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-gray-400 text-[11px] tracking-[0.25em] uppercase mb-3">{re.whatWeDo.sectionLabel}</p>
              <h2 className="text-4xl md:text-5xl leading-tight">{re.whatWeDo.heading}</h2>
            </div>
            <div>
              <p className="text-[14px] text-gray-600 leading-[1.8]">{re.whatWeDo.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Addition */}
      <section className="py-20 bg-gold-400 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="text-2xl font-heading font-semibold mb-10">{re.whatWeDo.valueAddition.heading}</h3>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
            {re.whatWeDo.valueAddition.items.map(item => (
              <div key={item.id} className="border-t border-white/30 pt-5">
                <h4 className="font-semibold font-heading text-lg">{item.title}</h4>
                <p className="text-white/80 text-[13px] mt-2 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell Your Land */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gray-400 text-[11px] tracking-[0.25em] uppercase mb-3">{re.sellYourLand.sectionLabel}</p>
          <h2 className="text-4xl md:text-5xl mb-5">{re.sellYourLand.heading}</h2>
          <p className="text-[14px] text-gray-600 leading-[1.8] mb-2">{re.sellYourLand.description}</p>
          <p className="text-gray-800 font-semibold text-[14px] mb-10">{re.sellYourLand.suburbs}</p>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-3">
              {re.sellYourLand.requirements.map((req, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gold-400 text-white px-6 py-3.5 rounded-sm"
                >
                  <span className="text-[13px] font-medium">{req}</span>
                  <FiCheck className="ml-auto shrink-0 text-lg" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-gray-500 text-[15px]">We are able to pay the</p>
              <p className="text-4xl md:text-5xl font-heading font-bold mt-2 leading-tight">entire amount upfront</p>
              <p className="text-gray-500 text-[15px] mt-2">for your land.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      {projects && (
        <section id="projects" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-gray-400 text-[11px] tracking-[0.25em] uppercase mb-3">{projects.sectionLabel}</p>
            <h2 className="text-4xl md:text-5xl mb-14">{projects.heading}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {projects.items.map(project => (
                <div key={project.id} className="group">
                  <div className="bg-gray-200 rounded-lg aspect-video mb-5 overflow-hidden shadow-md">
                    {project.images[0] && (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <h4 className="font-heading font-semibold text-[15px] text-gray-900">{project.title}</h4>
                  <p className="text-gray-400 text-[13px] mt-0.5">{project.location}</p>
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
