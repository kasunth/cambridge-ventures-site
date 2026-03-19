import HeroBanner from '../components/layout/HeroBanner';
import ContactSection from '../components/layout/ContactSection';
import { useContent } from '../hooks/useContent';
import { CareersContent, ContactContent } from '../types/content';

export default function CareersPage() {
  const { data: careers } = useContent<CareersContent>('careers');
  const { data: contact } = useContent<ContactContent>('contact');

  if (!careers) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <HeroBanner backgroundImage={careers.hero.backgroundImage || undefined} overlayOpacity="bg-black/60">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white leading-[1.2] tracking-tight max-w-3xl">
            {careers.hero.title}<br />
            <span className="font-bold text-4xl md:text-5xl lg:text-6xl">{careers.hero.titleBold}</span><br />
            <span className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light">{careers.hero.subtitle}</span>
          </h1>
        </div>
      </HeroBanner>

      {/* Highlight Banner */}
      <section className="bg-gold-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <p className="text-white text-xl md:text-2xl font-heading leading-relaxed max-w-3xl">
            {careers.hero.highlightText}<br />
            and possess a <strong>{careers.hero.closing.replace('and possess a ', '').replace('.', '')}</strong>.
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl mb-14">{careers.sectionHeading}</h2>
          <div className="space-y-8">
            {careers.jobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg p-8 md:p-10 shadow-sm border border-gray-100">
                <div className="mb-5">
                  <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">{job.department}</span>
                  <h3 className="text-xl font-heading font-semibold mt-1.5 text-gray-900">{job.title}</h3>
                </div>

                {job.role && (
                  <div className="mb-4">
                    <p className="text-gold-400 font-semibold text-[11px] tracking-[0.15em] uppercase">ROLE</p>
                    <p className="text-gray-600 text-[14px] mt-1 leading-relaxed">{job.role}</p>
                  </div>
                )}

                {job.experience && (
                  <div className="mb-4">
                    <p className="text-gold-400 font-semibold text-[11px] tracking-[0.15em] uppercase">EXPERIENCE</p>
                    <p className="text-gray-600 text-[14px] mt-1">{job.experience}</p>
                  </div>
                )}

                {job.qualifications && (
                  <div className="mb-4">
                    <p className="text-gold-400 font-semibold text-[11px] tracking-[0.15em] uppercase">QUALIFICATIONS</p>
                    <p className="text-gray-600 text-[14px] mt-1">{job.qualifications}</p>
                  </div>
                )}

                {job.requirements.length > 0 && (
                  <ol className="list-decimal list-inside space-y-1.5 text-gray-600 text-[14px] mb-8 leading-relaxed">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ol>
                )}

                <div className="text-right">
                  <a
                    href={job.applyLink}
                    className="inline-block bg-gold-400 text-white px-10 py-3.5 text-[13px] font-semibold tracking-wide hover:bg-gold-500 transition-colors duration-300"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection content={contact} />
    </div>
  );
}
