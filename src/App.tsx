import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  Award, 
  Mail, 
  Phone, 
  Download, 
  Menu, 
  X, 
  ChevronRight, 
  Briefcase, 
  Settings,
  Lock,
  GraduationCap,
  Plus,
  Trash2,
  Save,
  LayoutDashboard,
  FileText,
  BriefcaseBusiness,
  Lightbulb,
  BookOpen,
  Calendar,
  Layout,
  UserPlus,
  ShieldCheck,
  Calculator,
  Wrench
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData, CareerItem, ProjectItem, CompetencyItem, EducationItem, CertificateItem, SkillItem } from './types.ts';
import { INITIAL_DATA } from './data.ts';

// --- Reusable UI Components ---

const SectionTitle: React.FC<{ title: string; sub?: string }> = ({ title, sub }) => (
  <div className="mb-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
        {sub || 'Experience & Expertise'}
      </span>
      <h2 className="text-4xl md:text-5xl font-black text-brand-accent tracking-tighter mb-6 break-keep text-balance">
        {title}
      </h2>
      <div className="w-20 h-1.5 bg-brand-accent rounded-full"></div>
    </motion.div>
  </div>
);

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500 rounded-xl relative overflow-hidden group ${className}`}>
    <div className="relative z-10">{children}</div>
  </div>
);

// --- Admin Editor Components ---

const AdminItemWrapper: React.FC<{ title: string; onRemove: () => void; children: React.ReactNode }> = ({ title, onRemove, children }) => (
  <div className="border border-slate-200 rounded-lg p-5 bg-white space-y-4 relative group">
    <div className="flex justify-between items-center mb-2">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{title}</span>
      <button onClick={onRemove} className="text-slate-300 hover:text-red-500 transition-colors p-1">
        <Trash2 size={16} />
      </button>
    </div>
    {children}
  </div>
);

export default function App() {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeAdminTab, setActiveAdminTab] = useState('profile');

  // Load/Save Logic
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_datav2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Robust merge to handle schema updates
        setData({
          ...INITIAL_DATA,
          ...parsed,
          profile: {
            ...INITIAL_DATA.profile,
            ...(parsed.profile || {}),
            summary: {
              ...INITIAL_DATA.profile.summary,
              ...(parsed.profile?.summary || {})
            },
            heroAchievements: parsed.profile?.heroAchievements || INITIAL_DATA.profile.heroAchievements
          },
          skills: parsed.skills || INITIAL_DATA.skills,
          contact: {
            ...INITIAL_DATA.contact,
            ...(parsed.contact || {})
          },
          sectionTitles: {
            ...INITIAL_DATA.sectionTitles,
            ...(parsed.sectionTitles || {})
          }
        });
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'career', 'projects', 'skills', 'competency', 'contact'];
      const scrollPosition = window.scrollY + 120; // Slightly larger offset
      
      // Check if we are at the bottom of the page
      const isBottom = (window.innerHeight + Math.round(window.scrollY)) >= document.documentElement.scrollHeight - 50;
      
      if (isBottom) {
        setActiveSection('contact');
        return;
      }

      let current = 'home';
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          if (element.offsetTop <= scrollPosition) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const saveToLocalStorage = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem('portfolio_datav2', JSON.stringify(newData));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
    setActiveSection(id);
  };

  // --- Admin Auth ---
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAdminLogin = () => {
    if (password === '6270') {
      setIsAuthorized(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  // --- Admin Helpers ---
  const updateData = (path: string, value: any) => {
    setData(prev => {
      const keys = path.split('.');
      const updateDeep = (obj: any, pathKeys: string[]): any => {
        const [currentKey, ...remainingKeys] = pathKeys;
        if (!currentKey) return obj;
        if (remainingKeys.length === 0) {
          return { ...obj, [currentKey]: value };
        }
        return {
          ...obj,
          [currentKey]: updateDeep(obj[currentKey] || {}, remainingKeys)
        };
      };
      
      const newData = updateDeep(prev, keys);
      localStorage.setItem('portfolio_datav2', JSON.stringify(newData));
      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-white text-brand-accent selection:bg-brand-primary selection:text-white font-sans scroll-smooth">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-grid opacity-[0.2] pointer-events-none"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[80] bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div 
            className="group cursor-pointer flex flex-col"
            onClick={() => scrollToSection('home')}
          >
            <span className="text-xl font-black tracking-tighter text-brand-accent leading-none">
              {data.profile.name.toUpperCase()}
            </span>
            <span className="text-[10px] font-bold text-brand-primary tracking-[0.2em] uppercase mt-1">
              HR Generalist
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-10">
            {['home', 'about', 'career', 'projects', 'skills', 'competency', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-brand-accent ${
                  activeSection === id ? 'text-brand-accent underline underline-offset-8 decoration-2 decoration-brand-primary' : 'text-slate-400'
                }`}
              >
                {data.sectionTitles?.[id]?.title || id}
              </button>
            ))}
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-brand-accent hover:text-white transition-all shadow-sm"
            >
              <Settings size={16} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400"
            >
              <Settings size={16} />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-accent text-white"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[70] bg-white pt-32 px-10 lg:hidden"
          >
            <div className="flex flex-col space-y-8">
              {['home', 'about', 'career', 'projects', 'skills', 'competency', 'contact'].map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-4xl font-black text-brand-accent text-left tracking-tighter uppercase"
                  >
                  {data.sectionTitles?.[id]?.title || id}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* --- Hero Section --- */}
        <section id="home" className="min-h-screen flex items-center pt-24 px-6">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-[2px] bg-brand-primary"></div>
                  <span className="text-xs font-black text-brand-primary uppercase tracking-[0.4em]">
                    {data.profile.heroBadge}
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-accent leading-[1.15] tracking-tighter mb-10 break-keep text-balance">
                  {data.profile.mainTitle.split(' HR')[0]}
                  <span className="text-brand-primary"> HR</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mb-12 break-keep">
                  {data.profile.subTitle}
                </p>
                <div className="flex flex-wrap gap-8 items-center">
                  <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollToSection('about')}>
                    <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-brand-accent transition-all">
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ChevronRight className="rotate-90 text-slate-400 group-hover:text-brand-accent" size={20} />
                      </motion.div>
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-brand-accent transition-colors">
                      Scroll to Explore Experience
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-5 h-full relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="relative z-10"
              >
                <div className="bg-brand-accent rounded-[2.5rem] p-10 lg:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group border border-white/5 min-h-[500px]">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full -mr-40 -mt-40 blur-[80px] group-hover:bg-brand-primary/20 transition-all duration-1000"></div>
                  
                  <div>
                    <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 lg:mb-6">{data.profile.heroCardLabel}</h3>
                    <div className="text-3xl lg:text-4xl text-white font-black leading-[1.3] tracking-tighter">
                      {data.profile.summary.strengths.split(', ').map((s, i) => (
                        <div key={i} className="mb-1">{s}</div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 lg:space-y-8">
                    <div className="flex items-center gap-5">
                      <div className="text-6xl font-black text-white tracking-tighter">
                        {data.profile.summary.totalExperience.split(' ')[0]}
                      </div>
                      <div className="text-[12px] font-black text-slate-500 uppercase tracking-[0.2em] leading-tight break-keep whitespace-pre-wrap">
                        {data.profile.summary.experienceDesc}
                      </div>
                    </div>
                    <div className="pt-6 lg:pt-8 border-t border-white/5 space-y-4 lg:space-y-5">
                        {data.profile.heroAchievements.map((ach, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="w-2.5 h-2.5 bg-brand-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(255,75,19,0.8)]"></div>
                            <span className="text-[15px] md:text-base font-black text-white uppercase tracking-widest opacity-95">{ach}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Floating Decorative Elements Removed */}
            </div>
          </div>
        </section>

        {/* --- About Section --- */}
        <section id="about" className="py-32 px-6 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <SectionTitle 
                  title={data.sectionTitles?.about?.title || "About Identity"} 
                  sub={data.sectionTitles?.about?.subtitle || "Who I am & How I Work"} 
                />
                <h3 className="text-2xl md:text-3xl font-black mb-8 leading-snug tracking-tighter break-keep text-balance">
                  {data.about.title}
                </h3>
                <div className="text-lg text-slate-500 leading-relaxed space-y-6 whitespace-pre-wrap font-medium break-keep">
                  {data.about.content}
                </div>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-6 scale-95 lg:scale-100">
                {data.about.workStyles.map((style, idx) => (
                  <GlassCard key={idx} className={idx % 2 === 1 ? 'lg:translate-y-12' : ''}>
                    <div className="text-brand-primary font-black text-4xl mb-6 opacity-30">0{idx + 1}</div>
                    <h4 className="text-lg font-black mb-3">{style.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{style.description}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Career Section --- */}
        <section id="career" className="py-32 px-6 bg-brand-accent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/2"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
              <div>
                <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                  {data.sectionTitles?.career?.subtitle || "Proven Track Record"}
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                  {data.sectionTitles?.career?.title || "Professional Journey"}
                </h2>
              </div>
              <div className="mt-8 md:mt-0 text-slate-400 text-sm font-bold uppercase tracking-widest border-b border-white/5 pb-2">
                Total {data.profile.summary.totalExperience}
              </div>
            </div>

            <div className="space-y-12">
              {data.careers.map((career, index) => (
                <motion.div 
                  key={career.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-3xl group hover:border-brand-primary/50 transition-all duration-500"
                >
                  <div className="grid lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-1">
                      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-brand-primary transition-colors uppercase tracking-tighter">{career.company}</h3>
                      <p className="text-brand-primary font-bold text-sm mb-6 tracking-widest">{career.period}</p>
                      <div className="inline-block px-4 py-2 bg-white/10 text-slate-200 text-xs font-black rounded-xl uppercase tracking-widest border border-white/5">
                        {career.position}
                      </div>
                    </div>
                    
                    <div className="lg:col-span-3">
                      <div className="mb-10">
                        <em className="text-slate-400 not-italic text-sm font-bold uppercase tracking-[0.2em] block mb-3 opacity-60">
                          {career.description}
                        </em>
                        <h4 className="text-2xl font-black text-white leading-[1.4] break-keep text-balance">{career.role}</h4>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                        <div>
                          <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                            Key Responsibilities <Briefcase size={12} className="text-brand-primary" />
                          </h5>
                          <ul className="space-y-4">
                            {career.tasks.map((task, idx) => (
                              <li key={idx} className="flex items-start gap-4 text-sm text-slate-300 font-bold leading-relaxed break-keep bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors flex-1 min-h-[4rem]">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2 shrink-0"></span>
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                            Measurable Results <Award size={12} className="text-brand-primary" />
                          </h5>
                          <ul className="space-y-4">
                            {career.achievements.map((ach, idx) => (
                              <li key={idx} className="flex items-start gap-4 text-sm font-bold text-white bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors flex-1 min-h-[4rem]">
                                <CheckCircle2 size={18} className="text-brand-primary mt-0.5 shrink-0" />
                                <span className="leading-relaxed break-keep">{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="py-32 px-6 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <SectionTitle 
              title={data.sectionTitles?.projects?.title || "Strategic Projects"} 
              sub={data.sectionTitles?.projects?.subtitle || "Focusing on Operational Excellence"} 
            />
            <div className="grid md:grid-cols-2 gap-8">
              {data.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 border border-slate-100 p-10 rounded-3xl flex flex-col hover:bg-brand-accent group transition-all duration-500 cursor-default"
                >
                  <div className="mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 mb-8 group-hover:bg-brand-accent group-hover:border-white/10 transition-all">
                      {project.id === 'p1' && <Layout size={24} className="text-slate-400 group-hover:text-brand-primary" />}
                      {project.id === 'p2' && <UserPlus size={24} className="text-slate-400 group-hover:text-brand-primary" />}
                      {project.id === 'p3' && <ShieldCheck size={24} className="text-slate-400 group-hover:text-brand-primary" />}
                      {project.id === 'p6' && <Calculator size={24} className="text-slate-400 group-hover:text-brand-primary" />}
                      {(!['p1', 'p2', 'p3', 'p6'].includes(project.id)) && <FileText size={24} className="text-slate-400 group-hover:text-brand-primary" />}
                    </div>
                    <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors tracking-tighter break-keep">{project.title}</h3>
                    <div className="p-4 bg-slate-200/50 rounded-2xl text-xs text-slate-600 font-bold group-hover:bg-brand-accent group-hover:text-slate-400 transition-all break-keep">
                      {project.problem}
                    </div>
                  </div>
                  
                  <div className="flex-grow space-y-10">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-slate-400">Tactical execution</h4>
                      <ul className="space-y-3">
                        {project.execution.map((item, idx) => (
                          <li key={idx} className="text-sm text-slate-500 font-medium group-hover:text-slate-300 flex items-start gap-3">
                            <span className="text-brand-primary font-bold mt-[1px]">0{idx+1}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-6 border-t border-slate-200 group-hover:border-white/10">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-slate-400">Impact generated</h4>
                      <ul className="space-y-3">
                        {project.results.map((item, idx) => (
                          <li key={idx} className="text-sm font-black text-brand-accent group-hover:text-white flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section id="skills" className="py-32 px-6 bg-slate-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <SectionTitle 
              title={data.sectionTitles?.skills?.title || "Core Professional Skills"} 
              sub={data.sectionTitles?.skills?.subtitle || "Expertise & Methodologies"} 
            />
            
            <div className="mb-20 max-w-4xl">
              <p className="text-xl text-slate-600 leading-relaxed font-medium break-keep">
                {data.skills.introduction}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Hard Skills Column */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white">
                    <Settings size={20} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">{data.skills.hardSkillsTitle || "Hard Skills"}</h3>
                </div>
                
                <div className="space-y-4">
                  {data.skills.hardSkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-primary hover:shadow-lg transition-all duration-300"
                    >
                      <h4 className="text-lg font-black text-brand-accent group-hover:text-brand-primary transition-colors mb-2">
                        {skill.name}
                      </h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed break-keep">
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Soft Skills Column */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center text-white">
                    <Users size={20} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">{data.skills.softSkillsTitle || "Soft Skills"}</h3>
                </div>
                
                <div className="space-y-4">
                  {data.skills.softSkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-accent hover:shadow-lg transition-all duration-300"
                    >
                      <h4 className="text-lg font-black text-brand-accent group-hover:text-brand-accent transition-colors mb-2">
                        {skill.name}
                      </h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed break-keep">
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Competency Section --- */}
        <section id="competency" className="py-32 bg-white px-6 relative overflow-hidden border-t border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                {data.sectionTitles?.competency?.subtitle || "Multidimensional Expertise"}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-brand-accent tracking-tighter mb-6 uppercase">
                {data.sectionTitles?.competency?.title || "Asset Management"}
              </h2>
              <div className="w-20 h-1.5 bg-brand-accent rounded-full mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              {data.competencies.map((comp) => (
                <div key={comp.id} className="relative group p-10 bg-white border border-slate-100 rounded-3xl hover:bg-brand-accent hover:scale-[1.02] transition-all duration-500 shadow-sm overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors uppercase tracking-widest">{comp.title}</h3>
                    <p className="text-sm text-slate-400 font-bold mb-8 leading-relaxed mb-10 h-12">{comp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {comp.skills.map((skill, idx) => (
                        <span key={idx} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-slate-50 group-hover:bg-brand-accent text-slate-400 group-hover:text-brand-primary rounded-lg transition-all border border-slate-100 group-hover:border-white/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Education & Credentials --- */}
        <section className="py-32 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-20">
              <div className="lg:col-span-2">
                <SectionTitle 
                  title={data.sectionTitles?.education?.title || "Academic background"} 
                  sub={data.sectionTitles?.education?.subtitle || "Academic credentials"} 
                />
                <div className="space-y-12">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="group cursor-default">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 transition-all group-hover:bg-brand-accent group-hover:text-white">
                          <GraduationCap size={24} />
                        </div>
                        <div className="h-[1px] flex-grow bg-slate-100"></div>
                      </div>
                      <h4 className="font-black text-2xl mb-1 tracking-tighter">{edu.school}</h4>
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">{edu.major}</p>
                      <span className="text-[10px] font-black text-brand-primary bg-orange-50 px-3 py-1 rounded-full uppercase tracking-widest">
                        {edu.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3">
                <SectionTitle 
                  title={data.sectionTitles?.certificates?.title || "Credentials"} 
                  sub={data.sectionTitles?.certificates?.subtitle || "Certifications & Licensing"} 
                />
                <div className="grid sm:grid-cols-2 gap-6">
                  {data.certificates.map((cert) => (
                    <div key={cert.id} className="p-8 border border-slate-100 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all group">
                      <div className="text-[10px] font-black text-brand-primary mb-4 uppercase tracking-[0.3em] font-mono">{cert.date}</div>
                      <h4 className="font-black text-lg mb-3 text-brand-accent group-hover:text-brand-primary transition-colors tracking-tighter uppercase">{cert.name}</h4>
                      <p className="text-xs text-slate-400 font-bold leading-relaxed">{cert.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Final Contact --- */}
        <section id="contact" className="py-40 bg-brand-accent px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-5"></div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-10 uppercase">
                {data.sectionTitles?.contact?.title || "Connect"}
              </h2>
              <p className="text-xl md:text-3xl text-slate-400 font-bold mb-20 max-w-5xl mx-auto leading-[1.3] opacity-80 whitespace-pre-line">
                {data.contact.summary}
              </p>
              
              <div className="flex justify-center mb-32">
                <a href={`mailto:${data.contact.email}`} className="group text-center p-12 bg-white/5 rounded-[3rem] border border-white/10 w-full max-w-2xl hover:border-brand-primary transition-all shadow-2xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-brand-primary/20 transition-all duration-700"></div>
                  <Mail className="text-brand-primary mb-8 mx-auto" size={52} />
                  <div className="text-3xl md:text-4xl font-black text-white group-hover:text-brand-primary transition-colors break-all md:break-normal tracking-tighter">
                    {data.contact.email}
                  </div>
                </a>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-white/5 gap-10">
                <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">
                  © {new Date().getFullYear()} {data.profile.name}. System Built for Professional HR Portfolio.
                </div>
                <div className="flex gap-10">
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* --- REIMAGINED ADMIN MODAL --- */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-accent/80 backdrop-blur-xl"
              onClick={() => { if (!isAuthorized) setIsAdminOpen(false); }}
            />
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="relative w-full h-full max-w-6xl bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {!isAuthorized ? (
                /* Admin Login Screen */
                <div className="h-full flex items-center justify-center p-10 bg-brand-accent text-white">
                  <div className="max-w-sm w-full space-y-12 text-center">
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-white/5 rounded-3xl mx-auto flex items-center justify-center border border-white/10">
                        <Lock size={32} className="text-brand-primary" />
                      </div>
                      <h2 className="text-4xl font-black uppercase tracking-tighter">Secure Terminal</h2>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                        Authorized users only. Access to portfolio configuration system requires validation.
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <input
                        type="password"
                        placeholder="•••• Access Key"
                        className="w-full px-6 py-6 bg-white/5 border-none text-white text-2xl font-black text-center tracking-[0.5em] focus:ring-2 focus:ring-brand-primary rounded-2xl outline-none placeholder:text-slate-700"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                        autoFocus
                      />
                      <button
                        onClick={handleAdminLogin}
                        className="w-full py-6 bg-white text-brand-accent font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all rounded-2xl shadow-xl shadow-brand-primary/10 text-sm"
                      >
                        Authenticate
                      </button>
                      <button
                        onClick={() => setIsAdminOpen(false)}
                        className="text-slate-600 font-bold uppercase tracking-widest hover:text-white transition-colors text-[10px]"
                      >
                        Abandon Session
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* COMPREHENSIVE ADMIN PANEL */
                <>
                  {/* Sidebar + Main Layout */}
                  <div className="flex h-full overflow-hidden bg-white">
                    {/* Admin Sidebar */}
                    <aside className="w-20 lg:w-64 bg-brand-accent text-white flex flex-col shrink-0">
                      <div className="p-8 border-b border-white/5 mb-6">
                        <div className="text-xs font-black text-brand-primary uppercase tracking-[0.2em] mb-2 hidden lg:block">System Config</div>
                        <h4 className="text-lg font-black uppercase tracking-tighter hidden lg:block">CMS v2.0</h4>
                        <div className="lg:hidden text-brand-primary font-black">CMS</div>
                      </div>
                      
                      <nav className="flex-grow px-4 space-y-2">
                        {[
                          { id: 'profile', label: 'Basic Info', icon: LayoutDashboard },
                          { id: 'sections', label: 'Section Labels', icon: Layout },
                          { id: 'about', label: 'About Text', icon: Users },
                          { id: 'careers', label: 'Career Hub', icon: BriefcaseBusiness },
                          { id: 'projects', label: 'Project Vault', icon: FileText },
                          { id: 'skills', label: 'Skills Manager', icon: Wrench },
                          { id: 'competencies', label: 'Core Skills', icon: Lightbulb },
                          { id: 'education', label: 'Education', icon: GraduationCap },
                          { id: 'certificates', label: 'Credentials', icon: Award },
                          { id: 'contact_info', label: 'Contact Settings', icon: Mail }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveAdminTab(tab.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                              activeAdminTab === tab.id 
                                ? 'bg-brand-primary text-white' 
                                : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                            }`}
                          >
                            <tab.icon size={20} className="shrink-0" />
                            <span className="text-xs font-black uppercase tracking-widest hidden lg:block">{tab.label}</span>
                          </button>
                        ))}
                      </nav>

                      <div className="p-4 border-t border-white/5 space-y-2">
                        <button 
                          onClick={() => {
                            setIsAuthorized(false);
                            setPassword('');
                          }}
                          className="w-full flex items-center gap-4 p-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                        >
                          <Lock size={20} className="shrink-0" />
                          <span className="text-xs font-black uppercase tracking-widest hidden lg:block">Sign Out</span>
                        </button>
                      </div>
                    </aside>

                    {/* Editor Content Area */}
                    <div className="flex-grow flex flex-col overflow-hidden bg-white">
                      <header className="p-8 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <h2 className="text-3xl font-black uppercase tracking-tighter text-brand-accent">{activeAdminTab} Editor</h2>
                          <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span> Read/Write Enabled
                          </div>
                        </div>
                        <button 
                          onClick={() => setIsAdminOpen(false)}
                          className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all text-slate-500"
                        >
                          <X size={20} />
                        </button>
                      </header>

                      <article className="flex-grow overflow-y-auto p-10 space-y-12">
                        {/* Tab Content Logic */}
                        {activeAdminTab === 'profile' && (
                          <div className="max-w-2xl space-y-8">
                             <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Full Name</label>
                              <input 
                                className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-brand-primary focus:bg-white outline-none"
                                value={data.profile.name}
                                onChange={(e) => updateData('profile.name', e.target.value)}
                              />
                            </div>
                            <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Main Display Title</label>
                              <textarea 
                                className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl font-black text-2xl tracking-tighter focus:ring-2 focus:ring-brand-primary focus:bg-white outline-none"
                                value={data.profile.mainTitle}
                                onChange={(e) => updateData('profile.mainTitle', e.target.value)}
                                rows={2}
                              />
                            </div>
                            <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Sub-headline Description</label>
                              <textarea 
                                className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl font-medium text-slate-500 focus:ring-2 focus:ring-brand-primary focus:bg-white outline-none"
                                value={data.profile.subTitle}
                                onChange={(e) => updateData('profile.subTitle', e.target.value)}
                                rows={3}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Experience Years</label>
                                <input 
                                  className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                                  value={data.profile.summary.totalExperience}
                                  onChange={(e) => updateData('profile.summary.totalExperience', e.target.value)}
                                />
                              </div>
                              <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Core Strengths (Comma Separated)</label>
                                <input 
                                  className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                                  value={data.profile.summary.strengths}
                                  onChange={(e) => updateData('profile.summary.strengths', e.target.value)}
                                />
                              </div>
                            </div>

                            {/* Hero Specific Fields */}
                            <div className="space-y-6 pt-8 border-t border-slate-100">
                              <h3 className="text-xl font-black uppercase tracking-tighter">Hero Section Extras</h3>
                              
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Hero Badge (Top Label)</label>
                                  <input 
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold"
                                    value={data.profile.heroBadge}
                                    onChange={(e) => updateData('profile.heroBadge', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-4">
                                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Hero Card Title</label>
                                  <input 
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold"
                                    value={data.profile.heroCardLabel}
                                    onChange={(e) => updateData('profile.heroCardLabel', e.target.value)}
                                  />
                                </div>
                              </div>

                              <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Experience Description (with \n for breaks)</label>
                                <textarea 
                                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs"
                                  value={data.profile.summary.experienceDesc}
                                  onChange={(e) => updateData('profile.summary.experienceDesc', e.target.value)}
                                  rows={2}
                                />
                              </div>

                              <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Hero Card Achievements</label>
                                {data.profile.heroAchievements.map((ach, idx) => (
                                  <div key={idx} className="flex gap-2">
                                    <input 
                                      className="flex-grow p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm"
                                      value={ach}
                                      onChange={(e) => {
                                        const newList = [...data.profile.heroAchievements];
                                        newList[idx] = e.target.value;
                                        updateData('profile.heroAchievements', newList);
                                      }}
                                    />
                                    <button 
                                      onClick={() => {
                                        const newList = data.profile.heroAchievements.filter((_, i) => i !== idx);
                                        updateData('profile.heroAchievements', newList);
                                      }}
                                      className="p-4 text-red-500 bg-red-50 rounded-xl hover:bg-red-100"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                ))}
                                <button 
                                  onClick={() => updateData('profile.heroAchievements', [...data.profile.heroAchievements, "New Achievement"])}
                                  className="w-full p-4 border border-dashed border-slate-200 rounded-xl text-slate-400 font-bold text-xs hover:bg-slate-50"
                                >
                                  + Add Achievement Line
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeAdminTab === 'sections' && (
                          <div className="max-w-4xl space-y-10">
                            <div className="grid md:grid-cols-2 gap-8">
                              {(Object.entries(data.sectionTitles || {}) as [string, any][]).map(([key, meta]) => (
                                <div key={key} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                                      {key === 'certificates' ? 'Credentials / Certifications' : 
                                       key === 'competency' ? 'Competency' :
                                       key === 'about' ? 'About' :
                                       key === 'career' ? 'Career' :
                                       key === 'projects' ? 'Projects' :
                                       key === 'skills' ? 'Skills' :
                                       key === 'education' ? 'Education' :
                                       key === 'contact' ? 'Contact' :
                                       key === 'home' ? 'Hero / Home' : key} Section
                                    </span>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Title</label>
                                    <input 
                                      className="w-full p-4 bg-white border border-slate-200 rounded-xl font-black text-sm outline-none focus:ring-2 focus:ring-brand-primary"
                                      value={meta.title}
                                      onChange={(e) => updateData(`sectionTitles.${key}.title`, e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Subtitle</label>
                                    <input 
                                      className="w-full p-4 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-500 outline-none focus:ring-2 focus:ring-brand-primary"
                                      value={meta.subtitle}
                                      onChange={(e) => updateData(`sectionTitles.${key}.subtitle`, e.target.value)}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeAdminTab === 'about' && (
                          <div className="max-w-2xl space-y-12">
                            <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">About Title</label>
                              <input 
                                className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                                value={data.about.title}
                                onChange={(e) => updateData('about.title', e.target.value)}
                              />
                            </div>
                            <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">About Main Content</label>
                              <textarea 
                                className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl font-medium text-slate-500 leading-relaxed shadow-inner"
                                value={data.about.content}
                                onChange={(e) => updateData('about.content', e.target.value)}
                                rows={10}
                              />
                            </div>
                            
                            <div className="space-y-6">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Methodologies (Work Styles)</label>
                              {data.about.workStyles.map((style, idx) => (
                                <div key={idx} className="p-6 border border-slate-200 rounded-2xl bg-white space-y-4 shadow-sm">
                                  <input 
                                    className="w-full p-4 bg-slate-50 border-none font-bold rounded-xl"
                                    value={style.title}
                                    placeholder="Style Title"
                                    onChange={(e) => {
                                      const newStyles = [...data.about.workStyles];
                                      newStyles[idx].title = e.target.value;
                                      updateData('about.workStyles', newStyles);
                                    }}
                                  />
                                  <textarea 
                                    className="w-full p-4 bg-slate-50 border-none text-sm text-slate-500 font-medium rounded-xl h-24"
                                    value={style.description}
                                    placeholder="Style Description"
                                    onChange={(e) => {
                                      const newStyles = [...data.about.workStyles];
                                      newStyles[idx].description = e.target.value;
                                      updateData('about.workStyles', newStyles);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeAdminTab === 'careers' && (
                          <div className="space-y-8">
                            <div className="flex justify-between items-center bg-brand-accent text-white p-6 rounded-2xl">
                              <div>
                                <h3 className="font-black uppercase tracking-tighter text-xl">Employment History</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Manage corporate experience</p>
                              </div>
                              <button 
                                onClick={() => {
                                  const newItem: CareerItem = {
                                    id: Date.now().toString(),
                                    company: "New Company",
                                    position: "Role",
                                    period: "YYYY.MM ~ YYYY.MM",
                                    description: "Context",
                                    role: "Defining Statement",
                                    tasks: ["Key Responsibility"],
                                    achievements: ["Performance Metric"]
                                  };
                                  saveToLocalStorage({ ...data, careers: [newItem, ...data.careers] });
                                }}
                                className="px-6 py-3 bg-brand-primary hover:opacity-90 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"
                              >
                                <Plus size={14} /> Add Career
                              </button>
                            </div>
                            
                            <div className="grid xl:grid-cols-2 gap-8">
                              {data.careers.map((career, idx) => (
                                <AdminItemWrapper 
                                  key={career.id} 
                                  title={`Entry #${idx + 1}`} 
                                  onRemove={() => saveToLocalStorage({ ...data, careers: data.careers.filter(c => c.id !== career.id) })}
                                >
                                  <div className="grid grid-cols-2 gap-4">
                                    <input className="p-4 bg-slate-50 rounded-xl text-sm font-bold" value={career.company} onChange={(e) => {
                                      const newList = [...data.careers]; newList[idx].company = e.target.value; saveToLocalStorage({...data, careers: newList});
                                    }} placeholder="Company" />
                                    <input className="p-4 bg-slate-50 rounded-xl text-sm font-bold" value={career.period} onChange={(e) => {
                                      const newList = [...data.careers]; newList[idx].period = e.target.value; saveToLocalStorage({...data, careers: newList});
                                    }} placeholder="Period" />
                                  </div>
                                  <input className="w-full p-4 bg-slate-50 rounded-xl text-sm font-bold" value={career.position} onChange={(e) => {
                                    const newList = [...data.careers]; newList[idx].position = e.target.value; saveToLocalStorage({...data, careers: newList});
                                  }} placeholder="Title" />
                                  <textarea className="w-full p-4 bg-slate-50 rounded-xl text-sm" value={career.role} onChange={(e) => {
                                    const newList = [...data.careers]; newList[idx].role = e.target.value; saveToLocalStorage({...data, careers: newList});
                                  }} placeholder="Role Statement" rows={3} />
                                  
                                  <div className="space-y-6 pt-4 border-t border-slate-100">
                                    {/* Tasks Editor */}
                                    <div>
                                      <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 flex justify-between items-center">
                                        Key Responsibilities
                                        <button 
                                          onClick={() => {
                                            const newList = [...data.careers];
                                            newList[idx].tasks.push("");
                                            saveToLocalStorage({...data, careers: newList});
                                          }}
                                          className="text-brand-primary hover:opacity-80 transition-colors"
                                        >
                                          <Plus size={14} />
                                        </button>
                                      </h5>
                                      <div className="space-y-2">
                                        {career.tasks.map((task, tIdx) => (
                                          <div key={tIdx} className="flex gap-2 group/item">
                                            <textarea 
                                              className="flex-grow p-3 bg-slate-50 rounded-lg text-xs font-medium focus:ring-1 focus:ring-brand-primary outline-none" 
                                              value={task} 
                                              onChange={(e) => {
                                                const newList = [...data.careers];
                                                newList[idx].tasks[tIdx] = e.target.value;
                                                saveToLocalStorage({...data, careers: newList});
                                              }}
                                              rows={2}
                                            />
                                            <button 
                                              onClick={() => {
                                                const newList = [...data.careers];
                                                newList[idx].tasks = newList[idx].tasks.filter((_, i) => i !== tIdx);
                                                saveToLocalStorage({...data, careers: newList});
                                              }}
                                              className="text-slate-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all p-1"
                                            >
                                              <Trash2 size={14} />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Achievements Editor */}
                                    <div>
                                      <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 flex justify-between items-center">
                                        Measurable Results
                                        <button 
                                          onClick={() => {
                                            const newList = [...data.careers];
                                            newList[idx].achievements.push("");
                                            saveToLocalStorage({...data, careers: newList});
                                          }}
                                          className="text-brand-primary hover:opacity-80 transition-colors"
                                        >
                                          <Plus size={14} />
                                        </button>
                                      </h5>
                                      <div className="space-y-2">
                                        {career.achievements.map((ach, aIdx) => (
                                          <div key={aIdx} className="flex gap-2 group/item">
                                            <textarea 
                                              className="flex-grow p-3 bg-slate-50 rounded-lg text-xs font-bold text-slate-700 focus:ring-1 focus:ring-brand-primary outline-none" 
                                              value={ach} 
                                              onChange={(e) => {
                                                const newList = [...data.careers];
                                                newList[idx].achievements[aIdx] = e.target.value;
                                                saveToLocalStorage({...data, careers: newList});
                                              }}
                                              rows={2}
                                            />
                                            <button 
                                              onClick={() => {
                                                const newList = [...data.careers];
                                                newList[idx].achievements = newList[idx].achievements.filter((_, i) => i !== aIdx);
                                                saveToLocalStorage({...data, careers: newList});
                                              }}
                                              className="text-slate-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all p-1"
                                            >
                                              <Trash2 size={14} />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </AdminItemWrapper>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeAdminTab === 'projects' && (
                          <div className="space-y-8">
                             <div className="flex justify-between items-center bg-brand-accent text-white p-6 rounded-2xl">
                              <h3 className="font-black uppercase tracking-tighter text-xl">Project Portfolio</h3>
                              <button 
                                onClick={() => {
                                  const newItem: ProjectItem = {
                                    id: Date.now().toString(),
                                    title: "Project Title",
                                    problem: "Problem Statement",
                                    role: "Individual Contribution",
                                    execution: ["Step 1"],
                                    results: ["Outcome 1"]
                                  };
                                  saveToLocalStorage({ ...data, projects: [newItem, ...data.projects] });
                                }}
                                className="px-6 py-3 bg-brand-primary hover:opacity-90 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"
                              >
                                <Plus size={14} /> Add Project
                              </button>
                            </div>
                            <div className="grid xl:grid-cols-2 gap-8">
                              {data.projects.map((proj, idx) => (
                                <AdminItemWrapper 
                                  key={proj.id} 
                                  title={`Project ${idx + 1}`} 
                                  onRemove={() => saveToLocalStorage({ ...data, projects: data.projects.filter(p => p.id !== proj.id) })}
                                >
                                  <input className="w-full p-4 bg-slate-100 rounded-xl text-sm font-black" value={proj.title} onChange={(e) => {
                                    const newList = [...data.projects]; newList[idx].title = e.target.value; saveToLocalStorage({...data, projects: newList});
                                  }} placeholder="Project Title" />
                                  <textarea className="w-full p-4 bg-slate-50 rounded-xl text-xs text-slate-500" value={proj.problem} onChange={(e) => {
                                    const newList = [...data.projects]; newList[idx].problem = e.target.value; saveToLocalStorage({...data, projects: newList});
                                  }} rows={2} placeholder="Problem Statement" />
                                  <input className="w-full p-4 bg-slate-50 rounded-xl text-xs font-medium" value={proj.role} onChange={(e) => {
                                    const newList = [...data.projects]; newList[idx].role = e.target.value; saveToLocalStorage({...data, projects: newList});
                                  }} placeholder="Individual Contribution / Role" />
                                  <div className="p-4 border-t border-slate-100 pt-6 space-y-6">
                                    {/* Execution Steps */}
                                    <div>
                                      <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 flex justify-between items-center">
                                        Tactical Execution
                                        <button 
                                          onClick={() => {
                                            const newList = [...data.projects];
                                            newList[idx].execution.push("");
                                            saveToLocalStorage({...data, projects: newList});
                                          }}
                                          className="text-brand-primary hover:opacity-80 transition-colors"
                                        >
                                          <Plus size={14} />
                                        </button>
                                      </h5>
                                      <div className="space-y-2">
                                        {proj.execution.map((step, sIdx) => (
                                          <div key={sIdx} className="flex gap-2 group/item">
                                            <input 
                                              className="flex-grow p-3 bg-slate-50 rounded-lg text-xs focus:ring-1 focus:ring-brand-primary outline-none" 
                                              value={step} 
                                              onChange={(e) => {
                                                const newList = [...data.projects];
                                                newList[idx].execution[sIdx] = e.target.value;
                                                saveToLocalStorage({...data, projects: newList});
                                              }} 
                                            />
                                            <button 
                                              onClick={() => {
                                                const newList = [...data.projects];
                                                newList[idx].execution = newList[idx].execution.filter((_, i) => i !== sIdx);
                                                saveToLocalStorage({...data, projects: newList});
                                              }}
                                              className="text-slate-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all p-1"
                                            >
                                              <Trash2 size={14} />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Results / Impact Generated */}
                                    <div>
                                      <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 flex justify-between items-center">
                                        Impact Generated
                                        <button 
                                          onClick={() => {
                                            const newList = [...data.projects];
                                            newList[idx].results.push("");
                                            saveToLocalStorage({...data, projects: newList});
                                          }}
                                          className="text-brand-primary hover:opacity-80 transition-colors"
                                        >
                                          <Plus size={14} />
                                        </button>
                                      </h5>
                                      <div className="space-y-2">
                                        {proj.results.map((res, rIdx) => (
                                          <div key={rIdx} className="flex gap-2 group/item">
                                            <input 
                                              className="flex-grow p-3 bg-slate-50 rounded-lg text-xs font-bold focus:ring-1 focus:ring-brand-primary outline-none" 
                                              value={res} 
                                              onChange={(e) => {
                                                const newList = [...data.projects];
                                                newList[idx].results[rIdx] = e.target.value;
                                                saveToLocalStorage({...data, projects: newList});
                                              }} 
                                            />
                                            <button 
                                              onClick={() => {
                                                const newList = [...data.projects];
                                                newList[idx].results = newList[idx].results.filter((_, i) => i !== rIdx);
                                                saveToLocalStorage({...data, projects: newList});
                                              }}
                                              className="text-slate-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all p-1"
                                            >
                                              <Trash2 size={14} />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </AdminItemWrapper>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeAdminTab === 'skills' && (
                          <div className="space-y-12">
                            <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Section Title (e.g., Hard Skills)</label>
                                <input 
                                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold focus:ring-2 focus:ring-brand-primary outline-none"
                                  value={data.skills.hardSkillsTitle}
                                  onChange={(e) => updateData('skills.hardSkillsTitle', e.target.value)}
                                />
                              </div>
                              <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Section Title (e.g., Soft Skills)</label>
                                <input 
                                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold focus:ring-2 focus:ring-brand-primary outline-none"
                                  value={data.skills.softSkillsTitle}
                                  onChange={(e) => updateData('skills.softSkillsTitle', e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Skills Introduction</label>
                              <textarea 
                                className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl font-medium text-slate-500 leading-relaxed shadow-inner focus:ring-2 focus:ring-brand-primary focus:bg-white outline-none"
                                value={data.skills.introduction}
                                onChange={(e) => updateData('skills.introduction', e.target.value)}
                                rows={4}
                              />
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                              {/* Hard Skills Editor */}
                              <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-xl font-black uppercase tracking-tighter">Hard Skills</h3>
                                  <button 
                                    onClick={() => {
                                      const newItem: SkillItem = { id: Date.now().toString(), name: "Skill Name", description: "Skill Description" };
                                      updateData('skills.hardSkills', [...data.skills.hardSkills, newItem]);
                                    }}
                                    className="p-2 bg-brand-primary text-white rounded-lg hover:opacity-90"
                                  >
                                    <Plus size={16} />
                                  </button>
                                </div>
                                <div className="space-y-4">
                                  {data.skills.hardSkills.map((skill, idx) => (
                                    <div key={skill.id} className="p-4 border border-slate-200 rounded-xl bg-white space-y-2 relative group/skill">
                                      <button 
                                        onClick={() => {
                                          const newList = data.skills.hardSkills.filter(s => s.id !== skill.id);
                                          updateData('skills.hardSkills', newList);
                                        }}
                                        className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover/skill:opacity-100 transition-all"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                      <input 
                                        className="w-full bg-transparent font-black text-sm outline-none" 
                                        value={skill.name} 
                                        placeholder="Skill Name"
                                        onChange={(e) => {
                                          const newList = [...data.skills.hardSkills];
                                          newList[idx].name = e.target.value;
                                          updateData('skills.hardSkills', newList);
                                        }}
                                      />
                                      <textarea 
                                        className="w-full bg-transparent text-xs text-slate-500 outline-none resize-none" 
                                        value={skill.description} 
                                        placeholder="Description"
                                        rows={2}
                                        onChange={(e) => {
                                          const newList = [...data.skills.hardSkills];
                                          newList[idx].description = e.target.value;
                                          updateData('skills.hardSkills', newList);
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Soft Skills Editor */}
                              <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-xl font-black uppercase tracking-tighter">Soft Skills</h3>
                                  <button 
                                    onClick={() => {
                                      const newItem: SkillItem = { id: (Date.now() + 1).toString(), name: "Skill Name", description: "Skill Description" };
                                      updateData('skills.softSkills', [...data.skills.softSkills, newItem]);
                                    }}
                                    className="p-2 bg-brand-accent text-white rounded-lg hover:bg-black"
                                  >
                                    <Plus size={16} />
                                  </button>
                                </div>
                                <div className="space-y-4">
                                  {data.skills.softSkills.map((skill, idx) => (
                                    <div key={skill.id} className="p-4 border border-slate-200 rounded-xl bg-white space-y-2 relative group/skill">
                                      <button 
                                        onClick={() => {
                                          const newList = data.skills.softSkills.filter(s => s.id !== skill.id);
                                          updateData('skills.softSkills', newList);
                                        }}
                                        className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover/skill:opacity-100 transition-all"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                      <input 
                                        className="w-full bg-transparent font-black text-sm outline-none" 
                                        value={skill.name} 
                                        placeholder="Skill Name"
                                        onChange={(e) => {
                                          const newList = [...data.skills.softSkills];
                                          newList[idx].name = e.target.value;
                                          updateData('skills.softSkills', newList);
                                        }}
                                      />
                                      <textarea 
                                        className="w-full bg-transparent text-xs text-slate-500 outline-none resize-none" 
                                        value={skill.description} 
                                        placeholder="Description"
                                        rows={2}
                                        onChange={(e) => {
                                          const newList = [...data.skills.softSkills];
                                          newList[idx].description = e.target.value;
                                          updateData('skills.softSkills', newList);
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeAdminTab === 'competencies' && (
                          <div className="space-y-8">
                            <div className="flex justify-between items-center bg-brand-accent text-white p-6 rounded-2xl">
                              <h3 className="font-black uppercase tracking-tighter text-xl">Core Competencies</h3>
                              <button 
                                onClick={() => {
                                  const newItem: CompetencyItem = {
                                    id: Date.now().toString(),
                                    title: "Area of Expertise",
                                    description: "Brief professional context",
                                    skills: ["Skill 1"]
                                  };
                                  saveToLocalStorage({ ...data, competencies: [...data.competencies, newItem] });
                                }}
                                className="px-6 py-3 bg-brand-primary hover:opacity-90 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"
                              >
                                <Plus size={14} /> Add Competency
                              </button>
                            </div>
                            <div className="grid xl:grid-cols-2 gap-8">
                              {data.competencies.map((comp, idx) => (
                                <AdminItemWrapper 
                                  key={comp.id} 
                                  title={`Expertise Area ${idx + 1}`} 
                                  onRemove={() => saveToLocalStorage({ ...data, competencies: data.competencies.filter(c => c.id !== comp.id) })}
                                >
                                  <input className="w-full p-4 bg-slate-100 rounded-xl text-sm font-black" value={comp.title} onChange={(e) => {
                                    const newList = [...data.competencies]; newList[idx].title = e.target.value; saveToLocalStorage({...data, competencies: newList});
                                  }} placeholder="Competency Title" />
                                  <textarea className="w-full p-4 bg-slate-50 rounded-xl text-xs text-slate-500" value={comp.description} onChange={(e) => {
                                    const newList = [...data.competencies]; newList[idx].description = e.target.value; saveToLocalStorage({...data, competencies: newList});
                                  }} rows={2} placeholder="Description" />
                                  <div className="p-4 border-t border-slate-100 mt-4">
                                    <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 flex justify-between items-center">
                                      Specific Skills
                                      <button 
                                        onClick={() => {
                                          const newList = [...data.competencies];
                                          newList[idx].skills.push("");
                                          saveToLocalStorage({...data, competencies: newList});
                                        }}
                                        className="text-brand-primary"
                                      >
                                        <Plus size={14} />
                                      </button>
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                      {comp.skills.map((skill, sIdx) => (
                                        <div key={sIdx} className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg group/skill">
                                          <input 
                                            className="bg-transparent text-[10px] font-bold outline-none w-24 focus:ring-1 focus:ring-brand-primary" 
                                            value={skill} 
                                            onChange={(e) => {
                                              const newList = [...data.competencies];
                                              newList[idx].skills[sIdx] = e.target.value;
                                              saveToLocalStorage({...data, competencies: newList});
                                            }}
                                          />
                                          <button 
                                            onClick={() => {
                                              const newList = [...data.competencies];
                                              newList[idx].skills = newList[idx].skills.filter((_, i) => i !== sIdx);
                                              saveToLocalStorage({...data, competencies: newList});
                                            }}
                                            className="text-slate-300 hover:text-red-500 opacity-0 group-hover/skill:opacity-100"
                                          >
                                            <Trash2 size={10} />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </AdminItemWrapper>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeAdminTab === 'education' && (
                          <div className="space-y-8">
                            <div className="flex justify-between items-center bg-brand-accent text-white p-6 rounded-2xl">
                              <h3 className="font-black uppercase tracking-tighter text-xl">Education</h3>
                              <button 
                                onClick={() => {
                                  const newItem: EducationItem = {
                                    id: Date.now().toString(),
                                    school: "University Name",
                                    major: "Degree & Major",
                                    period: "YYYY.MM ~ YYYY.MM"
                                  };
                                  saveToLocalStorage({ ...data, education: [...data.education, newItem] });
                                }}
                                className="px-6 py-3 bg-brand-primary hover:opacity-90 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"
                              >
                                <Plus size={14} /> Add Education
                              </button>
                            </div>
                            <div className="space-y-6">
                              {data.education.map((edu, idx) => (
                                <AdminItemWrapper 
                                  key={edu.id} 
                                  title={`Study #${idx + 1}`} 
                                  onRemove={() => saveToLocalStorage({ ...data, education: data.education.filter(e => e.id !== edu.id) })}
                                >
                                  <div className="grid grid-cols-2 gap-4">
                                    <input className="p-4 bg-slate-100 rounded-xl text-sm font-black" value={edu.school} onChange={(e) => {
                                      const newList = [...data.education]; newList[idx].school = e.target.value; saveToLocalStorage({...data, education: newList});
                                    }} placeholder="School" />
                                    <input className="p-4 bg-slate-50 rounded-xl text-sm font-bold" value={edu.period} onChange={(e) => {
                                      const newList = [...data.education]; newList[idx].period = e.target.value; saveToLocalStorage({...data, education: newList});
                                    }} placeholder="Period" />
                                  </div>
                                  <textarea className="w-full p-4 bg-slate-50 rounded-xl text-sm font-medium" value={edu.major} onChange={(e) => {
                                    const newList = [...data.education]; newList[idx].major = e.target.value; saveToLocalStorage({...data, education: newList});
                                  }} placeholder="Major" />
                                  <input className="w-full p-4 bg-slate-50 rounded-xl text-xs" value={edu.note || ''} onChange={(e) => {
                                    const newList = [...data.education]; newList[idx].note = e.target.value; saveToLocalStorage({...data, education: newList});
                                  }} placeholder="Additional Notes (Optional)" />
                                </AdminItemWrapper>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeAdminTab === 'certificates' && (
                          <div className="space-y-8">
                            <div className="flex justify-between items-center bg-brand-accent text-white p-6 rounded-2xl">
                              <h3 className="font-black uppercase tracking-tighter text-xl">
                                {data.sectionTitles?.certificates?.title || "Credentials"}
                              </h3>
                              <button 
                                onClick={() => {
                                  const newItem: CertificateItem = {
                                    id: Date.now().toString(),
                                    name: "Certification Name",
                                    date: "YYYY.MM.DD",
                                    meaning: "Significance or Scope"
                                  };
                                  saveToLocalStorage({ ...data, certificates: [...data.certificates, newItem] });
                                }}
                                className="px-6 py-3 bg-brand-primary hover:opacity-90 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"
                              >
                                <Plus size={14} /> Add Credential
                              </button>
                            </div>
                            <div className="grid xl:grid-cols-2 gap-8">
                              {data.certificates.map((cert, idx) => (
                                <AdminItemWrapper 
                                  key={cert.id} 
                                  title={`Credential #${idx + 1}`} 
                                  onRemove={() => saveToLocalStorage({ ...data, certificates: data.certificates.filter(c => c.id !== cert.id) })}
                                >
                                  <div className="flex gap-4">
                                    <input className="w-2/3 p-4 bg-slate-100 rounded-xl text-sm font-black" value={cert.name} onChange={(e) => {
                                      const newList = [...data.certificates]; newList[idx].name = e.target.value; saveToLocalStorage({...data, certificates: newList});
                                    }} placeholder="Name" />
                                    <input className="w-1/3 p-4 bg-slate-50 rounded-xl text-sm font-bold" value={cert.date} onChange={(e) => {
                                      const newList = [...data.certificates]; newList[idx].date = e.target.value; saveToLocalStorage({...data, certificates: newList});
                                    }} placeholder="Date" />
                                  </div>
                                  <textarea className="w-full p-4 bg-slate-50 rounded-xl text-xs text-slate-500" value={cert.meaning} onChange={(e) => {
                                    const newList = [...data.certificates]; newList[idx].meaning = e.target.value; saveToLocalStorage({...data, certificates: newList});
                                  }} rows={2} placeholder="Description of significance" />
                                </AdminItemWrapper>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeAdminTab === 'contact_info' && (
                          <div className="max-w-2xl space-y-8">
                             <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Contact Summary Statement</label>
                              <textarea 
                                className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-brand-primary focus:bg-white outline-none"
                                value={data.contact.summary}
                                onChange={(e) => updateData('contact.summary', e.target.value)}
                                rows={3}
                              />
                            </div>
                            <div className="space-y-6">
                              <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email Label</label>
                                <input 
                                  className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                                  value={data.contact.emailLabel}
                                  onChange={(e) => updateData('contact.emailLabel', e.target.value)}
                                />
                              </div>
                              <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email Address</label>
                                <input 
                                  className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                                  value={data.contact.email}
                                  onChange={(e) => updateData('contact.email', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </article>
                      
                      <footer className="p-6 border-t border-slate-100 bg-white flex justify-between items-center font-bold text-xs">
                        <div className="text-slate-400 uppercase tracking-widest">Logged in as Administrator</div>
                        <button 
                          onClick={() => setIsAdminOpen(false)}
                          className="px-8 py-3 bg-brand-accent text-white rounded-xl hover:bg-black transition-all shadow-lg flex items-center gap-2"
                        >
                          <Save size={16} /> Finish Editing Session
                        </button>
                      </footer>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
