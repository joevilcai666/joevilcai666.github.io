import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight, BookOpenText, BriefcaseBusiness, ChevronDown, Feather, FileCode2, Files, Mail, Puzzle, X } from 'lucide-react';
import type { Project } from '../data/projects';
import { SKILLS } from '../data/skills';
import type { WorkEntry } from '../data/work';
import type { Lang } from '../data/i18n';

type Topic = 'origin-im' | 'origin-health' | 'craft' | 'prose' | 'projects' | 'skills' | 'work' | 'writing' | null;
type Post = { id: string; title: string; description?: string; date: string };
interface Props { children?: ReactNode; lang: Lang; projects: Project[]; work: WorkEntry[]; posts: Post[]; baseUrl: string; }
const ease = [0.23, 1, 0.32, 1] as const;
const topics = new Set(['origin-im', 'origin-health', 'craft', 'prose', 'projects', 'skills', 'work', 'writing']);
const normalize = (id: string): Topic => topics.has(id) ? id as Topic : null;
const groupFor = (id: Topic) => id === 'craft' || id === 'prose' || id === 'skills' ? 1 : id === 'work' ? 2 : id === 'writing' ? 3 : 0;

function Glyph({ topic, base }: {topic: string; base: string}) {
  if (topic === 'origin-im' || topic === 'origin-health') return <img className="origin-glyph" src={`${base}topic-icons/origin.svg`} alt="" width="16" height="16" />;
  const Icon = topic === 'craft' ? BookOpenText : topic === 'prose' ? FileCode2 : topic === 'work' ? BriefcaseBusiness : topic === 'skills' ? Puzzle : Feather;
  return <span className={`experience-glyph glyph-${topic}`}><Icon size={15} strokeWidth={1.8} aria-hidden="true" /></span>;
}

export default function HomeExperience({lang, projects, work, posts, baseUrl, children}: Props) {
  const en = lang === 'en';
  const root = en ? 'en/' : '';
  const href = (path: string) => `${baseUrl}${root}${path}`;
  const [topic, setTopic] = useState<Topic>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [pointerMotion, setPointerMotion] = useState(false);
  const [height, setHeight] = useState(0);
  const [anchorGroup, setAnchorGroup] = useState(0);
  const [anchorTopic, setAnchorTopic] = useState<Topic>(null);
  const [connector, setConnector] = useState<{top: number; width: number; height: number; path: string} | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const content = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scrollRequested = useRef(false);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const current = useRef<Topic>(null);
  const duration = pointerMotion ? (reduce ? 0.12 : 0.24) : 0;

  useEffect(() => {
    const sync = () => { scrollRequested.current = false; const next = normalize(decodeURIComponent(location.hash.slice(1))); setAnchorGroup(groupFor(next)); setAnchorTopic(next === 'projects' ? 'origin-im' : next); current.current = next; setPointerMotion(false); setTopic(next); };
    sync(); setEnhanced(true);
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => { window.removeEventListener('popstate', sync); window.removeEventListener('hashchange', sync); };
  }, []);

  useEffect(() => {
    const node = content.current;
    if (!node || !topic) { setHeight(0); return; }
    const observer = new ResizeObserver(() => setHeight(node.getBoundingClientRect().height));
    observer.observe(node);
    setHeight(node.getBoundingClientRect().height);
    return () => observer.disconnect();
  }, [topic, enhanced, anchorGroup]);

  useEffect(() => {
    if (!topic || !enhanced) { setConnector(null); return; }
    const rootNode = container.current;
    const stageNode = stage.current;
    const trigger = rootNode?.querySelector<HTMLElement>(`[data-topic="${anchorTopic}"]`);
    if (!rootNode || !stageNode || !trigger) return;
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = rootNode.getBoundingClientRect();
        const from = trigger.getBoundingClientRect();
        const to = stageNode.getBoundingClientRect();
        const x = from.left + from.width / 2 - box.left;
        const top = from.bottom - box.top + 4;
        const end = to.top - box.top + 44 - top;
        const turn = Math.max(12, end - 22);
        const target = 18;
        const radius = Math.min(12, Math.abs(x - target) / 2);
        const path = Math.abs(x - target) < 2
          ? `M ${x} 0 V ${end}`
          : `M ${x} 0 V ${turn-radius} Q ${x} ${turn} ${x-radius} ${turn} H ${target+radius} Q ${target} ${turn} ${target} ${turn+radius} V ${end}`;
        setConnector({top, width: box.width, height: Math.max(1, end+4), path});
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(rootNode); observer.observe(trigger);
    window.addEventListener('resize', measure);
    document.fonts.ready.then(measure);
    measure();
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); cancelAnimationFrame(frame); };
  }, [topic, enhanced, anchorTopic, anchorGroup]);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !current.current || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      scrollRequested.current = false;
      current.current = null; setPointerMotion(false); setTopic(null); setHeight(0);
      history.pushState(null, '', location.pathname + location.search);
      lastTrigger.current?.focus({preventScroll: true});
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);

  useEffect(() => {
    const interactive = 'a, button, input, textarea, select, summary, label, [role="button"], [role="link"], [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])';
    let start: {x: number; y: number; scrollX: number; scrollY: number; selected: boolean} | null = null;
    const outsideContent = (target: EventTarget | null) => target instanceof Element && !target.closest(`.reveal-stage, ${interactive}`);
    const pointerDown = (event: PointerEvent) => {
      start = current.current && event.isPrimary && event.button === 0 && outsideContent(event.target)
        ? {x: event.clientX, y: event.clientY, scrollX: window.scrollX, scrollY: window.scrollY, selected: window.getSelection()?.isCollapsed === false}
        : null;
    };
    const cancel = () => { start = null; };
    const dismissOutside = (event: globalThis.MouseEvent) => {
      const origin = start;
      start = null;
      if (!origin || !current.current || event.detail === 0 || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || !outsideContent(event.target)) return;
      if (origin.selected || window.getSelection()?.isCollapsed === false) return;
      if (Math.hypot(event.clientX - origin.x, event.clientY - origin.y) > 6 || Math.hypot(window.scrollX - origin.scrollX, window.scrollY - origin.scrollY) > 6) return;
      scrollRequested.current = false;
      current.current = null; setPointerMotion(true); setTopic(null); setHeight(0);
      history.pushState(null, '', location.pathname + location.search);
      lastTrigger.current?.focus({preventScroll: true});
    };
    document.addEventListener('pointerdown', pointerDown, true);
    document.addEventListener('pointercancel', cancel, true);
    document.addEventListener('click', dismissOutside);
    return () => {
      document.removeEventListener('pointerdown', pointerDown, true);
      document.removeEventListener('pointercancel', cancel, true);
      document.removeEventListener('click', dismissOutside);
    };
  }, []);

  function choose(next: Topic, event?: MouseEvent<HTMLElement>, toggle = true) {
    if (event && (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)) return;
    event?.preventDefault();
    if (event?.currentTarget.classList.contains('topic-pill')) {
      lastTrigger.current = event.currentTarget;
      scrollRequested.current = true;
      if (groupFor(next) !== anchorGroup) setHeight(0);
      setAnchorGroup(groupFor(next)); setAnchorTopic(next);
    }
    const id = toggle && current.current && anchorTopic === next ? null : next;
    current.current = id;
    setPointerMotion(!!event && event.detail > 0);
    setTopic(id);
    if (!id) { setHeight(0); scrollRequested.current = false; }
    history.pushState(null, '', id ? `#${id}` : location.pathname + location.search);
  }

  function close(event: MouseEvent<HTMLElement>) {
    const trigger = lastTrigger.current;
    choose(null, event, false);
    trigger?.focus({preventScroll: true});
  }

  function stageSettled() {
    const trigger = lastTrigger.current;
    if (!current.current) {
      trigger?.scrollIntoView({block: 'nearest', behavior: 'instant'});
      return;
    }
    if (!scrollRequested.current || !trigger || !stage.current) return;
    const bounds = stage.current.getBoundingClientRect();
    if (!content.current || bounds.height < content.current.getBoundingClientRect().height - 1) return;
    scrollRequested.current = false;
    const firstVisual = stage.current.querySelector('.project-cover, .career-item, .writing-empty, .writing-card, .skill-project');
    if ((firstVisual && firstVisual.getBoundingClientRect().bottom > window.innerHeight - 24) || bounds.top < 40) {
      const top = Math.max(0, trigger.getBoundingClientRect().top + window.scrollY - 96);
      window.scrollTo({top, behavior: reduce || !pointerMotion ? 'instant' : 'smooth'});
    }
  }

  useEffect(() => {
    if (!reduce && pointerMotion) return;
    const frame = requestAnimationFrame(stageSettled);
    return () => cancelAnimationFrame(frame);
  }, [height, topic, reduce, pointerMotion]);

  function pill(id: Exclude<Topic, null>, children: ReactNode, punctuation = '') {
    return <span className="topic-phrase"><a className="topic-pill" data-topic={id} href={`#${id}`} aria-controls="portfolio-results" aria-expanded={!!topic && anchorTopic === id} onClick={event => choose(id, event)}><Glyph topic={id} base={baseUrl} /><span>{children}</span></a>{punctuation}</span>;
  }

  function ProjectPanel() {
    const list = projects.filter(project => topic === 'projects' || project.id === topic);
    return <div className="project-collection">
      <nav className="project-tabs" aria-label={en ? 'Choose a project' : '选择项目'}>
        {projects.map(project => <a href={`#${project.id}`} key={project.id} aria-current={topic === project.id ? 'true' : undefined} onClick={event => choose(project.id as Topic, event, false)}>{project.name}</a>)}
        <a className="all-projects" href="#projects" aria-current={topic === 'projects' ? 'true' : undefined} onClick={event => choose('projects', event, false)}>{en ? 'All' : '全部'}</a>
      </nav>
      <div className={`visual-projects ${list.length === 1 ? 'single-project' : ''}`}>
        {list.map(project => <article className={`visual-project project-${project.id}`} id={project.id} key={project.id}>
          <a className="project-cover" href={href(`projects/${project.id}/`)} aria-label={`${en ? 'View' : '查看'} ${project.name}`}>
            {(project.previews || [project.preview]).map((preview, index) => <img key={preview} src={`${baseUrl}${preview.replace(/^\//, '')}`} alt={`${project.name} ${en ? 'design prototype' : '设计原型'}${project.previews ? ` ${index + 1}` : ''}`} />)}
          </a>
          <div className="visual-project-copy">
            <div className="visual-project-title"><h3>{project.name}</h3></div>
            <p className="visual-project-tagline">{project.tagline[lang]}</p>
            <p className="visual-project-description">{project.description[lang]}</p>
            <div className="project-footnotes"><div className="project-link-group">{project.links?.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={14} /></a>)}<a href={href(`projects/${project.id}/`)}>{en ? 'Explore project' : '查看项目'}<ArrowUpRight size={15} /></a></div></div>
          </div>
        </article>)}
      </div>
    </div>;
  }

  function WorkPanel() {
    return <div className="career-list">{work.map((item) => <details key={item.period} className="career-item">
      <summary><span className="career-logo"><img src={`${baseUrl}${item.logo.replace(/^\//, '')}`} alt="" width="32" height="32" /></span><span className="career-identity"><span className="career-org">{item.org[lang].split(' · ')[0]}</span><span className="career-role">{item.role[lang]}</span></span><span className="career-period">{item.current ? `${item.period.split(' — ')[0]} — ${en ? 'Present' : '至今'}` : item.period}</span><ChevronDown className="career-chevron" size={15} /></summary>
      <div className="career-details"><p>{item.summary[lang]}</p>{item.highlights.length > 0 && <ul>{item.highlights.map((highlight, i) => <li key={i}>{highlight[lang]}</li>)}</ul>}{item.href && <a href={item.href} target="_blank" rel="noopener noreferrer">{item.org[lang].split(' · ')[0]}<ArrowUpRight size={14} /></a>}</div>
    </details>)}<a className="collection-link" href={href('work/')}>{en ? 'Full experience' : '完整职业经历'}<ArrowRight size={15} /></a></div>;
  }

  function SkillsPanel() {
    return <div className="skills-collection">{SKILLS.map(skill => {
      return <article className="skill-project" key={skill.id}>
        <div className="skill-preview"><div className="skill-file"><Files size={16} strokeWidth={1.5} /><span>{skill.preview.filename}</span></div><p><span>#</span> {skill.preview.heading[lang]}</p><ol>{skill.preview.steps.map((line, index) => <li key={index}><span>{index+1}.</span>{line[lang]}</li>)}</ol></div>
        <div className="skill-copy"><h3>{skill.name}</h3><p className="skill-tagline">{skill.tagline[lang]}</p><p>{skill.description[lang]}</p><div className="skill-footnote"><span>{skill.attribution[lang]}</span><a href={skill.href} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={15} /></a></div></div>
      </article>;
    })}</div>;
  }

  function WritingPanel() {
    return <div className="writing-collection">{posts.length ? posts.slice(0, 3).map(post => <a className="writing-card" key={post.id} href={href(`blog/${post.id}/`)}><span className="writing-date">{post.date}</span><span className="writing-card-title">{post.title}<ArrowUpRight size={18} /></span>{post.description && <span className="writing-excerpt">{post.description}</span>}</a>) : <div className="writing-empty"><Feather size={28} strokeWidth={1.25} /><div><h3>{en ? 'No posts yet.' : '还没有文章。'}</h3><p>{en ? 'Thoughts on products, people, and making things.' : '这里会记录我对产品、组织与创造的思考。'}</p></div></div>}<a className="collection-link" href={href('blog/')}>{en ? 'All posts' : '全部文章'}<ArrowRight size={15} /></a></div>;
  }

  const panelTitle = topic === 'skills' ? 'AI Skills' : topic === 'work' ? (en ? 'Experience' : '职业经历') : topic === 'writing' ? (en ? 'Writing' : '写作') : (en ? 'Selected work' : '项目作品');
  const copy = (text: string) => <span className="focus-copy">{text}</span>;
  const paragraphs = en ? [
    <>{copy("These past few years I've been building products at AI startups. Once I started working, I noticed something: the things that don't deserve anyone's attention — yet still have to be dealt with — are exactly the ones that keep taking up our time. So I'm building ")}{pill('origin-im', 'Origin AI')}{copy(' and ')}{pill('origin-health', 'Origin Health')}{copy(': one follows through on everyday requests; the other helps people find a healthy rhythm of their own.')}</>,
    <>{copy("While polishing Origin, I meant to focus on the product itself, but kept getting pulled into back-and-forths with coding agents, debugging. That made me care more about thinking clearly and expressing my judgment precisely. I’m building the reading and writing tool ")}{pill('craft', 'Craft')}{copy(', and ')}{pill('prose', 'Prose')}{copy(', which helps product leads understand, change, and verify software. I also turn methods for writing and understanding products into open-source ')}{pill('skills', 'AI skills', '.')}</>,
    <>{copy('In my past ')}{pill('work', 'experience')}{copy(", when positive feedback was missing, the company would respond by assigning people more tasks. It made me realize: when an organization can't reduce uncertainty about direction, it tends to increase certainty about execution instead. These experiences left me with a question I keep coming back to: what kind of environment makes people willing to commit, brave enough to judge, and able to create?")}</>,
    <>{copy("I love reading. Other people's words gave me the courage to leave work environments I didn't like and go look for what I truly wanted to do. They also made me see that money lets me say “no” to what I dislike. Life is full of questions that puzzle and intrigue me, so I ")}{pill('writing', 'write')}{copy(' to think the vague ones through — and maybe my perspective can offer you, the reader, one more reference.')}</>
  ] : [
    <>{copy('这几年一直在 AI 创业公司做产品。工作后才发现，那些本来不值得人持续投入注意力、却不得不处理的事情，反而持续占用人的时间。于是我正在做 ')}{pill('origin-im', 'Origin AI')}{copy(' 和 ')}{pill('origin-health', 'Origin Health')}{copy('：一个帮人把日常交代推进成结果，一个帮人找到自己的健康节奏。')}</>,
    <>{copy('打磨 Origin 时，原本只想把精力放在产品本身，却不断需要反复与编程 agent 沟通、排错。这让我更在意把问题想清楚，把判断表达准确。我正在做阅读与写作工具 ')}{pill('craft', 'Craft')}{copy('，也在做帮助产品负责人读懂、修改和验证软件的 ')}{pill('prose', 'Prose', '。')}{copy('写文档、理解产品的工作方法，则整理成了开源 ')}{pill('skills', 'AI skills', '。')}</>,
    <>{copy('在过去几次创业的 ')}{pill('work', '职业经历')}{copy(' 中，我发现，在没有正反馈的情况下，公司会安排人处理更多任务。这种现象也让我意识到，当一个组织无法降低方向上的不确定性时，很容易转而增加执行上的确定性。这些经历让我长期关注一个问题：什么样的组织环境能让人愿意投入、敢于判断、能够创造？')}</>,
    <>{copy('我非常喜欢阅读，他人的文字让我敢于离开不喜欢的工作环境，更主动寻找真正想做的事情。也让我意识到钱可以让我对不喜欢的事情说“不”。生活中总有让我困惑和好奇的问题，于是我通过 ')}{pill('writing', '写作')}{copy(' 把模糊的东西想清楚，也许我的视角也能给正在阅读的你多一个参考。')}</>
  ];

  function reveal() {
    return <motion.div ref={stage} id="portfolio-results" className="reveal-stage" onAnimationComplete={stageSettled} initial={false} animate={{height}} transition={{duration: reduce ? 0 : duration, ease}}>
      <div ref={content} className="reveal-content">
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => { if (!current.current) setHeight(0); }}>
          {topic && <motion.section className="experience-panel" id={['work','writing','projects','skills'].includes(topic) ? topic : 'projects'} key={topic} initial={{opacity: 0, transform: reduce || !pointerMotion ? 'none' : 'translateY(8px)'}} animate={{opacity: 1, transform: 'translateY(0)'}} exit={{opacity: 0, transform: reduce || !pointerMotion ? 'none' : 'translateY(8px)'}} transition={{duration: pointerMotion ? (reduce ? 0.12 : 0.24) : 0, ease}}>
            <div className="experience-panel-heading"><h2>{panelTitle}</h2><button className="close-panel" onClick={close} aria-label={en ? 'Close section' : '收起内容'}><X size={18} strokeWidth={1.5} /></button></div>
            {topic === 'work' ? WorkPanel() : topic === 'writing' ? WritingPanel() : topic === 'skills' ? SkillsPanel() : ProjectPanel()}
          </motion.section>}
        </AnimatePresence>
      </div>
    </motion.div>;
  }

  return <div ref={container} className="home-experience" data-focus-mode={topic ? 'active' : undefined} data-motion={pointerMotion ? 'animated' : 'instant'}>
    <section className="portfolio-hero" aria-label={en ? 'Introduction' : '个人介绍'}>
      <div className="hero-identity">
        <img className="hero-avatar focus-copy" src={`${baseUrl}identity/joe-avatar.webp`} width="160" height="160" alt={en ? "Joe's profile picture" : 'Joe 的头像'} />
        <div className="hero-person"><div className="hero-name-row"><h1 className="focus-copy">Joe Cai</h1><div className="hero-theme">{children}</div></div><div className="hero-social focus-copy" role="group" aria-label={en ? 'Connect' : '社交与联系'}>
          <a href="https://github.com/joevilcai666" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><img className="light-asset" src={`${baseUrl}social/github.svg`} alt="" width="25" height="25" /><img className="dark-asset" src={`${baseUrl}social/github-dark.svg`} alt="" width="25" height="25" /></a>
          <a href="https://www.linkedin.com/in/jichun46/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><img className="light-asset" src={`${baseUrl}social/linkedin.svg`} alt="" width="25" height="25" /><img className="dark-asset" src={`${baseUrl}social/linkedin-dark.svg`} alt="" width="25" height="25" /></a>
          <a href="mailto:jichun.cai@outlook.com" aria-label={en ? 'Email' : '邮件'} title={en ? 'Email' : '邮件'}><Mail size={25} strokeWidth={1.6} /></a>
        </div></div>
      </div>
      <section className="builder-entry focus-copy" aria-label={en ? 'My definition of Product Builder' : '我对 Product Builder 的理解'}>
        <h2>Product Builder<span className="entry-period">.</span></h2>
        <div className="entry-grammar"><span className="entry-part">noun</span><span className="entry-phonetic">/ˈprɒdʌkt ˈbɪldə/</span></div>
        <p><span className="entry-number">01</span>{en ? 'A person who starts with something they genuinely want to change, imagines a better possibility, and builds a product that brings value to others.' : '从自己真正想改变的现状出发，想象一种更好的可能，并把它做成对他人也有价值的产品的人。'}</p>
      </section>
      <div className="home-narrative">{paragraphs.map((paragraph, index) => <div className="narrative-group" key={index}>
        <p className="narrative-paragraph">{paragraph}</p>
        {enhanced && anchorGroup === index && reveal()}
      </div>)}</div>
    </section>
    <AnimatePresence initial={false}>{enhanced && connector && topic && <motion.svg key={anchorTopic} className="focus-connector" style={{top: connector.top, height: connector.height}} viewBox={`0 0 ${connector.width} ${connector.height}`} width={connector.width} height={connector.height} aria-hidden="true" initial={{opacity: 0, clipPath: reduce || !pointerMotion ? 'inset(0)' : 'inset(0 0 100% 0)'}} animate={{opacity: 1, clipPath: 'inset(0)'}} exit={{opacity: 0, clipPath: reduce || !pointerMotion ? 'inset(0)' : 'inset(0 0 100% 0)'}} transition={{duration, ease}}><path d={connector.path} /><circle cx="18" cy={connector.height-4} r="2.5" /></motion.svg>}</AnimatePresence>
    {!enhanced && <div className="static-panels"><section id="projects"><h2>{en ? 'Projects' : '项目'}</h2><nav><a href="#projects">{en ? 'All projects' : '全部项目'}</a></nav>{projects.map(project => <article id={project.id} key={project.id}><h3>{project.name}</h3><p>{project.description[lang]}</p></article>)}</section><section id="work"><h2>{en ? 'Experience' : '职业经历'}</h2>{WorkPanel()}</section><section id="writing"><h2>{en ? 'Writing' : '写作'}</h2>{WritingPanel()}</section><section id="skills"><h2>AI Skills</h2>{SkillsPanel()}</section></div>}
  </div>;
}
