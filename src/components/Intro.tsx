import {useEffect,useRef} from 'react'
import gsap from 'gsap'

export function Intro({onDone}:{onDone:()=>void}){
  const root=useRef<HTMLDivElement>(null)
  const logo=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){onDone();return}
    document.body.style.overflow='hidden'
    const ctx=gsap.context(()=>{
      const tl=gsap.timeline({onComplete:()=>{document.body.style.overflow='';onDone()}})
      tl.from('.intro-mark',{opacity:0,scale:.72,rotationY:-35,duration:.8,ease:'power4.out'})
        .from('.intro-word',{opacity:0,y:20,duration:.55,ease:'power3.out'},'-.35')
        .from('.intro-rule',{scaleX:0,duration:1.15,ease:'power2.inOut'},'-.25')
        .to('.intro-mark',{scale:1.04,duration:.45,ease:'power2.inOut',yoyo:true,repeat:1},'-.4')
        .to(root.current,{yPercent:-100,duration:.9,ease:'power4.inOut'},'+=.15')
    },root)
    const move=(e:PointerEvent)=>{if(!logo.current)return;const x=(e.clientX/innerWidth-.5)*22,y=(e.clientY/innerHeight-.5)*16;gsap.to(logo.current,{x,y,rotationY:x*.35,rotationX:-y*.35,duration:.35,ease:'power2.out'})}
    addEventListener('pointermove',move,{passive:true})
    return()=>{ctx.revert();removeEventListener('pointermove',move);document.body.style.overflow=''}
  },[onDone])
  return <div ref={root} className="intro" role="status" aria-label="Carregando portfólio">
    <button className="intro-skip" onClick={onDone}>Pular intro</button>
    <div ref={logo} className="intro-logo">
      <span className="intro-orbit" aria-hidden="true"/>
      <img className="intro-mark" src="/brand/logo.png" alt="WS Design"/>
      <p className="intro-word">Visuals for the night</p>
    </div>
    <div className="intro-bottom"><span>Portfólio · 2026</span><span className="intro-rule"/><span>Direção de arte</span></div>
  </div>
}
