import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Database,
  Download,
  ExternalLink,
  Languages,
  Linkedin,
  Mail,
  Moon,
  PieChart,
  Send,
  Sparkles,
  Sun,
} from "lucide-react";

type Language = "en" | "fr";

const sectionIds = ["about", "skills", "projects", "experience", "certifications", "resume", "contact"] as const;

const content = {
  en: {
    nav: ["About", "Skills", "Projects", "Experience", "Certifications", "Resume", "Contact"],
    gate: {
      eyebrow: "Welcome",
      title: "Hello, it's Divya here.",
      text: "Before we get started, choose a preferred language.",
      english: "English",
      french: "French",
      note: "You can continue in English or view the full portfolio in French.",
    },
    hero: {
      badge: "Aspiring Business Analyst & Data Analyst",
      title: "Turning messy data into clear business decisions.",
      text: "I am Divya Mohanraju, an undergraduate student building practical skills in business analysis, Excel, Power BI, dashboard design, and data-driven problem solving.",
      primary: "View projects",
      secondary: "Let's connect",
      snapshotTitle: "Practice Data dashboard",
      snapshotText: "Survey insights visualized with dashboard charts and KPI cards.",
    },
    metrics: [
      ["1", "Dashboard created"],
      ["2", "Core tools: Excel & Power BI"],
      ["100%", "Eager to learn more"],
    ],
    about: {
      eyebrow: "About",
      title: "Analytical thinking with business context.",
      description:
        "Divya brings curiosity, structured problem solving, and a strong bias toward clarity. She is a fresher eager to learn, collaborate, and support better business decisions through data.",
      cards: [
        ["Dashboard Interest", "Comfortable with Excel and Power BI, with one dashboard created and a strong interest in growing further."],
        ["Data Learning", "Building SQL knowledge in progress while strengthening accuracy, detail orientation, and structured analysis."],
        ["Business Analysis", "Focused on problem-solving, decision-making, communication, strategic planning, and stakeholder-aware thinking."],
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "Tools and habits for better decisions.",
      description: "Skills and tools taken from Divya's resume, with Power BI added and SQL marked as in progress.",
      items: [
        "Problem-solving",
        "Decision-making",
        "Verbal communication",
        "Written communication",
        "Detail-oriented analysis",
        "Critical thinking",
        "Strategic planning",
        "SQL (in progress)",
        "Power BI",
        "Microsoft Excel",
        "Documents",
        "Presentations",
        "LucidCharts",
        "Email",
        "Dashboard Storytelling",
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Focused case-study experience.",
      description: "Current project experience is kept concise and aligned with Divya's resume.",
      cta: "Discuss project",
      items: [
        {
          title: "Stimulated Case Study: HR Layoff Strategy",
          summary:
            "Analyzed employee job performance data, compared departments, and proposed a structured layoff approach with ethical considerations and salary recommendations.",
          image: "/practice-data-dashboard.png",
          tags: ["Case Study", "Business Analysis", "Excel"],
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Fresher ready to grow.",
      description:
        "Divya is currently seeking opportunities to apply her academic learning, business analysis skills, and interest in data analytics.",
      items: [
        {
          role: "Fresher",
          company: "Aspiring Business Analyst & Data Analyst",
          period: "Open to opportunities",
          detail:
            "Undergraduate student building practical skills in Excel, Power BI, business analysis, dashboard creation, stakeholder thinking, and data-driven decision support.",
        },
      ],
    },
    certifications: {
      eyebrow: "Certifications",
      title: "Completed learning milestones.",
      description: "Certificates listed from Divya's resume.",
      items: [
        "Business Analytics using SSP - 2025",
        "Introduction to Business Analytics from IBM",
        "Data Visualization and Dashboard with Excel and Cognos",
        "Project and Stakeholders Management",
      ],
    },
    resume: {
      eyebrow: "Resume",
      title: "A concise one-page resume section.",
      text: "Add a PDF resume to the public folder and link it here for a direct download. The layout is ready for recruiters who want the short version quickly.",
      button: "Download resume",
    },
    contact: {
      eyebrow: "Contact",
      title: "Open to analyst internships and entry-level roles.",
      description: "Reach out for business analysis, data analysis, and fresher opportunities.",
      heading: "Let's talk data, dashboards, and decisions.",
      text: "Currently strengthening Excel, Power BI, SQL fundamentals, and practical business analysis skills.",
      linkedIn: "LinkedIn",
      placeholders: ["Name", "Email", "Message"],
      send: "Send message",
    },
    footer: {
      text: "(c) 2026 Divya Mohanraju. Built for thoughtful analytics storytelling.",
      status: "Responsive, accessible, and SEO-ready",
    },
  },
  fr: {
    nav: ["À propos", "Compétences", "Projets", "Expérience", "Certifications", "CV", "Contact"],
    gate: {
      eyebrow: "Bienvenue",
      title: "Bonjour, c'est Divya.",
      text: "Avant de commencer, choisissez votre langue préférée.",
      english: "Anglais",
      french: "Français",
      note: "Vous pouvez continuer en anglais ou consulter tout le portfolio en français.",
    },
    hero: {
      badge: "Future Business Analyst et Data Analyst",
      title: "Transformer des données complexes en décisions claires.",
      text: "Je suis Divya Mohanraju, étudiante en licence, et je développe des compétences pratiques en analyse métier, Excel, Power BI, conception de tableaux de bord et résolution de problèmes par les données.",
      primary: "Voir les projets",
      secondary: "Me contacter",
      snapshotTitle: "Tableau de bord Practice Data",
      snapshotText: "Des résultats d'enquête visualisés avec des graphiques et des cartes KPI.",
    },
    metrics: [
      ["1", "Tableau de bord créé"],
      ["2", "Outils clés : Excel et Power BI"],
      ["100%", "Envie d'apprendre davantage"],
    ],
    about: {
      eyebrow: "À propos",
      title: "Une pensée analytique avec un contexte métier.",
      description:
        "Divya apporte de la curiosité, une résolution structurée des problèmes et un vrai souci de clarté. Elle est débutante, motivée à apprendre, collaborer et soutenir de meilleures décisions métier grâce aux données.",
      cards: [
        ["Intérêt pour les tableaux de bord", "À l'aise avec Excel et Power BI, avec un tableau de bord déjà créé et une forte envie de progresser."],
        ["Apprentissage des données", "Développe ses connaissances SQL tout en renforçant la précision, l'attention aux détails et l'analyse structurée."],
        ["Analyse métier", "Axée sur la résolution de problèmes, la prise de décision, la communication, la planification stratégique et la compréhension des parties prenantes."],
      ],
    },
    skills: {
      eyebrow: "Compétences",
      title: "Outils et méthodes pour de meilleures décisions.",
      description: "Compétences et outils issus du CV de Divya, avec Power BI ajouté et SQL indiqué comme en cours d'apprentissage.",
      items: [
        "Résolution de problèmes",
        "Prise de décision",
        "Communication orale",
        "Communication écrite",
        "Analyse attentive aux détails",
        "Esprit critique",
        "Planification stratégique",
        "SQL (en cours)",
        "Power BI",
        "Microsoft Excel",
        "Documents",
        "Présentations",
        "LucidCharts",
        "Email",
        "Storytelling avec tableaux de bord",
      ],
    },
    projects: {
      eyebrow: "Projets",
      title: "Expérience ciblée en étude de cas.",
      description: "L'expérience projet actuelle reste concise et alignée avec le CV de Divya.",
      cta: "Discuter du projet",
      items: [
        {
          title: "Étude de cas simulée : stratégie de licenciement RH",
          summary:
            "Analyse des données de performance des employés, comparaison entre départements et proposition d'une approche structurée avec considérations éthiques et recommandations salariales.",
          image: "/practice-data-dashboard.png",
          tags: ["Étude de cas", "Analyse métier", "Excel"],
        },
      ],
    },
    experience: {
      eyebrow: "Expérience",
      title: "Débutante prête à évoluer.",
      description:
        "Divya recherche actuellement des opportunités pour appliquer ses apprentissages académiques, ses compétences en analyse métier et son intérêt pour l'analyse de données.",
      items: [
        {
          role: "Débutante",
          company: "Future Business Analyst et Data Analyst",
          period: "Ouverte aux opportunités",
          detail:
            "Étudiante en licence développant des compétences pratiques en Excel, Power BI, analyse métier, création de tableaux de bord, compréhension des parties prenantes et aide à la décision par les données.",
        },
      ],
    },
    certifications: {
      eyebrow: "Certifications",
      title: "Étapes d'apprentissage terminées.",
      description: "Certifications listées dans le CV de Divya.",
      items: [
        "Business Analytics avec SSP - 2025",
        "Introduction to Business Analytics d'IBM",
        "Data Visualization and Dashboard with Excel and Cognos",
        "Project and Stakeholders Management",
      ],
    },
    resume: {
      eyebrow: "CV",
      title: "Une section CV concise d'une page.",
      text: "Ajoutez un CV PDF dans le dossier public et reliez-le ici pour un téléchargement direct. La mise en page est prête pour les recruteurs qui veulent une version courte rapidement.",
      button: "Télécharger le CV",
    },
    contact: {
      eyebrow: "Contact",
      title: "Ouverte aux stages et postes juniors d'analyste.",
      description: "Contactez-moi pour des opportunités en analyse métier, analyse de données et postes débutants.",
      heading: "Parlons données, tableaux de bord et décisions.",
      text: "Je renforce actuellement mes compétences en Excel, Power BI, bases SQL et analyse métier pratique.",
      linkedIn: "LinkedIn",
      placeholders: ["Nom", "Email", "Message"],
      send: "Envoyer le message",
    },
    footer: {
      text: "(c) 2026 Divya Mohanraju. Conçu pour un storytelling analytique clair.",
      status: "Responsive, accessible et prêt pour le SEO",
    },
  },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const aboutIcons = [PieChart, Database, BriefcaseBusiness];

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55 }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-pine dark:text-coral">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-ink dark:text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
    </motion.div>
  );
}

function LanguageGate({ onChoose }: { onChoose: (language: Language) => void }) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-mesh-light px-4 text-ink dark:bg-[#0c111b] dark:bg-mesh-dark dark:text-white">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] dark:bg-slate-950/20" />
      <motion.div
        className="absolute h-[34rem] w-[34rem] rounded-full border border-white/40 bg-white/20 blur-3xl dark:border-white/10 dark:bg-white/10"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.section
        initial={{ opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -26, scale: 0.98 }}
        transition={{ duration: 0.55 }}
        className="glass relative z-10 w-full max-w-2xl overflow-hidden rounded-[8px] p-8 text-center sm:p-10"
      >
        <motion.div
          className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-ink text-white dark:bg-white dark:text-ink"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Languages size={28} />
        </motion.div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-pine dark:text-coral">{content.en.gate.eyebrow}</p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{content.en.gate.title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">{content.en.gate.text}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            ["en", content.en.gate.english, "Continue in English"],
            ["fr", content.en.gate.french, "Continuer en français"],
          ].map(([language, label, helper]) => (
            <motion.button
              key={language}
              type="button"
              onClick={() => onChoose(language as Language)}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden rounded-[8px] border border-slate-200 bg-white/76 px-5 py-5 text-left shadow-sm backdrop-blur transition dark:border-white/10 dark:bg-white/10"
            >
              <span className="absolute inset-0 translate-y-full bg-pine transition duration-300 group-hover:translate-y-0 dark:bg-coral" />
              <span className="relative block text-xl font-semibold transition group-hover:text-white">{label}</span>
              <span className="relative mt-2 block text-sm text-slate-600 transition group-hover:text-white/85 dark:text-slate-300">{helper}</span>
            </motion.button>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">{content.en.gate.note}</p>
      </motion.section>
    </main>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [language, setLanguage] = useState<Language | null>(() => (localStorage.getItem("divya-language") as Language | null) ?? null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.lang = language ?? "en";
  }, [language]);

  const t = content[language ?? "en"];
  const metrics = useMemo(() => t.metrics, [t.metrics]);

  const chooseLanguage = (selectedLanguage: Language) => {
    localStorage.setItem("divya-language", selectedLanguage);
    setLanguage(selectedLanguage);
    window.location.hash = "hero";
  };

  return (
    <AnimatePresence mode="wait">
      {!language ? (
        <LanguageGate key="language-gate" onChoose={chooseLanguage} />
      ) : (
        <main
          key="portfolio"
          className="min-h-screen overflow-hidden bg-mesh-light text-ink transition-colors duration-500 dark:bg-[#0c111b] dark:bg-mesh-dark dark:text-white"
        >
          <motion.div style={{ scaleX }} className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-coral" />

          <header className="fixed left-0 right-0 top-4 z-40 px-4">
            <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-3">
              <a href="#hero" className="flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white dark:bg-white dark:text-ink">DM</span>
                <span className="hidden sm:inline">Divya Mohanraju</span>
              </a>
              <div className="hidden items-center gap-1 lg:flex">
                {sectionIds.map((id, index) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/70 hover:text-ink dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    {t.nav[index]}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Change language"
                  onClick={() => {
                    localStorage.removeItem("divya-language");
                    setLanguage(null);
                  }}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:scale-105 dark:bg-slate-800 dark:text-white"
                >
                  <Languages size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Toggle dark mode"
                  onClick={() => setDarkMode((value) => !value)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:scale-105 dark:bg-slate-800 dark:text-white"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </nav>
          </header>

          <section id="hero" className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-sm font-semibold text-pine shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-coral">
                <Sparkles size={16} />
                {t.hero.badge}
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-ink dark:text-white sm:text-6xl lg:text-7xl">{t.hero.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">{t.hero.text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-pine dark:bg-white dark:text-ink"
                >
                  {t.hero.primary} <ArrowRight size={18} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-ink backdrop-blur transition hover:-translate-y-0.5 hover:border-pine dark:border-white/15 dark:bg-white/10 dark:text-white"
                >
                  {t.hero.secondary} <Mail size={18} />
                </a>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {metrics.map(([value, label]) => (
                  <div key={label} className="glass rounded-[8px] p-4">
                    <p className="text-2xl font-bold text-ink dark:text-white">{value}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="glass relative overflow-hidden rounded-[8px] p-4"
            >
              <img src="/practice-data-dashboard.png" alt="Practice Data dashboard preview" className="aspect-[4/3] w-full rounded-[8px] object-cover" />
              <div className="absolute bottom-7 left-7 right-7 rounded-[8px] border border-white/50 bg-white/72 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/62">
                <div className="flex items-center gap-3">
                  <BarChart3 className="text-coral" />
                  <div>
                    <p className="font-semibold">{t.hero.snapshotTitle}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{t.hero.snapshotText}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="about" className="px-4 py-20">
            <div className="mx-auto max-w-6xl">
              <SectionTitle eyebrow={t.about.eyebrow} title={t.about.title} description={t.about.description} />
              <div className="grid gap-4 md:grid-cols-3">
                {t.about.cards.map(([title, text], index) => {
                  const Icon = aboutIcons[index];
                  return (
                    <motion.article
                      key={title}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="glass rounded-[8px] p-6"
                    >
                      <Icon className="mb-5 text-pine dark:text-coral" size={30} />
                      <h3 className="text-xl font-semibold">{title}</h3>
                      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="skills" className="px-4 py-20">
            <div className="mx-auto max-w-6xl">
              <SectionTitle eyebrow={t.skills.eyebrow} title={t.skills.title} description={t.skills.description} />
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass flex flex-wrap justify-center gap-3 rounded-[8px] p-5"
              >
                {t.skills.items.map((skill) => (
                  <span key={skill} className="rounded-full border border-slate-200 bg-white/72 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                    {skill}
                  </span>
                ))}
              </motion.div>
            </div>
          </section>

          <section id="projects" className="px-4 py-20">
            <div className="mx-auto max-w-6xl">
              <SectionTitle eyebrow={t.projects.eyebrow} title={t.projects.title} description={t.projects.description} />
              <div className="grid gap-5 lg:grid-cols-1">
                {t.projects.items.map((project, index) => (
                  <motion.article
                    key={project.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className="glass flex h-full flex-col overflow-hidden rounded-[8px]"
                  >
                    <img src={project.image} alt={`${project.title} dashboard screenshot`} className="aspect-[16/11] w-full object-cover" loading="lazy" />
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-300">{project.summary}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-pine/10 px-3 py-1 text-xs font-bold text-pine dark:bg-coral/15 dark:text-coral">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5">
                        <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-pine dark:bg-white dark:text-ink" aria-label={t.projects.cta}>
                          <ExternalLink size={16} /> {t.projects.cta}
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section id="experience" className="px-4 py-20">
            <div className="mx-auto max-w-5xl">
              <SectionTitle eyebrow={t.experience.eyebrow} title={t.experience.title} description={t.experience.description} />
              <div className="space-y-4">
                {t.experience.items.map((item) => (
                  <motion.article key={item.role} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass rounded-[8px] p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{item.role}</h3>
                        <p className="mt-1 font-medium text-pine dark:text-coral">{item.company}</p>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-sm font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-200">
                        <CalendarDays size={15} /> {item.period}
                      </span>
                    </div>
                    <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{item.detail}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section id="certifications" className="px-4 py-20">
            <div className="mx-auto max-w-6xl">
              <SectionTitle eyebrow={t.certifications.eyebrow} title={t.certifications.title} description={t.certifications.description} />
              <div className="grid gap-4 md:grid-cols-2">
                {t.certifications.items.map((cert) => (
                  <motion.div key={cert} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass flex items-center gap-4 rounded-[8px] p-5">
                    <Award className="text-gold" />
                    <p className="font-semibold">{cert}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="resume" className="px-4 py-20">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass mx-auto max-w-5xl rounded-[8px] p-8 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-pine dark:text-coral">{t.resume.eyebrow}</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">{t.resume.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{t.resume.text}</p>
              <a href="#" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-pine dark:bg-white dark:text-ink">
                <Download size={18} /> {t.resume.button}
              </a>
            </motion.div>
          </section>

          <section id="contact" className="px-4 py-20">
            <div className="mx-auto max-w-6xl">
              <SectionTitle eyebrow={t.contact.eyebrow} title={t.contact.title} description={t.contact.description} />
              <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass rounded-[8px] p-6">
                  <h3 className="text-2xl font-semibold">{t.contact.heading}</h3>
                  <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{t.contact.text}</p>
                  <div className="mt-6 space-y-3">
                    <a href="mailto:divyamohan861@gmail.com" className="flex items-center gap-3 font-semibold text-slate-700 transition hover:text-pine dark:text-slate-200 dark:hover:text-coral">
                      <Mail size={18} /> divyamohan861@gmail.com
                    </a>
                    <a href="https://www.linkedin.com/in/divya-mohanraju-8196a831a" className="flex items-center gap-3 font-semibold text-slate-700 transition hover:text-pine dark:text-slate-200 dark:hover:text-coral">
                      <Linkedin size={18} /> {t.contact.linkedIn}
                    </a>
                  </div>
                </motion.div>
                <motion.form variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass grid gap-4 rounded-[8px] p-6">
                  <input aria-label={t.contact.placeholders[0]} placeholder={t.contact.placeholders[0]} className="rounded-[8px] border border-slate-200 bg-white/80 px-4 py-3 outline-none transition focus:border-pine dark:border-white/10 dark:bg-slate-950/40" />
                  <input aria-label={t.contact.placeholders[1]} type="email" placeholder={t.contact.placeholders[1]} className="rounded-[8px] border border-slate-200 bg-white/80 px-4 py-3 outline-none transition focus:border-pine dark:border-white/10 dark:bg-slate-950/40" />
                  <textarea aria-label={t.contact.placeholders[2]} placeholder={t.contact.placeholders[2]} rows={5} className="resize-none rounded-[8px] border border-slate-200 bg-white/80 px-4 py-3 outline-none transition focus:border-pine dark:border-white/10 dark:bg-slate-950/40" />
                  <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-pine dark:bg-white dark:text-ink">
                    {t.contact.send} <Send size={18} />
                  </button>
                </motion.form>
              </div>
            </div>
          </section>

          <footer className="px-4 pb-8">
            <div className="glass mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 rounded-[8px] px-5 py-5 text-sm text-slate-600 dark:text-slate-300 sm:flex-row">
              <p>{t.footer.text}</p>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-pine dark:text-coral" />
                <span>{t.footer.status}</span>
              </div>
            </div>
          </footer>
        </main>
      )}
    </AnimatePresence>
  );
}

export default App;
