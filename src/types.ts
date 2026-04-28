import { LucideIcon } from 'lucide-react';

export interface Profile {
  name: string;
  mainTitle: string;
  subTitle: string;
  oneLineIntro: string;
  heroBadge: string;
  heroCardLabel: string;
  heroAchievements: string[];
  summary: {
    totalExperience: string;
    experienceDesc: string;
    recentJob: string;
    majorAreas: string;
    strengths: string;
    keyAchievements: string;
  };
}

export interface AboutData {
  title: string;
  content: string;
  workStyles: {
    title: string;
    description: string;
  }[];
}

export interface CareerItem {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  role: string;
  tasks: string[];
  achievements: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  problem: string;
  role: string;
  execution: string[];
  results: string[];
}

export interface CompetencyItem {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  major: string;
  period: string;
  note?: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  date: string;
  meaning: string;
}

export interface SkillItem {
  id: string;
  name: string;
  description: string;
}

export interface SectionMeta {
  title: string;
  subtitle: string;
}

export interface SkillsData {
  introduction: string;
  hardSkillsTitle?: string;
  softSkillsTitle?: string;
  hardSkills: SkillItem[];
  softSkills: SkillItem[];
}

export interface ContactData {
  summary: string;
  email: string;
  emailLabel: string;
  phone: string;
  phoneLabel: string;
}

export interface PortfolioData {
  profile: Profile;
  about: AboutData;
  careers: CareerItem[];
  projects: ProjectItem[];
  skills: SkillsData;
  competencies: CompetencyItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
  sectionTitles: Record<string, SectionMeta>;
  contact: ContactData;
}
