export interface HomeContent {
  hero: {
    backgroundImage: string;
    title: string;
    titleBold: string;
    subtitle: string;
  };
  divisions: {
    ventureCapital: { title: string; subtitle: string; link: string };
    realEstate: { title: string; subtitle: string; link: string };
  };
  whoWeAre: {
    sectionLabel: string;
    heading: string;
    description: string;
    ventureCapital: string;
    realEstate: string;
    closing: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  role: string;
  committee: string;
  photo: string;
  bio: string;
  readMoreLink: string;
}

export interface TeamContent {
  sectionLabel: string;
  heading: string;
  members: TeamMember[];
}

export interface PhilosophyCard {
  id: string;
  title: string;
  description: string;
}

export interface VentureContent {
  hero: {
    backgroundImage: string;
    title: string;
    titleBold: string;
    title2: string;
    title2Bold: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  whatWeDo: {
    sectionLabel: string;
    heading: string;
    body: string;
  };
  ticketSizes: {
    heading: string;
    description: string;
    items: string[];
  };
  philosophy: {
    heading: string;
    cards: PhilosophyCard[];
  };
  partnerCta: {
    heading: string;
    body: string;
    bodyBold: string;
    quote: string;
  };
}

export interface ValueAdditionItem {
  id: string;
  title: string;
  description: string;
}

export interface RealEstateContent {
  hero: {
    backgroundImage: string;
    title: string;
    subtitle: string;
    subtitleBold: string;
  };
  whatWeDo: {
    sectionLabel: string;
    heading: string;
    body: string;
    valueAddition: {
      heading: string;
      items: ValueAdditionItem[];
    };
  };
  sellYourLand: {
    sectionLabel: string;
    heading: string;
    description: string;
    suburbs: string;
    requirements: string[];
    paymentNote: string;
  };
}

export interface Project {
  id: string;
  title: string;
  location: string;
  images: string[];
  description: string;
}

export interface ProjectsContent {
  sectionLabel: string;
  heading: string;
  items: Project[];
}

export interface Job {
  id: string;
  title: string;
  department: string;
  role?: string;
  experience?: string;
  qualifications?: string;
  requirements: string[];
  applyLink: string;
}

export interface CareersContent {
  hero: {
    backgroundImage: string;
    title: string;
    titleBold: string;
    subtitle: string;
    highlightText: string;
    closing: string;
  };
  sectionHeading: string;
  jobs: Job[];
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface ContactContent {
  sectionLabel: string;
  heading: string;
  address: string;
  phones: string[];
  email: string;
  whatsapp: string;
  whatsappDisplay: string;
  socialLinks: {
    linkedin: string;
    whatsapp: string;
  };
  footer: {
    copyright: string;
    ventureCapitalLinks: FooterLink[];
    realEstateLinks: FooterLink[];
  };
}
