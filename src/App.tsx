import {useEffect,useMemo,useRef,useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import {AnimatePresence,motion} from 'motion/react'
import {ArrowDown,ArrowLeft,ArrowRight,ArrowUpRight,Check,Code2,Copy,Instagram,Menu,MessageCircle,MonitorUp,MousePointer2,X} from 'lucide-react'
import {Scene} from './components/Scene'
import {Intro} from './components/Intro'
import {site,works} from './content'
import {cn} from './lib/cn'

gsap.registerPlugin(ScrollTrigger)
const spotlightFile='bar-do-beco-11-set.png'
const spotlight=works.find(work=>work.file===spotlightFile)!
const featured=[spotlight,works[44],works[49],works[50],works[1]]

function App(){
  const root=useRef<HTMLDivElement>(null)
  const [filter,setFilter]=useState('Todos')
  const [active,setActive]=useState<number|null>(null)
  const [menu,setMenu]=useState(false)
  const [copied,setCopied]=useState(false)
  const [intro,setIntro]=useState(true)
  const filters=['Todos','Bar do Beco','Outros']
  const visible=useMemo(()=>{
    const filtered=filter==='Todos'?works:filter==='Outros'?works.filter(w=>w.client!=='Bar do Beco'):works.filter(w=>w.client===filter)
    return [...filtered].sort((a,b)=>Number(b.file===spotlightFile)-Number(a.file===spotlightFile))
  },[filter])

  useEffect(()=>{
    const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches
    if(reduce)return
    const lenis=new Lenis({duration:1.05,smoothWheel:true})
    const raf=(time:number)=>{lenis.raf(time);requestAnimationFrame(raf)};const frame=requestAnimationFrame(raf)
    lenis.on('scroll',ScrollTrigger.update)
    const ctx=gsap.context(()=>{
      gsap.from('.hero-line',{yPercent:115,duration:1.15,stagger:.09,ease:'power4.out',delay:.15})
      gsap.from('.hero-meta',{opacity:0,y:18,duration:.7,ease:'power3.out',delay:.8})
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>gsap.from(el,{opacity:0,y:52,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}))
      gsap.to('.marquee-track',{xPercent:-20,ease:'none',scrollTrigger:{trigger:'.marquee',start:'top bottom',end:'bottom top',scrub:1}})
      gsap.to('.portrait-wrap',{yPercent:-10,ease:'none',scrollTrigger:{trigger:'.about',start:'top bottom',end:'bottom top',scrub:1}})
    },root)
    return()=>{cancelAnimationFrame(frame);lenis.destroy();ctx.revert()}
  },[])

  useEffect(()=>{ScrollTrigger.refresh()},[filter])
  useEffect(()=>{
    const key=(e:KeyboardEvent)=>{if(active===null)return;if(e.key==='Escape')setActive(null);if(e.key==='ArrowRight')setActive((active+1)%works.length);if(e.key==='ArrowLeft')setActive((active-1+works.length)%works.length)}
    addEventListener('keydown',key);document.body.style.overflow=active!==null?'hidden':'';return()=>{removeEventListener('keydown',key);document.body.style.overflow=''}
  },[active])

  const scroll=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)}
  const copyBrief=async()=>{await navigator.clipboard.writeText('Olá, WS Design! Quero criar um flyer para meu evento. Data: ___ / Evento: ___ / Formato: ___');setCopied(true);setTimeout(()=>setCopied(false),1800)}

  const whatsappMessage=encodeURIComponent('Olá, WS Design! Vi seu portfólio e quero conversar sobre um projeto.')
  const whatsappUrl=`https://wa.me/${site.whatsapp}?text=${whatsappMessage}`
  return <div ref={root} className="site-shell">
    <AnimatePresence>{intro&&<Intro onDone={()=>setIntro(false)}/>}</AnimatePresence>
    <Scene/>
    <header className="nav-shell">
      <button className="brand" onClick={()=>scroll('inicio')} aria-label="Voltar ao início"><img src="/brand/logo.png" alt="WS Design"/></button>
      <nav className={cn('nav-links',menu&&'nav-open')} aria-label="Principal">
        <button onClick={()=>scroll('trabalhos')}>Trabalhos</button><button onClick={()=>scroll('sobre')}>Sobre</button><button onClick={()=>scroll('sites')}>Sites</button><button onClick={()=>scroll('contato')}>Contato</button>
      </nav>
      <button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label={menu?'Fechar menu':'Abrir menu'}>{menu?<X/>:<Menu/>}</button>
      <button className="nav-cta" onClick={()=>scroll('contato')}>Vamos criar <ArrowUpRight/></button>
    </header>

    <main>
      <section id="inicio" className="hero section-pad">
        <div className="eyebrow hero-meta"><span>Direção de arte</span><span>Flyers que lotam eventos</span></div>
        <h1 aria-label="Seu evento começa no visual">
          <span className="line-mask"><span className="hero-line">SEU EVENTO</span></span>
          <span className="line-mask accent-line"><span className="hero-line">COMEÇA</span></span>
          <span className="line-mask"><span className="hero-line">NO VISUAL.</span></span>
        </h1>
        <div className="hero-foot hero-meta"><p>Identidade, impacto e informação em peças desenhadas para parar o scroll.</p><button onClick={()=>scroll('trabalhos')} className="round-link" aria-label="Ver trabalhos"><ArrowDown/></button></div>
      </section>

      <section className="showcase" aria-label="Trabalhos em destaque">
        {featured.map((work,i)=><button key={work.file} className={`poster poster-${i+1}`} onClick={()=>setActive(work.id-1)} aria-label={`Ampliar ${work.title}`}><img src={work.src} alt={work.title} fetchPriority={i<2?'high':'auto'}/></button>)}
        <div className="showcase-note">Seleção<br/>2026</div>
      </section>

      <div className="marquee"><div className="marquee-track">IDENTIDADE VISUAL <i>✦</i> FLYERS PARA EVENTOS <i>✦</i> DESIGN QUE CONVERTE <i>✦</i> IDENTIDADE VISUAL <i>✦</i> FLYERS PARA EVENTOS <i>✦</i></div></div>

      <section id="trabalhos" className="work section-pad">
        <div className="section-head" data-reveal><div><span className="index">01</span><p className="kicker">Arquivo de trabalhos</p></div><h2>Últimos<br/><em>projetos</em></h2><p>{works.length} peças selecionadas para casas noturnas, bares e produtores de eventos.</p></div>
        <div className="filters" data-reveal role="group" aria-label="Filtrar trabalhos">{filters.map(item=><button key={item} className={cn(filter===item&&'active')} onClick={()=>setFilter(item)}>{item}</button>)}</div>
        <div className="gallery">
          {visible.map((work,i)=><motion.button layout key={work.file} className={cn('work-card',work.file===spotlightFile&&'work-card-spotlight')} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-5%'}} transition={{duration:.45,delay:Math.min(i%6*.04,.2),ease:'easeOut'}} onClick={()=>setActive(work.id-1)} aria-label={`Abrir ${work.title}`}>
            <div className="image-wrap"><img src={work.src} alt={work.title} loading="lazy"/>{work.file===spotlightFile&&<span className="spotlight-label">Destaque · Kelvinho</span>}<span className="card-open"><ArrowUpRight/></span></div><div className="card-meta"><span>{work.file===spotlightFile?'Kelvinho · Aniversário Bar do Beco':work.client}</span><span>{work.month} · 2026</span></div>
          </motion.button>)}
        </div>
      </section>

      <section id="sobre" className="about section-pad">
        <div className="portrait-wrap" data-reveal><img src="/brand/portrait.png" alt="Retrato do designer da WS Design" loading="lazy"/><span>WS / Criador visual</span></div>
        <div className="about-copy" data-reveal><span className="index">02</span><p className="kicker">Por trás dos pixels</p><h2>Design com<br/><em>presença.</em></h2><p className="lead">Transformo a energia de cada evento em uma peça visual impossível de ignorar.</p><p>Sou Wellington Santos, designer e desenvolvedor. Além dos flyers, crio sites e landing pages com identidade, estratégia e interações cuidadosas — do visual ao último detalhe da navegação.</p><div className="stats"><div><strong>50+</strong><span>peças na seleção</span></div><div><strong>02</strong><span>frentes criativas</span></div><div><strong>01</strong><span>visual memorável</span></div></div></div>
      </section>

      <section id="sites" className="digital section-pad">
        <div className="digital-heading" data-reveal><div><span className="index">03</span><p className="kicker">Além do flyer</p></div><h2>SITES QUE<br/><em>IMPRESSIONAM.</em></h2><p>Design com intenção. Código com atitude. Experiências digitais que apresentam sua marca e conduzem ao próximo clique.</p></div>
        <a className="website-card" href="https://www.wsdesigner01.site/" target="_blank" rel="noreferrer" data-reveal aria-label="Conhecer o portfólio de sites da WS Designer">
          <div className="browser-bar"><span/><span/><span/><p>wsdesigner01.site</p><ArrowUpRight/></div>
          <div className="website-preview">
            <div className="preview-copy"><span>WS / DESIGN & DESENVOLVIMENTO</span><strong>IDEIAS GANHANDO<br/><i>FORMA DIGITAL.</i></strong><p>Sites institucionais · Landing pages · UI/UX · Motion</p></div>
            <div className="preview-orbit" aria-hidden="true"><MousePointer2/><span>EXPLORE</span></div>
          </div>
          <div className="website-footer"><span>Conheça meu portfólio de sites</span><span>Visitar agora <ArrowUpRight/></span></div>
        </a>
        <div className="service-strip" data-reveal><div><MonitorUp/><span>Sites institucionais</span></div><div><MousePointer2/><span>Landing pages</span></div><div><Code2/><span>Design & desenvolvimento</span></div></div>
      </section>

      <section id="contato" className="contact section-pad" data-reveal>
        <span className="index">04</span><p className="kicker">Seu próximo projeto</p><h2>VAMOS FAZER<br/><em>BARULHO?</em></h2><p>Flyer, site ou landing page: conte sua ideia. Eu cuido do impacto visual.</p>
        <div className="contact-actions">
          {site.whatsapp?<a className="primary-btn" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle/> Chamar no WhatsApp <ArrowUpRight/></a>:<button className="primary-btn" onClick={copyBrief}>{copied?<Check/>:<Copy/>}{copied?'Mensagem copiada':'Copiar mensagem de orçamento'}</button>}
          {site.instagram&&<a className="social-btn" href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a>}
        </div>
      </section>
    </main>

    {site.whatsapp&&<a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Falar com a WS Design no WhatsApp"><MessageCircle/><span>Orçamento</span></a>}

    <footer><img src="/brand/logo.png" alt="WS Design"/><p>Design para quem quer ser lembrado.</p><span>© 2026 WS Design</span></footer>

    <AnimatePresence>{active!==null&&<motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Visualização do projeto" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setActive(null)}>
      <button className="lightbox-close" onClick={()=>setActive(null)} aria-label="Fechar"><X/></button>
      <button className="lightbox-prev" onClick={e=>{e.stopPropagation();setActive((active-1+works.length)%works.length)}} aria-label="Projeto anterior"><ArrowLeft/></button>
      <motion.img key={works[active].file} src={works[active].src} alt={works[active].title} onClick={e=>e.stopPropagation()} initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.2}}/>
      <div className="lightbox-meta"><span>{works[active].client}</span><span>{String(active+1).padStart(2,'0')} / {works.length}</span></div>
      <button className="lightbox-next" onClick={e=>{e.stopPropagation();setActive((active+1)%works.length)}} aria-label="Próximo projeto"><ArrowRight/></button>
    </motion.div>}</AnimatePresence>
  </div>
}
export default App
